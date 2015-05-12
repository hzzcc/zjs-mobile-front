import DS from 'ember-data';
import EmberValidations from 'ember-validations/mixin';

export default DS.Model.extend(EmberValidations, {
  email: DS.attr(),
  cell: DS.attr(),
  password: DS.attr(),
  passwordConfirmation: DS.attr(),
  username: DS.attr(),
  real_name: DS.attr(),
  id_card_number: DS.attr(),
  avatar: DS.attr(),
  agreed: DS.attr('boolean', {defaultValue: true}),
  authentication_token: DS.attr(),
  verification_code: DS.attr(),
  validations: {
    cell: {
      presence: { message: '请输入您的手机号'}
    },
    password: {
      presence: { message: '密码不能为空' }
    }
  }
});
