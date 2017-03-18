function IdentityService($cookies, $q, identityResource, authResource, $timeout, observerService) {
  this.cookies = $cookies;
  this.q = $q;
  this.identityResource = identityResource;
  this.authResource = authResource;
  this.observerService = observerService;
  this.timeout = $timeout;

  this.authenticated = false;

  this.anonymous = {$ok : false, roles : ['ANONYMOUS']};

  this.init_();
}

IdentityService.prototype = {

  init_ : function init_() {
    this.clearIdentity();
  },

  isAuthenticated: function isAuthenticated() {
    return !!this.getIdentity_().$ok;
  },

  clearIdentity: function clearIdentity() {
    console.info("IdentityService#clearIdentity");
    var deferred = this.q.defer();
    if (this.isAuthenticated()) {
      this.authResource.terminate(this.getIdentity_()).finally(function() {
        this.setIdentity_(this.anonymous);
        deferred.resolve(this.getIdentity_());
      }.bind(this));
    } else {
      deferred.resolve(this.getIdentity_());
    }
    return deferred.promise;
  },

  setIdentity_ : function setIdentity_(identity) {
    console.info("IdentityService#setIdentity_");
    this.cookies.putObject('current-user', identity);
  },

  getIdentity_ : function getIdentity_() {
    var identity = this.cookies.getObject('current-user');
    if (identity === undefined || identity === null) {
      identity = this.anonymous;
      this.setIdentity_(identity);
    }
    return identity;
  },

  getIdentity: function getIdentity(force) {
    console.info("IdentityService#getIdentity 1");

    var deferred = this.q.defer();

    // if (force === true) {
    //   this.clearIdentity();
    // }

    // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
    if (this.isAuthenticated() && !force) {
      console.info("IdentityService#getIdentity 2");
      deferred.resolve(this.getIdentity_());

      return deferred.promise;
    }

    console.info("IdentityService#getIdentity 3");

    // otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
    this.identityResource.getCurrentUser().then(
      function(data) {
        console.info("IdentityService#getIdentity success");
        console.info(data);
        var identity = angular.copy(data.data);
        identity.$ok = true;
        this.setIdentity_(identity);
        deferred.resolve(identity);
      }.bind(this), function () {
        console.info("IdentityService#getIdentity error");
        this.clearIdentity();
        deferred.reject(this.identity);
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
