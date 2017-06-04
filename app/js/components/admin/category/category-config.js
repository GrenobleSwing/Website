angular.module('app.category', ['ui.router'])
  // .config(['$stateProvider', CategoryRouterConfig])
  .service('categoryFormResource', ['$resource', 'config', CategoryFormResource]);
