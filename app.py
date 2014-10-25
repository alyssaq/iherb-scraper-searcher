import iherb_scraper
import json
import itertools
import flask
import os

app = flask.Flask(__name__, static_folder='public', static_url_path='')
DATAFOLDER = os.path.dirname(os.path.abspath(__file__)) + '/public/data'

@app.route('/')
def index():
  allnutrients = {}
  flatten = itertools.chain.from_iterable
  with open(os.path.join(DATAFOLDER, 'results.json')) as data_file:
    data = json.load(data_file)

  with open('nutrients.json') as data_file:
    allnutrients = json.load(data_file)
    nutrients = list(flatten(allnutrients.values()))

  return flask.render_template(
    'index.html',
    data=data,
    allnutrients=allnutrients,
    categories=['Vitamins', 'Minerals', 'Macronutrients',
                'Trace Elements', 'Amino Acids', 'Enzymes']
  )

@app.route('/scrape')
def scrape():
  filename = os.path.join(DATAFOLDER, 'results.json')
  iherb_scraper.process_search_pages(filename)

if __name__ == '__main__':
  app.run(host='0.0.0.0', debug=True)
