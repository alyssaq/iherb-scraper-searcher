(function () {
  var multivXhr = $.getJSON('data/results.json');
  var nutrientsXhr = $.getJSON('data/nutrients.json');
  var categories = ['Vitamins', 'Minerals', 'Macronutrients',
    'Trace Elements', 'Amino Acids', 'Enzymes'];
  var DATA = {removed: [], data: [], checkedBox: {}, categories: categories};

  FastClick.attach(document.body);
  function render() {
    nunjucks.configure({ watch: false });
    var rendered = nunjucks.render('results.html', DATA);
    document.getElementById('results').innerHTML = rendered;
    addEvents();
  }

  Promise.all([multivXhr, nutrientsXhr])
    .then(function (res) {
      DATA.data = res[0];
      DATA.allnutrients = res[1];

      render();
    });

  function addEvents() {
    $('input[type=checkbox]').change(function () {
      var data = DATA.data;
      var removed = DATA.removed;
      var selectedText = this.parentElement.textContent.trim();
      var category = this.dataset.category;

      if (this.checked) {        
        DATA.checkedBox[selectedText] = 'checked';
        for (var i = 0; i < data.length; i++) {
          var nutrient = data[i].nutrients[selectedText];

          if (!nutrient || (nutrient && nutrient.percent_dv < 100)) {
            removed.push(data.splice(i, 1)[0]);
            i = i - 1;
          }
        }
        render();
      } else if (removed.length > 0) {
        delete DATA.checkedBox[selectedText];
        for (var i = 0; i < removed.length; i++) {
          var nutrient = removed[i].nutrients;
          data.push(removed.splice(i, 1)[0]);
          i = i - 1;
        }
        render();
      }
    });

    $('.sorter').click(function () {
      var data = DATA.data;
      var removed = DATA.removed;
      var key = this.dataset.key;
      console.log(key);
      DATA.data = data.sort(function (rowA, rowB) {
        return rowA[key] - rowB[key];
      });
      render();
    });
  }
})()