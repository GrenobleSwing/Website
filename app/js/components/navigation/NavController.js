function NavController($state) {
  this.state = $state;
}

NavController.prototype = {
  isActive: function isActive(name) {
    return (this.state.is(name) ? "active" : "");
  }
};
