angular
    .module('app.users', ['ngResource'])
	  .service('usersResource', ['$timeout', '$filter', '$q', '$resource', FakeUsersResource])
    .service('authResource', ['usersResource', FakeAuthenticationResource])
    .service('identityService', ['$cookieStore', '$q', 'usersResource', 'authResource', IdentityService])
    .service('userService', ['usersResource', UserService])
    .service('usersService', ['usersResource', UsersService]);
