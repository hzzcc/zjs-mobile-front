import Ember from 'ember';

export default Ember.Controller.extend({
  nav_item_1: "ui-state-active",
  nav_item_2: "",
  nav_item_3: "",
  actions: {
    chargeTip: function () {
      $('#chargeTipModal').show().addClass('in');
    },
    toCharge: function () {
      $('#chargeTipModal').removeClass('in').hide();
    }
  }
});
