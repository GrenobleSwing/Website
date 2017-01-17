function StudentService($q, resource) {
  this.q = $q;
  this.studentResource = resource;

  this.class = [];
  this.classLoaded = false;

  this.init_();
}

StudentService.prototype = {

    init_ : function init_() {
        this.handleError_ = this.handleError_.bind(this);
    },

    getStudentsByUserId: function getStudentsByUserId(userId) {
      var deferred = this.q.defer();

      if (!!this.classLoaded) {
          deferred.resolve(this.class);
          return deferred.promise;
      }

      this.studentResource.getAll({userId: userId, yearId: "2016-2017"})
          .then(function(res) {
              this.class = angular.copy(res);
              deferred.resolve(this.class);
              return res;
          }, this.handleError_('Error retrieving class by User'));

      return deferred.promise;
    },

    getStudentById: function getStudentById(classId) {
        return this.studentResource.getById(classId)
          .then(this.handleSuccess_, this.handleError_('Error retrieving class by User'));
    },

    // private functions
    handleSuccess_ : function handleSuccess_(res) {
        return res;
    },

    handleError_: function handleError_(error) {
        return function () {
            return { $ok: false, message: error };
        };
    }
};
