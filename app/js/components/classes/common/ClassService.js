function ClassService($q, resource, yearService) {
  this.q = $q;
  this.classResource = resource;

  this.currentYear = yearService.getCurrentYear();
  this.class = [];
  this.classLoaded = false;

  this.init_();
}

ClassService.prototype = {

    init_ : function init_() {
        this.handleError_ = this.handleError_.bind(this);
    },

    getClassesByUserId: function getClassesByUserId(userId) {
      var deferred = this.q.defer();

      if (!!this.classLoaded) {
          deferred.resolve(this.class);
          return deferred.promise;
      }

      this.classResource.getAll({userId: userId, yearId: this.currentYear})
          .then(function(res) {
              this.class = angular.copy(res);
              deferred.resolve(this.class);
              return res;
          }, this.handleError_('Error retrieving class by User'));

      return deferred.promise;
    },

    getClassById: function getClassById(classId) {
        return this.classResource.getById(classId)
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
