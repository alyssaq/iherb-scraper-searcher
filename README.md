# iherb scraper

Find the best multi-vitamin on iherb.
Search by price, price per serving, nutrient amount, etc

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

process_search_pages (filename, category='multivitamins', lastpage=32)

  * `filename` - outfile to save results. If blank, nothing is saved.
  * `category` - iherb category to perform scraping.
  * `lastpage` - last available page of the category

## Results viewer
A simple table viewer to display `results.json`.
It must be placed in `public/data/results.json`.

1. `python app.py`
1. Open `0.0.0.0:5000`