import DS from 'ember-data';
import config from '../config/environment';


DS.Model.reopen({
    adapterDidInvalidate: function(errors) {
      var recordErrors = this.get('errors');
      for (var key in errors) {
        if (!errors.hasOwnProperty(key)) {
          continue;
        }

        if (typeof(recordErrors.add) !== "undefined" && recordErrors.add !== null) {
          recordErrors.add(key, errors[key]);
        }else{
          if ($.isArray(errors[key])){
            recordErrors.set(key, errors[key]);
          }else {
            recordErrors.set(key, [errors[key]]);
          }

        }


      }
    }
});

export default DS.ActiveModelAdapter.extend({
    namespace:     config.NAMESPACE,
    // host:           window.ENV.HOST,
    ajaxError: function(jqXHR) {
        var error = this._super(jqXHR);
        if (jqXHR && (jqXHR.status === 422 || jqXHR.status === 401)) {
          var response = Ember.$.parseJSON(jqXHR.responseText);
          var errors = {};

          if (typeof response.errors !== 'undefined') {
            var jsonErrors = response.errors;
            Ember.keys(jsonErrors).forEach(function(key) {
              errors[Ember.String.camelize(key)] = jsonErrors[key];
            });
          }
          if (typeof response.message !== 'undefined') {
            errors['Message'] = response.message;
          }
          return new DS.InvalidError(jsonErrors);
        } else if (jqXHR && jqXHR.status === 502) {
            //TODO: 处理服务器不可用的错误
        } else {

            return error;
        }
    }
});
