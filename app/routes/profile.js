import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(){
    if (transition.targetName === "profile.index"){
      this.transitionTo('profile.login');
    }
  }
});
