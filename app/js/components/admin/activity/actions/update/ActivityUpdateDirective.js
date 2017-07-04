function ActivityUpdateDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'components/admin/activity/actions/update/activity.update.html',
    controller: 'activityUpdateController',
    controllerAs: 'ctrl',
    scope : {
      activity: "="
    }
  };
}
