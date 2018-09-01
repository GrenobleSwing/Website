function HomeController() {
  this.init_();
}

HomeController.prototype = {

  init_: function init_() {
    console.info("Message=Welcome home !");
  }
};
