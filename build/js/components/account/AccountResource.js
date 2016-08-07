function AccountResource($http) {
  this.http = $http;

  this.init_();
}

AccountResource.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    getById: function getById(id) {
        return this.http.get('/api/account/' + id).then(this.handleSuccess_, this.handleError_('Error getting account by id'));
    },

    /**
  	 *
  	 * @return {
  	 *   userId: %integer%,
  	 *   login: %email%,
  	 *   firstName: %string%,
  	 *   lastName: %string%,
  	 *   gender: %male/female%,
  	 *   primaryRole: %lead/follow%,
  	 *   country: %string%,
  	 *   city: %string%,
  	 *   address: %string%,
  	 *   postalCode: %zipCode%
  	 * }
  	 */
    getByUserId: function getByUserId(userId) {
        return this.http.get('/api/account/user/' + userId).then(this.handleSuccess_, this.handleError_('Error getting account by accountname'));
    },

    /**
  	 *
  	 * @return [{
  	 *   userId: %integer%,
  	 *   login: %email%,
  	 *   firstName: %string%,
  	 *   lastName: %string%,
  	 *   gender: %male/female%,
  	 *   primaryRole: %lead/follow%
  	 * }, ...]
  	 */
	  getAll: function getAll() {
        return this.http.get('/api/account').then(this.handleSuccess_, this.handleError_('Error getting all accounts'));
    },

    /**
  	 *
  	 * @param {
  	 *   userId: %integer%,
  	 *   firstName: %string%,
  	 *   lastName: %string%,
  	 *   gender: %male/female%,
  	 *   primaryRole: %lead/follow%,
  	 *   country: %string%,
  	 *   city: %string%,
  	 *   address: %string%,
  	 *   postalCode: %zipCode%
  	 * }
  	 */
    create: function create(account) {
        return this.http.post('/api/account', account).then(this.handleSuccess_, this.handleError_('Error creating account'));
    },

    /**
  	 *
  	 * @param {
  	 *   userId: %integer%,
  	 *   firstName: %string%,
  	 *   lastName: %string%,
  	 *   gender: %male/female%,
  	 *   primaryRole: %lead/follow%,
  	 *   country: %string%,
  	 *   city: %string%,
  	 *   address: %string%,
  	 *   postalCode: %zipCode%
  	 * }
  	 */
    update: function update(account) {
        return this.http.put('/api/account/' + account.id, account).then(this.handleSuccess_, this.handleError_('Error updating account'));
    },

    // remove: function remove(id) {
    //     return this.http.delete('/api/account/' + id).then(this.handleSuccess_, this.handleError_('Error deleting account'));
    // },

    // private functions
    handleSuccess_ : function handleSuccess_(res) {
        return res.data;
    },

    handleError_: function handleError_(error) {
        return function () {
            return { success: false, message: error };
        };
    }
};
