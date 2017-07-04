angular.module('app.activity.actions.edit-discount', ['ui.bootstrap'])
    .controller('activityEditDiscountController', ['$scope', '$uibModal', ActivityEditDiscountController])
    .directive('gsActivityEditDiscount', ActivityEditDiscountDirective);
