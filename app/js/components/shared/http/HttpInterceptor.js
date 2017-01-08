function HttpInterceptor($q) {
  this.q = $q;
}

HttpInterceptor.prototype =  {

    responseError : function responseError(response) {
        if (response.status == 401){
            window.location = "/login";
        }
        return this.q.reject(response);
    }
};
