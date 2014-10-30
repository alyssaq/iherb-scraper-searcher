'use strict';

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  var nutrients =  grunt.file.readJSON('nutrients.json');
  grunt.initConfig({
    nunjucks: {
      options: {
        paths: ['app/templates'],
        data: {
          data: grunt.file.readJSON('app/data/results.json'),
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
              dest: "dest/",
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
