(function () {
  var multivXhr = $.getJSON('data/results.json');
  var nutrientsXhr = $.getJSON('data/nutrients.json');
  var categories = ['Vitamins', 'Minerals', 'Macronutrients',
    'Trace Elements', 'Amino Acids', 'Enzymes'];

  Promise.all([multivXhr, nutrientsXhr])
    .then(function (res) {
      var data = {
        data: res[0],
        allnutrients: res[1],
        categories: categories
      };
      var rendered = nunjucks.render('results.html', data, function (err, res) {
        document.getElementById('results').innerHTML = res;
        addEvents();
      });
    })

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
    $('input[type=checkbox]').change(
    function() {
      if (this.checked) {
        var startIdx = 2;
        var clickedRow = $(this).closest('tr').find('td').slice(startIdx);
        var $rows = $('#nutrients tr');
        $.each(clickedRow, function (idx, cell) {
          var val = parseInt(cell.textContent, 10);
          if (isNaN(val) || val < 100) {
            var colIdx = startIdx + 1 + idx;
            $rows.find('*:nth-child('+ colIdx +')').css('display','none');
            setTimeout(function(){return}, 10);
          }
        });
      }
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