(function () {
  $('input[type=checkbox]').change(
  function() {
    if (this.checked) {
      var startIdx = 2;
      var cells = $(this).closest('tr').find('td').slice(startIdx);
      var $rows = $('#nutrients tr');
      $.each(cells, function (idx, cell) {
        var val = parseInt(cell.innerText, 10);
        if (isNaN(val) || val < 100) {
          var colIdx = startIdx + 1 + idx;
          $rows.find('*:nth-child('+ colIdx +')').css('display','none');
        }
      })
    }
  });
})()