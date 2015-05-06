
export default Ember.FileField.extend({
    attributeBindings: ['bytes'],
    bytes: null,
    fileName: null,
    fileType: null,
    fileSize: 0,
    _onLoad: function(value) {
        this.set('bytes', value.target.result);
    },
    didFilesChanged: (function() {
        var files = this.get('files');
        if (!Em.isEmpty(files)) {
            this.set('fileName', files[0].name);
            this.set('fileType', files[0].type);
            this.set('fileSize', files[0].size);
            var reader = new window.FileReader();
            reader.onload = $.proxy(this._onLoad, this);
            reader.readAsDataURL(files[0]);
        }
    }).observes('files')
});
