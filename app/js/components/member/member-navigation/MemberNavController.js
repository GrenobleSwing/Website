function MemberNavController($state) {
  this.state = $state;
  // // console.info("MemberNavController");
}

MemberNavController.prototype = {
  isActive: function isActive(name) {
    return (this.state.is(name) ? "active" : "");
  }
};
