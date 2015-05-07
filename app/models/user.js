import DS from 'ember-data';
import EmberValidations from 'ember-validations/mixin';

export default DS.Model.extend(EmberValidations, {
  email: DS.attr(),
  cell: DS.attr(),
  password: DS.attr(),
  username: DS.attr(),
  rememberMe: DS.attr('boolean', {defaultValue: false}),
  token: DS.attr(),
  validations: {
    cell: {
      presence: { message: '请输入您的手机号'}
    },
    password: {
      presence: { message: '密码不能为空' }
    }
//       email: {
// //            presence: true,
//           // presence: { message: '邮箱地址不能为空'},
//           format: { with: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, allowBlank: true, message: '不是一个有效的邮箱地址'  }
//       },
//       password: { presence: { message: '密码不能为空' } }
    }
});
