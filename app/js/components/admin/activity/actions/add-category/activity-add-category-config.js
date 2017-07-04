angular.module('app.activity.actions.add-category', ['ui.bootstrap'])
    .controller('activityAddCategoryController', ['$scope', '$uibModal', ActivityAddCategoryController])
    .directive('gsActivityAddCategory', ActivityAddCategoryDirective);
