
var FormGroup = Ember.View.extend({
    classNameBindings: [':form-group', 'hasError:has-error'],
    model: Ember.computed.alias('parentView.model'),
    hasError: (function() {
        return this.get('errors.length') > 0;
    }).property('errors'),
    init: function() {
        this._super();
        Ember.Binding.from('model.errors.' + this.get('property')).to('errors').connect(this);
    }
});
Ember.Handlebars.helper('em-form-group', FormGroup);

var FieldBase = Ember.ContainerView.extend({
    labelClass: 'col-md-2 control-label',
    valueClass: 'col-md-5',
    classNameBindings: [':form-group', 'class'],
    attributeBindings: ['type', 'placeholder'],
    type: 'text',
    labelView: Ember.View.extend({
        tagName: 'label',
        classNameBindings: ['class'],
        value: Ember.computed.alias('parentView.label'),
        class: Ember.computed.alias('parentView.labelClass'),
        template: Ember.Handlebars.compile('{{view.value}}')
    }),
    valueView: Ember.View.extend(),
    showLabel: Ember.computed.alias('parentView.showLabel'),
    init: function() {
        this._super();
        if (this.get('showLabel'))
            this.pushObject(this.labelView.create({}));
        this.pushObject(this.valueView.create({}));
    }
});

var DisplayField = FieldBase.extend({
    valueView: Ember.View.extend({
        classNameBindings: ['class', ':value-label'],
        value: Ember.computed.alias('parentView.value'),
        class: Ember.computed.alias('parentView.valueClass'),
        template: Ember.Handlebars.compile('<span>{{view.value}}</span>')
    })
});
Ember.Handlebars.helper('em-display-field', DisplayField);

var TextField = FieldBase.extend({
    valueView: Ember.ContainerView.extend({
        childViews: ['inputView'],
        classNameBindings: ['class'],
        attributeBindings: ['type'],
        type: Ember.computed.alias('parentView.type'),
        class: Ember.computed.alias('parentView.valueClass'),
        value: Ember.computed.alias('parentView.value'),
        placeholder: Ember.computed.alias('parentView.label'),
        inputView: Ember.TextField.extend({
            classNameBindings: [':form-control'],
            attributeBindings: ['placeholder', 'type'],
            placeholder: Ember.computed.alias('parentView.placeholder'),
            type: Ember.computed.alias('parentView.type'),
            value: Ember.computed.alias('parentView.value')
        })
    })
});
Ember.Handlebars.helper('em-text-field', TextField);

export default Ember.View.extend({
    showLabel: true,
    classNameBindings: [':form-body'],
    errors: (function() {
        return this.get('model.errors');
    }).property('model.errors')
});
