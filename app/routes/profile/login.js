import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('userToken');
  },
  setupController: function (controller, model) {
    var _this = this;
    _this._super(controller, model);
    this.controllerFor('application').set("nav_item_1","");
    this.controllerFor('application').set("nav_item_2","");
    this.controllerFor('application').set("nav_item_3","ui-state-active");
  }
});
