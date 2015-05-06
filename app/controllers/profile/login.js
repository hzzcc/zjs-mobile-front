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
            },function() {
              console.log(credential.get('isValid')); // false
              console.log(credential.get('errors.cell'));
            });
        }
    }
});
