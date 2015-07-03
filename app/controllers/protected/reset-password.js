import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({
  confirmPasswordChanged: function() {
    if (this.model.get('confirm_password') !== this.model.get('password')) {
      this.set('hasError', true);
      this.set('errorMsg', '两次填写密码不一致');
    }else {
      this.set('hasError', false);
    }
  }.observes('model.confirm_password'),
  actions: {
    resetPassword: function(credential) {
      var _this = this;

      if (this.model.get('confirm_password') !== this.model.get('password')) {
        this.set('hasError', true);
        this.set('errorMsg', '两次填写密码不一致');
        return;
      }

      credential.validate().then(function() {
        var post_data = JSON.stringify(_this.model);

        Ember.$.ajax({
                    url: '/' + config.NAMESPACE + '/users/' +  _this.session.content.secure.user_id + "/reset_password",
                    type: 'put',
                    dataType: 'json',
                    data: JSON.stringify(post_data),
                    processData: false,
                    contentType: "application/json; charset=UTF-8",
                    success: function (data) {
                      _this.set('hasError', false);
                      alert("修改成功");
                      _this.transitionToRoute('protected.user.safe-setting');
                    },
                    error: function (error) {
                      _this.set('hasError', true);

                      _this.set('errorMsg', '当前密码错误，修改失败');
                    }
                });
      }, function() {
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
