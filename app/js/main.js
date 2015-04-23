var DVTHRESHOLD = 100;
var categories = ['Vitamins', 'Minerals', 'Trace Elements',
  'Enzymes', 'Probiotics', 'Macronutrients',  'Amino Acids'];

var request = new Request();
var tableModel = new TableModel({categories: categories});
var table = new Table(tableModel, {threshold: DVTHRESHOLD});
table.addEvents();

function main() {
  var multivXhr = request.getJSON('data/results.json');
  var nutrientsXhr = request.getJSON('data/nutrients.json');
  nunjucks.configure({watch: false});

  Promise.all([multivXhr, nutrientsXhr]).then(function (results) {
    tableModel.setData(results[0]);
    tableModel.setNutrientsInfo(results[1]);
    table.render(true);
  });
}

main();