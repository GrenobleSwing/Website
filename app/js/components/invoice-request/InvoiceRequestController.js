function InvoiceRequestController($http, identityService) {
  this.http = $http;

  this.identity = identityService.getIdentity().then(this.init_);
}

InvoiceRequestController.prototype = {

  init_ : function init_() {
      this.handleSuccess_ = this.handleSuccess_.bind(this);
      this.handleError_ = this.handleError_.bind(this);
  },

  handleChange: function handleChange() {
    this.http.post('/invoice', {userId: this.identity.id}, config).then(this.handleSuccess_, this.handleError_);
  },

  handleSuccess_: function handleSuccess_() {
    console.info("InvoiceRequestController#handleSuccess_");
  },

  handleError_: function handleError_() {
    console.info("InvoiceRequestController#handleError_");
  }
};
