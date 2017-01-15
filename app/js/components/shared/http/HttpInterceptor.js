function HttpInterceptor($q, $location) {
  return {
    'response': function(response) {
        if (response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
        }
        return response || $q.when(response);
    },

    'responseError': function(rejection) {

        if (rejection.status === 401) {
            $location.path('/login');
            return $q.reject(rejection);
        }
        return $q.reject(rejection);
    }
  };
}
