angular.module('app', ['ngCookies', 'ui.bootstrap', 'ngResource',
        'ui.router', 'permission', 'permission.ui',
        'ngMessages',
        'app.account',
        'app.acl',
        'app.admin',
        'app.admin.nav',
        'app.admin.secretariat',
        'app.admin.treasury',
        'app.auth',
        'app.classes.common',
        'app.classes.list',
        'app.cnil',
        'app.common',
        'app.config',
        'app.home',
        'app.http',
        'app.identity',
        'app.invoice.request',
        'app.login',
        'app.logout',
        'app.main.nav',
        'app.member.nav',
        'app.password.common',
        'app.password.edit',
        'app.password.forgot',
        'app.password.reset',
        'app.signup',
        'app.students.common',
        'app.students.duet',
        'app.students.solo',
        'app.subscriptions.amount',
        'app.subscriptions.actions.add',
        'app.subscriptions.actions.update',
        'app.subscriptions.actions.cancel',
        'app.subscriptions.common',
        'app.subscriptions.list',
        'app.subscriptions.description.duet',
        'app.subscriptions.description.solo',
        'app.subscriptions.duet.dialog',
        'app.summary',
        'app.topic.common',
        'app.topic.edit',
        'app.topic.list',
        'app.users',
        'pascalprecht.translate',
        'rorymadden.date-dropdowns',
        'sdt.models'
    ])
    .config(['$stateProvider', '$urlRouterProvider', DefaultRouteConfig])
    .config(['$translateProvider', TranslateConfiguration]);

function DefaultRouteConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index', {
            abstract: true,
            url: '/',
            views: {
                'nav@': {
                    template: ''
                },
                'content@': {
                    template: ''
                }
            }
        })
        .state('member', {
            abstract: true,
            resolve: {
                authorize: ['authorizationService', '$state',
                    function(authService, $state) {
                        return authService.authorize().catch(function() {
                            $state.go('logout');
                        });
                    }
                ]
            },
            views: {
                'nav@': {
                    templateUrl: 'components/member-navigation/navbar.html',
                    controller: 'memberNavController',
                    controllerAs: 'ctrl'
                }
            },
            data: {
                requireLogin: true,
            }
        })
        .state('admin', {
            abstract: true,
            resolve: {
                authorize: ['authorizationService', '$state',
                    function(authService, $state) {
                        return authService.authorize().catch(function() {
                            $state.go('logout');
                        });
                    }
                ]
            },
            views: {
                'nav@': {
                    templateUrl: 'components/admin-navigation/navbar.html',
                    controller: 'adminNavController',
                    controllerAs: 'ctrl'
                }
            },
            data: {
                requireLogin: true,
            }
        })
        .state('access-denied', {
            url: '/denied',
            views: {
                'nav':  {
                    template: ''
                },
                'content@': {
                    template: '<alert type="danger"><strong>Access Denied</strong><p>You don\'t have permission to see this. <a href="" ui-sref="index.home">Return home.</a></p></alert>'
                }
            },
            data: {
                requireLogin: false,
                roles: []
            }
        });

    $urlRouterProvider.otherwise( function($injector) {
      var $state = $injector.get("$state");
      $state.go('/somestate');
    });
}

function run($rootScope, $state, $stateParams, authService, identityService) {
    identityService.getIdentity(true).then(function(data) {
        console.info("run - getIdentity succeeded...");
    }, function(error) {
        console.info("run - getIdentity failed...");
        identityService.clearIdentity();
        $state.go('index.login');
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
        $rootScope.toState = toState;
        $rootScope.toStateParams = toStateParams;
        if (identityService.isAuthenticated()) {
            authService.authorize();
        }
    });
}

angular.module('app').run(['$rootScope', '$state', '$stateParams', 'authorizationService', 'identityService', run]);
