import Ember from 'ember';

import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  beforeModel: function(transition){
    if (transition.targetName === "protected.index"){
      this.transitionTo('protected.user');
    }
  }
});
