angular.module('app.payment', ['app.config', 'app.auth'])
  .directive('gsPayment', PaymentDirective)
  .controller('paymentController', ['$http', 'authenticationService', 'config', '$scope', PaymentController]);
