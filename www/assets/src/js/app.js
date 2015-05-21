'use strict';

(function() {

  angular.module('dgcApp', [
    'btford.markdown',
    '720kb.tooltips',
    'ui.router'
  ]);

  angular.module('dgcApp')
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', '$compileProvider', 'FormatUrlProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $compileProvider, FormatUrlProvider) {

      // router
      $stateProvider

        .state('login', {
          url: '/login',
          templateUrl: FormatUrlProvider.getTemplatePath('login') + 'login.html',
          controller: 'LoginController'
        })

        .state('main', {
          abstract: true,
          templateUrl: FormatUrlProvider.getTemplatePath('main') + 'main.html',
          controller: 'MainController'
        })

          .state('main.list', {
            url: '/list/:search',
            templateUrl: FormatUrlProvider.getTemplatePath('projectList') + 'list.html',
            controller: 'ProjectListController',
            resolve: {
              ProjectListData: ['$stateParams', 'ProjectFactory',
              function($stateParams, ProjectFactory) {
                return ProjectFactory.getProjectList($stateParams.search);
              }],
              TagListData: ['TagFactory',
              function(TagFactory) {
                return TagFactory.getTagList();
              }]
            }
          })

          .state('main.detail', {
            url: '/detail/:projectId',
            templateUrl: FormatUrlProvider.getTemplatePath('projectDetail') + 'detail.html',
            controller: 'ProjectDetailController',
            resolve: {
              ProjectDetailData: ['$stateParams', 'ProjectFactory',
              function($stateParams, ProjectFactory) {
                return ProjectFactory.getProjectById($stateParams.projectId);
              }]
            }
          })

          .state('main.dashboard', {
            url: '/dashboard',
            templateUrl: FormatUrlProvider.getTemplatePath('dashboard') + 'dashboard.html',
            controller: 'DashboardController'
          })
      ;
      $urlRouterProvider.otherwise('/login');

      // interceptors
      $httpProvider.interceptors.push('TokenFactory');
      //$httpProvider.interceptors.push('HttpErrorFactory');

      $locationProvider.html5Mode(false);
      $compileProvider.debugInfoEnabled(true);
    }])

    .run(['$rootScope', 'UserFactory', 'BackButton',
    function($rootScope, UserFactory, BackButton) {

      //$rootScope.$on('$stateChangeSuccess', UserFactory.checkConnexion);

      BackButton.routerFix();

    }]);

})();
