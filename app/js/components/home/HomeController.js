function HomeController(currentUserService) {
  this.currentUserService = currentUserService;

  this.user = {$ok : false};

  this.init_();
}

HomeController.prototype = {

  init_: function init_() {
      this.user = this.currentUserService.getCurrentUser();
  }
};
