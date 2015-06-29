import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
  baseURL: config.baseURL,
  rootURL: config.rootURL
});

export default Router.map(function() {
  this.resource('home', { path: "/"});

  this.resource('profile', function () {
    this.route('login');
    this.route('register');
    this.route('forgetPassword');
    this.route('forgetVerifiedSuccess');
    this.route('resetPassword');
  });

  this.route('protected', function() {
    this.route('user');
    this.route('safe_setting');
    this.route('reset_password');
    this.route('authen');
    this.route('billing');
  });

  this.route('invest', function() {
    this.route('show');
  });

  this.route('contact_us');
});
