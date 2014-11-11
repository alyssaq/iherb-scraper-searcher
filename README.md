# [iherb](http://iherb.com) product scraper and searcher
[![Build Status](https://img.shields.io/travis/alyssaq/iherb-scraper-searcher/master.svg)](https://travis-ci.org/alyssaq/iherb-scraper-searcher)

iherb scraper to filter and find a product based on [nutrients](https://raw.githubusercontent.com/alyssaq/iherb-scraper-searcher/master/nutrients.json)

## [Demo](http://alyssaq.github.io/iherb-scraper-searcher/)
Multi-vitamins comparison.   
Cells display the daily value % (DV) if it exists, otherwise the amount.     
If a cell shows ***, no value was found.   
Checkbox filters a nutrient to contain >=100 DV.
Sort by price per serve, price, number of vitamins, minerals.

## iherb scraper
### Prerequisites
1. Python 2.7.x
1. Run `pip install -r requirements.txt` to install required packages

### Results
Generate results with `iherb_scraper.py`
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

### Functionality
* Scraps all products given a category. E.g. `multivitamins`, `enzymes`. You can check if a category exists by typing in the URL `http://iherb.com/<catgory>`
* Scraps the product name, price, nutritional data, serving size, url.
* Matches any nutrient in its nutritional table to a nutrient in `nutrients.json`. In that json file, the keys are the nutrient names and the value array contains any alternative names.

## Client-side app
Results are rendered client-side using [nunjunks](http://mozilla.github.io/nunjucks/)

### Build
1. Run `npm install`
2. Run `grunt`
3. Open the generated `index.html` in the `dest` folder

### Development
1. Run `grunt dev` (livereloads)
## Future work
* More filters - range filter to find a nutrient that is between 10-90 DV.
* Parse the title for more meta-data (e.g. brand) and shorten product name.
* Expose API to display dynamic category results (e.g. compare products under enzymes, superfoods, etc).
* Match product name with amazon and other international sites.

## Disclaimer
Links contain my referral code. Feel free to remove.
Otherwise, I am not affliated with the company.

## Contributions
Greatly welcomed! :)

### [MIT License](http://alyssaq.github.io/mit-license/)
