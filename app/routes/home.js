import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function (controller, model) {
    var _this = this;
    _this._super(controller, model);
    this.controllerFor('application').set("nav_item_1","ui-state-active");
    this.controllerFor('application').set("nav_item_2","");
    this.controllerFor('application').set("nav_item_3","");
  }
});
