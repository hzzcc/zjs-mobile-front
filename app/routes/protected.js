import Ember from 'ember';

import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  beforeModel: function(transition){
    this._super(transition);
    if (transition.targetName === "protected.index"){
      this.transitionToRoute('protected.user');
    }
  }
});
