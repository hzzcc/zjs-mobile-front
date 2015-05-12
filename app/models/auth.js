import DS from 'ember-data';

export default DS.Model.extend({
  real_name: DS.attr(),
  id_card_number: DS.attr()
});
