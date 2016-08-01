function UsersResource($http) {
  this.http = $http;

  this.init_();
}

UsersResource.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    /**
  	 *
  	 * @return {
     *  id: %integer%,
     *  login: %email%,
     *  authdata: %string%
     * }
  	 */
    getCurrentUser: function getCurrentUser() {
        return this.http.get('/api/identity').then(this.handleSuccess_, this.handleError_('Error getting user by id'));
    },

    /**
  	 *
  	 * @return {
     *  id: %integer%,
     *  login: %email%,
     *  password: %string%
     * }
  	 */
    getById: function getById(id) {
        return this.http.get('/api/user/' + id).then(this.handleSuccess_, this.handleError_('Error getting user by id'));
    },

    /**
     *
     * @return {
     *  id: %integer%,
     *  login: %email%,
     *  password: %string%
     * }
     */
    getByUsername: function getByUsername(username) {
        return this.http.get('/api/user/' + username).then(this.handleSuccess_, this.handleError_('Error getting user by username'));
    },

    /**
     *
     * @return [{
     *  id: %integer%,
     *  login: %email%,
     *  password: %string%
     * }, ...
     */
	  getAll: function getAll() {
        return this.http.get('/api/users').then(this.handleSuccess_, this.handleError_('Error getting all users'));
    },

    /**
     *
     * @param {
     *  login: %email%,
     *  password: %string%
     * }
     */
    create: function create(user) {
        return this.http.post('/api/user', user).then(handleSuccess_, this.handleError_('Error creating user'));
    },

    /**
     *
     * @param {
     *  id: %integer%,
     *  login: %email%,
     *  password: %string%
     * }
     */
    update: function update(user) {
        return this.http.put('/api/user/' + user.id, user).then(handleSuccess_, this.handleError_('Error updating user'));
    },

    /**
  	 *
  	 * @param id user's identifier
  	 */
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
