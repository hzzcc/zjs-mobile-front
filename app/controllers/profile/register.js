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
function getCheckCode() {
  $.ajax({
    data: null,
    url: "/users/send_code?cell=" + $("#user_cell").val(),
    type: 'get',
    contentType: false,
    processData: false,
    success: function (data) {
      if (data.error) {
        clearInterval(codeInterval);
        canGet = true;
        $("#getCheckCode").text("获取验证码");
        setCanGet(true);
        alert("发送验证码失败");
      }
    },
    error: function () {

    }
  });
}

export default Ember.Controller.extend({
  authenticator: 'authenticator:custom',
  toolbar_name: "注册",
  toolbar_back_show: true,
  toolbar_back_url: "home",
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
      },function(errors){
        if (errors.status === 422) {
          _this.set('hasError', true);
          _this.set('errorMsg', errors.responseJSON.message);
        }
      });
  }.observes('model.cell'),
  actions: {
        register: function(user) {
            if (!user.get('agreed')) {
              alert("如需注册请阅读并勾选用户协议");
              return;
            }
            var _this = this;
            user.validate().then(function() {
                user.set('profile_attributes',{city: null});
                user.save().then(function (model) {
                    _this.get('session').authenticate(_this.get('authenticator'), {user_token: model.get('authentication_token'),user_id: model.id} /*credential.toJSON()*/);
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
