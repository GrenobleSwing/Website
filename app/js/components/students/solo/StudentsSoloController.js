function StudentsSoloController($scope, studentService) {
  this.class = $scope.class;

  this.studentService = studentService;

  this.leadersCount = 0;
  this.followersCount = 0;
  this.soloCount = 0;

  this.handleInitSuccess_ = this.handleInitSuccess_.bind(this);

  this.init_();
}

StudentsSoloController.prototype = {
  init_ : function init_() {
    this.studentService.getStudentsByClassId(this.class.id).then(this.handleInitSuccess_);
  },

  handleInitSuccess_ : function handleInitSuccess_(data) {
    this.list = angular.copy(data);
    return this.list;
  }
};
