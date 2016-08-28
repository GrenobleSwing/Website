angular.module('app.admin.secretariat', ['ui.router', 'ui.grid'])
  .config(['$stateProvider', SecretariatRouterConfig])
  .service('membersResource', ['$filter', '$q', '$resource', MembersResourceStub])
  .service('membersService', ['membersResource', MembersService])
  .controller('membersListController', ['$scope', 'membersService', MembersListController]);
