angular
    .module('app.users', ['ngResource'])
	  .service('usersResource', ['$timeout', '$filter', '$q', '$resource', UsersResourceStub])
    .service('identityResource', ['$q', IdentityResourceStub])
    .service('authResource', ['usersResource', AuthenticationResourceStub])
    .service('identityService', ['$cookieStore', '$q', 'identityResource', 'authResource', '$timeout', IdentityService])
    .service('userService', ['usersResource', UserService])
    .service('usersService', ['usersResource', UsersService]);
