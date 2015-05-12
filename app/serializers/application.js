/**
 * Created by Zhou Wen Long on 6/12/2014 0012.
 */
export default DS.RESTSerializer.extend({
    serializeBelongsTo: function(record, json, relationship) {
        var key = relationship.key;

        var belongsTo = record.get(key);

        key = this.keyForRelationship ? this.keyForRelationship(key, "belongsTo") : key;

        if (Em.isNone(belongsTo)) {
            json[key] = belongsTo;
        } else if (relationship.options.embedded) {
            json[key] = this.serialize(belongsTo);
        } else {
            json[key] = belongsTo.get('id');
        }

        if (relationship.options.polymorphic) {
            this.serializePolymorphicType(record, json, relationship);
        }
    },
    keyForAttribute: function(attr) {
        return Em.String.underscore(attr);
    },
    serializeIntoHash: function(hash, type, record, options) {
        var root = Ember.String.decamelize(type.typeKey);
        hash[root] = this.serialize(record, options);
    }
});
