function TopicFormResource($http, config) {
  this.http = $http;
  this.config = config;

  this.init_();
}

TopicFormResource.prototype = {
    init_ : function init_() {

    },

    getCreateFormByActivity : function getCreateFormByActivity(activity) {
      return this.http.get(this.config.apiUrl + '/activity/'+activity.id+'/topic/new');
    },

    getEditForm : function getEditForm(topic) {
      return this.http.get(this.config.apiUrl + '/topic/'+topic.id+'/edit');
    },

    getDeleteForm : function getDeleteForm(topic) {
      return this.http.get(this.config.apiUrl + '/topic/'+topic.id+'/remove');
    }
};
