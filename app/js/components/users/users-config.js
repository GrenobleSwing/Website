angular.module('app.users', ['app.config'])
		.service('usersResource', ['$http', 'config', UsersResource])
    .service('userService', ['usersResource', UserService])
    .service('usersService', ['usersResource', UsersService]);
