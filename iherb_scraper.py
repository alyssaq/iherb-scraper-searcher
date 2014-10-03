import pprint
import sys
import requests
import re
import json
import gevent
from bs4 import BeautifulSoup

DOMAIN = 'http://www.iherb.com'

def load_nutrients():
  nutrients = {}
  with open('nutrients.json') as data_file:
    data = json.load(data_file)
    [nutrients.update(d) for d in data.values()]
  return [[key] + val for key, val in nutrients.iteritems()]

ALL_NUTRIENTS = load_nutrients()

def get_serving_size(facts_table):
  theads = facts_table.findAll('td')[0:3]
  serving_size = 0
  for row in theads:
    match = re.match(
      r'serving size:\s?(.*)',
      row.text.encode('ascii', 'ignore'),
      re.I)
    if (match):
      serving_size = match.group(1)

  return serving_size

def multiV_profile(html):
  profile = {'nutrients': {}}
  soup = BeautifulSoup(html)
  main = soup.find('div', {'id': 'mainContent'})
  facts_table = soup.find('table')
  profile['name'] = main.find('h1').text
  price = main.find('span', {'class': 'black20b'})
  if not price:
    return None

  profile['price'] = price.text
  profile['serving_size'] = get_serving_size(facts_table)

  rows = facts_table.findAll('tr')
  for row in rows:
    fields = row.findAll('td')
    if (len(fields) == 3 and len(fields[0].text) > 1):
      for nutrient_names in ALL_NUTRIENTS:
        for name in nutrient_names:
          if name.lower() in fields[0].text.lower():
            profile['nutrients'][nutrient_names[0]] = [f.text for f in fields]
            break
  profile['num_nutrients'] = len(profile['nutrients'])

  return profile

def get_html(url):
  res = requests.get(url)
  return (res.url, res.text) if res.status_code == 200 else ''

i = 1
def process(jobs):
  profiles = []
  for j in jobs:
    val = j.value
    global i
    print('{0}) Processing: {1}'.format(i, val[0]))
    i = i + 1
    profile = multiV_profile(val[1])
    if profile and profile['num_nutrients'] > 0:
      profile.update({'url': val[0]})
      profiles.append(profile)
  return profiles

def process_page_links(url):
  links = []
  response = requests.get(url)
  soup = BeautifulSoup(response.text)
  results = soup.find(
    'div',
    {'id': 'display-results-content'}
  ).findAll(
    'p',
    {'class': 'description'}
  )
  prefix = DOMAIN if results[0].find('a')['href'][0] == '/' else ''
  links = [prefix + res.find('a')['href'] for res in results]
  jobs = [gevent.spawn(get_html, link) for link in links]
  gevent.wait(jobs)

  return [] if len(jobs) == 0 else process(jobs)

def process_search_pages(filename, category='multivitamins', lastpage=32):
  res = []
  for page_no in range(1, lastpage + 1):
    url = DOMAIN + ('/{0}?p={1}').format(category, page_no)
    print(url)
    res += process_page_links(url)

  sorted(res, key=lambda x: x['num_nutrients'])

  if filename:
    with open(filename, 'w') as outfile:
      json.dump(res, outfile, indent=2)
  else:
    return res

def process_one_multiV():
  url = 'http://www.iherb.com/Deva-Multivitamin-Mineral-Supplement-Vegan-90-Coated-Tablets/12664'
  url = 'http://www.iherb.com/21st-Century-Health-Care-Sentry-Multivitamin-Multimineral-Supplement-300-Tablets/10525'
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
