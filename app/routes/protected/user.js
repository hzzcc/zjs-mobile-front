import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Route.extend({
    model: function(params) {
        return this.store.find('user', this.session.content.secure.user_id);
    }
});
