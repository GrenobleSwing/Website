angular.module('app.admin.nav', ['ui.router', 'app.acl'])
  .controller('adminNavController', ['$state', 'aclService', AdminNavController]);
