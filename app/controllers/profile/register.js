import Ember from 'ember';

export default Ember.Controller.extend({
  authenticator: 'authenticator:custom',
  toolbar_name: "注册",
  toolbar_back_show: true,
  toolbar_back_url: "home",
  actions: {
        register: function(user) {
            var _this = this;
            user.validate().then(function() {
                user.set('profile_attributes',{city: null});
                user.save().then(function (model) {
                    _this.get('session').authenticate(_this.get('authenticator'), {user_token: model.get('token'),user_id: model.get('id')} /*credential.toJSON()*/);
                    Em.debug('USER: ' + JSON.stringify(user.toJSON()));
                }, function (error) {
                  console.log(error);
                    _this.set('hasError', true);
                    _this.set('errorMsg', error.error);
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
        }
    }
});
