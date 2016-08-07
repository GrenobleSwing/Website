function TopicResource($resource) {
  this.resource = $resource('/api/topic/:topicId', {topicId:'@id'}, {
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
        return this.resource.get(id).then(this.handleSuccess_, this.handleError_('Error getting topic by id'));
    },

	  getByUserId: function getByUserId(userId) {
        return this.resource.query({userId : userId}).then(this.handleSuccess_, this.handleError_('Error getting all topics'));
    },

    create: function create(topic) {
        return this.resource.create(topic).then(this.handleSuccess_, this.handleError_('Error creating topic'));
    },

    update: function update(topic) {
        return this.resource.update(topic).then(this.handleSuccess_, this.handleError_('Error updating topic'));
    },

    remove: function remove(id) {
        return this.resource.delete(id).then(this.handleSuccess_, this.handleError_('Error deleting topic'));
    },

    // private functions
    handleSuccess_ : function handleSuccess_(res) {
        return res.data;
    },

    handleError_: function handleError_(error) {
        return function () {
            return { success: false, message: error };
        };
    }
};
