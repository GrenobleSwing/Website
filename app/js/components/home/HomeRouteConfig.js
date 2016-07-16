function HomeRouteConfig($routeProvider) {
  $routeProvider
      .when('/home', {
          controller: 'homeController',
          templateUrl: 'partials/home.html',
          controllerAs: 'ctrl',
          resolve: {
            'allow' : ['$q', 'authorizeService', function($q, authorizeService){
              if(authorizeService.canAccess('home_view')){
                return true;
              } else {
                return $q.reject('Unauthorized');
              }
            }]
          }
      });
}
