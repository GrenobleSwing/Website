function TopicsListController($modal, topicService) {
  this.modal = $modal;

  this.topicService = topicService;

  this.items = [];

  this.gridOpts = {
    columnDefs: [
      { name: 'Type', field: 'type' },
      { name: 'Title', field: 'title' },
      { name: 'Is active ?', field: 'active' },
      { name: 'State', field: 'state' }
    ],
    data: []
  };

  this.init_();
}


TopicsListController.prototype = {
  init_ : function init_() {
    this.handleInitSuccess_ = this.handleInitSuccess_.bind(this);
    this.handleError_ = this.handleError_.bind(this);

    this.items = this.topicService.getTopics().then(this.handleInitSuccess_);
  },

  editTopic: function editTopic(topic) {
      var modalInstance = this.modal.open({
            animation: true,
            templateUrl: 'components/topics/edit-dialog/topic.edit.html',
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
     this.items = angular.copy(data.list);
     this.gridOpts.data = this.items;
     return data;
  },

  handleError_: function handleError_(data, status, headers, config) {
     alert(JSON.stringify(data));
  }
};
