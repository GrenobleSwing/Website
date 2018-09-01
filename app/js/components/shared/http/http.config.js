angular
  .module('app.http', [])
  .factory('httpInterceptor', ['$q', '$injector', '$cookies', function($q, $injector, $cookies) {
    return {
      'request': function (config) {
        console.info("Message=Intercepting request");

        config.headers = config.headers || {};
        if ($cookies.getObject('globals') && $cookies.getObject('globals').currentUser) {
          console.info("Message=... and adding a bearer");
          config.headers.Authorization = 'Bearer ' + $cookies.getObject('globals').currentUser.token;
        }
        return config;
      },
      'response': function(response) {
  
        console.info("Message=Intercepting response;ResponseStatus=" + response.status);
        if (response.status === 401) {
          console.info("Message=Intercepted response is 401;Goto=index.logout");
          $injector.get('$state').go('index.logout');
          return $q.reject(response);
        }
        return response || $q.when(response);
      },
  
      'responseError': function(rejection) {
  
        console.info("Message=Intercepting response as error;ResponseStatus=" + rejection.status);
        if (rejection.status === 401) {
          $injector.get('$state').go('index.logout');
          return $q.reject(rejection);
        }
        return $q.reject(rejection);
      }
    };
  }])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  }]);
