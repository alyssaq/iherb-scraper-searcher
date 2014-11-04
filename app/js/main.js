(function () {
  var multivXhr = $.getJSON('data/results.json');
  var nutrientsXhr = $.getJSON('data/nutrients.json');
  var categories = ['Vitamins', 'Minerals', 'Macronutrients',
    'Trace Elements', 'Amino Acids', 'Enzymes'];
  var DATA = {removed: [], data: [], checkedBox: {}, categories: categories};

  FastClick.attach(document.body);
  function reloadResults() {
    nunjucks.configure({ watch: false });
    var rendered = nunjucks.render('results.html', DATA);
    document.getElementById('results').innerHTML = rendered;
    addEvents();
  }

  Promise.all([multivXhr, nutrientsXhr])
    .then(function (res) {
      DATA.data = res[0];
      DATA.allnutrients = res[1];

      reloadResults();
    });

  function min(arr, startIdx) {
    startIdx = startIdx || 0;
    var minIndex = startIdx;
    var minVal = arr[startIdx - 1];

    arr = arr.slice(startIdx);
    arr.forEach(function (elem, i) {
      if (elem < minVal) {
        minVal = elem;
        minIndex = (i + startIdx);
      }
    });

    return [minIndex, minVal];
  }

  function swap(data, a, b) {
    var temp = data[a];
    data[a] = data[b];
    data[b] = temp;
  }

  function addEvents() {
    $('input[type=checkbox]').change(function () {
      var data = DATA.data;
      var removed = DATA.removed;
      var selectedText = this.parentElement.textContent.trim();
      var category = this.dataset.category;

      if (this.checked) {        
        DATA.checkedBox[selectedText] = 'checked';
        for (var i = 0; i < data.length; i++) {
          var nutrient = data[i].nutrients[category];

          if (!nutrient[selectedText] || 
            (nutrient[selectedText] && nutrient[selectedText][2] < 100)) {
            removed.push(data.splice(i, 1)[0]);
            i = i - 1;
          }
        }
      } else {
        delete DATA.checkedBox[selectedText];
        for (var i = 0; i < removed.length; i++) {
          var nutrient = removed[i].nutrients;
          data.push(removed.splice(i, 1)[0]);
          i = i - 1;
        }
      }
      reloadResults();
    });

    $('.dsorter').click(function () {
      var startIdx = 2;
      var clickedRow = $(this).closest('tr').find('td').slice(startIdx);
      var $rows = $('#nutrients tr');

      var data = [];
      $.each(clickedRow, function (i, cell) {
        data.push(parseFloat(cell.textContent, 10));
      });
      
      for (var i = 1; i < clickedRow.length; i++) {
        var minData = min(data, i);
        var minIndex = minData[0];

        if (minIndex !== i) {
          var col1 = $rows.find('*:nth-child('+ (startIdx + i) +')');
          var col2 = $rows.find('*:nth-child('+ (startIdx + 1 + minIndex) +')');
          swap(data, i-1, minIndex);

          for (var j = 0; j < col1.length; j++) {
            var temp = col1[i].textContent;
            col1[j].textContent = col2[j].textContent;
            col2[j].textContent = temp;  
          }
        }
      }
    });
  }
})()