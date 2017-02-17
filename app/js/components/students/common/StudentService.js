function StudentService($q, resource) {
  this.q = $q;
  this.studentResource = resource;

  this.students = [];
  this.studentLoaded = false;

  this.init_();
}

StudentService.prototype = {

    init_ : function init_() {

    },

    getStudentsByClassId: function getStudentsByClassId(classId) {
      var deferred = this.q.defer();
      this.studentResource
          .getAll({classId: classId})
          .then(function(res) {
              this.students = angular.copy(res);
              deferred.resolve(this.students);
              return res;
          });

      return deferred.promise;
    },

    getStudentById: function getStudentById(studentId) {
        return this.studentResource.getById(studentId);
    }
};
