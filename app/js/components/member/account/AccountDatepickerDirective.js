function AccountDatepickerDirective() {
  return function(scope, element, attrs) {
      $(element).datepicker({
          inline: true,
          dateFormat: 'yyyy-mm-dd',
          onSelect: function(dateText) {
              var modelPath = $(this).attr('ng-model');
              putObject(modelPath, scope, dateText);
              scope.$apply();
          }
      });
  }
}
