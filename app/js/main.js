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

function main() {
  var multivXhr = request.getJSON('data/results.json');
  var nutrientsXhr = request.getJSON('data/nutrients.json');
  nunjucks.configure({watch: false});
  Promise.all([multivXhr, nutrientsXhr]).then(function (results) {
    tableModel.addData(results[0]);
    tableModel.addNutrientsInfo(results[1]);
    table.render(true);
  });
}

main();