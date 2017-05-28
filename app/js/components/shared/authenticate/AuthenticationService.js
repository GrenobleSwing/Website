function AuthenticationService($rootScope, $cookies, $http, $q, authResource) {
  this.authResource = authResource;
  this.rootScope = $rootScope;
  this.cookies = $cookies;
  this.q = $q;
  this.http = $http;

  this.init_();
}

AuthenticationService.prototype = {
    init_ : function init_() {
      this.handleLoginSuccess_ = this.handleLoginSuccess_.bind(this);
    },

    login: function login(username, password) {
      return this.authResource.authenticate(username, password).then(this.handleLoginSuccess_);
    },

    clearCredentials : function clearCredentials() {

      // return this.authResource.terminate(this.cookies.getObject('globals').currentUser).then(function(response) {
        this.rootScope.globals = {};
        this.cookies.remove('globals');
        this.http.defaults.headers.common.Authorization = 'Bearer';
      //   return response;
      // }.bind(this));
    },

    getIdentity: function getIdentity(force) {
      // var deferred = this.q.defer();
      //
      // if (this.isIdentified_() && !force) {
      //   deferred.resolve({data : this.cookies.getObject('globals').currentUser});
      //   return deferred.promise;
      // }

      return this.authResource.getCurrentUser();
    },


    isAnonymous : function isAnonymous() {
      return !this.isIdentified_();
    },

    isAuthenticated : function isAuthenticated() {
      return this.isIdentified_();
    },

    /**
     * @private
     */
    isIdentified_: function isIdentified_() {
      var data = this.cookies.getObject('globals');
      console.info(data);
      return data !== undefined && data.currentUser !== undefined && data.currentUser.token !== undefined;
    },

    /**
     * @link https://jwt.io/introduction/
     * @private
     */
    handleLoginSuccess_ : function handleLoginSuccess_(response) {
      console.info(response);
      var user = response.data;
      this.rootScope.globals = {
        currentUser: {
            userId : user.id,
            login : user.login,
            roles : user.roles,
            token : user.token
        }
      };

      var expirationDate = new Date();
      expirationDate.setSeconds(user.expires_in);
      this.cookies.putObject('globals', this.rootScope.globals, {expires: expirationDate});

      this.http.defaults.headers.common.Authorization = 'Bearer ' + user.token;
      return response;
    }
};
