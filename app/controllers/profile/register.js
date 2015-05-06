import Ember from 'ember';

export default Ember.Controller.extend({
  authenticator: 'authenticator:custom',
  toolbar_name: "注册",
  toolbar_back_show: true,
  toolbar_back_url: "home"
});
