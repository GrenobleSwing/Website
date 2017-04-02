function HttpInterceptor($q, $injector) {
  return {
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
