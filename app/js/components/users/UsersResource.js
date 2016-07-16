function UsersResource($http) {
  this.http = $http;

  this.init_();
}

UsersResource.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    getById: function getById(id) {
        return this.http.get('/api/user/' + id).then(this.handleSuccess_, this.handleError_('Error getting user by id'));
    },

    getByUsername: function getByUsername(username) {
        return this.http.get('/api/user/' + username).then(this.handleSuccess_, this.handleError_('Error getting user by username'));
    },

	  getAll: function getAll() {
        return this.http.get('/api/users').then(this.handleSuccess_, this.handleError_('Error getting all users'));
    },

    create: function create(user) {
        return this.http.post('/api/user', user).then(handleSuccess_, this.handleError_('Error creating user'));
    },

    update: function update(user) {
        return this.http.put('/api/user/' + user.id, user).then(handleSuccess_, this.handleError_('Error updating user'));
    },

    remove: function remove(id) {
        return this.http.delete('/api/user/' + id).then(handleSuccess_, this.handleError_('Error deleting user'));
    },

    // private functions
    handleSuccess_ : function handleSuccess_(res) {
      res.$ok = true;
      return res;
    },

    handleError_: function handleError_(error) {
        return function () {
            return { $ok: false, message: error };
        };
    }
};
