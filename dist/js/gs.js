function HomeController() {
  this.init_();
}

HomeController.prototype = {

  init_: function init_() {
    // console.info("Message=Welcome home !");
  }
};

function HomeRouterConfig($stateProvider) {
  $stateProvider
    .state('member.home', {
      url: '/home',
      views: {
        'content@': {
          templateUrl: "components/main/home/home.html",
          controller: "homeController",
          controllerAs: "ctrl"
        },
        'header@' : {
          template : '<gs-main-nav></gs-main-nav>'
        }
      }
  });
}

function LoginController($scope, $state, authService, aclService) {
  this.scope = $scope;
  this.state = $state;

  this.login = "";
  this.password = "";
  this.authFailed = false;

  this.authService = authService;
  this.aclService = aclService;

  this.handleSuccess_ = this.handleSuccess_.bind(this);
  this.handleError_ = this.handleError_.bind(this);
}

LoginController.prototype = {

  connect : function connect() {
    this.authFailed = false;
    return this.authService
      .login(this.login, this.password)
      .then(this.handleSuccess_, this.handleError_);
  },

  handleSuccess_ : function handleSuccess_(identity) {
    // console.info("Message=Log in failed");
    if (!!this.scope.returnToState && this.scope.returnToState.name != 'index.login' &&
      this.scope.returnToState.name != '404' && this.scope.returnToState.name != 'access-denied') {
        // console.info("Message=Redirecting to " + this.scope.returnToState.name);
      return this.state.go(this.scope.returnToState.name, this.scope.returnToStateParams);
    } else {
      return this
        .aclService
        .isInAnyRole(['ROLE_USER'])
        .then(function(response) {
          // console.info("Message=Going to member.home");
          return this.state.go('member.home');
        }.bind(this), this.handleError_);
    }
  },

  handleError_ : function handleError_(error)  {
    // console.info("Message=Log in failed");
    // console.info(error);
    this.authFailed = true;
    return error;
  }
};

function LoginRouterConfig($stateProvider) {
  $stateProvider
    .state('index.login', {
      url: '/login',
      views: {
        'content@': {
          templateUrl: 'components/main/login/login.html',
          controller: "loginController",
          controllerAs: "ctrl"
        }
      },
      data: {
        permissions: {
          only: ['ANONYMOUS']
        }
      }
    });
}

function LogoutController($rootScope, $cookies, $state, $http, config, authenticationService) {

  if (authenticationService.isAnonymous()) {
    // console.info("Message=Clearing credentials...");
    authenticationService.clearCredentials();
    return $state.go('index.login');
  } else {
    // console.info("Message=Disconnecting...");
    $http
      .get(config.apiUrl + '/disconnect')
      .finally(function() {
//        $rootScope.globals = {};
//        $cookies.remove('globals');
//        $http.defaults.headers.common.Authorization = 'Bearer';
        authenticationService.clearCredentials();
        return $state.go('index.login');
      });
  
  }
}

function LogoutRouterConfig($stateProvider) {
  $stateProvider.state('index.logout', {
		url: '/logout',
    views: {
      'content@': {
        template : "<div />",
        controller: 'logoutController' 
      }
    },
    data: {
        permissions: {
          except: ['ANONYMOUS'],
          redirectTo: 'index.login'
        }
    }
  });
}

function MainNavController($state, authenticationService, config, $http, $rootScope, $cookies) {
  this.state = $state;
  this.config = config;

  this.authenticationService = authenticationService;

  this.logout = function() {
    return $http.get(config.apiUrl + '/disconnect').finally(function() {
      $rootScope.globals = {};
      $cookies.remove('globals');
      $http.defaults.headers.common.Authorization = 'Bearer';
      return $state.go('index.login');
    });
  }

  this.init_();
}

MainNavController.prototype = {

  init_: function init_() {
    return this.authenticationService
      .getIdentity()
      .then(function(response) {
        // // console.info(response);
        this.identity = response.data;
        return response;
      }.bind(this));
  }
};

function MainNavDirective() {
  return {
    templateUrl: 'components/main/main-navigation/navbar.html',
    controller: 'mainNavController',
    controllerAs: 'ctrl'
  };
}

function MainNavRouterConfig($stateProvider) {
  $stateProvider
    .state('main.nav', {
      templateUrl: 'components/main/main-navigation/navbar.html',
      controller: 'mainNavController',
      controllerAs: 'ctrl'
  });
}

/**
 * Contrôleur chargé d'afficher la page de remise à zéro du mot de passe
 * 
 * @param {*} $http 
 * @param {*} config 
 * @param {*} $scope 
 * @param {*} $sce 
 * @param {*} content 
 * @param {*} $compile 
 */
function PasswordResetController($http, config, $scope, $sce, content, $compile) {

  $scope.registerDone = false;
  $scope.registerSuccessful = false;
  $scope.formData = {};
  $scope.formData.user__token = content.match('value="(.*)" ')[1];

  $scope.trustedHtml = $sce.trustAsHtml(content
     .replace(' id="username" ', ' id="username" ng-model="formData.username" '));

  // process the form
  $scope.processForm = function($event, method, action) {

    $event.preventDefault();

    $http({
      method  : method,
      url     : config.apiUrl + action,
      // data : $.param($scope.formData),
      data    : {
        "username" :	$scope.formData.username
      },
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' },  // set the headers so angular passing info as form data (not request payload)
      transformRequest : function transformRequest( data, getHeaders ) {
					var headers = getHeaders();
          if ( ! angular.isObject( data ) ) {
						return( ( data == null ) ? "" : data.toString() );
					}
					var buffer = [];
					// Serialize each key in the object.
					for ( var name in data ) {
						if ( ! data.hasOwnProperty( name ) ) {
							continue;
						}
						var value = data[ name ];
						buffer.push(
							encodeURIComponent( name ) +
							"=" +
							encodeURIComponent( ( value == null ) ? "" : value )
						);
					}
					// Serialize the buffer and clean it up for transportation.
					var source = buffer
						.join( "&" )
						.replace( /%20/g, "+" )
					;
					return( source );
				}
     })
    .then(function(response) {
      console.log(response);
      $scope.registerDone = true;
      if (response.status == 302 || response.status == 200) {
        // if successful, bind success message to message
        $scope.registerSuccessful = true;
        $scope.successResponse = $sce.trustAsHtml(response.data);
      } else {
        $scope.registerSuccessful = false;
      }
    }, function(error) {
      console.log(error);
      $scope.registerDone = false;
      $scope.registerSuccessful = false;
      $scope.trustedHtml = $sce.trustAsHtml(error.data
        .replace(' id="username" ', ' id="username" ng-model="formData.username" '));
    });
  }
}

function PasswordResetRouterConfig($stateProvider) {
  $stateProvider.state('index.reset', {
      url: "/reset",
      data: {
        roles: []
      },
      views: {
        'content@': {
          templateUrl: 'components/main/reset/password.reset.html',
          controller: "passwordResetController",
          controllerAs: "ctrl"
        }
      },
      resolve: {
        content : ['$http', 'config', function($http, config) {
          return $http.get(config.apiUrl + '/resetting/request').then(function(response) {
            return response.data;
          });
        }]
      }
    });
}

function SignUpController($http, config, $scope, $sce, content, $compile, $state) {

  $scope.registerDone = false;
  $scope.registerSuccessful = false;
  $scope.formData = {};
  // $scope.formData.user__token = content.match('value="(.*)" ')[1];

  $scope.trustedHtml = $sce.trustAsHtml(content
     .replace("$element.action, $element.method", "$event, '/user', 'POST'")
     .replace(' id="user_email" ', ' id="user_email" ng-model="formData.user_email" ')
     .replace(' id="user_plainPassword_first" ', ' id="user_plainPassword_first" ng-model="formData.user_plainPassword_first" ')
     .replace(' id="user_plainPassword_second" ', ' id="user_plainPassword_second" ng-model="formData.user_plainPassword_second" '));

   $scope.cancelForm = function() {
     $state.go('index.login');
   }

  // process the form
  $scope.processForm = function($event, method, action) {
    // // console.info($event);
    $event.preventDefault();

    $http({
      method  : method,
      url     : config.apiUrl + action,
      // data : $.param($scope.formData),
      data    : {
        "user[email]" :	$scope.formData.user_email,
        "user[plainPassword][first]" :	$scope.formData.user_plainPassword_first,
        "user[plainPassword][second]" :	$scope.formData.user_plainPassword_second,
        "user[register]" :	""
        // ,"user[_token]" :	$scope.formData.user__token
      },
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' },  // set the headers so angular passing info as form data (not request payload)
      transformRequest : function transformRequest( data, getHeaders ) {
					var headers = getHeaders();
          if ( ! angular.isObject( data ) ) {
						return( ( data == null ) ? "" : data.toString() );
					}
					var buffer = [];
					// Serialize each key in the object.
					for ( var name in data ) {
						if ( ! data.hasOwnProperty( name ) ) {
							continue;
						}
						var value = data[ name ];
						buffer.push(
							encodeURIComponent( name ) +
							"=" +
							encodeURIComponent( ( value == null ) ? "" : value )
						);
					}
					// Serialize the buffer and clean it up for transportation.
					var source = buffer
						.join( "&" )
						.replace( /%20/g, "+" )
					;
					return( source );
				}
     })
    .then(function(data) {
      // console.log(data);
      $scope.registerDone = true;
      if (data.status != 201) {
        $scope.registerSuccessful = false;
      } else {
        // if successful, bind success message to message
        $scope.registerSuccessful = true;
      }
    }, function(error) {
      // console.log(error);

      $scope.trustedHtml = $sce.trustAsHtml(error.data
        .replace("$element.action, $element.method", "$event, \"/user\", \"POST\"")
        .replace(' id="user_email" ', ' id="user_email" ng-model="formData.user_email" ')
        .replace(' id="user_plainPassword_first" ', ' id="user_plainPassword_first" ng-model="formData.user_plainPassword_first" ')
        .replace(' id="user_plainPassword_second" ', ' id="user_plainPassword_second" ng-model="formData.user_plainPassword_second" '));
    });
  }
}

function SignUpRouterConfig($stateProvider) {
  $stateProvider
    .state('index.sign-up', {
      url: "/sign-up",
      views: {
        'content@': {
          templateUrl: "components/main/signup/signup.html",
          // template: '<section gs-dynamic="trustedHtml"></section><section><a href="#/login" class="btn btn-link">{{ "ACTION.BACK_TO_LOGIN" | translate}}</a></section>',
          controller: "signUpController",
          controllerAs: "ctrl"
        }
      },
      resolve: {
        content : ['$http', 'config', function($http, config) {
          return $http.get(config.apiUrl + '/user/new').then(function(response) {
            return response.data;
          });
        }]
      },
      data: {
        permissions: {
          only: ['ANONYMOUS']
        }
      }
    });
}

function MemberNavController($state) {
  this.state = $state;
  // // console.info("MemberNavController");
}

MemberNavController.prototype = {
  isActive: function isActive(name) {
    return (this.state.is(name) ? "active" : "");
  }
};

function MemberNavRouterConfig($stateProvider) {
  $stateProvider
    .state('member.nav', {
      templateUrl: 'components/member/member-navigation/navbar.html',
      controller: 'memberNavController',
      controllerAs: 'ctrl'
  });
}

function AccountController($http, config, userDetails, $sce, $scope, $compile) {
  $scope.saveDone = false;
  $scope.saveSuccessful = false;
  $scope.formData = {};

  $http.get(config.apiUrl + '/account/'+userDetails.id+'/edit').then(function(response) {
    $scope.formData.account__token = $("input#account__token", response.data).val();

    $scope.trustedHtml = $sce.trustAsHtml(response.data
       .replace(' name="account[firstName]" ', ' name="account[firstName]" ng-model="formData.account_firstName" ')
       .replace(' name="account[lastName]" ', ' name="account[lastName]" ng-model="formData.account_lastName" ')
       .replace(' name="account[phoneNumber]" ', ' name="account[lastName]" ng-model="formData.account_phoneNumber" ')
       .replace(' name="account[birthDate]" ', ' name="account[birthDate]" ng-model="formData.account_birthDate" ')
       .replace(' name="account[address][street]" ', ' name="account[address][street]" ng-model="formData.account_address_street" ')
       .replace(' name="account[address][city]" ', ' name="account[address][city]" ng-model="formData.account_address_city" ')
       .replace(' name="account[address][zipCode]" ', ' name="account[address][zipCode]" ng-model="formData.account_address_zipCode" ')
       .replace(' name="account[address][state]" ', ' name="account[address][state]" ng-model="formData.account_address_state" ')
       .replace(' name="account[address][country]" ', ' name="account[address][country]" ng-model="formData.account_address_country" ')
     );

     var date = userDetails.birthDate.match(/(\d{4})-(\d{2})-(\d{2})/);

     $scope.formData.account_firstName = $('#account_firstName', response.data).val();
     $scope.formData.account_lastName = $('#account_lastName', response.data).val();
     $scope.formData.account_phoneNumber = $('#account_phoneNumber', response.data).val();
     $scope.formData.account_birthDate = $('#account_birthDate', response.data).val();
     $scope.formData.account_address_street = $('#account_address_street', response.data).val();
     $scope.formData.account_address_city = $('#account_address_city', response.data).val();
     $scope.formData.account_address_zipCode = $('#account_address_zipCode', response.data).val();
     $scope.formData.account_address_state = $('#account_address_state', response.data).val();
     $scope.formData.account_address_country = $('#account_address_country', response.data).val();

     mySuperFunction();
  }.bind(this));

  $scope.processForm = function($event, method, action) {
    // // console.info($event);
    $event.preventDefault();

    $http({
      method  : method,
      url     : config.apiUrl + action,
      data    : {
        "account[firstName]" :	$scope.formData.account_firstName,
        "account[lastName]" :	$scope.formData.account_lastName,
        "account[phoneNumber]" :	$scope.formData.account_phoneNumber,
        "account[birthDate]" :	$scope.formData.account_birthDate,
        "account[address][street]" : $scope.formData.account_address_street,
        "account[address][city]" : $scope.formData.account_address_city,
        "account[address][zipCode]" : $scope.formData.account_address_zipCode,
        "account[address][state]" : $scope.formData.account_address_state,
        "account[address][country]" : $scope.formData.account_address_country
      },
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' },  // set the headers so angular passing info as form data (not request payload)
      transformRequest : function transformRequest( data, getHeaders ) {
					var headers = getHeaders();
          if ( ! angular.isObject( data ) ) {
						return( ( data == null ) ? "" : data.toString() );
					}
					var buffer = [];
					// Serialize each key in the object.
					for ( var name in data ) {
						if ( ! data.hasOwnProperty( name ) ) {
							continue;
						}
						var value = data[ name ];
						buffer.push(
							encodeURIComponent( name ) +
							"=" +
							encodeURIComponent( ( value == null ) ? "" : value )
						);
					}
					// Serialize the buffer and clean it up for transportation.
					var source = buffer
						.join( "&" )
						.replace( /%20/g, "+" )
					;
					return( source );
				}
     })
    .then(function(data) {
      console.log(data);
      $scope.saveDone = true;
      if (data.status != 204) {
        $scope.saveSuccessful = false;
      } else {
        // if successful, bind success message to message
        $scope.saveSuccessful = true;
      }
    }, function(error) {
      console.log(error);
      $scope.saveDone = true;
      $scope.saveSuccessful = false;

      $scope.trustedHtml = $sce.trustAsHtml(error.data
        .replace(' name="account[firstName]" ', ' name="account[firstName]" ng-model="formData.account_firstName" ')
        .replace(' name="account[lastName]" ', ' name="account[lastName]" ng-model="formData.account_lastName" ')
        .replace(' name="account[phoneNumber]" ', ' name="account[lastName]" ng-model="formData.account_phoneNumber" ')
        .replace(' name="account[birthDate][month]" ', ' name="account[birthDate][month]" ng-model="formData.account_birthDate_month" ')
        .replace(' name="account[birthDate][day]" ', ' name="account[birthDate][day]" ng-model="formData.account_birthDate_day" ')
        .replace(' name="account[birthDate][year]" ', ' name="account[birthDate][year]" ng-model="formData.account_birthDate_year" ')
        .replace(' name="account[address][street]" ', ' name="account[address][street]" ng-model="formData.account_firstName" ')
        .replace(' name="account[address][city]" ', ' name="account[address][city]" ng-model="formData.account_city" ')
        .replace(' name="account[address][zipCode]" ', ' name="account[address][city]" ng-model="formData.account_zipCode" ')
        .replace(' name="account[address][state]" ', ' name="account[address][state]" ng-model="formData.account_state" ')
        .replace(' name="account[address][country]" ', ' name="account[address][country]" ng-model="formData.account_country" ')
      );
      mySuperFunction();
    });
  }
}

function AccountDatepickerDirective() {
  return function(scope, element, attrs) {
      $(element).datepicker({
          inline: true,
          dateFormat: 'yyyy-mm-dd',
          onSelect: function(dateText) {
              var modelPath = $(this).attr('ng-model');
              putObject(modelPath, scope, dateText);
              scope.$apply();
          }
      });
  }
}

function AccountRouterConfig($stateProvider) {
  $stateProvider
    .state('member.account', {
      url: '/account',
      views: {
        'content@': {
          templateUrl: "components/member/account/account.html",
          controller: "accountController"
        }
      },
      resolve: {
        userDetails : ['authenticationService', function(authService) {
          return authService.getCurrentAccount().then(function(response) {
            return response.data;
          });
        }]
      }
    });
}

function SummaryController($scope, $http, userDetails, config, $sce) {
  this.http = $http;
  this.userDetails = userDetails;

  this.$ok = false;
  this.totalAmount = 0;
  this.list = $http.get(config.apiUrl + '/account/'+userDetails.id+'/balance').then(function(response) {

    this.list = response.data.details;
    this.$ok = true;
    this.totalAmount = response.data.totalBalance;
    this.trustedHtml = $sce.trustAsHtml(response.data.buttons);
  }.bind(this));
}

function SummaryDirective() {
  return {
    restrict: 'E',
    templateUrl: 'components/member/summary/summary.html',
    controller: 'summaryController',
    controllerAs: 'ctrl'
  };
}

function SummaryRouterConfig($stateProvider) {
  $stateProvider
    .state('member.summary', {
      url: "/summary",
      data: {
        roles: ['USER']
      },
      views: {
        'content@': {
          templateUrl: 'components/member/summary/summary.html',
          controller: 'summaryController',
          controllerAs: 'ctrl'
        }
      },
      resolve: {
        userDetails : ['authenticationService', function(authService) {
          return authService.getCurrentAccount().then(function(response) {
            return response.data;
          });
        }]
      }
    });
}

function AuthenticationService($rootScope, $cookies, $q, $http, config) {

  this.rootScope = $rootScope;
  this.cookies = $cookies;

  this.http = $http;
  this.config = config;
  this.q = $q;

  this.init_();
}

AuthenticationService.prototype = {
    init_ : function init_() {
      this.handleLoginSuccess_ = this.handleLoginSuccess_.bind(this);
    },

    login: function login(username, password) {
      return this
        .http
        .post(this.config.apiUrl + '/auth', {"login": username, "password": password})
        .then(this.handleLoginSuccess_);
    },

    clearCredentials : function clearCredentials() {

        this.rootScope.globals = {};
        this.cookies.remove('globals');
        this.http.defaults.headers.common.Authorization = 'Bearer';
    },

    getIdentity: function getIdentity(force) {
      // console.info("Message=Retrieving current identity...");
      var deferred = this.q.defer();
      if (this.isAnonymous()) {
        // console.info("Message=... is anonymous");
        return this.q.reject("Current user is anonymous");
      }

      // if (this.isAuthenticated() && !force) {
        // // console.info("Message=... is anonymous");
        // return this.q.resolve(this.cookies.getObject('globals').currentUser);
      //}

      return this
        .http
        .get(this.config.apiUrl + '/identity', { 
          transformResponse: function(response, headersGetter, status) {
            // console.info(response);
            var data = JSON.parse(response);
            data.login = data.email;
            // console.info(data);
            return data;
          }
        })
        .then(function onSuccess(response) {
          // console.info("Message=Retrieving identity is successful");
          return response;
        }, function onError(rejection) {
          console.error("Message=Retrieving identity failed");
          return this.q.reject(rejection.data);
        });
    },

    getCurrentAccount : function getCurrentAccount() {
      // console.info("Message=Retrieving current account...");
      return this
        .getIdentity()
        .then(function(response) {
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
     * Warning : the test for expiration is duplicated from the HTTP Interceptor in http.config.js
     * 
     * @private
     */
    isIdentified_: function isIdentified_() {
      var data = this.cookies.getObject('globals');
      var result = false;
      if (data !== undefined 
          && data.currentUser !== undefined 
          && data.currentUser.token !== undefined 
          && data.currentUser.expires_in !== undefined) {
        var now = new Date();
        var expirationDate = new Date(data.currentUser.expires_in);

        result = (now.getTime() < expirationDate.getTime());
      }
      return  result;
    },

    /**
     * @link https://jwt.io/introduction/
     * @private
     */
    handleLoginSuccess_ : function handleLoginSuccess_(response) {
      // // console.info(response);
      var user = response.data;
      var now = new Date();
      var expirationDate = new Date(now);
      expirationDate.setDate(now.getDate() + 30);

      this.rootScope.globals = {
        currentUser: {
            userId : user.id,
            login : user.login,
            roles : user.roles,
            token : user.token,
            expires_in : expirationDate.getTime()
        }
      };

      // console.info("Message=Setting expiration date with " + user.expires_in + " => " + expirationDate);
      this.cookies.putObject('globals', this.rootScope.globals, {expires: expirationDate});

      this.http.defaults.headers.common.Authorization = 'Bearer ' + user.token;
      return response;
    }
};

function AuthResource($http, config) {
  this.http = $http;
  this.config = config;
}

AuthResource.prototype = {

    authenticate: function authenticate(login, password) {
        return this.http.post(this.config.apiUrl + '/auth', {"login": login, "password": password});
    },

    getCurrentUser: function getCurrentUser() {
      // // console.info("IdentityResource#getCurrentUser");
      return this.http.get(this.config.apiUrl + '/identity', { cache: true, transformResponse: function(response, headersGetter, status) {
        // console.info(response);
        var data = JSON.parse(response);
        data.login = data.email;
        // console.info(data);
        return data;
      }});
    },

    terminate: function terminate(identity) {
        return this.http.post(this.config.apiUrl + '/logout', {login: identity.login});
    }
};

function CompareToDirective() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=gsCompareTo"
        },
        link: function (scope, element, attrs, ctrl) {

          ctrl.$validators.compareTo = function(modelValue) {
              return modelValue == scope.otherModelValue;
          };

          scope.$watch("otherModelValue", function() {
              ctrl.$validate();
          });
        }
    };
}

function DynamicDirective($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.gsDynamic, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
}

function StrengthDirective($parse) {
	return {
		require: 'ngModel',
		restrict: 'A',
		link: function(scope, elem, attrs, ctrl) {
      // This part is supposed to check the strength
			ctrl.$parsers.unshift(function(viewValue) {
				if(viewValue && viewValue.length >= 6) {
					ctrl.$setValidity('minLength', true);
				} else {
					ctrl.$setValidity('minLength', false);
				}

				if(viewValue && viewValue.length <= 16) {
					ctrl.$setValidity('maxLength', true);
				} else {
					ctrl.$setValidity('maxLength', false);
				}

				if(viewValue && /[A-z]/.test(viewValue)) {
					ctrl.$setValidity('letter', true);
				} else {
					ctrl.$setValidity('letter', false);
				}

				if(viewValue && /\d/.test(viewValue)) {
					ctrl.$setValidity('number', true);
				} else {
					ctrl.$setValidity('number', false);
				}

				return viewValue;
			});
		}
	};
}

function AclService($q, roleMap, authenticationService)  {
  this.q = $q;
  this.authenticationService = authenticationService;

  this.roleMap = roleMap;

  this.handleSuccess_ = this.handleSuccess_.bind(this);
  this.handleError_ = this.handleError_.bind(this);
}

AclService.prototype = {

  isInRole: function isInRole(role) {
    var deferred = this.q.defer();
    // console.info("Message=Checking one role...");
    this.authenticationService.getIdentity().then(function(response) {
      // // console.info(response);

      if (response.data.roles.indexOf(role) != -1 && this.roleMap[role] !== undefined) {
        // // console.info("AclService#isInRole#accept for " + role);
        deferred.resolve(this.roleMap[role]);
      } else {
        // // console.info("AclService#isInRole#reject for " + role);
        deferred.reject({'role' : 'none'});
      }
    }.bind(this));
    return deferred.promise;
  },

  isInAnyRole: function isInAnyRole(roles) {
    var deferred = this.q.defer();
    // console.info("Message=Checking multiple roles...");
    this.authenticationService.getIdentity().then(function(response) {
      // // console.info(response);
      var result = false;
      var targetRole = "none";
      for (var i = 0; i < roles.length; i++) {
          if (response.data.roles.indexOf(roles[i]) != -1) {
              result = true;
              targetRole = roles[i];
          }
      }

      if (result && this.roleMap[targetRole] !== undefined) {
        deferred.resolve(this.roleMap[targetRole]);
        // // console.info("AclService#isInAnyRole#accept");
      } else {
        // // console.info("AclService#isInAnyRole#reject");
        deferred.reject({});
      }

    }.bind(this));
    return deferred.promise;
  },

  hasPermission : function hasPermission(permissionName) {
    var deferred = this.q.defer();
    // // console.info(permissionName);
    // console.info("Message=Checking one permission...");
    this.authenticationService.getIdentity().then(function(response) {
      // // console.info(response);
      var result = false;
      var roles = response.data.roles;
      var targetRole = 'none';

      for (var i = 0; i < roles.length; i++) {
        if (roles[i].indexOf(permissionName) != -1) {
            result = true;
            targetRole = roles[i];
        }
      }

      if (result) {
        // // console.info("AclService#hasPermission#accept");
        deferred.resolve({'role' : targetRole});
      } else {
        // // console.info("AclService#hasPermission#reject");
        deferred.reject({'role' : 'none'});
      }
    }.bind(this));
    return deferred.promise;
  },



  handleSuccess_: function handleSuccess_() {

  },

  handleError_: function handleError_() {

  }
};

angular
  .module('app.http', [])
  .factory('httpInterceptor', ['$q', '$injector', '$cookies', function($q, $injector, $cookies) {
    return {
      'request': function (config) {
        // console.info("Message=Intercepting request...");

        config.headers = config.headers || {};
        var data = $cookies.getObject('globals');
        if (data && data.currentUser) {
          // console.info("Message=... checking current user");
          if (data.currentUser.expires_in) {
            var now = new Date();
            var expirationDate = new Date(data.currentUser.expires_in);

            // console.info("Today is " + now.getDay() + "/" + now.getMonth() + "/" + now.getFullYear());
            // console.info("Expiration date is " + expirationDate.getDay() + "/" + expirationDate.getMonth() + expirationDate.getFullYear());
            var hasNotExpired = (now.getTime() < expirationDate.getTime());
            // console.info("Token has expired ? " + (hasNotExpired ? "NO" : "YES"));

            if (hasNotExpired) {
              // console.info("Message=... and adding a bearer");
              config.headers.Authorization = 'Bearer ' + data.currentUser.token;
            } else {
              // console.info("Message=... and removing the user, because his token has expired");
              $cookies.getObject('globals').currentUser = {};
            }
          } else {
            // console.info("Message=... and removing the user");
            $cookies.getObject('globals').currentUser = {};
          }
        }
        return config;
      },
      'response': function(response) {
  
        // console.info("Message=Intercepting response;ResponseStatus=" + response.status);
        if (response.status === 401) {
          // console.info("Message=Intercepted response is 401;Goto=index.logout");
          $injector.get('$state').go('index.logout');
          return $q.reject(response);
        }
        return response || $q.when(response);
      },
  
      'responseError': function(rejection) {
  
        // console.info("Message=Intercepting response as error;ResponseStatus=" + rejection.status);
        if (rejection.status === 401) {
          $injector.get('$state').go('index.logout');
          return $q.reject(rejection);
        }
        return $q.reject(rejection);
      }
    };
  }])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  }]);

function TranslateConfiguration($translateProvider) {
  $translateProvider.translations('fr', {
    'LOGIN' : {
      'TITLE' : 'Déja membre ?',
      'SIGNUP': 'Nouveau membre ?',
      'MESSAGE': 'La création d\'un compte est gratuite et sans aucune obligation de votre part. Avoir un compte chez nous vous donne accès à votre espace personnel pour suivre votre information en temps réel.'
    },
    'SIGNUP': {
      'TITLE': 'Créer un compte',
      'REGISTER_SUCCESSFUL' : 'Votre compte a été créé avec succès.'
    },
    'ACCOUNT': {
      // 'ADDRESS': 'Adresse',
      // 'CITY' : 'Ville',
      // 'COUNTRY' : 'Pays',
      'EMAIL' : 'Courriel',
      // 'EMAIL_REQUIRED': 'Le courriel est requis',
      // 'FEMALE' : 'Femme',
      // 'FIRSTNAME' : 'Prénom',
      // 'FIRSTNAME_REQUIRED' : 'le prénom est requis',
      // 'FOLLOWER' : 'Follower',
      // 'GENDER' : 'Genre',
      // 'LASTNAME' : 'Nom',
      // 'LASTNAME_REQUIRED' : 'le nom est requis',
      // 'LEADER': 'Leader',
      // 'MALE' : 'Homme',
      'PASSWORD': 'Mot de passe',
      'PASSWORD_NEW': 'Nouveau mot de passe',
      'PASSWORD_OLD': 'Ancien mot de passe',
      'PASSWORD_REQUIRED': 'Le mot de passe est requis.',
      'PASSWORD_FAILED': 'Le mot de passe est erroné. Veuillez réessayer.',
      'PASSWORD_CONFIRM': 'Confirmation du mot de passe',
      'PASSWORD_CONFIRM_REQUIRED': 'Le mot de passe est erroné',
      // 'PHONE': 'Téléphone',
      // 'PRIMARY_ROLE': 'Rôle préféré',
      // 'RECOVERY': 'Récupération du compte',
      // 'SPECIAL': 'Cochez cette case si vous avez un régime spécial (étudiant, chômeur, retraité)',
      // 'TITLE': 'Etat civil',
      // 'ZIPCODE' : 'Code postal',
      'SAVE_SUCCESSFUL' : 'Mise à jour réalisée avec succès.',
      'SAVE_FAILED' : 'Une erreur s\'est produite lors de la mise à jour.'
    },
    'SUBSCRIPTIONS' : {
      'TITLE': 'Inscriptions',
      'NO_TOPIC' : 'pas de cours/niveau ouvert pour le moment'
    },
    'BALANCE' : {
      'TITLE': 'Solde',
    },
    'PASSWORD' : {
      'TITLE': 'Mot de passe',
      'PWD_REQUIRED': 'Ce champ est requis.',
      'PWD_TOO_SHORT': 'doit comporter 6 caractères minimum.',
      'PWD_TOO_LONG': 'doit comporter 16 caractères maximum.',
      'PWD_NEEDS_LETTERS': 'doit comporter au moins 1 lettre.',
      'PWD_NEEDS_NUMBERS': 'doit comporter au moins 1 chiffre.',
      'PWD_CONFIRM_FAILED': 'doit être identique au mot de passe.'
    },
    'TOPICS' : {
      'TITLE': 'Thèmes',
    },
    'ACTION' : {
      'SAVE' : 'Enregistrer',
      'CONNECT' : 'Ouvrir une session',
      'SIGNUP' : 'Continuer',
      'CHANGE' : 'Modifier',
      'CANCEL' : 'Annuler',
      'BACK_TO_LOGIN' : 'Retourner sur la page d\'authentification',
      'FORGOT_PASSWORD' : 'Mot de passe oublié ?',
      'RESET_PASSWORD' : 'Réinitialiser mon mot de passe'
    },
    'SUBMITTED' : 'Demande transmise.',
    'WAITING' : 'En attente de validation.',
    'VALIDATED' : 'Validé. En attente de paiement.',
    'PAID' : 'Payé.',
    'UNPICKED' : '',
    'OK' : 'OK',
    'leader' : 'Leader',
    'follower' : 'Follower',
    'open' : 'Ouvert',
    'draft' : 'Brouillon'
  });
  $translateProvider.useSanitizeValueStrategy(null);
  $translateProvider.preferredLanguage('fr');
}

function YearService($http, config) {
  this.http = $http;
  this.config = config;
}

YearService.prototype = {

  getCurrentYear: function getCurrentYear(force) {
    return this.http.get(this.config.apiUrl + '/year/current', {cache : true});
  }
};

function RegistrationsListController($q, $http, config, userDetails, year) {

  this.$ok = false;
  this.registrations = [];
  this.accountId = userDetails.id;
  if (!!year.$ok) {
    var topicsPromise = $http
      .get(config.apiUrl + '/topic?yearId='+ year.id, { transformResponse :function(response, headersGetter, status) {
        var resp = JSON.parse(response);
        var array = [];
        var data;
        for (var i = 0; i < resp.length; i++) {
          data = {};
          data.id = resp[i].id;
          data.role="";
          data.state = "UNCHECKED";
          data.amountPaid = 0;
          data.options = [];
          data.withPartner = false;
          data.topic = {
           "id": resp[i].id,
           "title": resp[i].title,
           "type": resp[i].type,
           "description": resp[i].description,
          };
          data.accountId = this.accountId;
          data._links = resp[i]._links;
          array.push(data);
        }
        return array;
      }.bind(this)});

    var registrationsPromise = $http
      .get(config.apiUrl + '/account/'+userDetails.id+'/registrations?yearId='+ year.id);

    $q.all({topics : topicsPromise, registrations : registrationsPromise}).then(function(response) {
      var topics = angular.copy(response.topics.data);
      this.registrations = angular.copy(response.registrations.data);

      var found;
      var currentTopic;
      for (var i = 0; i < topics.length; i++) {
        currentTopic = topics[i];
        found = false;
        for (var j = 0; j < this.registrations.length; j++) {
          if (this.registrations[j].topic.id == currentTopic.topic.id) {
            found = true;
          }
        }
        if (!found) {
          this.registrations.push(currentTopic);
        }
      }
      this.$ok = true;
    }.bind(this));
  }
}

function RegistrationsRouterConfig($stateProvider) {
  $stateProvider
    .state('member.registrations', {
      url: "/registrations",
      views: {
        'content@': {
          templateUrl: "components/member/registration/list/registrations.list.html",
          controller: "registrationsListController",
          controllerAs: "ctrl"
        }
      },
      resolve: {
        userDetails : ['authenticationService', function(authService) {
          return authService.getCurrentAccount().then(function(response) {
            return response.data;
          });
        }],
        year : ['yearService', function(yearService) {
          return yearService.getCurrentYear().then(function(response) {
            var data;
            if ( response.data !== undefined) {
              data = response.data;
              data.$ok = true;
            } else {
              data.$ok = false;
            }

            return data;
          }, function() {
            var data = {};
            data.$ok = false;
            return data;
          });
        }]
      }
    });
}

function RegistrationDialogController($http, $scope, $modalInstance, content, config, $sce) {
  this.modalInstance = $modalInstance;
  $scope.trustedHtml = $sce.trustAsHtml(content.data
     .replace(' name="registration[acceptRules]" ', ' name="registration[acceptRules]" ng-model="formData.registration_acceptRules" ')
     .replace(' name="registration[topic]" ', ' name="registration[topic]" ng-model="formData.registration_topic" ')
     .replace(' name="registration[role]" ', ' name="registration[role]" ng-model="formData.registration_role" ')
     .replace(' name="registration[semester]" ', ' name="registration[semester]" ng-model="formData.registration_semester" ')
     .replace(' name="registration[withPartner]" ', ' name="registration[withPartner]" ng-model="formData.registration_withPartner" ')
     .replace(' name="registration[partnerFirstName]" ', ' name="registration[partnerFirstName]" ng-model="formData.registration_partnerFirstName"  ng-disabled="!formData.registration_withPartner" ')
     .replace(' name="registration[partnerLastName]" ', ' name="registration[partnerLastName]" ng-model="formData.registration_partnerLastName" ng-disabled="!formData.registration_withPartner" ')
     .replace(' name="registration[partnerEmail]" ', ' name="registration[partnerEmail]" ng-model="formData.registration_partnerEmail" ng-disabled="!formData.registration_withPartner" ')
  );

  $scope.formData = {};
  $scope.formData.registration_topic = $("input#registration_topic", content.data).val();
  $scope.formData.registration_role = $("select#registration_role", content.data).val();
  $scope.formData.registration_semester = false;
  $scope.formData.registration_withPartner = false;
  $scope.formData.registration_partnerFirstName = $("input#registration_partnerFirstName", content.data).val();
  $scope.formData.registration_partnerLastName = $("input#registration_partnerLastName", content.data).val();
  $scope.formData.registration_partnerEmail = $("input#registration_partnerEmail", content.data).val();
  $scope.formData.registration_acceptRules = false;

  $scope.cancelForm = function() {
    $modalInstance.dismiss('cancel');
  }

  $scope.processForm = function($event, method, action) {

    $event.preventDefault();

    var url = config.apiUrl + action;

	var resultData = {
        "registration[topic]" : $scope.formData.registration_topic,
        "registration[role]" : $scope.formData.registration_role,
        "registration[partnerFirstName]" : $scope.formData.registration_withPartner ? $scope.formData.registration_partnerFirstName : "",
        "registration[partnerLastName]" : $scope.formData.registration_withPartner ? $scope.formData.registration_partnerLastName : "",
        "registration[partnerEmail]" : $scope.formData.registration_withPartner ? $scope.formData.registration_partnerEmail : ""
	};
	if ($scope.formData.registration_withPartner) {
        resultData["registration[withPartner]"] = 1;
	}
	if ($scope.formData.registration_semester) {
        resultData["registration[semester]"] = 1;
	}
	if ($scope.formData.registration_acceptRules) {
		 resultData["registration[acceptRules]"] = 1;
	}

    $http({
      method  : method,
      url     : url.replace('/api/api', '/api'),
      data    : resultData,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' },  // set the headers so angular passing info as form data (not request payload)
      transformRequest : function transformRequest( data, getHeaders ) {
					var headers = getHeaders();
          if ( ! angular.isObject( data ) ) {
						return( ( data == null ) ? "" : data.toString() );
					}
					var buffer = [];
					// Serialize each key in the object.
					for ( var name in data ) {
						if ( ! data.hasOwnProperty( name ) ) {
							continue;
						}
						var value = data[ name ];
						buffer.push(
							encodeURIComponent( name ) +
							"=" +
							encodeURIComponent( ( value == null ) ? "" : value )
						);
					}
					// Serialize the buffer and clean it up for transportation.
					var source = buffer
						.join( "&" )
						.replace( /%20/g, "+" )
					;
					return( source );
				}
     })
    .then(function(data) {
      if (data.status == 201) {
        this.ctrl.modalInstance.close('close');
      } else {
        // this.modalInstance.dismiss('cancel');
      }
    }.bind(this), function(error) {
      $scope.trustedHtml = $sce.trustAsHtml(error.data
         .replace(' name="registration[acceptRules]" ', ' name="registration[acceptRules]" ng-model="formData.acceptRules" ')
         .replace(' name="registration[role]" ', ' name="registration[role]" ng-model="formData.registration_role" ')
         .replace(' name="registration[semester]" ', ' name="registration[semester]" ng-model="formData.registration_semester" ')
         .replace(' name="registration[withPartner]" ', ' name="registration[withPartner]" ng-model="formData.registration_withPartner" ')
         .replace(' name="registration[partnerFirstName]" ', ' name="registration[partnerFirstName]" ng-model="formData.registration_partnerFirstName" ')
         .replace(' name="registration[partnerLastName]" ', ' name="registration[partnerLastName]" ng-model="formData.registration_partnerLastName" ')
         .replace(' name="registration[partnerEmail]" ', ' name="registration[partnerEmail]" ng-model="formData.registration_partnerEmail" ')
         .replace(' name="registration[topic]" ', ' name="registration[topic]" ng-model="formData.registration_topic" ')
      );
    });
  }
}

function RegistrationEditDialogController($http, $scope, $modalInstance, content, config, $sce) {
  this.modalInstance = $modalInstance;
  $scope.trustedHtml = $sce.trustAsHtml(content.data
     .replace(' name="registration[acceptRules]" ', ' name="registration[acceptRules]" ng-model="formData.registration_acceptRules" ')
     .replace(' name="registration[topic]" ', ' name="registration[topic]" ng-model="formData.registration_topic" ')
     .replace(' name="registration[role]" ', ' name="registration[role]" ng-model="formData.registration_role" ')
     .replace(' name="registration[semester]" ', ' name="registration[semester]" ng-model="formData.registration_semester" ')
     .replace(' name="registration[withPartner]" ', ' name="registration[withPartner]" ng-model="formData.registration_withPartner" ')
     .replace(' name="registration[partnerFirstName]" ', ' name="registration[partnerFirstName]" ng-model="formData.registration_partnerFirstName" ng-disabled="!formData.registration_withPartner" ')
     .replace(' name="registration[partnerLastName]" ', ' name="registration[partnerLastName]" ng-model="formData.registration_partnerLastName" ng-disabled="!formData.registration_withPartner" ')
     .replace(' name="registration[partnerEmail]" ', ' name="registration[partnerEmail]" ng-model="formData.registration_partnerEmail" ng-disabled="!formData.registration_withPartner" ')
  );

  $scope.formData = {};
  $scope.formData.registration_topic = $("input#registration_topic", content.data).val();
  $scope.formData.registration_role = $("select#registration_role", content.data).val();
  $scope.formData.registration_semester = $("input#registration_semester", content.data).prop( "checked" );
  $scope.formData.registration_withPartner = $("input#registration_withPartner", content.data).prop( "checked" );
  $scope.formData.registration_partnerFirstName = $("input#registration_partnerFirstName", content.data).val();
  $scope.formData.registration_partnerLastName = $("input#registration_partnerLastName", content.data).val();
  $scope.formData.registration_partnerEmail = $("input#registration_partnerEmail", content.data).val();
  $scope.formData.registration_acceptRules = $("input#registration_acceptRules", content.data).prop( "checked" );

  $scope.cancelForm = function() {
    $modalInstance.dismiss('cancel');
  }

  $scope.processForm = function($event, method, action) {

    $event.preventDefault();

    var url = config.apiUrl + action;

	var resultData = {
        "registration[topic]" : $scope.formData.registration_topic,
        "registration[role]" : $scope.formData.registration_role,
        "registration[partnerFirstName]" : $scope.formData.registration_withPartner ? $scope.formData.registration_partnerFirstName : "",
        "registration[partnerLastName]" : $scope.formData.registration_withPartner ? $scope.formData.registration_partnerLastName : "",
        "registration[partnerEmail]" : $scope.formData.registration_withPartner ? $scope.formData.registration_partnerEmail : ""
	};
	if ($scope.formData.registration_withPartner) {
        resultData["registration[withPartner]"] = 1;
	}
	if ($scope.formData.registration_semester) {
        resultData["registration[semester]"] = 1;
	}
	if ($scope.formData.registration_acceptRules) {
		 resultData["registration[acceptRules]"] = 1;
	}

    $http({
      method  : method,
      url     : url.replace('/api/api', '/api'),
      data    : resultData,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' },  // set the headers so angular passing info as form data (not request payload)
      transformRequest : function transformRequest( data, getHeaders ) {
					var headers = getHeaders();
          if ( ! angular.isObject( data ) ) {
						return( ( data == null ) ? "" : data.toString() );
					}
					var buffer = [];
					// Serialize each key in the object.
					for ( var name in data ) {
						if ( ! data.hasOwnProperty( name ) ) {
							continue;
						}
						var value = data[ name ];
						buffer.push(
							encodeURIComponent( name ) +
							"=" +
							encodeURIComponent( ( value == null ) ? "" : value )
						);
					}
					// Serialize the buffer and clean it up for transportation.
					var source = buffer
						.join( "&" )
						.replace( /%20/g, "+" )
					;
					return( source );
				}
     })
    .then(function(data) {
      if (data.status == 204) {
        this.ctrl.modalInstance.close('close');
      } else {
        // this.modalInstance.dismiss('cancel');
      }
    }.bind(this), function(error) {
      $scope.trustedHtml = $sce.trustAsHtml(error.data
         .replace(' name="registration[acceptRules]" ', ' name="registration[acceptRules]" ng-model="formData.registration_acceptRules" ')
         .replace(' name="registration[topic]" ', ' name="registration[topic]" ng-model="formData.registration_topic" ')
         .replace(' name="registration[role]" ', ' name="registration[role]" ng-model="formData.registration_role" ')
         .replace(' name="registration[semester]" ', ' name="registration[semester]" ng-model="formData.registration_semester" ')
         .replace(' name="registration[withPartner]" ', ' name="registration[withPartner]" ng-model="formData.registration_withPartner" ')
         .replace(' name="registration[partnerFirstName]" ', ' name="registration[partnerFirstName]" ng-model="formData.registration_partnerFirstName" ')
         .replace(' name="registration[partnerLastName]" ', ' name="registration[partnerLastName]" ng-model="formData.registration_partnerLastName" ')
         .replace(' name="registration[partnerEmail]" ', ' name="registration[partnerEmail]" ng-model="formData.registration_partnerEmail" ')
      );
    });
  }
}

function PasswordEditController($http, config, $scope, $sce, content, $compile, userDetails) {

    $scope.saveDone = false;
    $scope.saveSuccessful = false;
    $scope.formData = {};
    // $scope.formData.user__token = $("input#fos_user_change_password_form__token", content).val();
    $scope.trustedHtml = $sce.trustAsHtml(content
       .replace(' name="fos_user_change_password_form[current_password]" ', '  ')
       .replace(' name="fos_user_change_password_form[plainPassword][first]" ', '  ')
       .replace(' name="fos_user_change_password_formser[plainPassword][second]" ', '  ')
       .replace(' id="fos_user_change_password_form_current_password" ', ' id="fos_user_change_password_form_current_password" ng-model="formData.current_password" ')
       .replace(' id="fos_user_change_password_form_plainPassword_first" ', ' id="fos_user_change_password_form_plainPassword_first" ng-model="formData.plainPassword_first" ')
       .replace(' id="fos_user_change_password_form_plainPassword_second" ', ' id="fos_user_change_password_form_plainPassword_second" ng-model="formData.plainPassword_second" '));

    // process the form
    $scope.processForm = function($event, method, action) {
      // console.info($event);
      $event.preventDefault();
      $scope.saveDone = false;

      $http({
        method  : method,
        url     : config.apiUrl + action,
        // data : $.param($scope.formData),
        data    : {
          "fos_user_change_password_form[current_password]" :	$scope.formData.current_password,
          "fos_user_change_password_form[plainPassword][first]" :	$scope.formData.plainPassword_first,
          "fos_user_change_password_form[plainPassword][second]" :	$scope.formData.plainPassword_second
          //, "fos_user_change_password_form[_token]" :	$scope.formData.user__token
        },
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' },  // set the headers so angular passing info as form data (not request payload)
        transformRequest : function transformRequest( data, getHeaders ) {
  					var headers = getHeaders();
            if ( ! angular.isObject( data ) ) {
  						return( ( data == null ) ? "" : data.toString() );
  					}
  					var buffer = [];
  					// Serialize each key in the object.
  					for ( var name in data ) {
  						if ( ! data.hasOwnProperty( name ) ) {
  							continue;
  						}
  						var value = data[ name ];
  						buffer.push(
  							encodeURIComponent( name ) +
  							"=" +
  							encodeURIComponent( ( value == null ) ? "" : value )
  						);
  					}
  					// Serialize the buffer and clean it up for transportation.
  					var source = buffer
  						.join( "&" )
  						.replace( /%20/g, "+" )
  					;
  					return( source );
  				}
       })
      .then(function(data) {
        console.log(data);
        // $scope.saveDone = true;
        $scope.saveDone = true;
        if (data.status != 200) {
          $scope.saveSuccessful = false;
        } else {
          // if successful, bind success message to message
          $scope.saveSuccessful = true;

          $scope.trustedHtml = $sce.trustAsHtml(data.data
            .replace(' name="fos_user_change_password_form[current_password]" ', '  ')
            .replace(' name="fos_user_change_password_form[plainPassword][first]" ', '  ')
            .replace(' name="ufos_user_change_password_formser[plainPassword][second]" ', '  ')
            .replace(' id="fos_user_change_password_form_current_password" ', ' id="fos_user_change_password_form_current_password" ng-model="formData.current_password" ')
            .replace(' id="fos_user_change_password_form_plainPassword_first" ', ' id="fos_user_change_password_form_plainPassword_first" ng-model="formData.plainPassword_first" ')
            .replace(' id="fos_user_change_password_form_plainPassword_second" ', ' id="fos_user_change_password_form_plainPassword_second" ng-model="formData.plainPassword_second" '));
        }
      }, function(error) {
        console.log(error);
        $scope.saveSuccessful = false;
        $scope.saveDone = true;
        $scope.trustedHtml = $sce.trustAsHtml(error.data
          .replace(' name="fos_user_change_password_form[current_password]" ', '  ')
          .replace(' name="fos_user_change_password_form[plainPassword][first]" ', '  ')
          .replace(' name="ufos_user_change_password_formser[plainPassword][second]" ', '  ')
          .replace(' id="fos_user_change_password_form_current_password" ', ' id="fos_user_change_password_form_current_password" ng-model="formData.current_password" ')
          .replace(' id="fos_user_change_password_form_plainPassword_first" ', ' id="fos_user_change_password_form_plainPassword_first" ng-model="formData.plainPassword_first" ')
          .replace(' id="fos_user_change_password_form_plainPassword_second" ', ' id="fos_user_change_password_form_plainPassword_second" ng-model="formData.plainPassword_second" '));
      });
    }
};

function PasswordRouterConfig($stateProvider) {
  $stateProvider.state('member.password', {
      url: "/password",
      data: {
        roles: ['USER']
      },
      views: {
        'content@': {
          templateUrl: 'components/member/password/edit/password.edit.html',
          controller: "passwordEditController",
          controllerAs: "ctrl"
        }
      },
      resolve: {
        userDetails : ['authenticationService', function(authService) {
          return authService.getCurrentAccount().then(function(response) {
            return response.data;
          });
        }],
        content : ['$http', 'config', function($http, config) {
          return $http.get(config.apiUrl + '/user/change-password').then(function(response) {
            return response.data;
          });
        }]
      }
    });
}

function RegistrationAddController($scope, $modal, $state) {
  this.registration = $scope.registration;
  this.modal = $modal;
  this.$state = $state;
}

RegistrationAddController.prototype = {

  showForm : function showForm() {
    var uri = this.registration._links.new_registration.href;
    var modalInstance = this.modal.open({
        animation: true,
        template: '<div gs-dynamic="trustedHtml"></div>',
        controller: 'registrationDialogController',
        controllerAs: 'ctrl',
        resolve: {
          content: ['$http', 'config', function ($http, config) {
            return $http
              .get(config.apiUrl + uri.replace("/web/app_dev.php", "").replace('/api', ''))
              .then(function(response) {
                return response;
              });
          }]
        }
      });

    modalInstance.result.then(function (value) {
      return this.$state.reload();
    }.bind(this), function () {

    });
  }
};

function RegistrationAddDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'components/member/registration/action/add/registration.add.html',
    controller: 'registrationAddController',
    controllerAs: 'ctrl',
    scope : {
      registration: "="
    }
  };
}

function RegistrationCancelController($scope, $http, $state, config) {
  this.registration = $scope.registration;
  this.$state = $state;
  this.$http = $http;
  this.config = config;
}

RegistrationCancelController.prototype = {

  showForm : function showForm() {
    var uri = this.registration._links.cancel.href;
    this.$http
      .get(this.config.apiUrl + uri.replace("/web/app_dev.php", "").replace('/api', ''))
      .then(function(response) {
        return this.$state.reload();
      }.bind(this))
    }
};

function RegistrationCancelDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'components/member/registration/action/cancel/registration.cancel.html',
    controller: 'registrationCancelController',
    controllerAs: 'ctrl',
    scope : {
      registration : "="
    }
  };
}

function SubscriptionPayController($scope, commandService) {
  this.subscription = $scope.subscription;
  this.commandService = commandService;
}
SubscriptionPayController.prototype = {

  isPayable : function isPayable() {
    return true;
  },

  paySubscription: function paySubscription() {

  }
};

function SubscriptionPayDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'components/member/subscriptions/action/pay/subscription.pay.html',
    controller: 'subscriptionPayController',
    controllerAs: 'ctrl',
    scope : {
      subscription: "="
    }
  };
}

function RegistrationUpdateController($scope, $modal, $state) {
  this.registration = $scope.registration;
  this.modal = $modal;
  this.$state = $state;
}

RegistrationUpdateController.prototype = {

  showForm: function showForm() {
    var uri = this.registration._links.edit.href;

    var modalInstance = this.modal.open({
        animation: true,
        template: '<div gs-dynamic="trustedHtml"></div>',
        controller: 'registrationEditDialogController',
        controllerAs: 'ctrl',
        resolve: {
          content: ['$http', '$sce', 'config', function ($http, $sce, config) {
            return $http
              .get(config.apiUrl + uri.replace("/web/app_dev.php", "").replace('/api', ''))
              .then(function(response) {
                return response;
              });
          }]
        }
      });

    modalInstance.result.then(function (value) {
      return this.$state.reload();
    }.bind(this), function () {

    });
  }
};

function RegistrationUpdateDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'components/member/registration/action/update/registration.update.html',
    controller: 'registrationUpdateController',
    controllerAs: 'ctrl',
    scope : {
      registration: "="
    }
  };
}

function RegistrationValidateController($scope, $modal) {
  this.registration = $scope.registration;
  this.modal = $modal;
}

RegistrationValidateController.prototype = {
  showForm: function showForm() {
    var uri = this.registration._links.validate.href;

    var modalInstance = this.modal.open({
        animation: true,
        template: '<section ng-bind-html="ctrl.content"></section>',
        controller: 'registrationDialogController',
        controllerAs: 'ctrl',
        resolve: {
          content: ['$http', '$sce', 'config', function ($http, $sce, config) {
            return $http
              .get(config.apiUrl + uri.replace("/web/app_dev.php", "").replace('/api', ''))
              .then(function(response) {
                return $sce.trustAsHtml(response.data);
              });
          }]
        }
      });

    modalInstance.result.then(function (value) {

    }.bind(this), function () {

    });
  }
};

function RegistrationValidateDirective() {
  return {
    restrict: 'AE',
    template: '<span><a class="btn btn-primary" role="button" ng-click="ctrl.showForm()"><h5>Valider <i class="glyphicon glyphicon-plus-sign"></h5></a></span>',
    controller: 'registrationValidateController',
    controllerAs: 'ctrl',
    scope : {
      registration: "="
    }
  };
}

angular.module('app.home', ['ui.router'])
  .config(['$stateProvider', HomeRouterConfig])
  .controller('homeController', [HomeController]);

angular.module('app.login', ['app.auth', 'app.acl', 'ui.router'])
.config(['$stateProvider', LoginRouterConfig])
.controller('loginController', ['$scope', '$state', 'authenticationService', 'aclService', LoginController]);

angular
    .module('app.logout', ['app.config', 'ui.router', 'app.auth'])
    .config(['$stateProvider', LogoutRouterConfig])
    .controller('logoutController', ['$rootScope', '$cookies', '$state', '$http', 'config', 'authenticationService', LogoutController]);

angular.module('app.main.nav', ['app.auth', 'ui.router'])
  .directive('gsMainNav', MainNavDirective)
  .controller('mainNavController', ['$state', 'authenticationService', 'config', '$http', '$rootScope', '$cookies', MainNavController]);

  angular.module('app.reset', ['app.config', 'ui.router', 'ngSanitize'])
    .config(['$stateProvider', PasswordResetRouterConfig])
    .controller('passwordResetController', ['$http', 'config', '$scope', '$sce', 'content', '$compile', PasswordResetController]);

angular.module('app.signup', ['app.config', 'ui.router', 'ngSanitize'])
  .config(['$stateProvider', SignUpRouterConfig])
  .controller('signUpController', ['$http', 'config', '$scope', '$sce', 'content', '$compile', '$state', SignUpController]);

angular.module('app.member.nav', ['ui.router'])
  .controller('memberNavController', ['$state', MemberNavController]);

angular.module('app.account', ['app.config', 'ui.router', 'ngSanitize'])
  .config(['$stateProvider', AccountRouterConfig])
  // .directive('gsDatepicker', AccountDatepickerDirective)
  .controller('accountController', ['$http', 'config', 'userDetails', '$sce', '$scope', '$compile', AccountController]);

angular.module('app.registration', ['app.registrations.list',
  'app.registration.dialog', 'app.registration.actions']);

angular.module('app.summary', ['ui.router', 'app.auth', 'app.config', 'ngSanitize'])
    .config(['$stateProvider', SummaryRouterConfig])
    .controller('summaryController', ['$scope', '$http', 'userDetails', 'config', '$sce', SummaryController]);

angular.module('app.auth', ['app.config'])
    .service('authResource', ['$http', 'config', AuthResource])
    .service('authenticationService', ['$rootScope', '$cookies', '$q', '$http', 'config', AuthenticationService]);

angular.module('app.common', [])
  .directive('gsCompareTo', CompareToDirective)
  .directive('gsDynamic', ['$compile', DynamicDirective])
  .directive('gsStrength', StrengthDirective);

angular.module('app.acl', [])
    .constant("roleMap", {
      'ROLE_USER' : {
          'role': 'ROLE_USER',
          'permissions' : ['canViewProfile', 'canViewSubscriptions'],
          'defaultState' : 'member.account'
      }
    })
    .service('aclService', ['$q', 'roleMap', 'authenticationService', AclService]);

angular
  .module('app.config', [])
  .constant('config', {
    // apiUrl: 'http://localhost/api',
    apiUrl: 'https://api.inscriptions.grenobleswing.com/api',
    baseUrl: '/',
    enableDebug: true
  });

angular.module('app.year', ['app.config'])
    .service('yearService', ['$http', 'config', YearService]);

angular.module('app.registrations.list', ['ui.router', 'app.config'])
    .config(['$stateProvider', RegistrationsRouterConfig])
    .controller('registrationsListController', ['$q', '$http', 'config', 'userDetails', 'year', RegistrationsListController]);

angular.module('app.registration.actions',
  ['app.registration.actions.add',
    'app.registration.actions.cancel',
    'app.registration.actions.validate',
    'app.registration.actions.update'
  ]);

angular.module('app.registration.dialog', ['ui.bootstrap', 'app.config', 'ngSanitize'])
    .controller('registrationEditDialogController', ['$http', '$scope', '$uibModalInstance', 'content', 'config', '$sce', RegistrationEditDialogController])
    .controller('registrationDialogController', ['$http', '$scope', '$uibModalInstance', 'content', 'config', '$sce', RegistrationDialogController]);

angular.module('app.password.edit', ['app.config', 'ui.router', 'ngSanitize'])
  .config(['$stateProvider', PasswordRouterConfig])
  .controller('passwordEditController', ['$http', 'config', '$scope', '$sce', 'content', '$compile', 'userDetails', PasswordEditController]);

angular.module('app.registration.actions.add', ['ui.bootstrap', 'ui.router'])
    .controller('registrationAddController', ['$scope', '$uibModal', '$state', RegistrationAddController])
    .directive('gsRegistrationAdd', RegistrationAddDirective);

angular.module('app.registration.actions.cancel', ['ui.bootstrap', 'ui.router', 'app.config'])
    .controller('registrationCancelController', ['$scope', '$http', '$state', 'config', RegistrationCancelController])
    .directive('gsRegistrationCancel', RegistrationCancelDirective);

angular.module('app.subscriptions.actions.pay', ['app.subscriptions.common'])
    .controller('subscriptionPayController', ['$scope', 'subscriptionCommandService', SubscriptionPayController])
    .directive('gsSubscriptionPay', SubscriptionPayDirective);

angular.module('app.registration.actions.update', ['ui.bootstrap', 'ui.router'])
    .controller('registrationUpdateController', ['$scope', '$uibModal', '$state', RegistrationUpdateController])
    .directive('gsRegistrationUpdate', RegistrationUpdateDirective);

angular.module('app.registration.actions.validate', [])
    .controller('registrationValidateController', ['$scope', '$uibModal',  RegistrationValidateController])
    .directive('gsRegistrationValidate', RegistrationValidateDirective);

angular.module('app', ['ngCookies', 'ui.bootstrap', 'ngResource',
        'ui.router', 'permission', 'permission.ui', 'ngSanitize',
        'app.http',
        'app.account',
        'app.acl',
        'app.auth',
        'app.common',
        'app.config',
        'app.home',
        'app.login',
        'app.logout',
        'app.main.nav',
        'app.member.nav',
        'app.summary',
        'app.password.edit',
        'app.signup',
        'app.registration',
        'app.reset',
        'app.year',
        'pascalprecht.translate',
        'angular-cookie-law'
    ])
    .config(['$stateProvider', '$urlRouterProvider', DefaultRouteConfig])
    .config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }])
    .config(['$translateProvider', TranslateConfiguration]);

function DefaultRouteConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index', {
            abstract: true,
            url: '',
            views: {
              'nav@': {
                  template: ''
              },
              'header@':  {
                  template: ''
              }
            }
        })
        .state('member', {
            abstract: true,
            url: '/member',
            views: {
                'nav@': {
                    templateUrl: 'components/member/member-navigation/navbar.html',
                    controller: 'memberNavController',
                    controllerAs: 'ctrl'
                },
                'header@' : {
                  template : '<gs-main-nav></gs-main-nav>'
                }
            },
            data: {
                permissions: {
                  only: ['ROLE_USER']
                }
            }
        })
        .state('access-denied', {
            url: '/denied',
            views: {
                'nav@':  {
                    template: ''
                },
                'header@' : {
                  template : ''
                },
                'content@': {
                    template: '<alert type="danger"><strong>Access Denied</strong><p>You don\'t have permission to see this. <a href="" ui-sref="member.home">Return home.</a></p></alert>'
                }
            }
        })
        .state('404', {
            url: '/error',
            views: {
                'nav@':  {
                    template: ''
                },
                'header@' : {
                  template : ''
                },
                'content@': {
                    template: '<alert type="danger"><strong>Erreur 404</strong><p></p></alert>'
                }
            },
            data: {
                permissions: {
                  except: ['ANONYMOUS'],
                  redirectTo : 'index.login'
                }
            }
        });

    $urlRouterProvider.otherwise( function($injector) {
      var state = $injector.get("$state");
      var authenticationService = $injector.get("authenticationService");

      if (authenticationService.isAuthenticated()) {
        // console.info("Message=Checking main otherwise...");
        return authenticationService
            .getIdentity()
            .then(function() {
                // console.info("Message=Go to home");
                return state.go('member.home');
            }, function() {
                // console.info("Message=Go to login");
                return state.go('index.logout');
            });
      } else {
        return state.go('index.logout');
      }
    });
}

function run($rootScope, $state) {
    $state.defaultErrorHandler();

    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
        $rootScope.toState = toState;
        $rootScope.toStateParams = toStateParams;
    });
}

function withPermissions(PermPermissionStore, aclService) {
  var permissions = ['canViewProfile', 'canViewSubscriptions', 'canViewTopics', 'canViewClasses'];

  PermPermissionStore.defineManyPermissions(permissions, function (permissionName, transitionProperties) {
    return aclService.hasPermission(permissionName);
  });
}

function withRoles(PermRoleStore, authenticationService, aclService, $q) {
  PermRoleStore
    .defineRole('ANONYMOUS', function (stateParams, roleName) {
      return authenticationService.isAnonymous();
    });

  PermRoleStore
    .defineRole('AUTHORIZED', function (stateParams, roleName) {
      return authenticationService.isAuthenticated();
    });

  PermRoleStore
    .defineRole('ROLE_USER', function(roleName, transitionProperties) {
      return aclService.isInRole(roleName);
    });
}

angular
  .module('app')
  .run(['$rootScope', '$state', run])
  .run(['PermPermissionStore', 'authenticationService', withPermissions])
  .run(['PermRoleStore', 'authenticationService', 'aclService', '$q', withRoles]);

angular.module('app').run(['$templateCache', function($templateCache) {$templateCache.put('components/main/home/home.html','<h1>Bienvenue sur votre espace personnel Grenoble Swing</h1>\r\n<h2>Gestion de compte</h2>\r\n<p>Vous pouvez g\xE9rer votre compte, vos inscriptions, vos paiments en cliquant sur le menu <a ui-sref="member.account"><i class="glyphicon glyphicon-user"></i>Profil</a>.</p>\r\n\r\n<h2>Actualit\xE9s</h2>\r\n<p>Rendez-vous sur la page <a href="http://www.grenobleswing.com/" target="blank">Grenoble Swing</a> pour plus d\'informations sur l\'association et ses \xE9v\xE9nements.</p>\r\n');
$templateCache.put('components/main/login/login.html','<div class="row">\r\n  <div class="col-md-4  col-md-offset-2 bg-info">\r\n      <h4>{{\'LOGIN.TITLE\' | translate}}</h4>\r\n      <form name="ctrl.loginForm" ng-submit="ctrl.connect()" role="form">\r\n          <div class="form-group row" ng-class="{ \'has-error\': form.login.$dirty && form.login.$invalid }">\r\n              <label for="login" class="col-sm-4 control-label">{{ \'ACCOUNT.EMAIL\' | translate}}</label>\r\n              <div class="col-sm-8">\r\n                <input type="email" name="login" id="login" class="form-control" ng-model="ctrl.login" required ng-pattern="/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/" />\r\n                <small ng-if="form.login.$dirty && form.login.$invalid"\r\n                       class="has-error help-block">{{ \'ACCOUNT.EMAIL_REQUIRED\' | translate}}</small>\r\n              </div>\r\n          </div>\r\n          <div class="form-group row" ng-class="{ \'has-error\': (form.password.$dirty && form.password.$error.required) || ctrl.authFailed }">\r\n              <label for="password" class="col-sm-4 control-label">{{ \'ACCOUNT.PASSWORD\' | translate }}</label>\r\n              <div class="col-sm-8">\r\n                <input type="password" name="password" id="password" class="form-control" ng-model="ctrl.password" required />\r\n                <small ng-if="form.password.$dirty && form.password.$error.required"\r\n                       class="has-error help-block">{{ \'ACCOUNT.PASSWORD_REQUIRED\' | translate}}</small>\r\n                <small ng-if="ctrl.authFailed"\r\n                       class="has-error help-block">{{ \'ACCOUNT.PASSWORD_FAILED\' | translate}}</small>\r\n              </div>\r\n          </div>\r\n          <div class="form-actions row">\r\n            <div class="col-md-offset-1 col-sm-4">\r\n              <button type="submit" ng-disabled="form.$invalid || ctrl.isLoading" class="btn btn-primary">{{ \'ACTION.CONNECT\' | translate}}</button>\r\n            </div>\r\n            <div class="col-md-offset-1 col-sm-4">\r\n              <a ui-sref="index.reset" class="btn btn-link">{{ \'ACTION.FORGOT_PASSWORD\' | translate}}</a>\r\n            </div>\r\n          </div>\r\n      </form>\r\n  </div>\r\n  <div class="col-md-4">\r\n    <h4>{{\'LOGIN.SIGNUP\' | translate}}</h4>\r\n    <p>{{\'LOGIN.MESSAGE\' | translate}}</p>\r\n    <a ui-sref="index.sign-up" class="btn btn-link">{{ \'ACTION.SIGNUP\' | translate}}</a>\r\n  </div>\r\n</div>\r\n');
$templateCache.put('components/main/main-navigation/navbar.html','<ul class="nav navbar-nav navbar-right" permission permission-only="\'AUTHORIZED\'">\r\n    <li uib-dropdown>\r\n      <button id="single-button" type="button" class="btn btn-primary" uib-dropdown-toggle ng-disabled="disabled">\r\n        {{ctrl.identity.login}}<span class="caret"></span>\r\n      </button>\r\n      <ul uib-dropdown-menu class="dropdown-menu">\r\n        <li role="menuitem"><a ui-sref="member.home"><i class="glyphicon glyphicon-user"></i> Accueil</a></li>\r\n        <li class="divider"></li>\r\n        <li role="menuitem" permission permission-only="\'ROLE_USER\'">\r\n          <a ui-sref="member.account"><i class="glyphicon glyphicon-user"></i> Profil</a>\r\n        </li>\r\n        <li class="divider"></li>\r\n        <li role="menuitem"><a ng-click="ctrl.logout()"><i class="glyphicon glyphicon-log-out"></i> Se d\xE9connecter</a></li>\r\n      </ul>\r\n    </li>\r\n</ul>\r\n');
$templateCache.put('components/main/reset/password.reset.html','<div ng-if="!registerDone" gs-dynamic="trustedHtml"></div>\r\n<div ng-if="registerDone && registerSuccessful" gs-dynamic="successResponse"></div>\r\n<section><a ui-sref="index.login" class="btn btn-link">{{ "ACTION.BACK_TO_LOGIN" | translate}}</a></section>\r\n');
$templateCache.put('components/main/signup/signup.html','<div ng-if="!registerDone" gs-dynamic="trustedHtml"></div>\r\n<div ng-if="!!registerDone && !!registerSuccessful">{{ "SIGNUP.REGISTER_SUCCESSFUL" | translate }}</div>\r\n<section><a ui-sref="index.login" class="btn btn-link">{{ "ACTION.BACK_TO_LOGIN" | translate}}</a></section>\r\n');
$templateCache.put('components/member/member-navigation/navbar.html','<ul class="nav navbar-nav">\r\n  <li ng-class="ctrl.isActive(\'member.account\')"><a ui-sref="member.account">Modifier mon profil</a></li>\r\n  <li ng-class="ctrl.isActive(\'member.password\')"><a ui-sref="member.password">Changer le mot de passe</a></li>\r\n  <li ng-class="ctrl.isActive(\'member.registrations\')"><a ui-sref="member.registrations">G\xE9rer mes inscriptions</a></li>\r\n  <li ng-class="ctrl.isActive(\'member.summary\')"><a ui-sref="member.summary">Voir le r\xE9capitulatif</a></li>\r\n</ul>\r\n');
$templateCache.put('components/member/account/account.html','<div class="alert alert-success" ng-if="!!saveDone && !!saveSuccessful"><p class="bg-success">{{ "ACCOUNT.SAVE_SUCCESSFUL" | translate }}</p></div>\r\n<div class="alert alert-danger" ng-if="!!saveDone && !saveSuccessful"><p class="bg-danger">{{ "ACCOUNT.SAVE_FAILED" | translate }}</p></div>\r\n<div gs-dynamic="trustedHtml"></div>\r\n<div class="alert alert-success" ng-if="!!saveDone && !!saveSuccessful"><p class="bg-success">{{ "ACCOUNT.SAVE_SUCCESSFUL" | translate }}</p></div>\r\n<div class="alert alert-danger" ng-if="!!saveDone && !saveSuccessful"><p class="bg-danger">{{ "ACCOUNT.SAVE_FAILED" | translate }}</p></div>\r\n');
$templateCache.put('components/member/summary/summary.html','<div class="row">\r\n  <div class="col-md-12">\r\n    <div class="row">\r\n      <h2>Liste des inscriptions</h2>\r\n      <table class="table table-striped">\r\n        <tr>\r\n          <th>intitul\xE9</th>\r\n          <th>tarif</th>\r\n          <th>remise</th>\r\n          <th>somme d\xFBe</th>\r\n          <th>somme pay\xE9e</th>\r\n        </tr>\r\n        <tr ng-repeat="elem in ctrl.list">\r\n          <td>{{elem.title}}</td>\r\n          <td>{{elem.price}}</td>\r\n          <td>{{elem.discount}}</td>\r\n          <td>{{elem.balance}}</td>\r\n          <td>{{elem.alreadyPaid}}</td>\r\n        </tr>\r\n      </table>\r\n    </div>\r\n  </div>\r\n  <div class="col-md-12"><h4>Total : {{ctrl.totalAmount}}\u20AC</h4></div>\r\n  <div gs-dynamic="ctrl.trustedHtml"></div>\r\n</div>\r\n');
$templateCache.put('components/member/registration/list/registrations.list.html','<div  ng-if="!!ctrl.$ok" ng-repeat="registration in ctrl.registrations | orderBy : \'topic.id\'" class="col-md-12">\r\n    <span class="col-md-12">\r\n      <div class="row">\r\n        <span class="col-md-12">\r\n          <h3 class="text-primary">{{registration.topic.title}}</h3>\r\n          <span ng-if="registration.state == \'VALIDATED\' || registration.state == \'WAITING\'  || registration.state == \'PAID\' ||\xA0registration.state == \'SUBMITTED\'"\r\n            ng-class="{\'text-primary\' : registration.state == \'PAID\', \'text-warning\' : registration.state == \'SUBMITTED\'}">{{registration.state | translate}}</span>\r\n        </span>\r\n      </div>\r\n      <div class="row">\r\n        <span class="col-md-6">\r\n          <p>{{registration.topic.description}}</p>\r\n        </span>\r\n        <span class="col-md-6">\r\n          <span ng-if="!!registration._links.new_registration" gs-registration-add data-registration="registration"></span>\r\n          <span ng-if="!!registration._links.edit" gs-registration-update data-registration="registration"></span>\r\n          <span ng-if="!!registration._links.cancel" gs-registration-cancel data-registration="registration"></span>\r\n        </span>\r\n      </div>\r\n      <div ng-if="registration.topic.type == \'couple\' && registration.state != \'UNCHECKED\'" class="row">\r\n        <p>R\xF4le : {{registration.role | translate}}</p>\r\n        <p ng-if="!!registration.withPartner">Partenaire : {{registration.partnerFirstName}} {{registration.partnerLastName}}</p>\r\n      </div>\r\n    </span>\r\n    <hr />\r\n</div>\r\n<div ng-if="!ctrl.$ok" class="col-md-12">\r\n    <span class="col-md-12">\r\n      <p class="text-center">{{ \'SUBSCRIPTIONS.NO_TOPIC\' |\xA0translate }}</p>\r\n    </span>\r\n</div>\r\n');
$templateCache.put('components/member/password/edit/password.edit.html','<div gs-dynamic="trustedHtml"></div>\r\n<div class="alert alert-success" ng-if="!!saveDone && !!saveSuccessful"><p class="bg-success">{{ "ACCOUNT.SAVE_SUCCESSFUL" | translate }}</p></div>\r\n<div class="alert alert-danger" ng-if="!!saveDone && !saveSuccessful"><p class="bg-danger">{{ "ACCOUNT.SAVE_FAILED" | translate }}</p></div>\r\n');
$templateCache.put('components/member/registration/action/add/registration.add.html','<span>\r\n  <a class="btn btn-primary" role="button" ng-click="ctrl.showForm()">\r\n    <h5>Ajouter <i class="glyphicon glyphicon-plus-sign"></i></h5>\r\n  </a>\r\n</span>\r\n');
$templateCache.put('components/member/registration/action/cancel/registration.cancel.html','<span>\r\n  <a class="btn btn-warning" role="button"\r\n      ng-click="ctrl.showForm(subscription)">\r\n    <h5>Annuler <i class="glyphicon glyphicon-trash"></i></h5>\r\n  </a>\r\n</span>\r\n');
$templateCache.put('components/member/registration/action/pay/subscription.pay.html','<span ng-if="subscription.selected && subscription.state === \'SUBMITTED\' && subscription.type === \'couple\'">\r\n  <a class="btn btn-primary" role="button" ng-disabled="!ctrl.isUpdatable(subscription)" ng-click="ctrl.updateSubscription(subscription)">\r\n    <h5>Modifier <i class="glyphicon glyphicon-edit"></i></h5>\r\n  </a>\r\n</span>\r\n');
$templateCache.put('components/member/registration/action/update/registration.update.html','<span>\r\n  <a class="btn btn-primary" role="button"\r\n    ng-click="ctrl.showForm(subscription)">\r\n    <h5>Modifier <i class="glyphicon glyphicon-edit"></i></h5>\r\n  </a>\r\n</span>\r\n');}]);