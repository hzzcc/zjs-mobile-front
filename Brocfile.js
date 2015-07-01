/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  minifyCSS: {
    enabled: true
  },
  minifyJS: {
    enabled: false
  },
  outputPaths: {
    app: {
      html: 'index.html',
      css: {
        'app': '/e_assets/qilebao.css'
      },
      js: '/e_assets/qilebao.js'
    },
    vendor: {
      css: '/e_assets/vendor.css',
      js: '/e_assets/vendor.js'
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

app.import('bower_components/bootstrap/dist/css/bootstrap.css');

app.import('vendor/zepto.js');

app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');

app.import('vendor/gmu/src/extend/touch.js');
app.import('vendor/gmu/src/extend/iscroll.js');
app.import('vendor/gmu/src/extend/highlight.js');
app.import('vendor/gmu/src/extend/parseTpl.js');
app.import('vendor/gmu/src/core/gmu.js');
app.import('vendor/gmu/src/core/event.js');
app.import('vendor/gmu/src/core/widget.js');
app.import('vendor/gmu/src/widget/navigator/navigator.js');
app.import('vendor/gmu/src/widget/navigator/scrolltonext.js');
app.import('vendor/gmu/src/widget/navigator/$scrollable.js');
// app.import('vendor/gmu/src/widget/navigator/evenness.js');
app.import('vendor/gmu/src/widget/toolbar/toolbar.js');

app.import('bower_components/ember/ember-template-compiler.js');
app.import('bower_components/momentjs/min/moment-with-locales.js');

app.import('vendor/gmu/widget/toolbar/toolbar.css');
// app.import('vendor/gmu/widget/toolbar/toolbar.default.css');
app.import('vendor/gmu/widget/navigator/navigator.css');
app.import('vendor/gmu/widget/navigator/navigator.default.css');




module.exports = app.toTree();
