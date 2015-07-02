export default Em.View.extend({
    didInsertElement: function() {
      new gmu.Toolbar('#J_toolbar');

      if (Ember.$('#nav').length > 0){
        new gmu.Navigator('#nav');
      }

    }
});
