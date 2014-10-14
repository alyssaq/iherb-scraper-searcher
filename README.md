# [iherb](http://iherb.com) product scraper and searcher

iherb has a great range of products and cheap worldwide shipping.
Unfortunately, beyond price and best selling, it has a limited search and filter.

This script does the following:

* Scraps all products given a category. E.g. `multivitamins`, `digestive-enzymes`.
* It scraps the product name, price, nutritional data, serving size, url.
* Matches any nutrient in its nutritional table to a nutrient in `nutrients.json`. In that json file, the keys are the nutrient names and the value array contains any alternative names.

Scrapping this data will help to:

* Find multi-vitamins that contains more than 10 nutrients.
* Sort the search by price, price per serving (some requires three-a-day, some one-a-day) or specific nutrient amount (e.g. highest calcium).
* Find a digestive enzyme pill that contains more than 6 enzymes.

## Prerequisites
1. Python 2.7.x
1. `pip install -r requirements.txt`

## Search results
Generate search results with `iherb_scraper.py`
```
$ python iherb_scraper <outfile>
```
If no `<outfile>` is specified, output is saved to `results.json` in root folder.

Alternatively, you may edit `iherb_scraper.py` and call `process_search_pages`:
```
process_search_pages (filename, category='multivitamins', min_nutrients=1)
```
  * `filename` - outfile to save results. If blank, nothing is saved.
  * `category` - iherb category to perform scraping.
  * `min_nutrients` - minimum number of nutrients to match in `nutrients.json`

## Results viewer
A simple table viewer to display `results.json`.
It must be placed in `public/data/results.json`.

1. `python app.py`
1. Open `0.0.0.0:5000`