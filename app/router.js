import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
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

});
