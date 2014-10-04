#!/usr/bin/python
# -*- coding: utf-8 -*-

import pprint
import sys
import requests
import re
import json
import gevent
from bs4 import BeautifulSoup

DOMAIN = 'http://www.iherb.com'
UNICODE_REGEX = r'[^\x00-\x7f]|\r'

def clean(unistr):
  decoded = re.sub(UNICODE_REGEX, '', unistr)
  return ' '.join(x.strip() for x in decoded.split('\n'))

def load_nutrients():
  nutrients = {}
  with open('nutrients.json') as data_file:
    data = json.load(data_file)
    [nutrients.update(d) for d in data.values()]
  return [[key] + val for key, val in nutrients.iteritems()]

ALL_NUTRIENTS = load_nutrients()

def get_serving_size(facts_table):
  rowIdx = 0
  endRow = 3
  theads = facts_table.findAll('td')[0:endRow]
  match = None
  while (match is None and rowIdx < endRow):
    row = theads[rowIdx]
    match = re.match(r'serving size:\s?(.*)', clean(row.text), re.I)
    rowIdx = rowIdx + 1

  serving_size = 0 if match is None else match.group(1)
  return serving_size

def multiV_profile(html):
  profile = {'nutrients': {}}
  soup = BeautifulSoup(html)
  main = soup.find('div', {'id': 'mainContent'})
  facts_table = soup.find('table')
  price = main.find('span', {'class': 'black20b'})
  if not price or not facts_table:
    return None

  profile['name'] = main.find('h1').text
  profile['price'] = price.text
  profile['serving_size'] = get_serving_size(facts_table)
  (profile['nutrients'][nutrient_names[0]] for nutrient_names in ALL_NUTRIENTS)

  for row in facts_table.findAll('tr'):
    fields = [clean(f.text) for f in row.findAll('td')]
    if (len(fields) == 3 and len(fields[0]) > 1):
      for main_nutrient_names in ALL_NUTRIENTS:
        for name in main_nutrient_names:
          if name.lower() in fields[0].lower():
            profile['nutrients'][main_nutrient_names[0]] = fields
            break
  profile['num_nutrients'] = len(profile['nutrients'])

  return profile

i = 1
def process(jobs):
  profiles = []
  jobs = [j.value for j in jobs if j.value.status_code == 200]
  global i

  for val in jobs:
    print('{0}) Processing: {1}'.format(i, val.url))
    i = i + 1
    profile = multiV_profile(val.text)
    if profile and profile['num_nutrients'] > 0:
      profile.update({'url': val.url})
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

def process_search_pages(filename, category='multivitamins', lastpage=32):
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

  sorted(res, key=lambda x: x['num_nutrients'])
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
  r = requests.get(url)
  p = multiV_profile(r.text)
  if p and p['num_nutrients'] > 0:
    print(p)

if __name__ == "__main__":
  outfile = 'results.json'
  if len(sys.argv) > 1:
    outfile = sys.argv[1]
  process_search_pages(outfile)
  #process_one_multiV()
