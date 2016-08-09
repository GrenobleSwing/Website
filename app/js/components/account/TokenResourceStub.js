function UsersResourceStub($timeout, $filter, $q, $resource) {
  this.timeout = $timeout;
  this.filter = $filter;
  this.q = $q;

  this.items = JSON.stringify([]);

  this.resource = $resource('resources/sample/token.json', {});

  this.init_();
}

UsersResourceStub.prototype = {

    init_: function init_() {
      this.getItems_ = this.getItems_.bind(this);

      this.resource.query(function(items) {
        this.setItems_(items);
      }.bind(this));
    },

    getAll : function getAll() {
        var deferred = this.q.defer();
        deferred.resolve(this.getItems_());
        return deferred.promise;
    },

    getById: function getById(id) {
        var deferred = this.q.defer();
        var filtered = this.filter('filter')(this.getItems_(), { id: id });
        var item = filtered.length ? filtered[0] : null;
        deferred.resolve(item);
        return deferred.promise;
    },

    getByUsername : function getByUsername(itemname) {
        var deferred = this.q.defer();
        var filtered = this.filter('filter')(this.getItems_(), { login: itemname });
        var item;
        if(!! filtered.length) {
          item = filtered[0];
          item.$ok = true;
        } else {
            item = {$ok : false};
        }
        deferred.resolve(item);
        return deferred.promise;
    },

    create: function create(item) {
        var deferred = this.q.defer();

        // simulate api call with $timeout
          var filtered = this.filter('filter')(this.getItems_(), { login: item.login });
          if (filtered.length > 0) {
              deferred.resolve({ success: false, message: 'Username "' + item.login + '" is already taken' });
          } else {
              var items = this.getItems_();

              // assign id
              var lastUser = items[items.length - 1] || { id: 0 };
              item.id = lastUser.id + 1;

              // save to local storage
              items.push(item);
              this.setItems_(items);

              deferred.resolve({ $ok: true });
          }

        return deferred.promise;
    },

    update: function update(item) {
        var deferred = this.q.defer();

        var items = this.getItems_();
        for (var i = 0; i < items.length; i++) {
            if (items[i].id === item.id) {
                items[i] = item;
                break;
            }
        }
        this.setItems_(items);
        deferred.resolve();

        return deferred.promise;
    },

    remove: function remove(id) {
        var deferred = $q.defer();

        var items = this.getItems_();
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.id === id) {
                items.splice(i, 1);
                break;
            }
        }
        this.setItems_(items);
        deferred.resolve();

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
