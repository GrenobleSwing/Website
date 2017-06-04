angular.module('app.payment', ['ui.router'])
  // .config(['$stateProvider', CategoryRouterConfig])
  .service('paymentResource', ['$resource', 'config', PaymentResource])
  .service('paymentFormResource', ['$resource', 'config', PaymentFormResource]);
