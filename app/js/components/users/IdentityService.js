function IdentityService($cookieStore, $q, identityResource, authResource, $timeout) {
  this.cookieStore = $cookieStore;
  this.q = $q;
  this.identityResource = identityResource;
  this.authResource = authResource;
  this.timeout = $timeout;

  this.identity = undefined;
  this.authenticated = false;

  this.init_();
}

IdentityService.prototype = {

  init_: function init_() {

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

  clearIdentity: function clearIdentity() {
    this.identity = undefined;
    this.authenticated = false;
  },

  getIdentity: function getIdentity(force) {
    // console.info("IdentityService#getIdentity 1");

    var deferred = this.q.defer();

    if (force === true) this.identity = undefined;

    // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
    if (angular.isDefined(this.identity)) {
      // console.info("IdentityService#getIdentity 2");
      deferred.resolve(this.identity);

      return deferred.promise;
    }

    // console.info("IdentityService#getIdentity 3");

    // otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
    this.identityResource.getCurrentUser().then(
      function(data) {
        // console.info("IdentityService#getIdentity success");
        this.identity = data;
        this.authenticated = true;
        deferred.resolve(this.identity);
      }.bind(this), function () {
        // console.info("IdentityService#getIdentity error");

        this.identity = null;
        this.authenticated = false;
        deferred.resolve(this.identity);
      }.bind(this));

    return deferred.promise;
  }
};
