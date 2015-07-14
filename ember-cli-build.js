/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    storeConfigInMeta: false,
    minifyCSS: {
      enabled: true
    },
    minifyJS: {
      enabled: true
    },
    outputPaths: {
      app: {
        html: 'index.html',
        css: {
          'app': '/assets/qilebao.css'
        },
        js: '/assets/qilebao.js'
      },
      vendor: {
        css: '/assets/vendor.css',
        js: '/assets/vendor.js'
      }
    }

  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('bower_components/ember/ember-template-compiler.js');
  app.import('bower_components/momentjs/min/moment-with-locales.js');

  app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  app.import('vendor/gmu/widget/toolbar/toolbar.css');
  // app.import('vendor/gmu/widget/toolbar/toolbar.default.css');
  app.import('vendor/gmu/widget/navigator/navigator.css');
  app.import('vendor/gmu/widget/navigator/navigator.default.css');


  return app.toTree();
};
