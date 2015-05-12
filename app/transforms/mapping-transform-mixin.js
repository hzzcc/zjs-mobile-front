export default Em.Mixin.create({
    mapping: [],
    deserialize: function(serialized) {
        if (Em.isEmpty(serialized)){
            return serialized;
          }
        var results = this.mapping.filterBy('index', serialized);
        if (results.length === 1){
            return results[0];
          }
        else{
            Em.debug("ERROR: the index " + serialized + " not exist.");
          }
    },
    serialize: function(deserialized) {
        if (Em.isEmpty(deserialized)){
            return deserialized;
          }
        var results = this.mapping.filterBy('desc', deserialized.desc);
        if (results.length === 1){
            return results[0].index;
          }
    },
    getByIndex: function(index) {
        var results = this.mapping.filterBy("index", index);
        if ( results.length === 1 ){
            return results[0];
          }
    }
});
