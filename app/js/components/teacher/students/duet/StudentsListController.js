function StudentsListController($scope, authenticationService, studentService) {
  this.class = $scope.class;

  this.studentService = studentService;

  this.list = [];
  this.handleInitSuccess_ = this.handleInitSuccess_.bind(this);

  this.init_();
}

StudentsListController.prototype = {
  init_ : function init_() {
    this.studentService.getStudentsByClassId(this.class.id).then(this.handleInitSuccess_);
  },

  handleInitSuccess_ : function handleInitSuccess_(data) {
    this.list = angular.copy(data);
    return this.list;
  }
};
