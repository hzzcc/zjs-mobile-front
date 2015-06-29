/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'my-test',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['simple-auth'] = {
    authorizer: 'authorizer:custom',
    routeAfterAuthentication: 'home',
    authenticationRoute: 'profile.login',
    applicationRootUrl: '/'
  };
  ENV['simple-auth-devise'] = {
    // identificationAttributeName: 'cell'
  }
  ENV.NAMESPACE = "api/v1";

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    //for rails test
    // ENV.baseURL = '/mobile';
    // ENV['ember-cli-mirage'] = {
    //   // enabled: false
    // }
    //for rails test end

    ENV.rootURL = "/";
    ENV.routerLocation = 'hash';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    // ENV.baseURL = '/mobile';
    // ENV.rootURL = "/";
    ENV.routerLocation = 'hash';
  }

  return ENV;
};
