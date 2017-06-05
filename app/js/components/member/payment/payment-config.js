angular.module('app.payment', ['paypal-button', 'app.config', 'app.auth'])
  .directive('gsPayment', PaymentDirective)
  .controller('paymentController', ['$http', 'authenticationService', 'config', '$scope', PaymentController]);
