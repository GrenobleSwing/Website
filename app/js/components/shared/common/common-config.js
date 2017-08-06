angular.module('app.common', [])
  .directive('gsCompareTo', CompareToDirective)
  .directive('gsDynamic', ['$compile', DynamicDirective])
  .directive('gsStrength', StrengthDirective);
