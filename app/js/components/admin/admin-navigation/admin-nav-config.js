angular.module('app.admin.nav', ['ui.router', 'app.users'])
  .controller('adminNavController', ['$state', 'identityService', AdminNavController]);
