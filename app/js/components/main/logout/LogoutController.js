function LogoutController($rootScope, $cookies, $state, $http, config) {

  console.info("Message=Disconnecting...");
  $http.get(config.apiUrl + '/disconnect').finally(function() {
    $rootScope.globals = {};
    $cookies.remove('globals');
    $http.defaults.headers.common.Authorization = 'Bearer';
    return $state.go('index.login');
  });
}
