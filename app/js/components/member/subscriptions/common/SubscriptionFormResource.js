function SubscriptionFormResource($http, config) {
  this.http = $http;
  this.config = config;

  this.init_();
}

SubscriptionFormResource.prototype = {
    init_ : function init_() {

    },

    getCreateFormByTopic : function getCreateFormByTopic(topic) {
      return this.http.get(this.config.apiUrl + '/topic/'+topic.id+'/registration/new');
    },

    getEditForm : function getEditForm(registration) {
      return this.http.get(this.config.apiUrl + '/registration/'+registration.id+'/edit');
    },

    getDeleteForm : function getDeleteForm(registration) {
      return this.http.get(this.config.apiUrl + '/registration/'+registration.id+'/remove');
    }
};
