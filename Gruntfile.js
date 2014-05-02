/*
 * Generated on 2014-03-26
 * generator-assemble v0.4.11
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      content: 'website',
      guts: 'website-guts',
      dist: 'dist',
      bowerDir: 'bower_components'
    },
    aws: grunt.file.readJSON('configs/s3Config.json'),
    watch: {
      assemble: {
        files: [
        '<%= config.content %>/{,*/}*.{md,hbs,yml}',
        '<%= config.guts %>/templates/**/*.hbs'
        ],
        tasks: ['assemble']
      },
      sass: {
        files: ['<%= config.guts %>/assets/css/*.scss'],
        tasks: ['sass']
      },
      autoprefixer: {
        files: ['temp/css/styles.css'],
        tasks: ['autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/website/{,*/}*.html',
          '<%= config.dist %>/css/*.css'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>/'
          ]
        }
      }
    },
    assemble: {
      pages: {
        options: {
          layoutdir: '<%= config.guts %>/templates/layouts/'
        },
        files: {
          '<%= config.dist %>/': ['<%= config.content %>/**/*.hbs']
        }
      }
    },
    sass: {
      css : {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'temp/css/styles.css':'<%= config.guts %>/assets/css/styles.scss',
          '<%= config.dist %>/css/fonts.css':'<%= config.guts %>/assets/css/fonts.scss'
        }
      }
    },
    autoprefixer: {
      options: {
        options: ['last 2 versions']
      },
      files: {
        src: 'temp/css/styles.css',
        dest: '<%= config.dist %>/css/styles.css'
      }
    },
    copy: {
      js: {
        files: [
          {
            src: '<%= config.guts %>/assets/js/modernizr-2.7.2.min.js',
            dest: '<%= config.dist %>/js/modernizr-2.7.2.min.js',
            flatten: true,
            filter: 'isFile'
          },
          {
            src: '<%= config.bowerDir %>/jquery/jquery.js',
            dest: '<%= config.dist %>/js/jquery.js',
            flatten: true,
            filter: 'isFile'
          }
        ]
      }
    },
    clean: {
      beforeBuild: {
        src: ['<%= config.dist %>/']
      },
      afterBuild: {
        src: ['temp/']
      }
    },
    s3: {
      options: {
        key: '<%= aws.key %>',
        secret: '<%= aws.secret %>',
        bucket: '<%= aws.bucket %>',
        access: 'public-read',
      },
      dev: {
        upload: [
          {
            src: '<%= config.dist %>/css/*',
            dest: '/css'
          },
          {
            src: '<%= config.dist %>/js/*',
            dest: '/js'
          },
          {
            src: '<%= config.dist %>/website/**/*',
            dest: '/'
          }
        ]
      }
    }

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-s3');

  grunt.registerTask('server', [
    'clean:beforeBuild',
    'assemble',
    'sass',
    'autoprefixer',
    'copy:js',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:beforeBuild',
    'assemble',
    'sass',
    'autoprefixer',
    'copy:js',
    'clean:afterBuild'
  ]);

  grunt.registerTask('s3Deploy', [
    'clean:beforeBuild',
    'assemble',
    'sass',
    'autoprefixer',
    'copy:js',
    'clean:afterBuild',
    's3'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
