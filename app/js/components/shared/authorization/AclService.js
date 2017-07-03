function AclService($q, roleMap, authenticationService)  {
  this.q = $q;
  this.authenticationService = authenticationService;

  this.roleMap = roleMap;

  this.handleSuccess_ = this.handleSuccess_.bind(this);
  this.handleError_ = this.handleError_.bind(this);
}

AclService.prototype = {

  isInRole: function isInRole(role) {
    var deferred = this.q.defer();

    this.authenticationService.getIdentity().then(function(response) {
      // console.info(response);

      if (response.data.roles.indexOf(role) != -1 && this.roleMap[role] !== undefined) {
        // console.info("AclService#isInRole#accept for " + role);
        deferred.resolve(this.roleMap[role]);
      } else {
        // console.info("AclService#isInRole#reject for " + role);
        deferred.reject({'role' : 'none'});
      }
    }.bind(this));
    return deferred.promise;
  },

  isInAnyRole: function isInAnyRole(roles) {
    var deferred = this.q.defer();
    // console.info(roles);
    this.authenticationService.getIdentity().then(function(response) {
      // console.info(response);
      var result = false;
      var targetRole = "none";
      for (var i = 0; i < roles.length; i++) {
          if (response.data.roles.indexOf(roles[i]) != -1) {
              result = true;
              targetRole = roles[i];
          }
      }

      if (result && this.roleMap[targetRole] !== undefined) {
        deferred.resolve(this.roleMap[targetRole]);
        // console.info("AclService#isInAnyRole#accept");
      } else {
        // console.info("AclService#isInAnyRole#reject");
        deferred.reject({});
      }

    }.bind(this));
    return deferred.promise;
  },

  hasPermission : function hasPermission(permissionName) {
    var deferred = this.q.defer();
    // console.info(permissionName);
    this.authenticationService.getIdentity().then(function(response) {
      // console.info(response);
      var result = false;
      var roles = response.data.roles;
      var targetRole = 'none';

      for (var i = 0; i < roles.length; i++) {
        if (roles[i].indexOf(permissionName) != -1) {
            result = true;
            targetRole = roles[i];
        }
      }

      if (result) {
        // console.info("AclService#hasPermission#accept");
        deferred.resolve({'role' : targetRole});
      } else {
        // console.info("AclService#hasPermission#reject");
        deferred.reject({'role' : 'none'});
      }
    }.bind(this));
    return deferred.promise;
  },



  handleSuccess_: function handleSuccess_() {

  },

  handleError_: function handleError_() {

  }
};
