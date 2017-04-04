function HttpInterceptor($q, $injector, $cookies) {
  return {
    'request': function (config) {
        config.headers = config.headers || {};
        if ($cookies.getObject('globals') && $cookies.getObject('globals').currentUser) {
            config.headers.Authorization = 'Bearer ' + $cookies.getObject('globals').currentUser.token;
        }
        return config;
    },
    'response': function(response) {

        if (response.status === 401) {
            $injector.get('$state').go('index.logout');
            return $q.reject(response);
        }
        return response || $q.when(response);
    },

    'responseError': function(rejection) {

        if (rejection.status === 401) {
            $injector.get('$state').go('index.logout');
            return $q.reject(rejection);
        }
        return $q.reject(rejection);
    }
  };
}
