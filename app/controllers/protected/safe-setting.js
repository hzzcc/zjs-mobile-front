import Ember from 'ember';

export default Ember.Controller.extend({
  toolbar_name: "安全设置",
  toolbar_back_show: true,
  toolbar_back_url: "protected.user",
  authencated: function(){
    if (!(this.model.get('real_name') === "" || this.model.get('real_name') === undefined)) {
      return true;
    }else {
      return false;
    }
  }.property('model.real_name')
});
