function ClassesListController(identityService, classService) {
  this.classService = classService;

  this.list = undefined;

  this.init_ = this.init_.bind(this);
  this.handleInitSuccess_ = this.handleInitSuccess_.bind(this);

  this.identity = identityService.getIdentity().then(this.init_);
}

ClassesListController.prototype = {
  init_ : function init_(identity) {
    this.identity = identity;
    this.classService.getClassesByUserId(identity.id).then(this.handleInitSuccess_);
  },

  handleInitSuccess_ : function handleInitSuccess_(data) {
    this.list = angular.copy(data);
    return this.list;
  },

  openDescription : function openDescription(clazz) {
    clazz.isOpen = !clazz.isOpen;
  }
};
