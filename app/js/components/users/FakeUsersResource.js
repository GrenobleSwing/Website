function FakeUsersResource($timeout, $filter, $q, $resource) {
  this.timeout = $timeout;
  this.filter = $filter;
  this.q = $q;

  this.users = JSON.stringify([]);

  this.resource = $resource('resources/sample/users.json', {});

  this.init_();
}

FakeUsersResource.prototype = {

    init_: function init_() {
      this.getUsers_ = this.getUsers_.bind(this);

      this.resource.query(function(users) {
        this.setUsers_(users);
      }.bind(this));
    },

    getAll : function getAll() {
        var deferred = this.q.defer();
        deferred.resolve(this.getUsers_());
        return deferred.promise;
    },

    getById: function getById(id) {
        var deferred = this.q.defer();
        var filtered = this.filter('filter')(this.getUsers_(), { id: id });
        var user = filtered.length ? filtered[0] : null;
        deferred.resolve(user);
        return deferred.promise;
    },

    getByUsername : function getByUsername(username) {
        var deferred = this.q.defer();
        var filtered = this.filter('filter')(this.getUsers_(), { login: username });
        var user;
        if(!! filtered.length) {
          user = filtered[0];
          user.$ok = true;
        } else {
            user = {$ok : false};
        }
        deferred.resolve(user);
        return deferred.promise;
    },

    create: function create(user) {
        var deferred = this.q.defer();

        // simulate api call with $timeout
          var filtered = this.filter('filter')(this.getUsers_(), { login: user.login });
          if (filtered.length > 0) {
              deferred.resolve({ success: false, message: 'Username "' + user.login + '" is already taken' });
          } else {
              var users = this.getUsers_();

              // assign id
              var lastUser = users[users.length - 1] || { id: 0 };
              user.id = lastUser.id + 1;

              // save to local storage
              users.push(user);
              this.setUsers_(users);

              deferred.resolve({ $ok: true });
          }

        return deferred.promise;
    },

    update: function update(user) {
        var deferred = this.q.defer();

        var users = this.getUsers_();
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === user.id) {
                users[i] = user;
                break;
            }
        }
        this.setUsers_(users);
        deferred.resolve();

        return deferred.promise;
    },

    remove: function remove(id) {
        var deferred = $q.defer();

        var users = this.getUsers_();
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            if (user.id === id) {
                users.splice(i, 1);
                break;
            }
        }
        this.setUsers_(users);
        deferred.resolve();

        return deferred.promise;
    },

    // private functions
    getUsers_ : function getUsers_() {
        if(!this.users){
            this.users = JSON.stringify([]);
        }

        return JSON.parse(this.users);
    },

    setUsers_ : function setUsers_(users) {
        this.users = JSON.stringify(users);
    }
};
