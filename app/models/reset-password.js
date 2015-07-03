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
      presence: { message: '新密码不能为空' },
      length: { minimum: 6, maximum: 12, messages: { tooShort: '密码必须大于6个字符', tooLong: '密码必须小于12个字符' } }
    },
    confirm_password: {
      presence: { message: '请确认新密码' }
    }
  }
});
