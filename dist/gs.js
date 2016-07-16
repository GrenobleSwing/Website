/**
 * @ngdoc service
 * @name sdt.models:ObserverService
 * @description
 * # ObserverService
 * Manages all events inside the application
 *
 * @see https://github.com/greglbd/angular-observer-pattern
 *
 */
angular.module('sdt.models', [])
  .factory('ObserverService', [ function() {
    /* Initialize list of observers */
    var _observerService= {};

    /**
     * @ngdoc property
     * @name ObserverService#observers
     * @propertyOf sdt.models:ObserverService
     * @description object to store all observers in
     * @returns {object} object
     */
    _observerService.observers = {};

    /* Declare methods */
    /**
     * @ngdoc method
     * @name ObserverService#attach
     * @methodOf sdt.models:ObserverService
     * @param {function} callback the callback function to fire
     * @param {string} event name of the event
     * @param {string} id unique id for the object that is listening i.e. namespace
     * @description adds events listeners
     */
    _observerService.attach = function(callback, event, id) {
      if(id) {
        if (!_observerService.observers[event]) {
          _observerService.observers[event] = {};
        }

        if(!_observerService.observers[event][id])
          _observerService.observers[event][id] = [];

        _observerService.observers[event][id].push(callback);
      }
    };


    /**
     * @ngdoc method
     * @name ObserverService#detachById
     * @methodOf sdt.models:ObserverService
     * @param {string} id unique id for the object that is listening i.e. namespace
     * @description removes all events for a specific id from the observers object
     */
    _observerService.detachById = function(id) {
      for(var event in _observerService.observers)
      {
        _observerService.detachByEventAndId(event, id);
      }
    };

    /**
     * @ngdoc method
     * @name ObserverService#detachById
     * @methodOf sdt.models:ObserverService
     * @param {string} event name of the event
     * @description removes removes all the event from the observer object
     */
    _observerService.detachByEvent = function(event) {
      if(event in _observerService.observers) {
        delete _observerService.observers[event];
      }
    };

    /**
     * @ngdoc method
     * @name ObserverService#detachByEventAndId
     * @methodOf sdt.models:ObserverService
     * @param {string} event name of the event
     * @param {string} id unique id for the object that is listening i.e. namespace
     * @description removes removes all callbacks for an id in a specific event from the observer object
     */
    _observerService.detachByEventAndId = function(event, id) {
      if(event in _observerService.observers) {
        if(id in _observerService.observers[event]) {
          delete _observerService.observers[event][id];
        }
      }
    };

    /**
     * @ngdoc method
     * @name ObserverService#notify
     * @methodOf sdt.models:ObserverService
     * @param {string} event name of the event
     * @param {string|object|array|number} parameters pass whatever your listener is expecting
     * @description notifies all observers of a specific event
     */
    _observerService.notify = function(event, parameters) {
      for(var id in _observerService.observers[event]) {
        angular.forEach(_observerService.observers[event][id], function (callback) {
          callback(parameters);
        });
      }
    };

    return _observerService;
}]);
angular.module('app', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngResource',
    'app.auth',
    'app.common',
    'app.home',
    'app.login',
    'app.logout',
    'app.account',
    'app.subscriptions',
    'app.balance',
    'app.signup',
    'app.password',
    'app.users',
    'sdt.models',
    'pascalprecht.translate'
  ])
  .config(['$routeProvider', DefaultRouteConfig])
  .config(['$translateProvider', TranslateConfiguration])
  .run(['$rootScope', '$location', '$cookieStore', '$http', run]);

function DefaultRouteConfig($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/login' });
}

function run($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = ['/login', '/sign-up'].indexOf($location.path()) === -1; // jshint ignore:line
        var loggedIn = !!$rootScope.globals.currentUser ? !!$rootScope.globals.currentUser.login && !!$rootScope.globals.currentUser.authdata : false;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });
}
function SignUpRouteConfig($routeProvider) {
  $routeProvider.when('/sign-up', {
          controller: 'signUpController',
          templateUrl: 'partials/signup.html',
          controllerAs: 'ctrl'
      });
}
function SignUpController($location, userService) {
  this.location = $location;
  this.userService = userService;

  this.login = "";
  this.password = "";
  this.passwordConfirmation = "";

  this.init_();
}

SignUpController.prototype = {
    init_ : function init_() {
        this.handleResponse_ = this.handleResponse_.bind(this);
    },

    signUp : function signUp() {
        this.userService.create({login: this.login, password: this.password}).then(this.handleResponse_);
    },

    handleResponse_ : function handleResponse_(response) {
        if (response.success) {
            this.location.path('/login');
        }
    }
};
function SubscriptionService(resource) {
  this.subscriptionResource = resource;

  this.init_();
}

SubscriptionService.prototype = {

    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    getByUser: function getByUser(user) {
        return this.subscriptionResource.getAll({userId: user.id}).then(this.handleSuccess_, this.handleError_('Error retrieving subscriptions by User'));
    },

    addSubscription: function addSubscription(user, topic) {
      return this.subscriptionResource.create({userId: user.id, topicId: topic.id}).then(this.handleSuccess_, this.handleError_('Error adding subscription'));
    },

    cancelSubscription: function cancelSubscription(subscription) {
      return this.subscriptionResource.remove(subscription.id).then(this.handleSuccess_, this.handleError_('Error cancelling subscription'));
    },

    validateSubscription: function validateSubscription(subscription) {
      return this.subscriptionResource.validate(subscription).then(this.handleSuccess_, this.handleError_('Error validating subscription'));
    },

    // private functions
    handleSuccess_ : function handleSuccess_(res) {
        res.$ok = true;
        return res;
    },

    handleError_: function handleError_(error) {
        return function () {
            return { $ok: false, message: error };
        };
    }
};
function FakeSubscriptionResource($timeout, $filter, $q, $resource) {
  this.timeout = $timeout;
  this.filter = $filter;
  this.q = $q;
  this.resource = $resource;

  this.subscriptionResource = this.resource('resources/sample/subscriptions.json', {},  {query: {method:'GET', isArray: true}});
  this.errorsResource = this.resource('resources/sample/validationErrors.json', {},  {query: {method:'GET', isArray: true}});

  this.init_();
}

FakeSubscriptionResource.prototype = {

  init_: function init_() {

  },

  getById : function getById(id) {
      var deferred = this.q.defer();
      var filtered = this.filter('filter')(this.subscriptions, { id: id });
      var subscription = filtered.length ? filtered[0] : null;
      deferred.resolve(subscription);
      return deferred.promise;
  },

  getAll: function getAll(params) {
    return this.subscriptionResource.query().$promise.then(function(data) {
      var deferred = this.q.defer();
      var filtered = this.filter('filter')(data, params);
      deferred.resolve(filtered);
      return deferred.promise;
    }.bind(this));
  },

  validate: function validate(subscription) {
    var deferred = this.q.defer();
    deferred.resolve(this.errors);
    return deferred.promise;
  },

  create: function create(subscription) {
      var deferred = this.q.defer();

      // simulate api call with $timeout
      var filtered = this.filter('filter')(this.subscriptions, { id: subscription.id });
      if (filtered.length > 0) {
          deferred.resolve({ success: false, message: 'Subscription "' + subscription.name + '" is already taken' });
      } else {
          var lastSubscription = subscriptions[this.subscription.length - 1] || { id: 0 };
          infos.id = lastSubscription.id + 1;

          // save to local storage
          this.subscriptions.push(subscription);

          deferred.resolve({ success: true });
      }

      return deferred.promise;
  },

  update: function update(subscription) {
      var deferred = this.q.defer();

      for (var i = 0; i < this.subscriptions.length; i++) {
          if (this.subscriptions[i].id === subscription.id) {
              this.subscriptions[i] = subscription;
              break;
          }
      }
      deferred.resolve();

      return deferred.promise;
  },

  remove: function remove(id) {
      var deferred = $q.defer();

      for (var i = 0; i < this.subscriptions.length; i++) {
          var subscription = this.subscriptions[i];
          if (subscription.id === id) {
              this.subscription.splice(i, 1);
              break;
          }
      }
      deferred.resolve();

      return deferred.promise;
  }

};
function SubscriptionsViewController(subscriptionService) {
  this.subscriptionService = subscriptionService;
  this.user = {id: 2};
  this.list = [];
  this.init_();
}

SubscriptionsViewController.prototype = {
    init_ : function init_() {
      this.list = this.listSubscriptions();
    },

    validateSubscription: function validateSubscription(subscription) {
      return this.subscriptionService.validateSubscription(subscription);
    },

    addSubscription : function addSubscription(topic) {
      this.subscriptionService.addSubscription(this.user, topic);
    },

    removeSubscription : function removeSubscription(subscriptionId) {
      this.subscriptionService.removeSubscription(subscriptionId);
    },

    listSubscriptions : function listSubscriptions() {
      this.list = this.subscriptionService.getByUser(this.user).then(function(data) {
        this.list = data;
      }.bind(this));
      return this.list;
    }
};
function SubscriptionResource($resource) {
  this.resource = $resource('/api/subscription/:subscriptionId', {subscriptionId:'@id'}, {
    'get':    { method:'GET' },
    'validate': { method:'GET' },
    'create': { method:'POST' },
    'update': { method:'PUT' },
    'query':  { method:'GET', isArray:true },
    'delete': { method:'DELETE' }
  });

  this.init_();
}

SubscriptionResource.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    getById: function getById(id) {
        return this.resource.get(id).then(this.handleSuccess_, this.handleError_('Error getting subscription by id'));
    },

	  getAll: function getAll(params) {
        return this.resource.query(params).then(this.handleSuccess_, this.handleError_('Error getting all subscriptions'));
    },

    create: function create(subscription) {
        return this.resource.create(subscription).then(this.handleSuccess_, this.handleError_('Error creating subscription'));
    },

    update: function update(subscription) {
        return this.resource.update(subscription).then(this.handleSuccess_, this.handleError_('Error updating subscription'));
    },

    remove: function remove(id) {
        return this.resource.delete(id).then(this.handleSuccess_, this.handleError_('Error deleting subscription'));
    },

    validate: function validate(subscription) {
        return this.resource.validate(subscription).then(this.handleSuccess_, this.handleError_('Error validating subscription'));
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
function SubscriptionsViewDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'partials/subscriptions.view.html',
    controller: 'subscriptionsViewController',
    controllerAs: 'ctrl'
  };
}
// Base64 encoding service used by AuthenticationService
function Base64() {
    this.keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
}

Base64.prototype = {
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this.keyStr.charAt(enc1) +
                this.keyStr.charAt(enc2) +
                this.keyStr.charAt(enc3) +
                this.keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
    },

    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            window.alert("There were invalid base64 characters in the input text.\n" +
                "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                "Expect errors in decoding.");
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
            enc1 = this.keyStr.indexOf(input.charAt(i++));
            enc2 = this.keyStr.indexOf(input.charAt(i++));
            enc3 = this.keyStr.indexOf(input.charAt(i++));
            enc4 = this.keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);

        return output;
    }
};
/**
 * Dummy authentication for testing, uses $timeout to simulate api call
 */
function FakeAuthenticationService($http, $cookieStore, $rootScope, encoder, currentUserService) {
  this.http = $http;
  this.cookieStore = $cookieStore;
  this.currentUserService = currentUserService;
  this.encoder = encoder;
  this.rootScope = $rootScope;

  this.init_();
}

FakeAuthenticationService.prototype = {
    init_ : function init_() {
        this.handleResponse_ = this.handleResponse_.bind(this);
    },

    login: function login(username, password) {
        return this.currentUserService.getByLogin(username)
        .then(this.handleResponse_);
    },

    setCredentials : function setCredentials(username, password) {
        var authdata = this.encoder.encode(username + ':' + password);

        this.rootScope.globals = {
            currentUser: {
                login: username,
                authdata: authdata
            }
        };

        this.http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
        this.cookieStore.put('globals', this.rootScope.globals);
    },

    clearCredentials : function clearCredentials() {
        this.rootScope.globals = {};
        this.cookieStore.remove('globals');
        this.http.defaults.headers.common.Authorization = 'Basic';
    },

    handleResponse_ : function handleResponse_(user) {
      if(user.$ok) {
        this.setCredentials(user.login, user.password);
      }
      return user;
    }
  };
function AuthenticationService($http, $cookieStore, $rootScope, encoder, currentUserService) {
  this.http = $http;
  this.rootScope = $rootScope;
  this.cookieStore = $cookieStore;
  this.encoder = encoder;
  this.currentUserService = currentUserService;

  this.init_();
}

AuthenticationService.prototype = {
    init_ : function init_() {
      this.handleSuccess_ = this.handleSuccess_.bind(this);
    },

    login: function login(username, password, callback) {
        this.http.post('/api/authenticate', { username: username, password: password })
           .success(function (response) {
      			    response.success = true;
      				  this.setCredentials(username, password);
      				  this.currentUserService.getByLogin(username);
                return response;
      			  }).error(function(response) {
          response.success = false;
          return response;
        }).then(callback);
    },

    setCredentials : function setCredentials(username, password) {
        var authdata = this.encoder.encode(username + ':' + password);

        this.rootScope.globals = {
                        currentUser: {
                            login: username,
                            authdata: authdata
                        }
        };

        this.http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
        this.cookieStore.put('globals', this.rootScope.globals);
    },

    clearCredentials : function clearCredentials() {
        this.rootScope.globals = {};
        this.cookieStore.remove('globals');
        this.http.defaults.headers.common.Authorization = 'Basic';
    }
};
function PasswordEditController(passwordService) {
  this.password = "";
  this.passwordConfirm = "";

  this.user = {};

  this.passwordService = passwordService;
}

PasswordEditController.prototype = {

  save: function save() {
    return this.passwordService.updatePassword(this.user, password, passwordConfirm);
  }
};
function PasswordEditDirective() {
  return {
    restrict: 'A',
    templateUrl: 'partials/password.edit.html',
    controller: 'passwordEditController',
    controllerAs: 'ctrl',
    scope : {
      user: "=gsPasswordEdit"
    }
  };
}
function PasswordService(passwordResource) {
  this.passwordResource = passwordResource;

  this.init_();
}

PasswordService.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    updatePassword: function updatePassword(account, password, passwordConfirmation) {
        return this.passwordResource.change(account, password).then(this.handleSuccess_, this.handleError_('Error updating password'));
    },

    // private functions
    handleSuccess_ : function handleSuccess_(res) {
        res.$ok = true;
        return res;
    },

    handleError_: function handleError_(error) {
        return function () {
            return { $ok: false, message: error };
        };
    }
};
function PasswordResource($http) {
  this.http = $http;

  this.init_();
}

PasswordResource.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    change: function updchangeate(account, password) {
        return this.http.put('/api/account/change-password/' + account.id, password).then(this.handleSuccess_, this.handleError_('Error changing password'));
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
function LoginController($location, authenticationService) {
  this.location = $location;
  this.login = "";
  this.password = "";
  this.isLoading = false;
  this.authenticationService = authenticationService;
  this.init_();
}

LoginController.prototype = {
  init_ : function init_() {
    this.onResponse_ = this.onResponse_.bind(this);
    this.authenticationService.clearCredentials();
  },

  connect : function connect() {
      this.isLoading = false;
      this.authenticationService.login(this.login, this.password).then(this.onResponse_);
  },

  onResponse_ : function onResponse_(user) {
      this.isLoading = false;
      if (user.$ok) {
          this.location.path('/home');
      } else {
          // console.error(response.message);
      }
  }
};
function LoginRouteConfig($routeProvider) {
  $routeProvider
        .when('/login', {
            controller: 'loginController',
            templateUrl: 'partials/login.html',
            controllerAs: 'ctrl'
      });
}
function TopicResource($resource) {
  this.resource = $resource('/api/topic/:topicId', {topicId:'@id'}, {
    'get':    { method:'GET' },
    'create': { method:'POST' },
    'update': { method:'PUT' },
    'query':  { method:'GET', isArray:true },
    'delete': { method:'DELETE' }
  });

  this.init_();
}

TopicResource.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    getById: function getById(id) {
        return this.resource.get(id).then(this.handleSuccess_, this.handleError_('Error getting topic by id'));
    },

	  getByUserId: function getByUserId(userId) {
        return this.resource.query({userId : userId}).then(this.handleSuccess_, this.handleError_('Error getting all topics'));
    },

    create: function create(topic) {
        return this.resource.create(topic).then(this.handleSuccess_, this.handleError_('Error creating topic'));
    },

    update: function update(topic) {
        return this.resource.update(topic).then(this.handleSuccess_, this.handleError_('Error updating topic'));
    },

    remove: function remove(id) {
        return this.resource.delete(id).then(this.handleSuccess_, this.handleError_('Error deleting topic'));
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
function FakeTopicResource($timeout, $filter, $q, $resource) {
  this.timeout = $timeout;
  this.filter = $filter;
  this.q = $q;

  this.topics = JSON.stringify([]);

  this.resource = $resource('resources/sample/topics.json', {});

    this.init_();
}

FakeTopicResource.prototype = {

  init_: function init_() {
    this.getTopics_ = this.getTopics_.bind(this);

    this.resource.query(function(topics) {
      this.setTopics_(topics);
    }.bind(this));
  },

  getById : function getById(id) {
      var deferred = this.q.defer();
      var filtered = this.filter('filter')(this.getTopics_(), { id: id });
      var topic = filtered.length ? filtered[0] : null;
      deferred.resolve(topic);
      return deferred.promise;
  },

    getByUserId : function getByUserId(userId) {
        var deferred = this.q.defer();
        var filtered = this.filter('filter')(this.getTopics_(), { userId: userId });
        var topic = filtered.length ? filtered[0] : {};
        deferred.resolve(topic);
        return deferred.promise;
    },

    create: function create(topic) {
        var deferred = this.q.defer();

        // simulate api call with $timeout
        var filtered = this.filter('filter')(this.getTopics_(), { id: topic.id });
        if (filtered.length > 0) {
            deferred.resolve({ success: false, message: 'Topic "' + topic.name + '" is already taken' });
        } else {
            var topics = this.getTopics_();

            // assign id
            var lastTopic = topics[topic.length - 1] || { id: 0 };
            infos.id = lastTopic.id + 1;

            // save to local storage
            topics.push(topic);
            this.setTopics_(topics);

            deferred.resolve({ success: true });
        }

        return deferred.promise;
    },

    update: function update(topic) {
        var deferred = this.q.defer();

        var topics = this.getTopics_();
        for (var i = 0; i < topics.length; i++) {
            if (topics[i].id === topic.id) {
                topics[i] = topic;
                break;
            }
        }
        this.setTopics_(topics);
        deferred.resolve();

        return deferred.promise;
    },

    remove: function remove(id) {
        var deferred = $q.defer();

        var topics = this.getTopics_();
        for (var i = 0; i < topics.length; i++) {
            var topic = topics[i];
            if (topic.id === id) {
                topics.splice(i, 1);
                break;
            }
        }
        this.setTopics_(topics);
        deferred.resolve();

        return deferred.promise;
    },

    // private functions
    getTopics_ : function getTopics_() {
        if(!this.topics) {
            this.topics = JSON.stringify([]);
        }

        return JSON.parse(this.topics);
    },

    setTopics_ : function setTopics_(topics) {
        this.topics = JSON.stringify(topics);
    }
};
function FakeUsersResource($timeout, $filter, $q, $resource) {
  this.timeout = $timeout;
  this.filter = $filter;
  this.q = $q;

  this.users = JSON.stringify([]);

  this.resource = $resource('resources/sample/users.json', {});

  this.init_();
}

FakeUsersResource.prototype = {

    init_: function init_() {
      this.getUsers_ = this.getUsers_.bind(this);

      this.resource.query(function(users) {
        this.setUsers_(users);
      }.bind(this));
    },

    getAll : function getAll() {
        var deferred = this.q.defer();
        deferred.resolve(this.getUsers_());
        return deferred.promise;
    },

    getById: function getById(id) {
        var deferred = this.q.defer();
        var filtered = this.filter('filter')(this.getUsers_(), { id: id });
        var user = filtered.length ? filtered[0] : null;
        deferred.resolve(user);
        return deferred.promise;
    },

    getByUsername : function getByUsername(username) {
        var deferred = this.q.defer();
        var filtered = this.filter('filter')(this.getUsers_(), { login: username });
        var user = filtered.length ? filtered[0] : null;
        deferred.resolve(user);
        return deferred.promise;
    },

    create: function create(user) {
        var deferred = this.q.defer();

        // simulate api call with $timeout
          var filtered = this.filter('filter')(this.getUsers_(), { login: user.login });
          if (filtered.length > 0) {
              deferred.resolve({ success: false, message: 'Username "' + user.login + '" is already taken' });
          } else {
              var users = this.getUsers_();

              // assign id
              var lastUser = users[users.length - 1] || { id: 0 };
              user.id = lastUser.id + 1;

              // save to local storage
              users.push(user);
              this.setUsers_(users);

              deferred.resolve({ success: true });
          }

        return deferred.promise;
    },

    update: function update(user) {
        var deferred = this.q.defer();

        var users = this.getUsers_();
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === user.id) {
                users[i] = user;
                break;
            }
        }
        this.setUsers_(users);
        deferred.resolve();

        return deferred.promise;
    },

    remove: function remove(id) {
        var deferred = $q.defer();

        var users = this.getUsers_();
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            if (user.id === id) {
                users.splice(i, 1);
                break;
            }
        }
        this.setUsers_(users);
        deferred.resolve();

        return deferred.promise;
    },

    // private functions
    getUsers_ : function getUsers_() {
        if(!this.users){
            this.users = JSON.stringify([]);
        }

        return JSON.parse(this.users);
    },

    setUsers_ : function setUsers_(users) {
        this.users = JSON.stringify(users);
    }
};
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
function UsersResource($http) {
  this.http = $http;

  this.init_();
}

UsersResource.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    getById: function getById(id) {
        return this.http.get('/api/user/' + id).then(this.handleSuccess_, this.handleError_('Error getting user by id'));
    },

    getByUsername: function getByUsername(username) {
        return this.http.get('/api/user/' + username).then(this.handleSuccess_, this.handleError_('Error getting user by username'));
    },

	getAll: function getAll() {
        return this.http.get('/api/users').then(this.handleSuccess_, this.handleError_('Error getting all users'));
    },

    create: function create(user) {
        return this.http.post('/api/user', user).then(handleSuccess_, this.handleError_('Error creating user'));
    },

    update: function update(user) {
        return this.http.put('/api/user/' + user.id, user).then(handleSuccess_, this.handleError_('Error updating user'));
    },

    remove: function remove(id) {
        return this.http.delete('/api/user/' + id).then(handleSuccess_, this.handleError_('Error deleting user'));
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
function HomeRouteConfig($routeProvider) {
  $routeProvider
        .when('/home', {
            controller: 'homeController',
            templateUrl: 'partials/home.html',
            controllerAs: 'ctrl'
          });
}
function HomeController(currentUserService) {
  this.currentUserService = currentUserService;

  this.user = {$ok : false};

  this.init_();
}

HomeController.prototype = {

  init_: function init_() {
      this.user = this.currentUserService.getCurrentUser();
  }
};
function LogoutController($location, authenticationService) {
    this.location = $location;
    this.authenticationService = authenticationService;
}

LogoutController.prototype =  {
    logout: function logout() {
      this.authenticationService.clearCredentials();
      this.location.path('/login');
    }
};
function CompareToDirective() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=gsCompareTo"
        },
        link: function (scope, element, attrs, ngModelController) {
            ngModelController.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("compareTo", function() {
                ngModelController.$validate();
            });
        }
    };
}
function BalanceViewController(currentUserService) {
  this.currentUserService = currentUserService;
  this.init_();
}

BalanceViewController.prototype = {
    init_ : function init_() {

    }
};
function BalanceViewDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'app/js/components/balance/balance.view.html',
    controller: 'BalanceViewController',
    controllerAs: 'ctrl'
  };
}
function AccountResource($http) {
  this.http = $http;

  this.init_();
}

AccountResource.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    getById: function getById(id) {
        return this.http.get('/api/account/' + id).then(this.handleSuccess_, this.handleError_('Error getting account by id'));
    },

    getByUserId: function getByUserId(userId) {
        return this.http.get('/api/account/user/' + userId).then(this.handleSuccess_, this.handleError_('Error getting account by accountname'));
    },

	  getAll: function getAll() {
        return this.http.get('/api/account').then(this.handleSuccess_, this.handleError_('Error getting all accounts'));
    },

    create: function create(account) {
        return this.http.post('/api/account', account).then(this.handleSuccess_, this.handleError_('Error creating account'));
    },

    update: function update(account) {
        return this.http.put('/api/account/' + account.id, account).then(this.handleSuccess_, this.handleError_('Error updating account'));
    },

    remove: function remove(id) {
        return this.http.delete('/api/account/' + id).then(this.handleSuccess_, this.handleError_('Error deleting account'));
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
function AccountService(resource, passwordResource) {
  this.accountResource = resource;
  this.passwordResource = passwordResource;

  this.init_();
}

AccountService.prototype = {
    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    getByUser: function getByUser(user) {
        return this.accountResource.getByUserId(user.id).then(this.handleSuccess_, this.handleError_('Error getting account by accountname'));
    },

    updateAccount: function updateAccount(account) {
  		if (account.id === null) {
  			return this.accountResource.create(account).then(this.handleSuccess_, this.handleError_('Error creating account'));
  		} else {
  			return this.accountResource.update(account).then(this.handleSuccess_, this.handleError_('Error updating account'));
  		}
    },

    // private functions
    handleSuccess_ : function handleSuccess_(res) {
        res.$ok = true;
        return res;
    },

    handleError_: function handleError_(error) {
        return function () {
            return { $ok: false, message: error };
        };
    }
};
function FakeAccountResource($timeout, $filter, $q, $resource) {
  this.timeout = $timeout;
  this.filter = $filter;
  this.q = $q;

  this.accounts = JSON.stringify([]);

  this.resource = $resource('resources/sample/accounts.json', {});

    this.init_();
}

FakeAccountResource.prototype = {

  init_: function init_() {
    this.getAccounts_ = this.getAccounts_.bind(this);

    this.resource.query(function(accounts) {
      this.setAccounts_(accounts);
    }.bind(this));
  },

  getById : function getById(id) {
      var deferred = this.q.defer();
      var filtered = this.filter('filter')(this.getAccounts_(), { id: id });
      var account = filtered.length ? filtered[0] : null;
      deferred.resolve(account);
      return deferred.promise;
  },

    getByUserId : function getByUserId(userId) {
        var deferred = this.q.defer();
        var filtered = this.filter('filter')(this.getAccounts_(), { userId: userId });
        var account = filtered.length ? filtered[0] : {};
        deferred.resolve(account);
        return deferred.promise;
    },

    create: function create(account) {
        var deferred = this.q.defer();

        // simulate api call with $timeout
        var filtered = this.filter('filter')(this.getAccounts_(), { id: account.id });
        if (filtered.length > 0) {
            deferred.resolve({ success: false, message: 'Account "' + account.name + '" is already taken' });
        } else {
            var accounts = this.getAccounts_();

            // assign id
            var lastAccount = accounts[account.length - 1] || { id: 0 };
            infos.id = lastAccount.id + 1;

            // save to local storage
            accounts.push(account);
            this.setAccounts_(accounts);

            deferred.resolve({ success: true });
        }

        return deferred.promise;
    },

    update: function update(account) {
        var deferred = this.q.defer();

        var accounts = this.getAccounts_();
        for (var i = 0; i < infos.length; i++) {
            if (accounts[i].id === info.id) {
                accounts[i] = account;
                break;
            }
        }
        this.setAccounts_(accounts);
        deferred.resolve();

        return deferred.promise;
    },

    remove: function remove(id) {
        var deferred = $q.defer();

        var accounts = this.getAccounts_();
        for (var i = 0; i < accounts.length; i++) {
            var account = accounts[i];
            if (account.id === id) {
                accounts.splice(i, 1);
                break;
            }
        }
        this.setAccounts_(accounts);
        deferred.resolve();

        return deferred.promise;
    },

    // private functions
    getAccounts_ : function getAccounts_() {
        if(!this.accounts) {
            this.accounts = JSON.stringify([]);
        }

        return JSON.parse(this.accounts);
    },

    setAccounts_ : function setAccounts_(accounts) {
        this.accounts = JSON.stringify(accounts);
    }
};
function AccountViewDirective() {
  return {
    restrict: 'A',
    templateUrl: 'partials/account.view.html',
    controller: 'accountViewController',
    controllerAs: 'ctrl',
    scope : {
      user: "=gsAccountView"
    }
  };
}
function AccountViewController($scope, accountService) {
  this.accountService = accountService;
  this.account = {$ok: false};
  this.user = $scope.user;
  this.init_();
}

AccountViewController.prototype = {
    init_ : function init_() {
  		this.handleInitResponse_ = this.handleInitResponse_.bind(this);
      this.account = this.accountService.getByUser(this.user).then(this.handleInitResponse_);
    },

    handleInitResponse_ : function handleInitResponse_(response) {
  		this.account = response;
  		this.account.$ok = true;
      return this.account;
    },
};
angular.module('app.signup', ['app.users'])
  .config(['$routeProvider', SignUpRouteConfig])
  .controller('signUpController', ['$location', 'userService', SignUpController]);
angular
  .module('app.subscriptions', ['app.users'])
  .directive('gsSubscriptionsView', SubscriptionsViewDirective)
  .service('subscriptionResource', ['$timeout', '$filter', '$q', '$resource', FakeSubscriptionResource])
  .service('subscriptionService', ['subscriptionResource', SubscriptionService])
  .controller('subscriptionsViewController', ['subscriptionService', SubscriptionsViewController]);
function TranslateConfiguration($translateProvider) {
  $translateProvider.translations('fr', {
    'LOGIN' : {
      'TITLE' : 'Déja membre ?',
      'SIGNUP': 'Nouveau membre ?',
      'MESSAGE': 'La création d\'un compte est gratuite et sans aucune obligation de votre part. Avoir un compte chez nous vous donne accès à votre espace personnel pour suivre votre information en temps réel.'
    },
    'SIGNUP': {
      'TITLE': 'Créer un compte'
    },
    'ACCOUNT': {
      'TITLE': 'Etat civil',
      'ADDRESS': 'Adresse',
      'FIRSTNAME' : 'Prénom',
      'FIRSTNAME_REQUIRED' : 'le prénom est requis',
      'LASTNAME' : 'Nom',
      'LASTNAME_REQUIRED' : 'le nom est requis',
      'EMAIL' : 'Courriel',
      'EMAIL_REQUIRED': 'Le courriel est requis',
      'PASSWORD': 'Mot de passe',
      'PASSWORD_REQUIRED': 'Le mot de passe est requis',
      'PASSWORD_CONFIRM': 'Confirmation du mot de passe',
      'PASSWORD_CONFIRM_REQUIRED': 'Le mot de passe est erroné',
      'CITY' : 'Ville',
      'COUNTRY' : 'Pays',
      'ZIPCODE' : 'Code postal',
      'PRIMARY_ROLE': 'Rôle principal',
      'LEADER': 'Leader',
      'FOLLOWER' : 'Follower',
      'GENDER' : 'Genre',
      'MALE' : 'Homme',
      'FEMALE' : 'Femme'
    },
    'SUBSCRIPTIONS' : {
      'TITLE': 'Inscriptions',
    },
    'BALANCE' : {
      'TITLE': 'Solde',
    },
    'PASSWORD' : {
      'TITLE': 'Mot de passe',
    },
    'TOPICS' : {
      'TITLE': 'Thèmes',
    },
    'ACTION' : {
      'SAVE' : 'Enregistrer',
      'CONNECT' : 'Ouvrir une session',
      'SIGNUP' : 'Continuer',
      'CHANGE' : 'Modifier',
      'CANCEL' : 'Annuler'
    }
  });
  $translateProvider.useSanitizeValueStrategy(null);
  $translateProvider.preferredLanguage('fr');
}
angular
    .module('app.auth', ['app.users', 'sdt.models'])
    .service('encoder', Base64)
    .service('authenticationService', ['$http', '$cookieStore', '$rootScope', 'encoder', 
      'currentUserService', FakeAuthenticationService]);
angular.module('app.password', [])
  .directive('gsPasswordEdit', PasswordEditDirective)
  .service('passwordResource', ['$http', PasswordResource])
  .service('passwordService', ['passwordResource', PasswordService])
  .controller('passwordEditController', ['passwordService', PasswordEditController]);
angular.module('app.login', ['app.auth'])
.config(['$routeProvider', LoginRouteConfig])
.controller('loginController', ['$location', 'authenticationService', LoginController]);
angular
    .module('app.users', ['ngResource'])
    // .service('usersResource', ['$http', UsersResource])
	  .service('usersResource', ['$timeout', '$filter', '$q', '$resource', FakeUsersResource])
    .service('currentUserService', ['usersResource', CurrentUserService])
    .service('userService', ['usersResource', UserService])
    .service('usersService', ['usersResource', UsersService]);
angular.module('app.home', [])
.config(['$routeProvider', HomeRouteConfig])
.controller('homeController', ['currentUserService', HomeController]);
angular
    .module('app.logout', ['app.auth'])
    .controller('logoutController', ['$location', 'authenticationService', LogoutController]);
angular.module('app.common', [])
  .directive('gsCompareTo', CompareToDirective);
angular
  .module('app.balance', ['app.users'])
  .directive('gsBalanceView', BalanceViewDirective)
  .controller('balanceViewController', ['usersService', BalanceViewController]);
angular.module('app.account', ['app.users', 'ngResource'])
  .directive('gsAccountView', AccountViewDirective)
  .service('accountResource', ['$timeout', '$filter', '$q', '$resource', FakeAccountResource])
  .service('accountService', ['accountResource', AccountService])
  .controller('accountViewController', ['$scope', 'accountService', AccountViewController]);
angular.module('app', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngResource',
    'app.auth',
    'app.common',
    'app.home',
    'app.login',
    'app.logout',
    'app.account',
    'app.subscriptions',
    'app.balance',
    'app.signup',
    'app.password',
    'app.users',
    'sdt.models',
    'pascalprecht.translate'
  ])
  .config(['$routeProvider', DefaultRouteConfig])
  .config(['$translateProvider', TranslateConfiguration])
  .run(['$rootScope', '$location', '$cookieStore', '$http', run]);

function DefaultRouteConfig($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/login' });
}

function run($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = ['/login', '/sign-up'].indexOf($location.path()) === -1; // jshint ignore:line
        var loggedIn = !!$rootScope.globals.currentUser ? !!$rootScope.globals.currentUser.login && !!$rootScope.globals.currentUser.authdata : false;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });
}
