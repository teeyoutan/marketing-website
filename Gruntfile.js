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
      preview: {
        options: {
          variables: {
            'environment': 'preview',
            'assets_dir': '/assets',
            'compress_js': true
          }
        }
      },
      dev: {
        options: {
          variables: {
            'environment': 'dev',
            'assets_dir': '/assets',
            'compress_js': false
          }
        }
      },
      content: 'website',
      guts: 'website-guts',
      dist: 'dist',
      temp: 'temp',
      bowerDir: 'bower_components'
    },
    aws: grunt.file.readJSON('configs/s3Config.json'),
    watch: {
      assemble: {
        files: [
          '<%= config.content %>/{,*/}*.{md,hbs,yml}',
          '<%= config.guts %>/templates/**/*.hbs',
          '<%= config.content %>/**/*.hbs'
        ],
        tasks: ['config:dev', 'assemble']
      },
      sass: {
        files: ['<%= config.guts %>/assets/css/*.scss'],
        tasks: ['sass', 'autoprefixer', 'clean:postBuild']
      },
      img: {
        files: ['<%= config.guts %>/assets/img/*.{png,jpg,svg}'],
        tasks: ['copy:img']
      },
      js: {
        files: ['<%= config.guts %>/assets/js/*.js'],
        tasks: ['uglify']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/**/*.html',
          '<%= config.dist %>/assets/css/**/*.css',
          '<%= config.dist %>/assets/js/**/*.js'
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
          layoutdir: '<%= config.guts %>/templates/layouts/',
          assetsDir: '<%= grunt.config.get("assets_dir") %>'
        },
        files: [
          {
            src: '**/*.hbs',
            dest: '<%= config.dist %>/',
            cwd: '<%= config.content %>/',
            expand: true
          }
        ]
      }
    },
    sass: {
      styles: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          '<%= config.temp %>/css/styles.css':'<%= config.guts %>/assets/css/styles.scss',
          '<%= config.dist %>/assets/css/fonts.css':'<%= config.guts %>/assets/css/fonts.scss'
        }
      }
    },
    autoprefixer: {
      options: {
        options: ['last 2 versions']
      },
      files: {
        flatten: true,
        src: '<%= config.temp %>/css/styles.css',
        dest: '<%= config.dist %>/assets/css/styles.css'
      }
    },
    copy: {
      js: {
        files: [
          {
            src: '<%= config.guts %>/assets/js/libraries/modernizr-2.7.2.min.js',
            dest: '<%= config.dist %>/assets/js/libraries/modernizr-2.7.2.min.js',
            flatten: true,
            filter: 'isFile'
          },
          {
            src: '<%= config.bowerDir %>/jquery/jquery.js',
            dest: '<%= config.dist %>/assets/js/libraries/jquery.js',
            flatten: true,
            filter: 'isFile'
          }
        ]
      },
      img: {
        files: [
          {
            src: '*',
            cwd: '<%= config.guts %>/assets/img/',
            dest: '<%= config.dist %>/assets/img/',
            expand: true
          }
        ]
      }
    },
    clean: { 
      preBuild: ['<%= config.dist %>/'],
      postBuild: ['<%= config.temp %>']
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
            src: '<%= config.dist %>/**/*',
            dest: '/',
            rel: '<%= config.dist %>'
          }
        ]
      }
    },
    uglify: {
      options: {
        mangle: false,
        compress: false,
        beautify: true
      },
      globalJS: {
        files: {
          '<%= config.dist %>/assets/js/global.js': ['<%= config.bowerDir %>/fastclick/lib/fastclick.js', '<%= config.guts %>/assets/js/global.js']
        }
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
  grunt.loadNpmTasks('grunt-config');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('server', [
    'config:dev',
    'clean:preBuild',
    'assemble',
    'uglify',
    'sass',
    'autoprefixer',
    'copy',
    'clean:postBuild',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'config:dev',
    'clean:preBuild',
    'assemble',
    'uglify',
    'sass',
    'autoprefixer',
    'copy',
    'clean:postBuild'
  ]);

  grunt.registerTask('preview', [
    'config:preview',
    'clean:preBuild',
    'assemble',
    'uglify',
    'sass',
    'autoprefixer',
    'copy',
    's3',
    'clean:postBuild'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
