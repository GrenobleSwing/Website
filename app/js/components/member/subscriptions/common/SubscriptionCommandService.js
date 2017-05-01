function SubscriptionCommandService($http, config) {
  this.http = $http;
}

SubscriptionCommandService.prototype = {

  wait: function wait(subscriptionId) {
      return this.http.post(this.config.apiUrl + '/registration/'+subscriptionId+'/wait');
  },

  validate: function validate(subscriptionId) {
      return this.http.post(this.config.apiUrl + '/registration/'+subscriptionId+'/validate');
  },

  pay: function pay(subscriptionId) {
      return this.http.post(this.config.apiUrl + '/registration/'+subscriptionId+'/pay');
  },

  cancel: function cancel(subscriptionId) {
      return this.http.post(this.config.apiUrl + '/registration/'+subscriptionId+'/cancel');
  }
};
