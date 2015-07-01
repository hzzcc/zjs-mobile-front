import DS from 'ember-data';

export default DS.Model.extend({
  quantity: DS.attr(),
  price: DS.attr(),
  total_pay: DS.attr(),
  order_type: DS.attr(),
  earning: DS.attr(),
  user: DS.belongsTo('user'),
  product: DS.belongsTo('product'),
  created_at: DS.attr(),
  created_time: function(){
        var _this = this;
        moment.locale('zh-cn');
        return moment(_this.get('created_at')).format("YYYY/MM/DD");
    }.property('created_at'),
  typeColor: function() {
      if (this.get('order_type') === '看涨') {
        return 'type-red';
      }else {
        return 'type-blue';
      }
    }.property('order_type')
});
