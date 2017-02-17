function ClassResource($resource, config) {
  this.resource = $resource(config.apiUrl + '/api/class/:classId', {classId:'@id'}, {
    'get': { method:'GET' },
    'query':  { method:'GET', isArray:true, params: {'fields' : 'id,label'} }
  });

  this.init_();
}

ClassResource.prototype = {
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
        return this.resource.get({classId: id}).$promise;
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
