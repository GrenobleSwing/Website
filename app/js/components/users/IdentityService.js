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
    // console.info("IdentityService#authenticate");
    return this.authResource.login(login, password).then(this.handleAuthSuccess_, this.handleAuthError_);
  },

  handleAuthSuccess_: function handleAuthSuccess_(data) {
    // console.info("IdentityService#handleAuthSuccess_");

    if (!!data) {
     this.identity = data;
     this.authenticated = true;
     this.cookieStore.put('currentUser', angular.toJson(data));
    } else {
     this.cookieStore.remove("currentUser");
     this.identity = null;
     this.authenticated = false;
    }
    return data;
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
    // this.identityResource.getCurrentUser().then(
    //   function(data) {
    //     // console.info("IdentityService#getIdentity success");
    //     this.identity = data;
    //     this.authenticated = true;
    //     deferred.resolve(this.identity);
    //   }, function () {
    //     // console.info("IdentityService#getIdentity error");
    //
    //     this.identity = null;
    //     this.authenticated = false;
    //     deferred.resolve(this.identity);
    //   });

    // for the sake of the demo, fake the lookup by using a timeout to create a valid
    // fake identity. in reality,  you'll want something more like the $http request
    // commented out above. in this example, we fake looking up to find the user is
    // not logged in
    this.timeout(function() {
      // console.info("IdentityService#getIdentity 4");
      this.clearIdentity();
      deferred.resolve(this.identity);
    }.bind(this), 1000);

    return deferred.promise;
  }
};
