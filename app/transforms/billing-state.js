import MappingTransformMixin from 'qilebao/transforms/mapping-transform-mixin';
export default DS.Transform.extend(MappingTransformMixin, {
    mapping: [
        {index: 'pending', desc: '待定'},
        {index: 'confirmed', desc: '已确认'},
        {index: 'denied', desc: '被拒绝'},
        {index: 'cancelled', desc: '已取消'}
    ]
});
