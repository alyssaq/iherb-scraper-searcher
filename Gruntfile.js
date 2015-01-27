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

    jshint: {
      all: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: [
          'Gruntfile.js',
          'js/*.js'
        ]
      }
    },
    jscs: {
      src: [
        'Gruntfile.js',
        'app/js/*.js'
      ],
      options: {
        config: '.jscsrc'
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
            '*.{ico,txt}',
            'data/*.json',
            'css/icons.woff',
            'index.html'
          ]
        }]
      }
    },

    concat: {
      options: {
        stripBanners: true,
        banner: '(function () {',
        footer: '})();'
      },
      dest: {
        src: [
          '<%= config.app %>/js/request.js',
          '<%= config.app %>/js/table.js',
          '<%= config.app %>/js/table_model.js',
          '<%= config.app %>/js/main.js',
          '<%= config.app %>/js/webfonts.js',
        ],
        dest: '<%= config.dest %>/js/app.js',
      },
    },

    watch: {
      options: {
        nospawn: true,
        livereload: true
      },
      copy: {
        files: [
          '<%= config.app =>/index.html',
          '<%= config.app %>/data/*.json'
        ],
        tasks: ['copy']
      },
      nunjucks: {
        files: ['<%= config.app %>/templates/*.html'],
        tasks: ['nunjucks']
      },
      css: {
        files: ['<%= config.app %>/css/*.css'],
        tasks: ['cssmin']
      },
      js: {
        files: ['<%= config.app %>/js/{,*/}*.js'],
        tasks: ['concat', 'jscs', 'jshint']
      },
      livereload: {
        options: {
          livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
        },
        files: [
          '<%= config.app %>/index.html',
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
    },

    // Minify js files inplace. Does not concat
    uglify: {
      jsmin: {
        files: {
          '<%= config.dest %>/js/app.js': ['<%= config.dest %>/js/app.js']
        }
      }
    },

    // inline critical css
    critical: {
      test: {
        options: {
          base: '<%= config.dest %>/',
          minify: true,
          extract: true
        },
        src: '<%= config.dest %>/index.html',
        dest: '<%= config.dest %>/index.html'
      }
    }
  });

  // Dev build - js not minified
  grunt.registerTask('devbuild', [
    'clean',
    'jscs',
    'jshint',
    'nunjucks',
    'cssmin',
    'copy',
    'concat'
  ]);

  // Development mode with livereload
  grunt.registerTask('dev', [
    'devbuild',
    'connect:livereload',
    'open:server',
    'watch'
  ]);

  // Prod build - js minified, critical css inlined
  grunt.registerTask('prodbuild', [
    'devbuild',
    'uglify',
    'critical'
  ]);

  // Production mode with prod files
  grunt.registerTask('prod', [
    'prodbuild',
    'open:server',
    'connect:dest:keepalive'
  ]);

  grunt.registerTask('default', [
    'prodbuild'
  ]);
};
