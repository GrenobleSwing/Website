function YearFormResource($http, config) {
  this.http = $http;
  this.config = config;

  this.init_();
}

YearFormResource.prototype = {
    init_ : function init_() {

    },

    getNew : function getNew(id) {
      return this.http.get(this.config.apiUrl + '/activity/new');
    },

    getEdit: function getEdit(activity) {
        return this.http.get(this.config.apiUrl + '/activity/'+activity.id+'/edit');
    }
};
