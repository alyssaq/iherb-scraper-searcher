'use strict';

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  var nutrients =  grunt.file.readJSON('app/data/nutrients.json');
  var data = grunt.file.readJSON('app/data/results.json');
  var filtered = [];
  data.reduce(function (arr, row) {
    if (row.nutrients.Vitamins["Vitamin K"] && row.nutrients.Vitamins["Vitamin K"][2] >= 100
      && row.num_Vitamins >= 12) {
      arr.push(row);
    }
    return arr;
  }, filtered);

  filtered.sort(function (rowa, rowb) {
    return rowa.price_per_serve - rowb.price_per_serve;
  });

  grunt.initConfig({
    nunjucks: {
      options: {
        paths: ['app/templates'],
        data: {
          data: filtered,
          categories: ['Vitamins', 'Minerals', 'Macronutrients',
            'Trace Elements', 'Amino Acids', 'Enzymes'],
          allnutrients: nutrients
        }
      },
      render: {
        files: [
           {
              expand: true,
              cwd: "app/templates/",
              src: "index.html",
              dest: "app/",
              ext: ".html"
           }
        ]
      }
    }
  });

  grunt.registerTask('default', [
    'nunjucks'
  ]);
};
