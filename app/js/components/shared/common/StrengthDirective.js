function StrengthDirective($parse) {
	return {
		require: 'ngModel',
		restrict: 'A',
		link: function(scope, elem, attrs, ctrl) {
      // This part is supposed to check the strength
			ctrl.$parsers.unshift(function(viewValue) {
				if(viewValue && viewValue.length >= 6) {
					ctrl.$setValidity('minLength', true);
				} else {
					ctrl.$setValidity('minLength', false);
				}

				if(viewValue && viewValue.length <= 16) {
					ctrl.$setValidity('maxLength', true);
				} else {
					ctrl.$setValidity('maxLength', false);
				}

				if(viewValue && /[A-z]/.test(viewValue)) {
					ctrl.$setValidity('letter', true);
				} else {
					ctrl.$setValidity('letter', false);
				}

				if(viewValue && /\d/.test(viewValue)) {
					ctrl.$setValidity('number', true);
				} else {
					ctrl.$setValidity('number', false);
				}

				return viewValue;
			});
		}
	};
}
