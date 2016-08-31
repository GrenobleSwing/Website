function TopicEditController(topic, topicService) {
  this.topic = angular.copy(topic);

  this.nestedTopics = [];

  this.topicTypes = ["adhesion", "duet", "solo"];
  this.init_();
}

TopicEditController.prototype = {
  init_: function init_() {
    this.topicService.queryTopics({parent: true, active: true}).then(function(data) {
      this.nestedTopics = data;
    }.bind(this));
  },

  apply: function apply() {
    this.modalInstance.close(this.topic);
  },

  cancel : function cancel() {
    this.modalInstance.dismiss('cancel');
  }
};
