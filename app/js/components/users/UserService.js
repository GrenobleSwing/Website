function UserService(resource) {
  this.usersResource = resource;

  this.init_();
}

UserService.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    getById: function getById(id) {
        return this.usersResource.getById(id).then(this.handleSuccess_, this.handleError_('Error getting user by id'));
    },

    getByUsername: function getByUsername(username) {
        return this.usersResource.getByUsername(username).then(this.handleSuccess_, this.handleError_('Error getting user by username'));
    },

    create: function create(user) {
        return this.usersResource.create(user).then(this.handleSuccess_, this.handleError_('Error creating user'));
    },

    update: function update(user) {
        return this.usersResource.update(user).then(this.handleSuccess_, this.handleError_('Error updating user'));
    },

    remove: function remove(id) {
        return this.usersResource.remove(id).then(this.handleSuccess_, this.handleError_('Error deleting user'));
    },

    // private functions
    handleSuccess_ : function handleSuccess_(res) {
        return res;
    },

    handleError_: function handleError_(error) {
        return error;
    }
};
