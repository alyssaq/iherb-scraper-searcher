'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  var config = {
    app: 'app',
    dest: 'dest'
  };

  grunt.initConfig({
    config: config,

    nunjucks: {
      precompile: {
        baseDir: '<%= config.app %>/templates/',
        src: '<%= config.app %>/templates/results.html',
        dest: '<%= config.dest %>/js/templates.js',
        options: {
          //env: require('./nunjucks-environment')
        }
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dest %>',
          src: [
            'index.html',
            '*.{ico,txt}',
            'data/*.json',
            'css/{,*/}*.css',
            'js/{,*/}*.js'
          ]
        }]
      }
    }

  });

  grunt.registerTask('default', [
    'nunjucks', 'copy'
  ]);
};
