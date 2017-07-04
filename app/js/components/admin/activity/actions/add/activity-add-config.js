angular.module('app.activity.actions.add', ['ui.bootstrap'])
    .controller('activityAddController', ['$scope', '$uibModal', ActivityAddController])
    .directive('gsActivityAdd', ActivityAddDirective);
