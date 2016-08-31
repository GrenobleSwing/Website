function FakeTopicTypeResource($timeout, $filter, $q, $resource) {
  this.timeout = $timeout;
  this.filter = $filter;
  this.q = $q;

  this.types = JSON.stringify([]);

  this.resource = $resource('resources/sample/topic-types.json', {});

    this.init_();
}

FakeTopicTypeResource.prototype = {

  init_: function init_() {
    this.getTypes_ = this.getTypes_.bind(this);

    this.resource.query(function(types) {
      this.setTypes_(types);
    }.bind(this));
  },

  getById : function getById(id) {
      var deferred = this.q.defer();
      var filtered = this.filter('filter')(this.getTypes_(), { id: id });
      var type = filtered.length ? filtered[0] : null;
      deferred.resolve(type);
      return deferred.promise;
  },

  getAll: function getAll(params) {
    var deferred = this.q.defer();
    var filtered = this.filter('filter')(this.getTypes_(), params);
    deferred.resolve(filtered);
    return deferred.promise;
  },

    // private functions
    getTypes_ : function getTypes_() {
        if(!this.types) {
            this.types = JSON.stringify([]);
        }

        return JSON.parse(this.types);
    },

    setTypes_ : function setTypes_(types) {
        this.types = JSON.stringify(types);
    }
};
