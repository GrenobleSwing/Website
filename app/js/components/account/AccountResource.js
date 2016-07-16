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

    getByUserId: function getByUserId(userId) {
        return this.http.get('/api/account/user/' + userId).then(this.handleSuccess_, this.handleError_('Error getting account by accountname'));
    },

	  getAll: function getAll() {
        return this.http.get('/api/account').then(this.handleSuccess_, this.handleError_('Error getting all accounts'));
    },

    create: function create(account) {
        return this.http.post('/api/account', account).then(this.handleSuccess_, this.handleError_('Error creating account'));
    },

    update: function update(account) {
        return this.http.put('/api/account/' + account.id, account).then(this.handleSuccess_, this.handleError_('Error updating account'));
    },

    remove: function remove(id) {
        return this.http.delete('/api/account/' + id).then(this.handleSuccess_, this.handleError_('Error deleting account'));
    },

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
