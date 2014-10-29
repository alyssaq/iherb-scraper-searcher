#!/usr/bin/python
# -*- coding: utf-8 -*-

import sys
import requests
import re
import json
import gevent
from bs4 import BeautifulSoup
import itertools
flatten = itertools.chain.from_iterable

DOMAIN = 'http://www.iherb.com'
UNICODE_REGEX = re.compile(r'[^\x00-\x7f]|\r')
SERVING_SIZE_REGEX = re.compile(
  r'serving size:?\s?(?P<serve>.*)|(?P<pserve>each packet)',
  re.IGNORECASE)
PRICE_REGEX = re.compile(r'\$(\d{1,2}\.?\d{0,2})')
NON_DIGITS_REGEX = re.compile(r'<|,|\*|%')
CONTAINER_SIZE_REGEX = re.compile(r'\s?(\d{1,4}\.?\d{0,3})\s?([a-zA-Z ]+)')

def clean(unistr):
  decoded = re.sub(UNICODE_REGEX, '', unistr)
  return ' '.join(x.strip() for x in decoded.split('\n'))

def load_nutrients():
  nutrients = {}
  with open('nutrients.json') as data_file:
    nutrients = json.load(data_file)

  return nutrients

ALL_NUTRIENTS = load_nutrients()

def get_serving_text(facts_table):
  rowIdx = 0
  endRow = 3
  theads = facts_table.findAll('td')[0:endRow]
  match = None
  while (match is None and rowIdx < endRow):
    row = theads[rowIdx]
    match = SERVING_SIZE_REGEX.match(clean(row.text))
    rowIdx = rowIdx + 1

  if match is not None:
    return match.group('serve') or match.group('pserve')

  return 0

def get_container_size(name):
  partitions = re.split(',|\(|\)', name)
  for text in reversed(partitions):
    match = CONTAINER_SIZE_REGEX.match(text)
    if match:
      amount, unit = match.groups()
      return (float(amount), unit.strip())

  return (0, 'g')

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
    return 0 if number_str == '' else int(float(number_str))
  except ValueError:
    return 0

def price_to_float(field):
  match = PRICE_REGEX.match(field)
  return field if match is None else float(match.group(1))

def fill_nutrients_profile(facts_table, profile):
  for category, nutrientlist in ALL_NUTRIENTS.iteritems():
    profile['nutrients'][category] = {}
    profile['num_' + category] = 0

  for row in facts_table.findAll('tr'):
    rowdata = row.findAll('td')
    if (len(rowdata) == 3 and len(rowdata[0].text) > 1):
      fields = [clean(f.text) for f in rowdata]
      fields[2] = percent_to_num(fields[2])
      category, nutrient = match_product_nutrient(fields[0])
      if nutrient is not None and \
         nutrient not in profile['nutrients'][category]:
        profile['num_' + category] += 1
        profile['nutrients'][category][nutrient] = fields
        profile['num_nutrients'] += 1

def product_profile(html):
  profile = {'nutrients': {}, 'num_nutrients': 0}
  soup = BeautifulSoup(html)
  main = soup.find('div', {'id': 'mainContent'})
  facts_table = soup.find('table')
  price = main.find('span', class_='black20b')
  if not price or not facts_table:
    return None

  profile['name'] = main.find('h1').text
  profile['price'] = price_to_float(price.text)
  profile['serving_text'] = get_serving_text(facts_table)
  amount, unit = get_container_size(profile['name'])
  profile['container_amount'] = amount
  profile['container_unit'] = unit
  fill_nutrients_profile(facts_table, profile)

  return profile

i = 1
def process(jobs):
  profiles = []
  jobs = [j.value for j in jobs if j.value.status_code == 200]
  global i

  for val in jobs:
    print('{0}) Processing: {1}'.format(i, val.url))
    i = i + 1
    profile = product_profile(val.text)
    if profile:
      profile.update({'url': val.url + '?rcode=KQM091'})
      profiles.append(profile)

  return profiles

def process_page_links(url):
  response = requests.get(url)
  soup = BeautifulSoup(response.text)
  results = soup.find(
    'div', {'id': re.compile('display-res(.*)')}
  )
  if not results:
    return []
  results = results.findAll('p', {'class': 'description'})
  prefix = DOMAIN if results[0].find('a')['href'][0] == '/' else ''
  links = (prefix + res.find('a')['href'] for res in results)
  jobs = [gevent.spawn(requests.get, link) for link in links]
  gevent.wait(jobs)

  return [] if len(jobs) == 0 else process(jobs)

def process_search_pages(filename, category='multivitamins', min_nutrients=1):
  res = []
  page_no = 1
  hasLinks = True
  while hasLinks:
    url = DOMAIN + ('/{0}?p={1}').format(category, page_no)
    print(url)
    page_results = process_page_links(url)
    hasLinks = False if len(page_results) == 0 else True
    res += page_results
    page_no = page_no + 1

  res = filter(lambda x: x['num_Vitamins'] >= min_nutrients, res)
  sorter = lambda x: (-(x['num_Minerals'] + x['num_Vitamins']), x['price'])
  res = sorted(res, key=sorter)

  print ('Saving {0} results'.format(len(res)))
  if filename:
    with open(filename, 'w') as outfile:
      json.dump(res, outfile, indent=2)
  else:
    return res

def process_one_multiV():
  url = 'http://www.iherb.com/Deva-Multivitamin-Mineral-Supplement-Vegan-90-Coated-Tablets/12664'
  url = 'http://www.iherb.com/21st-Century-Health-Care-Sentry-Multivitamin-Multimineral-Supplement-300-Tablets/10525'
  url = 'http://www.iherb.com/Deva-Prenatal-Multivitamin-Mineral-One-Daily-90-Coated-Tablets/55144'
  url = 'http://www.iherb.com/Paradise-Herbs-ORAC-Energy-Earth-s-Blend-One-Daily-Superfood-Multivitamin-With-Iron-30-Veggie-Caps/47499'
  r = requests.get(url)
  res = product_profile(r.text)
  print(res)

if __name__ == "__main__":
  outfile = 'results.json'
  if len(sys.argv) > 1:
    outfile = sys.argv[1]
  #process_search_pages('digestives.json', 'enzymes', 7)
  process_search_pages(outfile, min_nutrients=1)
  #process_one_multiV()
