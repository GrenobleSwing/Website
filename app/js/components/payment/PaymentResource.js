function PaymentResource($http, config) {
  this.http = $http;
  this.config = config;

  this.init_();
}

PaymentResource.prototype = {
    init_ : function init_() {

    },

    getOne : function getOne(id) {
      return this.http.get(this.config.apiUrl + '/payment/' + id);
    },

    getAll : function getAll(query) {
      return this.http.get(this.config.apiUrl + '/payment', query);
    },

    add: function add(payment) {
        return this.http.post(this.config.apiUrl + '/payment', payment);
    },

    update: function update(payment) {
        return this.http.put(this.config.apiUrl + '/payment/' + payment.id, payment);
    },

    execute : function execute() {
      return this.http.post(this.config.apiUrl + '/paypal/execute-payment');
    },

    create: function create() {
      return this.http.get(this.config.apiUrl + '/paypal/create-payment');
    }
};
