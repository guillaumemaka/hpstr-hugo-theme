'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '!static/js/*.js',
        '!static/js/plugins/*.js',
        '!static/js/scripts.min.js'
      ]
    },
    uglify: {
      dist: {
        files: {
          'static/js/scripts.min.js': [
            'static/js/plugins/*.js',
            'static/js/_*.js'
          ]
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'static/images/',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'static/images/'
        }]
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'auto'
        },
        files: {
          'static/css/main.css': 'static/css/main.scss'
        }
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'static/images/',
          src: '{,*/}*.svg',
          dest: 'static/images/'
        }]
      }
    },
    watch: {
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint','uglify']
      }
    },
    clean: {
      dist:  [
        'static/js/scripts.min.js',
        'static/css/main.css',
        'static/css/main.css.map',
        '**/.DS_Store'
      ]
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-svgmin');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'uglify',
    'sass',
    // 'imagemin',
    // 'svgmin'
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);

};
