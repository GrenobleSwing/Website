angular.module('app.discount', ['ui.router'])
  // .config(['$stateProvider', CategoryRouterConfig])
  .service('discountFormResource', ['$resource', 'config', DiscountFormResource]);
