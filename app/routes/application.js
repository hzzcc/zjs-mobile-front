import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin,{
    actions: {
        sessionAuthenticationSucceeded: function() {
            var attemptedTransition = this.get(SimpleAuth.Configuration.sessionPropertyName).get('attemptedTransition');
            if (attemptedTransition) {
                attemptedTransition.retry();
                this.get(SimpleAuth.Configuration.sessionPropertyName).set('attemptedTransition', null);
            } else {
                var _this = this;
                if (this.get('session').get('style') === 'regist'){
                    this.transitionTo('protected.user', this.get('session').get('current_user')).then(function(){
                        _this.controllerFor('protected.user').send('editProfile', 'loginIn');
                    });
                }else{
                    this.transitionTo(SimpleAuth.Configuration.routeAfterAuthentication);
                }
            }
        },
        invalidateSession: function() {
          this.get('session').invalidate();
        }
    }

});
