function NavController($state) {
  this.state = $state;
}

NavController.prototype = {
  isActive: function isActive(name) {
    return ($state.is(name) ? "active" : "");   
  }
}
