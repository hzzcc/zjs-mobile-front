import DS from 'ember-data';
import EmberValidations from 'ember-validations/mixin';

export default DS.Model.extend(EmberValidations, {
  current_password: DS.attr(),
  password: DS.attr(),
  confirm_password: DS.attr(),
  validations: {
    current_password: {
      presence: { message: '当前密码不能为空' }
    },
    password: {
      presence: { message: '新密码不能为空' }
    },
    confirm_password: {
      presence: { message: '请确认新密码' }
    }
  }
});
