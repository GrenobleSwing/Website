angular.module('app.activity.actions.remove-discount', ['ui.bootstrap'])
    .controller('activityRemoveDiscountController', ['$scope', '$uibModal', ActivityRemoveDiscountController])
    .directive('gsActivityRemoveDiscount', ActivityRemoveDiscountDirective);
