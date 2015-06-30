import DS from 'ember-data';
import EmberValidations from 'ember-validations/mixin';

export default DS.Model.extend(EmberValidations,{
  cell: DS.attr(),
  password: DS.attr(),
  rememberMe: DS.attr('boolean', {defaultValue: false}),
  authentication_token: DS.attr(),
  user: DS.belongsTo('user'),
  validations: {
    cell: {
      presence: { message: '请输入您的手机号'}
    },
    password: {
      presence: { message: '密码不能为空' }
    }
  }
});
