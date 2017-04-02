function AdminNavController($state, aclService) {
  this.state = $state;
  this.aclService = aclService;
}

AdminNavController.prototype = {
  isActive: function isActive(name) {
    return (this.state.is(name) ? "active" : "");
  }
};
