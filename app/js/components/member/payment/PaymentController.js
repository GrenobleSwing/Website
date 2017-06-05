function PaymentController($http, authService, config, $scope) {
    this.client = {
      sandbox : "0",
      production: "0"
    };

    var account = authService.getCurrentAccount();
    this.payment = function() {
      return paypal.request.post(config.apiUrl + '/paypal/create-payment?accountId='+account.id);
    };

    this.onAuthorize = function(data, actions) {
      console.log('The payment was authorized !');
      console.info(data);
      return actions.payment.execute();
    }
}

PaymentController.prototype = {

};
