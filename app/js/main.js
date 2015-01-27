(function () {
  var request = new App.Request();
  var DVTHRESHOLD = 100;
  var categories = ['Vitamins', 'Minerals', 'Trace Elements', 
    'Enzymes', 'Probiotics', 'Macronutrients',  'Amino Acids'];
  var DATA = {
    pages: [],
    page_no: 1,
    total_pages: 1,
    total_results: 1,
    results_per_page: 100,
    removed: [],
    data: [],
    checkedBox: {},
    categories: categories
  };

  function concat(a, b) {
    Array.prototype.push.apply(a, b);
  }

  function prepend(a, b) {
    Array.prototype.unshift.apply(a, b);
  }

  function render(reset) {
    if (reset) {
      concat(DATA.pages, DATA.data.splice(DATA.results_per_page));
      DATA.total_results = DATA.data.length + DATA.pages.length;
      DATA.total_pages = Math.ceil(DATA.total_results / DATA.results_per_page);
      DATA.page_no = 1;
    }
    var rendered = nunjucks.render('results.html', DATA);
    document.getElementById('results').innerHTML = rendered;
  }

  function main() {
    var multivXhr = request.getJSON('data/results.json');
    var nutrientsXhr = request.getJSON('data/nutrients.json');
    nunjucks.configure({watch: false});
    Promise.all([multivXhr, nutrientsXhr]).then(function (res) {
      DATA.data = res[0];
      DATA.allnutrients = res[1];
      render(true);
    });
  }

  document.addEventListener('click', function (e) {
    var dataset = e.target.dataset;
    var key = dataset.key;
    var navigate = dataset.navigate;

    if (key) {
      var store = window.localStorage;
      var sortMultiplier = store.getItem(key) || 1;
      DATA.data = DATA.data.sort(function (rowA, rowB) {
        return (rowA[key] - rowB[key]) * sortMultiplier;
      });
      store.setItem(key, sortMultiplier * -1);
      render(true);
    } else if (navigate) {
      if (navigate === 'next') {
        var start = DATA.results_per_page;
        concat(DATA.pages, DATA.data.splice(0));
        concat(DATA.data, DATA.pages.splice(0, start));
        DATA.page_no += 1; 
      } else {
        prepend(DATA.pages, DATA.data.splice(0));
        var start = DATA.pages.length - DATA.results_per_page;
        var sli = DATA.pages.splice(start, DATA.results_per_page);
        concat(DATA.data, sli);
        DATA.page_no -= 1;
      }
      render(false);
    }
  });

  function isBelowThreshold(nutrient) {
    return !nutrient || (nutrient && nutrient.percent_dv < DVTHRESHOLD);
  }

  function allAboveThreshold(nutrients) {
    var checkedNutrients = Object.keys(DATA.checkedBox);
    return checkedNutrients.every(function (checked, idx) {
      var nutrient = nutrients[checked];
      return !!(nutrient && nutrient.percent_dv >= DVTHRESHOLD);
    });
  }

  document.addEventListener('change', function (e) {
    var target = e.target;
    concat(DATA.data, DATA.pages.splice(0));
    var data = DATA.data;
    var removed = DATA.removed;
    var selectedText = target.parentElement.textContent.trim();
    var category = target.dataset.category;
    delete DATA.checkedBox[selectedText];

    if (target.checked) {
      DATA.checkedBox[selectedText] = 'checked';
      for (var i = 0; i < data.length; i++) {
        var nutrient = data[i].nutrients[selectedText];

        if (isBelowThreshold(nutrient)) {
          removed.push(data.splice(i, 1)[0]);
          i = i - 1;
        }
      }
      return render(true);
    } else if (removed.length > 0) {
      // Put a nutrient back if its <100 and the rest are all not >=100
      for (var i = 0; i < removed.length; i++) {
        var nutrients = removed[i].nutrients;
        var selected = nutrients[selectedText];
        if (isBelowThreshold(selected) && allAboveThreshold(nutrients)) {
          DATA.data.push(removed.splice(i, 1)[0]);
          i = i - 1;
        }
      }

      return render(true);
    }
  });
  main();

  WebFontConfig = {
    google: { families: [ 'Titillium+Web:400,700:latin' ] }
  };
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})()