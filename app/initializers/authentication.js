

import AuthorizerBase from 'simple-auth/authorizers/base';
import AuthenticatorBase from 'simple-auth/authenticators/base';

var CustomAuthenticator = AuthenticatorBase.extend({
    restore: function(content) {
        Em.debug(content);
//        var _this = this;
//        return new Em.RSVP.Promise(function(resolve, reject) {
////            if (!Em.isEmpty(content.user_token)) {
//                _this.container.lookup('store:main').find('profile.credential').then(function() {
//                    resolve(content);
//                }, function() {
//                    reject();
//                }).catch(function() {
//                    alert('ok');
//                })
////            } else {
////                reject();
////            }
//        });
        return Em.RSVP.Promise.resolve(content);
    },
    authenticate: function(options) {
        return Em.RSVP.Promise.resolve(options);
    }
});

var CustomAuthorizer = AuthorizerBase.extend({
    authorize: function (jqXHR, requestOptions) {
        if (this.session.isAuthenticated && !Ember.isEmpty(this.session.content.secure.user_token)) {
//            if ( requestOptions.type === "GET" ) {
//                jqXHR.setRequestHeader('If-Modified-Since', 0);
//            }
            jqXHR.setRequestHeader('Authorization', 'Token token=' + this.session.content.secure.user_token + ',cell=' + this.session.content.secure.cell);
        }
    }
});

export default {
    name: 'authorization',
    before: 'simple-auth',
    initialize: function(container, application) {
        container.register('authenticator:custom', CustomAuthenticator);
        container.register('authorizer:custom', CustomAuthorizer);
    }
};
