import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Route.extend({
    model: function(params) {
        return this.store.find('user', this.session.content.secure.user_id);
    },
    setupController: function (controller, model) {
      var _this = this;
      _this._super(controller, model);
      this.controllerFor('application').set("nav_item_1","");
      this.controllerFor('application').set("nav_item_2","");
      this.controllerFor('application').set("nav_item_3","ui-state-active");
    }
});
