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

    getCurrentRoles : function getCurrentRoles() {
      var roles = ["GUEST"];
      if (!!this.user && this.user.roles.length > 0) {
        roles = this.user.roles;
      }
      return roles;
    },

    update: function update() {
        return this.userResource.update(this.user).then(this.handleSuccess_, this.handleError_('Error updating user'));
    },

    handleSuccess_ : function handleSuccess_(response) {
      if (!response || !response.$ok) {
        this.user = {
          $ok: false,
          user: {id: 0},
          roles: []
        };
      } else {
        this.user = response;
      }
      return this.user;
    },

    handleError_ : function handleError_(message) {
      // console.error(message);
    }
};
