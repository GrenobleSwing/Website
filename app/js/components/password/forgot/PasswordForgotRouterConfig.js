function PasswordForgotRouterConfig($stateProvider) {
  $stateProvider
       .state('index.password', {
           url: '/password',
           data: {
             roles: []
           },
           views: {
             'content@': {
               templateUrl: 'components/password/forgot/password.html',
               controller: "passwordForgotController",
               controllerAs: "ctrl"
             }
           }
       })

       .state('index.password.forgot', {
           url: '/forgot',
           templateUrl: 'components/password/forgot/password.forgot.html',
       })

       .state('index.password.sent', {
           url: '/sent',
           templateUrl: 'components/password/forgot/password.sent.html',
       });
}
