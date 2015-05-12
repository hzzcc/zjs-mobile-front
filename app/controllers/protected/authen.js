import Ember from 'ember';

export default Ember.Controller.extend({
  toolbar_name: "实名认证",
  toolbar_back_show: true,
  toolbar_back_url: "protected.safe_setting",
  actions: {
    authencate: function(auth) {
      var _this = this;
      auth.save().then(function(model) {
        _this.set('hasError', false);
        _this.transitionToRoute(_this.get('toolbar_back_url'));
      }, function(error) {
          _this.set('hasError', true);
          var errorMessage;
          for (var i in error.errors){
              for (var j=0;j< error.errors[i].length; j++){
                  errorMessage = error.errors[i][j];
                  break;
              }
              break;
          }
          _this.set('errorMsg', errorMessage);
      });
    }
  }
});
