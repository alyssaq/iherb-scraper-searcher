import iherb_scraper
import json
import flask
import os

app = flask.Flask(__name__, static_folder='public', static_url_path='')
DATAFOLDER = os.path.dirname(os.path.abspath(__file__)) + '/public/data'

@app.route('/')
def index():
  allnutrients = {}
  with open(os.path.join(DATAFOLDER, 'results.json')) as data_file:
    data = json.load(data_file)

  with open('nutrients.json') as data_file:
    allnutrients = json.load(data_file)

  def value_range(row):
    if 'Vitamins' in row['nutrients']:
      for fields in row['nutrients']['Vitamins'].values():
        if fields[2] < 80 or fields[2] > 3000:
          return False
      return True
    else:
      return False

  #data = filter(value_range, data)
  sorter = lambda x: (-x['num_Vitamins'], -x['num_Minerals'], x['price'])
  data = sorted(data, key=sorter)

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
