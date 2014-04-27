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
      dist: 'dist'
    },
    watch: {
      assemble: {
        files: [
        '<%= config.content %>/{,*/}*.{md,hbs,yml}',
        '<%= config.guts %>/{layouts,partials}/.*',
        '<%= config.guts %>/templates/layouts/.*.hbs'
        ],
        tasks: ['assemble']
      },
      sass: {
        files: ['<%= config.guts %>/assets/css/*.scss'],
        tasks: ['sass']
      },
      autoprefixer: {
        files: ['<%= config.dist %>/css/styles.css'],
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
        hostname: 'local.www.optimizely.com'
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
          layout: '<%= config.guts %>/templates/layouts/default-layout.hbs'
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
          '<%= config.dist %>/css/styles.css':'<%= config.guts %>/assets/css/styles.scss'
        }
      }
    },
    autoprefixer: {
      options: {
        options: ['last 2 versions']
      },
      files: {
        src: '<%= config.dist %>/css/styles.css',
        dest: '<%= config.dist %>/css/styles.css'
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/']

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('server', [
    'clean',
    'assemble',
    'sass',
    'autoprefixer',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'assemble',
    'sass',
    'autoprefixer'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
