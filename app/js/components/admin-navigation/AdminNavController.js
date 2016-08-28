function AdminNavController($state, identityService) {
  this.state = $state;
  this.identityService = identityService;
}

AdminNavController.prototype = {
  isActive: function isActive(name) {
    return (this.state.is(name) ? "active" : "");
  },

  hasPermission: function hasPermission(role) {
    return this.identityService.isInRole(role);
  }
};
