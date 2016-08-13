function AdminNavController($state) {
  this.state = $state;
}

AdminNavController.prototype = {
  isActive: function isActive(name) {
    return (this.state.is(name) ? "active" : "");
  }
};
