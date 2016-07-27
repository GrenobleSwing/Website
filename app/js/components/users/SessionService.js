function SessionService($cookieStore) {
  this.cookieStore = $cookieStore;
}

SessionService.prototype = {

  getUser: function getUser() {
    return $cookieStore.get('globals').currentUser;
  },

  getRoles: function getRoles() {
    return $cookieStore.get('globals').currentRoles;
  },

  exists : function exists() {
    return !!$cookieStore.get('globals').currentUser;
  }
};
