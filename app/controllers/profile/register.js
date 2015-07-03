import Ember from 'ember';
import config from '../../config/environment';

var canGet = true;
var codeInterval = null;
var codeCount = 60;

function setCheckDom(){
  codeCount -= 1;
  if (codeCount > 0){
    $("#getCheckCode").text(codeCount + "s后重新获取");
  }else {
    clearInterval(codeInterval);
    canGet = true;
    $("#getCheckCode").text("获取验证码");
    setCanGet(true);
  }
}

function setCanGet(can){
  canGet = can;
  if (can) {
    $("#getCheckCode").addClass("btn-u-red");
    $("#getCheckCode").removeClass("btn-u-default");
  }else {
    $("#getCheckCode").removeClass("btn-u-red");
    $("#getCheckCode").addClass("btn-u-default");
  }
}

export default Ember.Controller.extend({
  authenticator: 'authenticator:custom',

  usernameChanged: function() {
    var _this = this;
    if (this.model.get('username') === undefined || this.model.get('username').length === 0) {
      return;
    }
    Ember.$.getJSON('/' + config.NAMESPACE + '/users/check_username_uniqueness?username=' + this.model.get('username')).then(function(){
      },function(errors){
        if (errors.status === 422) {
          _this.set('hasError', true);
          _this.set('errorMsg', errors.responseJSON.message);
        }
      });
  }.observes('model.username'),
  cellChanged: function() {
    var _this = this;
    if (this.model.get('cell') === undefined || this.model.get('cell').length != 11) {

      return;
    }
    Ember.$.getJSON('/' + config.NAMESPACE + '/users/check_cell_uniqueness?cell=' + this.model.get('cell')).then(function(){
      _this.set('cell_uniq', true);
        _this.set('hasError', false);
      },function(errors){
        if (errors.status === 422) {
          _this.set('hasError', true);
          _this.set('cell_uniq', false);
          _this.set('errorMsg', errors.responseJSON.message);
        }
      });
  }.observes('model.cell'),
  confirmPasswordChanged: function() {
    var _this = this;

    if (this.model.get('passwordConfirmation') !== this.model.get('password')) {
      _this.set('hasError', true);
      _this.set('errorMsg', '两次填写密码不一致');
    }else {
      _this.set('hasError', false);
    }
  }.observes('model.passwordConfirmation'),
  codeInputChanged: function () {
    var _this = this;
    if (this.model.get('verification_code') === undefined || this.model.get('verification_code').length === 0) {
      return;
    }
    if (this.model.get('verification_code') !== _this.get('veri_code') || this.model.get('verification_code') === 0) {
      _this.set('hasError', true);
      _this.set('errorMsg', '验证码错误');
    }else {
      _this.set('hasError', false);
    }
  }.observes('model.verification_code'),
  veri_code: 0,
  actions: {
        register: function(user) {
            if (!user.get('agreed')) {
              alert("如需注册请阅读并勾选用户协议");
              return;
            }
            var _this = this;

            user.validate().then(function() {


              if (_this.get('cell_uniq') === false) {
                _this.set('hasError', true);
                _this.set('errorMsg', '手机号已被注册');
                return;
              }


              if (user.get('passwordConfirmation') !== user.get('password')) {
                _this.set('hasError', true);
                _this.set('errorMsg', '两次填写密码不一致');
                return;
              }

              if (user.get('verification_code') !== _this.get('veri_code') || user.get('verification_code') === 0) {
                _this.set('hasError', true);
                _this.set('errorMsg', '验证码错误');
                return;
              }

                user.save().then(function (model) {
                    _this.get('session').authenticate(_this.get('authenticator'), {user_token: model.get('authentication_token'),user_id: model.id, cell: model.get('cell')} /*credential.toJSON()*/);
                    Em.debug('USER: ' + JSON.stringify(user.toJSON()));
                }, function (error) {
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
            },function() {
              _this.set('hasError', true);
              var errorMessage;
              for (var i in user.errors) {
                if ($.isArray(user.errors[i]) && (user.errors[i].length > 0)) {
                  for (var j=0;j< user.errors[i].length; j++){
                      errorMessage = user.errors[i][j];
                      break;
                  }
                  break;
                }
              }
              _this.set('errorMsg', errorMessage);
              console.log(errorMessage);
            });
        },
        getCheckCode: function(){
          var _this = this;

          function getCheckCode() {
            $.ajax({
              data: null,
              url: '/' + config.NAMESPACE + "/users/send_code?cell=" + $("#user_cell").val(),
              type: 'get',
              contentType: false,
              processData: false,
              success: function (data) {
                _this.set('veri_code', data.code);
              },
              error: function () {
                clearInterval(codeInterval);
                canGet = true;
                $("#getCheckCode").text("获取验证码");
                setCanGet(true);
                alert("发送验证码失败");
              }
            });
          }

          if ($("#user_cell").val().length !== 11) {
            alert("请正确填写手机号");
            return;
          }
          if (canGet){
            getCheckCode();
            setCanGet(false);
            codeCount = 60;
            $("#getCheckCode").text("60s后重新获取");
            codeInterval=setInterval(setCheckDom,1000);
          }
        }
    }
});
