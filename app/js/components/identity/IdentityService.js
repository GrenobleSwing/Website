function IdentityService($cookies, $q, identityResource, authResource, $timeout, observerService) {
  this.cookies = $cookies;
  this.q = $q;
  this.identityResource = identityResource;
  this.authResource = authResource;
  this.observerService = observerService;
  this.timeout = $timeout;

  this.authenticated = false;

  this.unIndentified = {$ok : false, roles : []};
}

IdentityService.prototype = {

  isAuthenticated: function isAuthenticated() {
    return !!this.getIdentity_().$ok;
  },

  isInRole: function isInRole(role) {
    if (!this.isAuthenticated() || !this.getIdentity_().roles) return false;

    return this.getIdentity_().roles.indexOf(role) != -1;
  },

  isInAnyRole: function isInAnyRole(roles) {
    if (!this.isAuthenticated() || !this.getIdentity_().roles) return false;

    for (var i = 0; i < roles.length; i++) {
      if (this.isInRole(roles[i])) return true;
    }

    return false;
  },

  clearIdentity: function clearIdentity() {
    if (this.isAuthenticated()) {
      this.authResource.terminate(this.getIdentity_()).finally(function() {
        this.setIdentity_(this.unIndentified);
      }.bind(this));
    }
  },

  setIdentity_ : function setIdentity_(identity) {
    this.cookies.putObject('current-user', identity);
  },

  getIdentity_ : function getIdentity_() {
    var identity = this.cookies.getObject('current-user');
    if (identity === undefined || identity === null) {
      identity = this.unIndentified;
      this.setIdentity_(identity);
    }
    return identity;
  },

  getIdentity: function getIdentity(force) {
    // console.info("IdentityService#getIdentity 1");

    var deferred = this.q.defer();

    if (force === true) {
      this.clearIdentity();
    }

    // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
    if (this.isAuthenticated()) {
      // console.info("IdentityService#getIdentity 2");
      deferred.resolve(this.getIdentity_());

      return deferred.promise;
    }

    // console.info("IdentityService#getIdentity 3");

    // otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
    this.identityResource.getCurrentUser().then(
      function(data) {
        // console.info("IdentityService#getIdentity success");
        // console.info(data);
        var identity = angular.copy(data.data);
        identity.$ok = true;
        this.setIdentity_(identity);
        deferred.resolve(identity);
      }.bind(this), function () {
        // console.info("IdentityService#getIdentity error");

        this.clearIdentity();
        deferred.resolve(this.identity);
      }.bind(this))
      .finally(function() {
        this.observerService.notify('change-user', this.getIdentity_());
      }.bind(this));

    return deferred.promise;
  },

  addListener : function addListener(callback, name) {
    this.observerService.attach(callback, 'change-user', name);
  },

  removeListener : function removeListener(name) {
    this.observerService.detachById(name);
  }
};
