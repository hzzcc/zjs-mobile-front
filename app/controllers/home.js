import Ember from 'ember';

import config from '../config/environment';

export default Ember.Controller.extend({
  toolbar_name: "交易",
  toolbar_back_show: false,
  toolbar_login: true,
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
      this.set('order.order_type', tit);
    },
    closeModal: function () {
      $('#orderConfirmModal').removeClass('in').hide();
    },
    confirm: function() {
      var _this = this;
      if (_this.session.isAuthenticated){
        _this.set('order.quantity', _this.get('bet_times'));
        _this.set('order.price', _this.get('model.price'));
        _this.set('user.balance', _this.get('user.balance') - _this.get('total_pay'));
        _this.set('order.user', _this.user);
        _this.set('order.product', _this.model);


        var post_data = {
          quantity: _this.get('bet_times'),
          price: _this.get('model.price'),
          user_id: _this.user.get('id'),
          product_id: _this.model.id,
          order_type: _this.get('order.order_type')
        };

        Ember.$.ajax({
                    url: '/' + config.NAMESPACE + '/products/' + _this.model.id + "/orders",
                    type: 'post',
                    dataType: 'json',
                    data: JSON.stringify(post_data),
                    processData: false,
                    contentType: "application/json; charset=UTF-8",
                    success: function (data) {
                        _this.store.updateId(_this.order, data.order);
                        console.log('secc');
                        _this.order = _this.store.createRecord('order');
                        alert('成功提交订单');
                    },
                    error: function (errors) {
                      console.log('err');
                      alert('提交订单失败');
                    }
                });

        _this.send('closeModal');
      }else {
        alert('请登录');
      }
    }
  }
});
