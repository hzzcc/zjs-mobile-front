import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
      return this.store.find('product', 1);
  },
  setupController: function (controller, model) {
    var _this = this;
    _this._super(controller, model);
    controller.set('order', _this.store.createRecord('order'));
    if (this.session.isAuthenticated) {
      controller.set('user', _this.store.find('user', _this.session.content.secure.user_id));
    }

    window.getHQdata = function() {
      Ember.$.getScript('http://hq.sinajs.cn/?_=1436840050170/&list=CFF_RE_IF1507', function(){
        var hq_arr = hq_str_CFF_RE_IF1507.split(','),
          amt_value = hq_arr[3] - hq_arr[14],
          amt = (amt_value/hq_arr[14]*100).toFixed(2),
          color = amt < 0 ? 'green':'red';
        var hq_map = {
          'open_price': hq_arr[0], //开盘价
          'max_price': hq_arr[1], //最高价
          'min_price': hq_arr[2], //最低价
          'price': hq_arr[3], //当前价格
          'volume': hq_arr[4],  //成交量
          'amount': hq_arr[6],   //持仓量
          'yestoday_price': hq_arr[13], //昨结算
          'trade_time': hq_arr[36], //日期
          'time': hq_arr[37],  //时间
          'amt_value': amt_value.toFixed(1), //涨幅额度
          'amt': amt + '%', //涨幅
          'color': color
        }
        controller.set('hq_str',hq_map);
        console.log('sdad');
      });
    };

    getHQdata();
    setInterval('getHQdata()', 5000);

  }
});
