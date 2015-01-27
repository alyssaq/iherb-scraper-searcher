function Table(model, options) {
  this.model = model;
  this.options = options || {};
  this.options.threshold = this.options.threshold || 100;
  this.store = window.localStorage;
}

Table.prototype.isBelowThreshold = function (nutrient) {
  return !nutrient || 
    (nutrient && nutrient.percent_dv < this.options.threshold);
}

Table.prototype.allAboveThreshold = function (nutrients) {
  var that = this;
  var checkedNutrients = Object.keys(that.model.checkedBox);
  return checkedNutrients.every(function (checked, idx) {
    var nutrient = nutrients[checked];
    return !!(nutrient && nutrient.percent_dv >= that.options.threshold);
  });
}

Table.prototype.render = function (reset) {
  if (reset) {
    concat(tableModel.pages, 
      tableModel.data.splice(tableModel.results_per_page)
    );
    tableModel.total_results = tableModel.data.length + tableModel.pages.length;
    tableModel.total_pages = Math.ceil(
      tableModel.total_results / tableModel.results_per_page);
    tableModel.page_no = 1;
  }
  var rendered = nunjucks.render('results.html', tableModel);
  document.getElementById('results').innerHTML = rendered;
}

Table.prototype.addEvents = function () {
  var that = this;

  document.addEventListener('click', function (e) {
    var DATA = that.model;
    var dataset = e.target.dataset;
    var key = dataset.key;
    var navigate = dataset.navigate;

    if (key) {
      var store = that.store;
      var sortMultiplier = store.getItem(key) || 1;
      that.model.sortBy(key, sortMultiplier);
      store.setItem(key, sortMultiplier * -1);
      that.render(true);
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
      that.render(false);
    }
  });

  document.addEventListener('change', function (e) {
    var DATA = that.model;
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

        if (that.isBelowThreshold(nutrient)) {
          removed.push(data.splice(i, 1)[0]);
          i = i - 1;
        }
      }
    } else if (removed.length > 0) {
      // Put a nutrient back if its <100 and the rest are all not >=100
      for (var i = 0; i < removed.length; i++) {
        var nutrients = removed[i].nutrients;
        var selected = nutrients[selectedText];
        if (that.isBelowThreshold(selected) && 
            that.allAboveThreshold(nutrients)) {
          DATA.data.push(removed.splice(i, 1)[0]);
          i = i - 1;
        }
      }
    }
    that.render(true);
  });
};
