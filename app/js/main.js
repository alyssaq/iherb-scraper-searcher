var DVTHRESHOLD = 100;
var categories = ['Vitamins', 'Minerals', 'Trace Elements', 
  'Enzymes', 'Probiotics', 'Macronutrients',  'Amino Acids'];

var request = new Request();
var tableModel = new TableModel({categories: categories});
var table = new Table(tableModel, {threshold: DVTHRESHOLD});
table.addEvents();

function concat(a, b) {
  Array.prototype.push.apply(a, b);
}

function prepend(a, b) {
  Array.prototype.unshift.apply(a, b);
}

function render(reset) {
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

function main() {
  var multivXhr = request.getJSON('data/results.json');
  var nutrientsXhr = request.getJSON('data/nutrients.json');
  nunjucks.configure({watch: false});
  Promise.all([multivXhr, nutrientsXhr]).then(function (results) {
    tableModel.addData(results[0]);
    tableModel.addNutrientsInfo(results[1]);
    render(true);
  });
}

main();