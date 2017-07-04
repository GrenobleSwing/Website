function ActivityAddTopicDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'components/admin/activity/actions/add-topic/activity.add.topic.html',
    controller: 'activityAddTopicController',
    controllerAs: 'ctrl'
  };
}
