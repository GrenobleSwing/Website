function AclService($q, roleMap, identityService)  {

  this.identityService = identityService;

  this.roleMap = roleMap;

  this.handleSuccess_ = this.handleSuccess_.bind(this);
  this.handleError_ = this.handleError_.bind(this);
}

AclService.prototype = {
  isInRole: function isInRole(role) {

    return this.identityService.getIdentity().then(function(response) {
      console.info(response);
      var deferred = this.q;

      if (response.data.roles.indexOf(role) != -1) {
        deferred.resolve(this.roleMap(role));
      } else {
        deferred.reject({'role' : 'none'});
      }
      return deferred.promise;
    }.bind(this));
  },

  isInAnyRole: function isInAnyRole(roles) {

    return this.identityService.getIdentity().then(function(response) {
      console.info(response);
      var deferred = this.q;
      var result = false;
      for (var i = 0; i < roles.length; i++) {
        for (var j = 0 ; j < roles.length; j++) {
          if (response.data.roles.indexOf(roles[i]) != -1) {
              result = true;
          }
        }
      }

      if (result) {
        deferred.resolve({});
      } else {
        deferred.reject({});
      }
      return deferred.promise;
    }.bind(this));

  },

  hasPermission : function hasPermission(permissionName) {
    return this.identityService.getIdentity().then(function(response) {
      console.info(response);
      var deferred = this.q;
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
        deferred.resolve({'role' : targetRole});
      } else {
        deferred.reject({'role' : 'none'});
      }
      return deferred.promise;
    }.bind(this));
  },



  handleSuccess_: function handleSuccess_() {

  },

  handleError_: function handleError_() {

  }
};
