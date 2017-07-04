angular.module('app.activity.actions.remove-category', ['ui.bootstrap'])
    .controller('activityRemoveCategoryController', ['$scope', '$uibModal', ActivityRemoveCategoryController])
    .directive('gsActivityRemoveCategory', ActivityRemoveCategoryDirective);
