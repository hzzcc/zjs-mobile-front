import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    new gmu.Toolbar('#J_toolbar');
  }
});
