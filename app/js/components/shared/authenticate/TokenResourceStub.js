function TokenResourceStub($timeout, $filter, $q, $resource, userResource) {
  this.timeout = $timeout;
  this.filter = $filter;
  this.q = $q;

  this.items = JSON.stringify([]);

  this.resource = $resource('resources/sample/token.json', {});
  this.userResource = userResource;

  this.init_();
}

TokenResourceStub.prototype = {

    init_: function init_() {
      this.getItems_ = this.getItems_.bind(this);

      this.resource.query(function(items) {
        this.setItems_(items);
      }.bind(this));
    },

    authenticate : function authenticate(username, password) {
        var deferred = this.q.defer();
        var filtered = this.filter('filter')(this.getItems_(), { login: username });
        var item;
        if(!! filtered.length) {
          item = filtered[0];
          item.$ok = true;
          deferred.resolve(item);
        } else {
            item = {$ok : false};
            deferred.reject(item);
        }
        this.userResource.setCurrentUser(item);
        return deferred.promise;
    },

    // private functions
    getItems_ : function getItems_() {
        if(!this.items){
            this.items = JSON.stringify([]);
        }

        return JSON.parse(this.items);
    },

    setItems_ : function setItems_(items) {
        this.items = JSON.stringify(items);
    }
};
