function PaymentFormResource($http, config) {
  this.http = $http;
  this.config = config;

  this.init_();
}

PaymentFormResource.prototype = {
    init_ : function init_() {

    },

    getNew : function getNew(id) {
      return this.http.get(this.config.apiUrl + '/payment/new');
    },

    getEdit: function getEdit(payment) {
        return this.http.get(this.config.apiUrl + '/payment/'+payment.id+'/edit');
    }
};
