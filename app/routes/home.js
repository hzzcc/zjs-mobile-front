import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
      return this.store.find('product', 1);
  },
  setupController: function (controller, model) {
    var _this = this;
    _this._super(controller, model);
    controller.set('order', _this.store.createRecord('order'));
    if (this.session.isAuthenticated) {
      controller.set('user', _this.store.find('user', _this.session.content.secure.user_id));
    }
  }
});
