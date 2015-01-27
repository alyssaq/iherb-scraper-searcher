function TableModel(options) {
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

TableModel.prototype.setData = function (data) {
  this.data = data;
}

TableModel.prototype.setNutrientsInfo = function (data) {
  this.allnutrients = data;
}

TableModel.prototype.sortBy = function (key, multiplier) {
  this.data = this.data.sort(function (rowA, rowB) {
    return (rowA[key] - rowB[key]) * multiplier;
  });
}

TableModel.prototype.reset = function () {
  this.total_results = this.data.length;    
  this.total_pages = Math.ceil(this.total_results / this.results_per_page);
  this.page_no = 1;
}