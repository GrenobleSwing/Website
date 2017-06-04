function ClassService($q, resource, yearService) {
  this.q = $q;
  this.classResource = resource;

  this.yearService = yearService;
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

      this.yearService
        .getCurrentYear()
        .then(function(data) {
          return this.classResource
            .getAll({userId: userId, yearId: data.id})
            .then(function(res) {
                this.class = angular.copy(res);
                deferred.resolve(this.class);
                return res;
            }, this.handleError_('Error retrieving class by User'));
        }.bind(this));

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
