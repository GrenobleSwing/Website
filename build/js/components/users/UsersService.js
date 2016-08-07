function UsersService(usersResource) {
  this.usersResource = usersResource;

  this.init_();
}

UsersService.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    getById: function getById(id) {
        return this.usersResource.getById(id).then(this.handleSuccess_, this.handleError_('Error getting user by id'));
    },

    getAll: function getAll() {
        return this.usersResource.getAll().then(this.handleSuccess_, this.handleError_('Error getting all users'));
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
