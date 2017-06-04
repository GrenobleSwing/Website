angular.module('app.activity', ['ui.router'])
  // .config(['$stateProvider', ActivityRouterConfig])
  .service('activityResource', ['$resource', 'config', ActivityResource])
  .service('activityFormResource', ['$resource', 'config', ActivityFormResource]);
