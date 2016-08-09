function FakeAccountResource($timeout, $filter, $q, $resource) {
  this.timeout = $timeout;
  this.filter = $filter;
  this.q = $q;

  this.items = JSON.stringify([]);

  this.resource = $resource('resources/sample/accounts.json', {});

    this.init_();
}

FakeAccountResource.prototype = {

  init_: function init_() {
    this.getItems_ = this.getItems_.bind(this);
    this.setItems_ = this.setItems_.bind(this);

    this.resource.query(function(items) {
      this.setItems_(items);
    }.bind(this));
  },

  getById : function getById(id) {
      var deferred = this.q.defer();
      var filtered = this.filter('filter')(this.getItems_(), { id: id });
      var item = filtered.length ? filtered[0] : null;
      deferred.resolve(item);
      return deferred.promise;
  },

  getByUserId : function getByUserId(userId) {
      var deferred = this.q.defer();
      this.resource.query(function(items) {
        var filtered = this.filter('filter')(items, { userId: userId });
        var item = filtered.length ? filtered[0] : {};
        deferred.resolve(item);
      }.bind(this));
      return deferred.promise;
  },

  create: function create(item) {
      var deferred = this.q.defer();

      // simulate api call with $timeout
      var filtered = this.filter('filter')(this.getItems_(), { id: item.id });
      if (filtered.length > 0) {
          deferred.resolve({ success: false, message: 'Account "' + item.name + '" is already taken' });
      } else {
          var items = this.getItems_();

          // assign id
          var lastAccount = items[item.length - 1] || { id: 0 };
          infos.id = lastAccount.id + 1;

          // save to local storage
          items.push(item);
          this.setItems_(items);

          deferred.resolve({ success: true });
      }

      return deferred.promise;
  },

  update: function update(item) {
      var deferred = this.q.defer();

      var items = this.getItems_();
      for (var i = 0; i < infos.length; i++) {
          if (items[i].id === info.id) {
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
      if(!this.items) {
          this.items = JSON.stringify([]);
      }

      return JSON.parse(this.items);
  },

  setItems_ : function setItems_(items) {
      this.items = JSON.stringify(items);
  }
};
