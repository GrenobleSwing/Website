function AuthorizeService(sessionService)  {
  this.permissions = {
    'GUEST' : ['login'],
    'MEMBER' : ['logout', 'home_view', 'account_view', 'account_edit'],
    'TOPIC_OWNER' : ['logout', 'home_view', 'topic_view', 'topic_edit'],
    'TOPIC_MANAGER' : ['logout', 'home_view', 'topic__management_view', 'topic_management_edit'],
    'MEMBERS_MANAGER' : ['logout', 'home_view'],
    'SECRETARY' : ['logout', 'home_view', 'secretary_view'],
    'TREASURER' : ['logout', 'home_view', 'treasury_view'],
  };

  this.userRoles = !!sessionService.roles ? sessionService.roles : [];
}

AuthorizeService.prototype = {
  changeRoles : function changeRoles(newRoles) {
    this.userRoles = newRoles;
  },

  clearRoles : function clearRoles() {
    this.userRoles = [];
  },

  canAccess: function allow(privilege) {
    var isAllowed = false;
    for (var i = 0; i < this.userRoles.length; i++) {
        if (this.permissions[this.userRoles[i]].indexOf(privilege) !== -1) {
          isAllowed = true;
          break;
        }
    }
    return isAllowed;
  }
};
