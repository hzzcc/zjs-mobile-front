import DS from 'ember-data';
import EmberValidations from 'ember-validations/mixin';

export default DS.Model.extend(EmberValidations, {
  email: DS.attr(),
  cell: DS.attr(),
  password: DS.attr(),
  passwordConfirmation: DS.attr(),
  username: DS.attr(),
  id_card_number: DS.attr(),
  avatar: DS.attr(),
  agreed: DS.attr('boolean', {defaultValue: true}),
  authentication_token: DS.attr(),
  verification_code: DS.attr(),
  level: DS.attr(),
  balance: DS.attr('number', {defaultValue: 0}),
  frost: DS.attr('number', {defaultValue: 0}),
  validations: {
    cell: {
      presence: { message: '请输入您的手机号'},
      length: {is: 11, messages: {wrongLength: '需填11位手机号码'}}
    },
    password: {
      presence: { message: '密码不能为空' }
    },
    verification_code: {
      presence: { message: '请填写验证码' },
      length: { is: 6, messages: { wrongLength: '验证码错误'} }
    }
  }
});
