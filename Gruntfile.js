'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

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
        dest: '<%= config.dest %>/js/templates.js'
      }
    },

    cssmin: {
      dest: {
        files: {
          '<%= config.dest %>/css/site.css': [
            '.tmp/css/*.css',
            '<%= config.app %>/css/*.css'
          ]
        }
      }
    },

    copy: {
      dest: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dest %>',
          src: [
            'index.html',
            '*.{ico,txt}',
            'data/*.json',
            'js/{,*/}*.js',
          ]
        }]
      }
    },

    watch: {
      options: {
        nospawn: true,
        livereload: true
      },
      nunjucks: {
        files: ['<%= config.app %>/templates/*.html'],
        tasks: ['nunjucks']
      },
      css: {
        files: ['<%= config.app %>/css/*.css'],
        tasks: ['cssmin']
      },
      copy: {
        files: ['index.html', '<%= config.app %>/js/{,*/}*.js', '<%= config.app %>/data/*.json'],
        tasks: ['copy']
      },
      livereload: {
        options: {
          livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
        },
        files: [
          '<%= config.app %>/*.html',
          '{.tmp,<%= config.app %>}/css/{,*/}*.css',
          '{.tmp,<%= config.app %>}/js/{,*/}*.js',
          '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
          '<%= config.app %>/templates/*.{html,ejs,mustache,hbs}'
        ]
      }
    },

    connect: {
      options: {
        port: grunt.option('port') || SERVER_PORT,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, config.dest)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test'),
              mountFolder(connect, config.app)
            ];
          }
        }
      },
      dest: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, config.dest)
            ];
          }
        }
      }
    },

    open: {
      server: {
        path: 'http://0.0.0.0:<%= connect.options.port %>'
      },
      test: {
        path: 'http://0.0.0.0:<%= connect.test.options.port %>'
      }
    },

    clean: {
      dest: ['.tmp', '<%= config.dest %>/*']
    }
  });

  grunt.registerTask('dev', [
    'build',
    'connect:livereload',
    'open:server',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'nunjucks',

    // 'useminPrepare',
    // 'imagemin',
    // 'htmlmin',
    // 'concat',
    'cssmin',
    'copy'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
