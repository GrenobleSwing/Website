function CurrentUserService(resource) {
  this.userResource = resource;
  this.user = {$ok: false};
  this.init_();
}

CurrentUserService.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    getByLogin: function getByLogin(login) {
      this.user = this.userResource.getByUsername(login).then(this.handleSuccess_, this.handleError_('Error getting user by username'));
      return this.user;
    },

    getCurrentUser: function getCurrentUser() {
      return this.user;
    },

    update: function update() {
        return this.userResource.update(this.user).then(this.handleSuccess_, this.handleError_('Error updating user'));
    },

    handleSuccess_ : function handleSuccess_(response) {
      this.user = response;
      this.user.$ok = true;
      return this.user;
    },

    handleError_ : function handleError_(message) {
      // console.error(message);
    }
};
