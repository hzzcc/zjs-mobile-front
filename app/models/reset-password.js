import DS from 'ember-data';

export default DS.Model.extend({
  password: DS.attr(),
  new_password: DS.attr(),
  confirm_new_password: DS.attr()
});
