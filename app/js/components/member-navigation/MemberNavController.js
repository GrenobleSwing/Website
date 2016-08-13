function MemberNavController($state) {
  this.state = $state;
}

MemberNavController.prototype = {
  isActive: function isActive(name) {
    return (this.state.is(name) ? "active" : "");
  }
};
