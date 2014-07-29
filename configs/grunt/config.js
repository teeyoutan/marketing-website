{
  production: {
    options: {
      variables: {

      }
    }
  },
  preview: {
    options: {
      variables: {
        aws: grunt.file.readJSON('configs/s3Config.json'),
        environment: 'preview',
        environmentData: 'website-guts/data/environments/production/environmentVariables.json',
        assets_dir: '/assets',
        link_path: '',
        sassSourceMap: false,
        sassImagePath: '/assets/img',
        compress_js: true,
        concat_banner: '(function($){ \n\n' +
                       '  window.optly = window.optly || {}; \n\n' +
                       '  window.optly.mrkt = window.optly.mrkt || {}; \n\n' +
                       '  try { \n\n',
        concat_footer: '  } catch(error){ \n\n' +
                       '  //report errors to GA \n\n' +
                       '  window.console.log("js error: " + error);' +
                       '  } \n' +
                       '})(jQuery);'
      }
    }
  },
  dev: {
    options: {
      variables: {
        environment: 'dev',
        environmentData: 'website-guts/data/environments/development/environmentVariables.json',
        assets_dir: '/dist/assets',
        link_path: '/dist',
        sassSourceMap: true,
        sassImagePath: '/dist/assets/img',
        compress_js: false,
        concat_banner: '(function($){ \n\n' +
                       '  window.optly = window.optly || {}; \n\n' +
                       '  window.optly.mrkt = window.optly.mrkt || {}; \n\n',
        concat_footer: '})(jQuery);'
      }
    }
  },
  content: 'website',
  guts: 'website-guts',
  dist: 'dist',
  temp: 'temp',
  helpers: 'website-guts/helpers',
  bowerDir: 'bower_components'
}
