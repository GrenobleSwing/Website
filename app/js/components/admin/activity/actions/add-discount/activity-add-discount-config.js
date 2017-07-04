angular.module('app.activity.actions.add-discount', ['ui.bootstrap'])
    .controller('activityAddDiscountController', ['$scope', '$uibModal', ActivityAddDiscountController])
    .directive('gsActivityAddDiscount', ActivityAddDiscountDirective);
