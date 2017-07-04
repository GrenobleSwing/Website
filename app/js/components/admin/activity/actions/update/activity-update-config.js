angular.module('app.activity.actions.update', ['ui.bootstrap'])
    .controller('activityUpdateController', ['$scope', '$uibModal', ActivityUpdateController])
    .directive('gsActivityUpdate', ActivityUpdateDirective);
