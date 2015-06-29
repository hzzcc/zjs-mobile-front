import DS from 'ember-data';

export default DS.Model.extend({
  quantity: DS.attr(),
  price: DS.attr(),
  order_type: DS.attr(),
  earning: DS.attr(),
  user_id: DS.belongsTo('user'),
  product_id: DS.belongsTo('product')
});
