function UsersResource($http, config) {
  this.config = config;
  this.http = $http;

  this.init_();
}

UsersResource.prototype = {
    init_ : function init_() {

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
        return this.http.get(this.config.apiUrl + '/api/user/' + id).$promise;
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
        return this.http.get(this.config.apiUrl + '/api/user/' + username).$promise;
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
        return this.http.get(this.config.apiUrl + '/api/users').$promise;
    },

    /**
     *
     * @param {
     *  login: %email%,
     *  password: %string%
     * }
     */
    create: function create(user) {
        return this.http.post(this.config.apiUrl + '/api/user', user).$promise;
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
        return this.http.put(this.config.apiUrl + '/api/user/' + user.id, user).$promise;
    },

    /**
  	 *
  	 * @param id user's identifier
  	 */
    remove: function remove(id) {
        return this.http.delete(this.config.apiUrl + '/api/user/' + id).$promise;
    }
};
