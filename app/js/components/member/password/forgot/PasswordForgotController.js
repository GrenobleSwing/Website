function PasswordForgotController($http, $state) {
  this.state = $state;
  this.http = $http;
  this.email = "";
}

PasswordForgotController.prototype = {

  reset: function reset() {
    return  this.http.put(this.config.apiUrl + '/forgot', {email: this.email}).$promise.then(function() {
      this.state.go('index.password.sent');
    }.bind(this));
  }
};
