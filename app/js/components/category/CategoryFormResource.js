function CategoryFormResource($http, config) {
  this.http = $http;
  this.config = config;

  this.init_();
}

CategoryFormResource.prototype = {
    init_ : function init_() {

    },

    getCreateFormByActivity : function getCreateFormByActivity(activity) {
      return this.http.get(this.config.apiUrl + '/activity/'+activity.id+'/category/new');
    },

    getEditForm : function getEditForm(category) {
      return this.http.get(this.config.apiUrl + '/category/'+category.id+'/edit');
    },

    getDeleteForm : function getDeleteForm(category) {
      return this.http.get(this.config.apiUrl + '/category/'+category.id+'/remove');
    }
};
