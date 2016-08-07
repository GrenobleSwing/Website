function CompareToDirective() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=gsCompareTo"
        },
        link: function (scope, element, attrs, ngModelController) {
            ngModelController.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("compareTo", function() {
                ngModelController.$validate();
            });
        }
    };
}
