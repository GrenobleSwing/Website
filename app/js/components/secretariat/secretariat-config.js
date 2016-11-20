angular.module('app.admin.secretariat', ['app.config', 'ui.router'])
  .config(['$stateProvider', SecretariatRouterConfig])
  // .service('membersResource', ['$filter', '$q', '$resource', MembersResourceStub])
  .service('membersResource', ['$resource', 'config', MembersResource])
  .service('membersService', ['membersResource', MembersService])
  .controller('membersListController', ['$scope', 'membersService', MembersListController]);
