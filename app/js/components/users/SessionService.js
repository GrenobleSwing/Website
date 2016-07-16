function SessionService() {
  this.userId = 0;
  this.roles = [];
}

SessionService.prototype = {
  createSession: function(user, roles) {
    this.userId = user.id;
    this.roles = roles;
  },

  clearSession : function() {
    this.userId = 0;
    this.roles = [];
  },

  exists : function exists() {
    return !!this.userId;
  }
};
