# [iherb](http://iherb.com) product scraper and searcher
[![Build Status](https://img.shields.io/travis/alyssaq/iherb-scraper-searcher/master.svg)](https://travis-ci.org/alyssaq/iherb-scraper-searcher)

iherb has a great range of products and cheap worldwide shipping.
Unfortunately, beyond price and best selling, it has a limited search and filter.
My aim was to search based on [nutrients](https://raw.githubusercontent.com/alyssaq/iherb-scraper-searcher/master/nutrients.json)

This script does the following:

* Scraps all products given a category. E.g. `multivitamins`, `enzymes`. You can check if a category exists by typing in the URL `http://iherb.com/<catgory>`
* It scraps the product name, price, nutritional data, serving size, url.
* Matches any nutrient in its nutritional table to a nutrient in `nutrients.json`. In that json file, the keys are the nutrient names and the value array contains any alternative names.

Scrapping this data will help to:

* Find multi-vitamins that contains more than 10 nutrients.
* Sort the search by price, price per serving (some requires three-a-day, some one-a-day) or specific nutrient amount (e.g. highest calcium).
* Find a digestive enzyme pill that contains more than 6 enzymes.

## [Demo](http://alyssaq.github.io/iherb-scraper-searcher/)
Of the 769 in the multivitamins category, 738 were successfully scraped and 260 had >= 12 of the required vitamins.   
Demo displays those 260 multi-vitamins-minerals sorted by price per serve.

## Prerequisites
1. Python 2.7.x
1. Run `pip install -r requirements.txt` to install required packages

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

## Client-side app
Results are rendered client-side using [nunjunks](http://mozilla.github.io/nunjucks/)
To build and run:

1. Run `npm install`
2. Run `grunt`
3. Open the generated `index.html` in the `dest` folder