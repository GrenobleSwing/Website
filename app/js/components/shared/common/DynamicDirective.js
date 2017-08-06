function DynamicDirective($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.gsDynamic, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
}
