function LogoutController($rootScope, $cookies, $state, $http, config, authenticationService) {

  if (authenticationService.isAnonymous()) {
    // console.info("Message=Clearing credentials...");
    authenticationService.clearCredentials();
    return $state.go('index.login');
  } else {
    // console.info("Message=Disconnecting...");
    $http
      .get(config.apiUrl + '/disconnect')
      .finally(function() {
//        $rootScope.globals = {};
//        $cookies.remove('globals');
//        $http.defaults.headers.common.Authorization = 'Bearer';
        authenticationService.clearCredentials();
        return $state.go('index.login');
      });
  
  }
}
