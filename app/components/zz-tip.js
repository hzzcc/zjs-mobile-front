import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    confirm: function () {
      this.sendAction('action');
    },
    closeModal: function () {
      $(this.element.firstElementChild).removeClass('in').hide();
    }
  }
});
