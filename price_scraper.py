#!/usr/bin/python
# -*- coding: utf-8 -*-
from __future__ import division
import sys
import requests
import re
import json
import gevent
from bs4 import BeautifulSoup, NavigableString
import itertools
import functools
flatten = itertools.chain.from_iterable

GRAM_REGEX = re.compile(r'(\d{1,2}\.?\d{0,2})\s?g')
DOMAIN = 'http://www.iherb.com'
UNICODE_REGEX = re.compile(r'[^\x00-\x7f]|\r')
SERVING_TEXT_REGEX = re.compile(
  r'(serving size|serving):?\s*(?P<serve>.*)(serving)?|(?P<pserve>each packet)',
  re.IGNORECASE)
PRICE_REGEX = re.compile(r'\s*\$(\d{1,2}\.?\d{0,2})\s*')
NON_DIGITS_REGEX = re.compile(r'<|,|\*|%')
SIZE_REGEX = re.compile(r'(\.?\d{1,4}\.?\/?\d{0,3})\s?([a-zA-Z \-]+)')
SIZE_PARTITION_REGEX = re.compile(r';|,|or |\(|\)')
NUMBER_MAP = {
  'each': 1,
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8
}
UNIT_CONVERSIONS = [{
  'unit': 'lbs',
  'multiplier': 0.00220462
}, {
  'unit': 'oz',
  'multiplier': 0.035274
}, {
  'unit': 'kg',
  'multiplier': 0.001
}, {
  'unit': 'mg',
  'multiplier': 1000
}, {
  'unit': 'floz',
  'multiplier': 0.033814
}, {
  'unit': 'ml',
  'multiplier': 1
}, {
  'unit': 'l',
  'multiplier': 0.001
}]

def clean(unistr):
  decoded = re.sub(UNICODE_REGEX, '', unistr)
  return (' '.join(x.strip() for x in decoded.split('\n'))).strip()

def load_nutrients():
  nutrients = {}
  with open('app/data/nutrients.json') as data_file:
    nutrients = json.load(data_file)

  return nutrients

ALL_NUTRIENTS = load_nutrients()

def get_serving_text(facts_table):
  rows = facts_table.findAll('tr')[0:3]
  text = ''
  for row in rows:
    match = SERVING_TEXT_REGEX.match(clean(row.text))
    # text = (text + ' ' + row.text) if row.strong else text
    if match:
      return match.group('serve') or match.group('pserve')

  return clean(text)

def get_container_size_text(text):
  return ';'.join(map(lambda x: x.replace(',', ''), text.split(', ')[-2:]))

def to_number(num):
  divider = '/'
  decimal = '.'
  if divider in num:
    fraction = num.split(divider)
    return float(fraction[0]) / float(fraction[1])
  elif decimal in num:
    return float(num)
  else:
    try:
      return int(num)
    except:
      return num

def get_alphanumber_size(text):
  tokens = re.split(r'\s+', text)
  amount = 1
  unit_tokens = []

  # unit word too long, take the first word
  for i, token in enumerate(tokens):
    token = token.lower()
    if token in NUMBER_MAP:
      amount = NUMBER_MAP[token]
      unit_tokens = tokens[i+1:]
      end_index = 1 if len(unit_tokens) > 5 else len(unit_tokens)
      unit_tokens = unit_tokens[:end_index]

  return {
    'amount': amount,
    'unit': ' '.join(unit_tokens)
  }

def get_sizes(text):
  partitions = re.split(SIZE_PARTITION_REGEX, text)
  sizes = []
  for part in reversed(partitions):
    match = SIZE_REGEX.search(part)
    if match:
      print match.groups()
      amount, unit = match.groups()
      sizes.append({
        'amount': to_number(amount),
        'unit': unit.strip().lower()
      })

  if len(sizes) == 0:
    sizes.append(get_alphanumber_size(text))

  return sizes

def match_product_nutrient(product_nutrient):
  product_nutrient = ' '.join(product_nutrient.split(' ')[0:2]) + ' '
  for category, nutrientlist in ALL_NUTRIENTS.iteritems():
    for nutrients in nutrientlist:
      for nutrient in nutrients:
        if nutrient.lower() in product_nutrient.lower():
          return (category, nutrients[0])

  return (None, None)

def percent_to_num(field):
  number_str = re.sub(NON_DIGITS_REGEX, '', field)
  try:
    return 0 if number_str == '' else to_number(number_str)
  except ValueError:
    return 0

def price_to_float(field):
  match = PRICE_REGEX.match(field)
  return field if match is None else to_number(match.group(1))

def gram_amount(field):
  match = GRAM_REGEX.match(field)
  return to_number(field) if match is None else to_number(match.group(1))

def get_fact_table_rows(facts_table):
  rows = []
  maxc = 3
  for row in facts_table.findAll('tr'):
    rowdata = row.findAll('td')

    if len(rowdata) >= maxc and len(rowdata[0].text) > 1:
      row1, row2 = rowdata[0:2]
      if len(row1.contents) > 1:
        for idx, text in enumerate(row1.contents):
          if isinstance(text, NavigableString):
            rows.append([clean(text), '', 0])
      else:
        values = [clean(f.text) for f in rowdata[0:maxc]]
        values[2] = percent_to_num(values[2])
        rows.append(values)

  return rows

def fill_nutrients_profile(facts_table, profile):
  row_keys = ['actual_name', 'amount', 'percent_dv']

  rows = get_fact_table_rows(facts_table)
  if len(rows) < 3: return
  for row_values in rows:
    category, nutrient = match_product_nutrient(row_values[0])
    if nutrient is not None and \
       nutrient not in profile['nutrients']:
      profile['num_' + category] += 1
      profile['nutrients'][nutrient] = dict(zip(row_keys, row_values))
      profile['num_nutrients'] += 1

def has_overlapping_chars(text1, text2, min_overlap=3):
  text1 = text1.lower()
  text2 = text2.lower()
  if text1 == text2:
    return True

  count = index = 0
  for ch in text1:
    index = text2.find(ch, index)
    if index == -1:
      count = index = 0
    else:
      count += 1
    if count >= min_overlap:
      return True

  return False

def has_overlapping_words(text1, text2):
  for t1 in text1.split(' '):
    for t2 in text2.split(' '):
      if has_overlapping_chars(t1, t2):
        return True
  return False

def overlapping_sizes(containers, serves):
  for container_index, cont in enumerate(containers):
    for serve_index, serve in enumerate(serves):
      if has_overlapping_words(serve['unit'], cont['unit']):
        return (container_index, serve_index)

  return (0, -1)

def get_display_name(text):
  text = text.replace('/', '/ ')
  return ','.join(text.split(',')[:-1])

def unit_amount(fullsize, unit):
  for size in fullsize:
    if size['unit'] == unit or size['unit'].startswith(unit):
      return size['amount']
  return 1

def init_profile():
  profile = {'nutrients': {}, 'num_nutrients': 0}
  for category, nutrientlist in ALL_NUTRIENTS.iteritems():
    profile['num_' + category] = 0

  return profile

def price_per_g(price, sizes):
  unit_amount_func = functools.partial(unit_amount, sizes)
  price_per_g = price / unit_amount_func('g')

  if price_per_g == price:
    for converter in UNIT_CONVERSIONS:
      unit_price = price / unit_amount_func(converter['unit'])
      if unit_price != price:
        return unit_price * converter['multiplier']

  return price_per_g

def product_profile(html):
  soup = BeautifulSoup(html)
  main = soup.find('div', {'id': 'mainContent'})
  tables = soup.findAll('table')
  price = main.find('section', {
    'id': 'product-price'
  }).find('div', {'class': 'our-price'})
  if not price or len(tables) < 0:
    return None

  profile = init_profile()
  serving_text = ''
  for table in sorted(tables, key=len, reverse=True):
    fill_nutrients_profile(table, profile)
    text = get_serving_text(table)
    serving_text = text if serving_text == '' and text != '' else serving_text

  profile['name'] = main.find('h1').text
  profile['display_name'] = get_display_name(profile['name'])
  price = profile['price'] = price_to_float(price.text)

  # profile['serving_text'] = serving_text
  # serves = profile['serving_sizes'] = get_sizes(profile['serving_text'])
  profile['container_text'] = get_container_size_text(profile['name'])
  fullsizes = profile['container_sizes'] = get_sizes(profile['container_text'])
  profile['price_per_g'] = price_per_g(price, fullsizes)

  # protein_serve = unit_amount(serves, 'g')
  # protein_amount = gram_amount(profile['nutrients']['Protein']['amount'])
  # profile['protein_percent'] = (protein_amount / protein_serve) * 100

  # full_index, serve_index = overlapping_sizes(fullsizes, serves)
  # full_amt = fullsizes[full_index]['amount']
  # serve_amt = serves[serve_index]['amount'] if serve_index >= 0 else full_amt
  # profile['size_indexes'] = [full_index, serve_index]
  # profile['price_per_unit'] = profile['price'] / (full_amt*1.0)
  # profile['price_per_serve'] = profile['price_per_unit'] * serve_amt

  return profile

def passed_jobs(jobs):
  for job in jobs:
    if job.value.status_code == 200:
      yield job.value

def process(jobs, index):
  profiles = []
  for val in passed_jobs(jobs):
    index = index + 1
    print('{0}) Processing: {1}'.format(index, val.url))
    profile = product_profile(val.text)
    if profile is not None:
      profile.update({'url': val.url + '?rcode=KQM091'})
      profiles.append(profile)

  return profiles

def next_result_page(category):
  max_pages = 100
  for page_no in xrange(1, max_pages):
    url = DOMAIN + ('/{0}?p={1}').format(category, page_no)
    print url
    response = requests.get(url)
    soup = BeautifulSoup(response.text)
    results = soup.find(
      'div', {'id': 'display-results-content'}
    )
    if results:
      yield results
    else:
      break

def process_category(filename, category='whey-protein'):
  results = []

  for page in next_result_page(category):
    links = page.find_all('p', {'class': 'description'})
    prefix = DOMAIN if links[0].find('a')['href'][0] == '/' else ''
    jobs = [gevent.spawn(requests.get, prefix + link.find('a')['href'])
            for link in links]
    if len(jobs) > 0:
      gevent.wait(jobs)
      results += process(jobs, len(results))

  sorter = lambda x: x['price_per_g']
  results = sorted(results, key=sorter)

  print ('Saving {0} results'.format(len(results)))
  if filename is not None and len(results) > 0:
    with open(filename, 'w') as outfile:
      json.dump(results, outfile, indent=2)
  else:
    return results

def process_one():
  url = 'http://www.iherb.com/Nature-s-Alchemy-Tea-Tree-Essential-Oil-5-oz-15-ml/5752'
  r = requests.get(url)
  res = product_profile(r.text)

  print(res)

if __name__ == "__main__":
  category = 'tea-tree-oil'
  outfile = 'app/data/{0}.json'.format(category)
  if len(sys.argv) > 1:
    outfile = sys.argv[1]

  #process_category(outfile, category=category)
  process_one()
