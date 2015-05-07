import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import SimpleAuthConfig from "simple-auth/configuration";

export default Ember.Route.extend(ApplicationRouteMixin,{
    actions: {
        sessionAuthenticationSucceeded: function() {
            var attemptedTransition = this.get(SimpleAuthConfig.sessionPropertyName).get('attemptedTransition');
            if (attemptedTransition) {
                attemptedTransition.retry();
                this.get(SimpleAuthConfig.sessionPropertyName).set('attemptedTransition', null);
            } else {
                var _this = this;
                if (this.get('session').get('style') === 'regist'){
                    this.transitionTo('protected.user', this.get('session').get('current_user')).then(function(){
                        _this.controllerFor('protected.user').send('editProfile', 'loginIn');
                    });
                }else{
                    this.transitionTo(SimpleAuthConfig.routeAfterAuthentication);
                }
            }
        },
        invalidateSession: function() {
          this.get('session').invalidate();
        }
    }

});
