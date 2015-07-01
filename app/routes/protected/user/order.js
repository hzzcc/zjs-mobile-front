import Ember from 'ember';
// import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import config from '../../../config/environment';

export default Ember.Route.extend({
  model: function(params) {
      // return this.findPaged('order',params);
      var _this = this;
      return Ember.$.getJSON('/' + config.NAMESPACE + '/users/' + _this.session.content.secure.user_id + '/orders/index_by_user').then(function(data) {
        return _this.store.pushMany('order', data.orders);
      });
  }
});
