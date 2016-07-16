angular
    .module('app.users', ['ngResource'])
    // .service('usersResource', ['$http', UsersResource])
	  .service('usersResource', ['$timeout', '$filter', '$q', '$resource', FakeUsersResource])
    .service('sessionService', SessionService)
    .service('currentUserService', ['usersResource', CurrentUserService])
    .service('userService', ['usersResource', UserService])
    .service('usersService', ['usersResource', UsersService]);
