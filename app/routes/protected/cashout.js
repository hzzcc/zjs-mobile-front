import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.createRecord('billing', {'billing_type': 'cashout'});
  },
  setupController: function (controller, model) {
    var _this = this;
    _this._super(controller, model);
    controller.set('user', _this.store.find('user', _this.session.content.secure.user_id));
  }
});
