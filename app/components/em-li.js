
export default Ember.View.extend({
   tagName: "li",
    mouseEnter: function(){
        var categoryItem=$("#categoryItem");
        categoryItem.on("mouseover",function(){
            $(this).show();
        });
        categoryItem.on("mouseout",function(){
            $(this).hide();
        });
        var showDom = $("#"+this.elementId).closest(".mall-nav-list").children().last();
        showDom.css("display", "block");

        var _this = this;
        this.get('controller').send('showItem',_this.get('model'));
    },
    mouseLeave: function(){
        var showDom = $("#"+this.elementId).closest(".mall-nav-list").children().last();
        showDom.css("display", "none");
    }
});
