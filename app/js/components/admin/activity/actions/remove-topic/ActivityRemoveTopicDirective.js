function ActivityRemoveTopicDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'components/admin/activity/actions/remove-topic/activity.remove.topic.html',
    controller: 'activityRemoveTopicController',
    controllerAs: 'ctrl'
  };
}
