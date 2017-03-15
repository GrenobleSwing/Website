function StudentResource($resource, config) {
  this.resource = $resource(config.apiUrl + '/student/:studentId', {studentId:'@id'}, {
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
