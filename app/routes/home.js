import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  model: function(params) {
      return this.store.find('product', 1);
  },
  setupController: function (controller, model) {
    var _this = this;
    _this._super(controller, model);
    this.controllerFor('application').set("nav_item_1","");
    this.controllerFor('application').set("nav_item_2","ui-state-active");
    this.controllerFor('application').set("nav_item_3","");
    controller.set('order', _this.store.createRecord('order'));
    if (this.session.isAuthenticated) {
      Ember.$.getJSON('/' + config.NAMESPACE + '/users/account?user_id=' + _this.session.content.secure.user_id ).then(function(data){
          controller.set('user_balance', data.account.balance);
        },function(errors){
          if (errors.status === 422) {
            _this.set('hasError', true);
            _this.set('errorMsg', errors.responseJSON.message);
          }
        });
    }
  }
});
