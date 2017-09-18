function AuthenticationService($rootScope, $cookies, $http, config) {

  this.rootScope = $rootScope;
  this.cookies = $cookies;

  this.http = $http;
  this.config = config;

  this.init_();
}

AuthenticationService.prototype = {
    init_ : function init_() {
      this.handleLoginSuccess_ = this.handleLoginSuccess_.bind(this);
    },

    login: function login(username, password) {
      return this.http.post(this.config.apiUrl + '/auth', {"login": username, "password": password}).then(this.handleLoginSuccess_);
    },

    clearCredentials : function clearCredentials() {

        this.rootScope.globals = {};
        this.cookies.remove('globals');
        this.http.defaults.headers.common.Authorization = 'Bearer';
    },

    getIdentity: function getIdentity(force) {
      return this.http.get(this.config.apiUrl + '/identity', { transformResponse: function(response, headersGetter, status) {
//        console.info(response);
        var data = JSON.parse(response);
        data.login = data.email;
//        console.info(data);
        return data;
      }});
    },

    getCurrentAccount : function getCurrentAccount() {
      return this.getIdentity().then(function(response) {
        return this.http.get(this.config.apiUrl + '/user/' + response.data.id + '/account', { cache: true });
      }.bind(this));
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
      // console.info(data);
      return data !== undefined && data.currentUser !== undefined && data.currentUser.token !== undefined;
    },

    /**
     * @link https://jwt.io/introduction/
     * @private
     */
    handleLoginSuccess_ : function handleLoginSuccess_(response) {
      // console.info(response);
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
