angular.module('app.activity.actions.edit-category', ['ui.bootstrap'])
    .controller('activityEditCategoryController', ['$scope', '$uibModal', ActivityEditCategoryController])
    .directive('gsActivityEditCategory', ActivityEditCategoryDirective);
