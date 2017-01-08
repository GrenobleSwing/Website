function CompareToDirective() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=gsCompareTo"
        },
        link: function (scope, element, attrs, ctrl) {

          ctrl.$validators.compareTo = function(modelValue) {
              return modelValue == scope.otherModelValue;
          };

          scope.$watch("otherModelValue", function() {
              ctrl.$validate();
          });
        }
    };
}
