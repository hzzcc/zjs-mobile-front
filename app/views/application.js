export default Em.View.extend({
    didInsertElement: function() {
      new gmu.Toolbar('#J_toolbar');
      new gmu.Navigator('#nav');
    }
});
