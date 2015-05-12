import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Route.extend({
    model: function(params) {
        return this.store.find('user', this.session.content.secure.user_id);
    },
    setupController: function (controller, model) {
      var _this = this;
      Ember.$.getJSON('/' + config.NAMESPACE + '/users/account?user_id=' + _this.session.content.secure.user_id ).then(function(data){
          model.set('balance', data.account.balance);
          model.set('frost', data.account.frost);
        },function(errors){
          if (errors.status === 422) {
            _this.set('hasError', true);
            _this.set('errorMsg', errors.responseJSON.message);
          }
        });
      _this._super(controller, model);
      this.controllerFor('application').set("nav_item_1","");
      this.controllerFor('application').set("nav_item_2","");
      this.controllerFor('application').set("nav_item_3","ui-state-active");
    }
});
