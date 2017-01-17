function StudentResource($resource, config) {
  this.resource = $resource(config.apiUrl + '/api/student/:studentId', {studentId:'@id'}, {
    'get': { method:'GET' },
    'create': { method:'POST' },
    'update': { method:'PUT' },
    'query':  { method:'GET', isArray:true, params: {'fields' : 'id,label'} },
    'delete': { method:'DELETE' }
  });

  this.init_();
}

StudentResource.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    /**
  	 *
  	 * @return {
  	 *   id: %integer%,
  	 *   topicTitle: %string%,
  	 *   amount: %float%
  	 * }
  	 */
    getById: function getById(id) {
        return this.resource.get({studentId: id}).$promise;
    },

    /**
  	 *
  	 * @return [{
  	 *   id: %integer%,
  	 *   topicTitle: %string%,
  	 *   amount: %float%
  	 * }, ...]
  	 */
	  getAll: function getAll(params) {
        return this.resource.query(params).$promise;
    }
};
