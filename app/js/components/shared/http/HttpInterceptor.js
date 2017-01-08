function HttpInterceptor($q, $injector) {
  this.q = $q;
  this.injector = $injector;
}

HttpInterceptor.prototype =  {

    responseError : function responseError(response) {
        if (response.status == 401){
          this.injector.get('$state').transitionTo('login');
        }
        return this.q.reject(response);
    }
};
