function TopicsListController($modal, topicService) {
  this.modal = $modal;

  this.topicService = topicService;

  this.items = [];

  this.init_();
}


TopicsListController.prototype = {
  init_ : function init_() {
    this.handleInitSuccess_ = this.handleInitSuccess_.bind(this);
    this.handleError_ = this.handleError_.bind(this);

    this.items = this.topicService.getAll().then(this.handleInitSuccess_);
  },

  editTopic: function editTopic(topic) {
      var modalInstance = this.modal.open({
            animation: true,
            templateUrl: 'js/components/topic/edit-dialog/topic.edit.html',
            controller: 'topicEditController',
            controllerAs: 'ctrl',
            resolve: {
              topic: function() {
                return topic;
              }
            }
          });

          modalInstance.result.then(function (value) {
            this.topicService.saveTopic(value);
          }.bind(this), function () {

          });
  },

  handleInitSuccess_: function handleInitSuccess_(data, status, headers, config) {
     this.items = data;
     return data;
  },

  handleError_: function handleError_(data, status, headers, config) {
     alert(JSON.stringify(data));
  }
};
