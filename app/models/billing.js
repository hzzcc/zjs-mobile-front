import DS from 'ember-data';

export default DS.Model.extend({
  amount: DS.attr(),
  billing_type: DS.attr(),
  billable_type: DS.attr(),
  created_at: DS.attr(),
  updated_at: DS.attr(),
  state: DS.attr('billingState'),
  billing_number: DS.attr(),
  remark: DS.attr(),
  operator_str: function(){
    if (this.get('amount') > 0){
      return "+";
    }
    return "";
  }.property('amount'),
  created_time: function(){
        var _this = this;
        moment.locale('zh-cn');
        return moment((new Date(_this.get('created_at'))).toISOString()).format("MM-DD");
    }.property('created_at')

});
