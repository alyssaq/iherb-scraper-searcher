(function () {
  var multivXhr = $.getJSON('data/results.json');
  var nutrientsXhr = $.getJSON('data/nutrients.json');
  var categories = ['Vitamins', 'Minerals', 'Trace Elements', 'Enzymes',
    'Probiotics', 'Macronutrients',  'Amino Acids'];
  var DATA = {
    pages: [],
    page_no: 1,
    total_pages: 1,
    total_results: 1,
    removed: [],
    data: [],
    checkedBox: {},
    categories: categories,
    results_per_page: 100
  };
  var store = window.localStorage;

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
    addEvents();
  }

  Promise.all([multivXhr, nutrientsXhr]).then(function (res) {
    DATA.data = res[0];
    DATA.allnutrients = res[1];
    render(true);
  });

  $(document).on('click', function (e) {
    var dataset = e.target.dataset;
    var key = dataset.key;
    var navigate = dataset.navigate;

    if (key) {
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
  FastClick.attach(document.body);

  function addEvents() {
    $('input[type=checkbox]').change(function () {
      concat(DATA.data, DATA.pages.splice(0));
      var data = DATA.data;
      var removed = DATA.removed;
      var selectedText = this.parentElement.textContent.trim();
      var category = this.dataset.category;
      DATA.checkedBox[selectedText] = this.checked ? 'checked' : '';

      if (this.checked) {
        for (var i = 0; i < data.length; i++) {
          var nutrient = data[i].nutrients[selectedText];

          if (!nutrient || (nutrient && nutrient.percent_dv < 100)) {
            removed.push(data.splice(i, 1)[0]);
            i = i - 1;
          }
        }
        return render(true);
      } else if (removed.length > 0) {
        concat(DATA.data, removed.splice(0));
        return render(true);
      }
    });
  }

  nunjucks.configure({ watch: false });
  WebFontConfig = {
    google: { families: [ 'Titillium+Web:400,700:latin' ] }
  };
  (function () {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
})()