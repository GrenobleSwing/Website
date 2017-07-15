function SignUpRouterConfig($stateProvider) {
  $stateProvider
    .state('index.sign-up', {
      url: "/sign-up",
      views: {
        'content@': {
          // templateUrl: "components/main/signup/signup.html",
          template: '<section ng-bind-html="ctrl.content"></section>',
          controller: "signUpController",
          controllerAs: "ctrl",
          resolve: {
            content : ['$http', 'config', function($http, config) {
              return $http.post(config.apiUrl + '/user').then(function(response) {
                return response.data;
              });
            }]
          }
        }
      },
      data: {
        permissions: {
          only: ['ANONYMOUS']
        }
      }
    });
}
