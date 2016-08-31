function TopicService(resource) {
  this.topicResource = resource;

  this.init_();
}

TopicService.prototype = {

    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    getTopicById: function getTopicById(topicId) {
      return this.topicResource.getById(topicId).then(this.handleSuccess_, this.handleError_('Error retrieving subscriptions by User'));
    },

    getTopics: function getTopics() {
        return this.topicResource.getAll({}).then(this.handleSuccess_, this.handleError_('Error retrieving subscriptions by User'));
    },

    queryTopics: function queryTopics(params) {
        return this.topicResource.getAll(params).then(this.handleSuccess_, this.handleError_('Error retrieving subscriptions by User'));
    },

    // private functions
    handleSuccess_ : function handleSuccess_(res) {
        res.$ok = true;
        return res;
    },

    handleError_: function handleError_(error) {
        return function () {
            return { $ok: false, message: error };
        };
    }
};
