import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    console.log(window.MyTest.__container__.lookup("controller:protected.user").toolbar_name);
    new gmu.Toolbar('#J_toolbar');
  }
});
