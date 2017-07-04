angular.module('app.activity.actions.remove-topic', ['ui.bootstrap'])
    .controller('activityRemoveTopicController', ['$scope', '$uibModal', ActivityRemoveTopicController])
    .directive('gsActivityRemoveTopic', ActivityRemoveTopicDirective);
