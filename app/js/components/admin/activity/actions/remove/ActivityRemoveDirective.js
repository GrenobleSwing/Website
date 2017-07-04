function ActivityRemoveDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'components/admin/activity/actions/remove/activity.cancel.html',
    controller: 'activityRemoveController',
    controllerAs: 'ctrl',
    scope : {
      activity : "="
    }
  };
}
