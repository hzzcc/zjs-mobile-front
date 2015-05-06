
var PageItemView = Ember.View.extend(Ember.TargetActionSupport, {
    tagName: ['li'],
    classNameBindings: ['active:active', 'disabled:disabled'],
    params: null,
    active: (function() {
        return this.get('content.active');
    }).property('content.active'),
    disabled: (function() {
        return this.get('content.disabled');
    }).property('content.disabled'),
    template: Ember.Handlebars.compile('<a href="javascript:;">{{view.content.title}}</a>'),
    click: function() {
        if (!this.get('disabled') && !this.get('active')) {
            this.triggerAction({
                action: 'page',
                target: this.get('parentView'),
                actionContext: this.get('content')
            });
        }
    }
});

var PageView = Ember.CollectionView.extend(Ember.TargetActionSupport, {
    tagName: ['ul'],
    classNameBindings: [':pagination', 'class'],
    params: null,
    itemViewClass: PageItemView.extend(),
    content: [],
    actions: {
        page: function(params) {
            this.triggerAction({
                action: 'page',
                target: this.get('parentView'),
                actionContext: params
            });
        }
    }
});

export default Ember.ContainerView.extend({
    tagName: ['div'],
    classNameBindings: [':pagination', 'class'],
    firstText: "首页",
    prevText: "上一页",
    nextText: "下一页",
    lastText: "末页",
    totalText: "%@ 项 / %@ 页",
    count: 100,
    page: 1,
    size: 1,
    model: null,
    displayCount: 5,
    params: null,
    content: [],
    childViews: ['pageView'],
    pageView: PageView.extend({ content: Em.computed.alias('parentView.content') }),
    _calcPageCount: function() {
        Em.Logger.assert(parseInt(this.get('size')) > 0, "Pagination: size of per page must more than 0.");
        return Math.ceil(parseInt(this.get('count')) / parseInt(this.get('size')));
    },
    _updateObjects: function () {
        var objects = [], count = this._calcPageCount(), page = this.get('page'), prev = 0, next = 0, end = count,
            total = parseInt(this.get('count')),
            displayCount = parseInt(this.get('displayCount')),
            start = displayCount < count ? parseInt(page - parseInt(displayCount / 2)) : 1;
        start = Math.min(start, (count - displayCount + 1));
        start = (start <= 0 ? 1 : start);
        end = (start + displayCount - 1) > count ? count : (start + displayCount - 1);
        page = page <= 0 ? 1 : (page > count ? count : page);
        prev = page - 1 <= 0 ? 1: page - 1;
        next = page + 1 >= count ? count : page + 1;

        objects.pushObject( { title: this.get('firstText'), index: 1, disabled: page === 1 } );
        objects.pushObject( { title: this.get('prevText'), index: prev, disabled: page === 1 } );
        for (var i = start; i <= end; i++) {
            objects.pushObject({ title: i, index: i, active: (i === page) });
        }
        objects.pushObject( { title: this.get('nextText'), index: next, disabled: page === count } );
        objects.pushObject( { title: this.get('lastText'), index: count, disabled: page === count } );
        objects.pushObject( { title: this.get('totalText').fmt(total, count), disabled: true } );

        this.set('pageView.content', objects);
    },
    paramsChanged: (function() {
        this._updateObjects();
    }).observes('page', 'size', 'count'),
    init: function() {
        this._super();
        this._updateObjects();
    },
    actions: {
        page: function(params) {
            var page = params.index, size = this.get('size');
            this.set('page', page);
            this.set('size', size);
            window.App.ReloadShare();
        }
    }
});
