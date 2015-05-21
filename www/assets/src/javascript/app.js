'use strict';

(function() {

  angular.module('dgcApp', [
    'btford.markdown',
    '720kb.tooltips',
    'ui.router'
  ]);

  angular.module('dgcApp')
    .config(['$stateProvider', '$urlRouterProvider', 'FormatUrlProvider',
    function($stateProvider, $urlRouterProvider, FormatUrlProvider) {

      $urlRouterProvider.otherwise('/projects');

      $stateProvider

        .state('login', {
          url: '/login',
          templateUrl: FormatUrlProvider.getTemplatePath('login') + 'login.html',
          controller: 'LoginController',
          controllerAs: 'login'
        })

        .state('main', {
          abstract: true,
          templateUrl: FormatUrlProvider.getTemplatePath('main') + 'main.html',
          controller: 'MainController',
          controllerAs: 'main'
        })

          .state('main.list', {
            url: '/main/:search',
            templateUrl: FormatUrlProvider.getTemplatePath('list') + 'list.html',
            controller: 'ProjectListController',
            controllerAs: 'list',
            resolve: {
              projectList: ['$stateParams', function($stateParams) {
                if($stateParams.search) {

                }
              }]
            }
          })

          .state('main.detail', {
            url: '/main/:projectId',
            templateUrl: FormatUrlProvider.getTemplatePath('detail') + 'detail.html',
            controller: 'ProjectDetailController',
            controllerAs: 'detail',
            resolve: {
              projectDetail: ['$stateParams', function($stateParams) {
                if($stateParams.projectId) {

                }
              }]
            }
          })

          .state('main.dashboard', {
            url: '/dashboard',
            templateUrl: FormatUrlProvider.getTemplatePath('dashboard') + 'dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'dashboard'
          })
      ;

    }])

    .run([function() {

    }]);

})();
