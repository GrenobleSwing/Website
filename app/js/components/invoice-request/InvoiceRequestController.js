function InvoiceRequestController($http, config, identityService) {
  this.http = $http;
  this.config = config;

  this.identity = identityService.getIdentity().then(this.init_);
}

InvoiceRequestController.prototype = {

  init_ : function init_() {
      this.handleSuccess_ = this.handleSuccess_.bind(this);
      this.handleError_ = this.handleError_.bind(this);
  },

  handleChange: function handleChange() {
    this.http.post(this.config.apiUrl + '/invoice', {userId: this.identity.id}).then(this.handleSuccess_, this.handleError_);
  },

  handleSuccess_: function handleSuccess_() {
    console.info("InvoiceRequestController#handleSuccess_");
  },

  handleError_: function handleError_() {
    console.info("InvoiceRequestController#handleError_");
  }
};
