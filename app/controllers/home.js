import Ember from 'ember';

export default Ember.Controller.extend({
  toolbar_name: "交易",
  toolbar_back_show: false,
  toolbar_logout: true,
  bet_times: 1,
  total_pay: function () {
    return this.bet_times * this.get('model.price');
  }.property('bet_times', 'model.price'),
  actions: {
    select: function (bet) {
      $('.bet-item-box').removeClass('active');
      $('#bet-times-'+bet).parent().addClass('active');
      this.order.set('quantity', bet);
      this.set('bet_times',bet);
    },
    bet: function (tit) {
      $('#orderConfirmModal').show().addClass('in');
      $('#order_confirm_tit').text(tit);
    },
    closeModal: function () {
      $('#orderConfirmModal').removeClass('in').hide();
    }
  }
});
