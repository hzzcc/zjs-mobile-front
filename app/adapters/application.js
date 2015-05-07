import DS from 'ember-data';
import config from '../config/environment';

export default DS.ActiveModelAdapter.extend({
    namespace:     config.NAMESPACE,
    // host:           window.ENV.HOST,
    ajaxError: function(jqXHR) {
        var error = this._super(jqXHR);
        if (jqXHR && (jqXHR.status === 422 || jqXHR.status === 401)) {
            var jsonErrors = Em.$.parseJSON(jqXHR.responseText)['errors'];
//            var controller = App.__container__.lookup('controller:application');
//            controller.transitionToRoute('profile.login' );
            return new DS.InvalidError(jsonErrors);
        } else if (jqXHR && jqXHR.status === 502) {
            //TODO: 处理服务器不可用的错误
        } else {

            return error;
        }
    }
});
