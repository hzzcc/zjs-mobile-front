import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  price: DS.attr(),
  date: DS.attr(),
  benefit: DS.attr(),
  max: DS.attr(),
  formate_date: function(){
        var _this = this;
        moment.locale('zh-cn');
        return moment((new Date(_this.get('date'))).toISOString()).format("YYYY/M/D");
    }.property('date')
});
