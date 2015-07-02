import Ember from 'ember';

export default Ember.Controller.extend({
  nav_item_1: "ui-state-active",
  nav_item_2: "",
  nav_item_3: "",
  actions: {
    toCharge: function () {
      $('#chargeModal').show().addClass('in');
    },
    closeModal:function () {
      $('#chargeModal').removeClass('in').hide();
    },
    confirm: function () {
      // body...
    }
  }
});
