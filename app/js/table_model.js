function TableModel(options) {
  this.pages = [],
  this.page_no = 1,
  this.total_pages = 1,
  this.total_results = 1,
  this.results_per_page = options.results_per_page || 100,
  this.removed = [],
  this.data = [],
  this.checkedBox = {},
  this.allnutrients = {},
  this.categories = options.categories
}

TableModel.prototype.addData = function (data) {
  this.data = data;
}

TableModel.prototype.addNutrientsInfo = function (data) {
  this.allnutrients = data;
}

TableModel.prototype.sortBy = function (key, multiplier) {
  this.data = this.data.sort(function (rowA, rowB) {
    return (rowA[key] - rowB[key]) * multiplier;
  });
}