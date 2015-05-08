import Ember from 'ember';

import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
  authenticator: 'authenticator:custom',
  toolbar_name: "登陆",
  toolbar_back_show: true,
  toolbar_back_url: "home",
  actions: {
        login: function(credential) {
            var _this = this;
            credential.validate().then(function() {
                credential.save().then(function(model) {
                    _this.get('session').authenticate(_this.get('authenticator'), {user_token: model.get('token')} /*credential.toJSON()*/);
                }, function(error) {
                    Ember.debug(error);
                    _this.set('hasError', true);
                    _this.set('errorMsg', error.error);
                });
            },function() {
              _this.set('hasError', true);
              var errorMessage;
              for (var i in credential.errors) {
                if ($.isArray(credential.errors[i]) && (credential.errors[i].length > 0)) {
                  for (var j=0;j< credential.errors[i].length; j++){
                      errorMessage = credential.errors[i][j];
                      break;
                  }
                  break;
                }
              }
              _this.set('errorMsg', errorMessage);
              console.log(errorMessage);
            });
        }
    }
});
