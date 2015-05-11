import Ember from 'ember';

export default Ember.Controller.extend({
  toolbar_name: "修改密码",
  toolbar_back_show: true,
  toolbar_back_url: "protected.safe_setting",
  actions: {
    resetPassword: function(credential) {
      var _this = this;
      credential.save().then(function(model) {
        _this.transitionToRoute(_this.get('toolbar_back_url'));
      }, function(error) {
          _this.set('hasError', true);
          var errorMessage;
          for (var i in error.errors){
              for (var j=0;j< error.errors[i].length; j++){
                  errorMessage = i+error.errors[i][j];
                  break;
              }
              break;
          }
          _this.set('errorMsg', errorMessage);
      });
    }
  }
});
