import Ember from 'ember';

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
  }
});
