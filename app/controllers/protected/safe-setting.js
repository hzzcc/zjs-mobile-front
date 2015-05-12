import Ember from 'ember';

export default Ember.Controller.extend({
  toolbar_name: "安全设置",
  toolbar_back_show: true,
  toolbar_back_url: "protected.user",
  authencated: function(){
    if (!(this.model.get('level') === "" || this.model.get('level') === undefined || this.model.get('level') === 'unverified')) {
      return true;
    }else {
      return false;
    }
  }.property('model.level'),
  verify_message: function() {
    if (this.model.get('level') === 'unverified') {
      return "未验证";
    }
    if (this.model.get('level') === 'investor_applied') {
      return "投资人申请中";
    }
    if (this.model.get('level') === 'investor') {
      return "投资人";
    }
    if (this.model.get('level') === 'trader_applied') {
      return "交易员申请中";
    }
    if (this.model.get('level') === 'trader') {
      return "交易员";
    }
  }.property('model.level')
});
