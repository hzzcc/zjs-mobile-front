import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(transition){
    this._super(transition);
    if (transition.targetName === "profile.index"){
      this.transitionTo('profile.login');
    }
  }
});
