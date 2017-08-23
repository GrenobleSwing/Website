function SignUpRouterConfig($stateProvider) {
  $stateProvider
    .state('index.sign-up', {
      url: "/sign-up",
      views: {
        'content@': {
          templateUrl: "components/main/signup/signup.html",
          // template: '<section gs-dynamic="trustedHtml"></section><section><a href="#/login" class="btn btn-link">{{ "ACTION.BACK_TO_LOGIN" | translate}}</a></section>',
          controller: "signUpController",
          controllerAs: "ctrl"
        }
      },
      resolve: {
        content : ['$http', 'config', function($http, config) {
          return $http.get(config.apiUrl + '/user/new').then(function(response) {
            return response.data;
          });
        }]
      },
      data: {
        permissions: {
          only: ['ANONYMOUS']
        }
      }
    });
}
