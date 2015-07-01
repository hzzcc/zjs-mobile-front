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
                    _this.get('session').authenticate(_this.get('authenticator'), {user_token: model.get('token'), user_id: model.get('user').id, cell: model.get('user.cell') } /*credential.toJSON()*/);
                }, function(error) {
                    _this.set('hasError', true);

                    _this.set('errorMsg', '用户名或密码错误');
                });
            },function() {
              _this.set('hasError', true);

              _this.set('errorMsg', '用户名或密码错误');
            });
        }
    }
});
