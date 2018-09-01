angular
  .module('app.http', [])
  .factory('httpInterceptor', ['$q', '$injector', '$cookies', function($q, $injector, $cookies) {
    return {
      'request': function (config) {
        // console.info("Message=Intercepting request...");

        config.headers = config.headers || {};
        var data = $cookies.getObject('globals');
        if (data && data.currentUser) {
          // console.info("Message=... checking current user");
          if (data.currentUser.expires_in) {
            var now = new Date();
            var expirationDate = new Date(data.currentUser.expires_in);

            // console.info("Today is " + now.getDay() + "/" + now.getMonth() + "/" + now.getFullYear());
            // console.info("Expiration date is " + expirationDate.getDay() + "/" + expirationDate.getMonth() + expirationDate.getFullYear());
            var hasNotExpired = (now.getTime() < expirationDate.getTime());
            // console.info("Token has expired ? " + (hasNotExpired ? "NO" : "YES"));

            if (hasNotExpired) {
              // console.info("Message=... and adding a bearer");
              config.headers.Authorization = 'Bearer ' + data.currentUser.token;
            } else {
              // console.info("Message=... and removing the user, because his token has expired");
              $cookies.getObject('globals').currentUser = {};
            }
          } else {
            // console.info("Message=... and removing the user");
            $cookies.getObject('globals').currentUser = {};
          }
        }
        return config;
      },
      'response': function(response) {
  
        // console.info("Message=Intercepting response;ResponseStatus=" + response.status);
        if (response.status === 401) {
          // console.info("Message=Intercepted response is 401;Goto=index.logout");
          $injector.get('$state').go('index.logout');
          return $q.reject(response);
        }
        return response || $q.when(response);
      },
  
      'responseError': function(rejection) {
  
        // console.info("Message=Intercepting response as error;ResponseStatus=" + rejection.status);
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
