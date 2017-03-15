function PasswordForgotRouterConfig($stateProvider) {
  $stateProvider
       .state('index.password', {
           url: '/password',
           data: {
             roles: []
           },
           views: {
             'content@': {
               templateUrl: 'components/member/password/forgot/password.html',
               controller: "passwordForgotController",
               controllerAs: "ctrl"
             }
           }
       })

       .state('index.password.forgot', {
           url: '/forgot',
           templateUrl: 'components/member/password/forgot/password.forgot.html',
       })

       .state('index.password.sent', {
           url: '/sent',
           templateUrl: 'components/member/password/forgot/password.sent.html',
       });
}
