function TopicResource($resource, config) {
  this.resource = $resource(config.apiUrl + '/api/topic/:topicId', {topicId:'@id'}, {
    'get':    { method:'GET' },
    'create': { method:'POST' },
    'update': { method:'PUT' },
    'query':  { method:'GET', isArray:true },
    'delete': { method:'DELETE' }
  });

  this.init_();
}

TopicResource.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    getById: function getById(id) {
        return this.resource.get({topicId: id}).$promise.then(this.handleSuccess_, this.handleError_('Error getting topic by id'));
    },

	  getAll: function getAll(params) {
        return this.resource.query(params).$promise.then(this.handleSuccess_, this.handleError_('Error getting all topics'));
    },

    create: function create(topic) {
        return this.resource.create(topic).$promise.then(this.handleSuccess_, this.handleError_('Error creating topic'));
    },

    update: function update(topic) {
        return this.resource.update(topic).$promise.then(this.handleSuccess_, this.handleError_('Error updating topic'));
    },

    remove: function remove(id) {
        return this.resource.delete(id).$promise.then(this.handleSuccess_, this.handleError_('Error deleting topic'));
    },

    // private functions
    handleSuccess_ : function handleSuccess_(res) {
        return res;
    },

    handleError_: function handleError_(error) {
        return function () {
            return { success: false, message: error };
        };
    }
};
