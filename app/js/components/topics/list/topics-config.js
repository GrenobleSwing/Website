angular.module('app.admin.topics', ['ui.router', 'ui.grid'])
  .config(['$stateProvider', TopicRouterConfig]);
  // .service('membersResource', ['$filter', '$q', '$resource', MembersResourceStub])
  // .service('membersService', ['Resource', MembersService]);
  // .controller('membersListController', ['membersService', MembersListController]);
