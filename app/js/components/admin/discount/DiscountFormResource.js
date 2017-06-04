function DiscountFormResource($http, config) {
  this.http = $http;
  this.config = config;

  this.init_();
}

DiscountFormResource.prototype = {
    init_ : function init_() {

    },

    getCreateFormByActivity : function getCreateFormByActivity(activity) {
      return this.http.get(this.config.apiUrl + '/activity/'+activity.id+'/discount/new');
    }
};
