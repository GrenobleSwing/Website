angular.module('app.activity.actions.remove', ['ui.bootstrap'])
    .controller('activityRemoveController', ['$scope', '$uibModal',  ActivityRemoveController])
    .directive('gsActivityRemove', ActivityRemoveDirective);
