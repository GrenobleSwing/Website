function MembersResourceStub($filter, $q, $resource) {
  this.filter = $filter;
  this.q = $q;

  this.members = JSON.stringify([]);

  this.resource = $resource('resources/sample/accounts.json', null, { query: { method: 'GET', isArray: true } });

  this.init_();
}


MembersResourceStub.prototype = {

  init_: function init_() {
    this.getItems_ = this.getItems_.bind(this);
    this.setItems_ = this.setItems_.bind(this);

    this.resource.query(function(data) {
      this.setItems_(data);
    }.bind(this));
  },

  getAll : function getAll(params) {
      var deferred = this.q.defer();
      this.resource.query(function(data) {
        deferred.resolve(data);
      }.bind(this));
      return deferred.promise;
  },

  // private functions
  getItems_ : function getItems_() {
      if(!this.members){
          this.members = JSON.stringify([]);
      }

      return JSON.parse(this.members);
  },

  setItems_ : function setItems_(data) {
      this.members = JSON.stringify(data);
  }
};
