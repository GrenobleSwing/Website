function IdentityService($cookieStore, $q, userResource, authResource) {
  this.cookieStore = $cookieStore;
  this.q = $q;
  this.userResource = userResource;
  this.authResource = authResource;

  this.identity = undefined;
  this.authenticated = false;

  this.init_();
}

IdentityService.prototype = {

  init_: function init_() {
    this.handleAuthSuccess_ = this.handleAuthSuccess_.bind(this);
    this.handleAuthError_ = this.handleAuthError_.bind(this);
  },

  isIdentityResolved: function isIdentityResolved() {
    return angular.isDefined(this.identity);
  },

  isAuthenticated: function isAuthenticated() {
    return this.authenticated;
  },

  isInRole: function isInRole(role) {
    if (!this.authenticated || !this.identity.roles) return false;

    return this.identity.roles.indexOf(role) != -1;
  },

  isInAnyRole: function isInAnyRole(roles) {
    if (!this.authenticated || !this.identity.roles) return false;

    for (var i = 0; i < roles.length; i++) {
      if (this.isInRole(roles[i])) return true;
    }

    return false;
  },

  authenticate: function authenticate(login, password) {
     return this.authResource.login(login, password).then(this.handleAuthSuccess_, this.handleAuthError_);
  },

  handleAuthSuccess_: function handleAuthSuccess_(data) {
    if (!!data) {
     this.identity = data;
     this.authenticated = true;
     this.cookieStore.put('currentUser', angular.toJson(data));
    } else {
     this.cookieStore.remove("currentUser");
     this.identity = null;
     this.authenticated = false;
    }
  },

  handleAuthError_ : function handleAuthError_() {
    this.cookieStore.remove("currentUser");
    this.identity = null;
    this.authenticated = false;
  },

  clearIdentity: function clearIdentity() {
    this.identity = null;
    this.authenticated = false;
  },

  getIdentity: function getIdentity(force) {
    var deferred = this.q.defer();
    var login = this.identity.login;

    if (force === true) this.identity = undefined;

    // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
    if (angular.isDefined(this.identity)) {
      deferred.resolve(this.identity);

      return deferred.promise;
    }

    // otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
    this.userResource.getByUsername(login).then(
      function(data) {
        this.identity = data;
        this.authenticated = true;
        deferred.resolve(this.identity);
      }, function () {
        this.identity = null;
        this.authenticated = false;
        deferred.resolve(this.identity);
      });

    return deferred.promise;
  }
};
