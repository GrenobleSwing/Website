function PermissionResource($http) {
  this.http = $http;
}

PermissionResource.prototype = {
  getAll : function getAll() {
    return this.http.get('/api/permissions').then(this.handleSuccess_, this.handleError_('Error getting all permissions'));
  },

  // private functions
  handleSuccess_ : function handleSuccess_(res) {
      res.$ok = true;
      return res;
  },

  handleError_: function handleError_(error) {
      return function () {
          return { success: false, message: error };
      };
  }
};
