import Ember from 'ember';
import BillingStates from 'my-test/transforms/billing-state';

export default Ember.Controller.extend({
  billingStates: BillingStates.create({}).get('mapping'),

  queryParams: ["page", "perPage"],
  pageBinding: "content.page",
  perPageBinding: "content.perPage",
  totalPagesBinding: "content.totalPages",
  page: 1,
  perPage: 10
});
