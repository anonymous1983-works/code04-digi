'use strict';

/* Controllers */
(function () {

  /* Login */
  angular.module('dgcApp')
  .controller('DGC_Obj.controllers.security.login',
      ['$rootScope', '$scope', '$location', 'DgcConfig','DGC_Obj.providers.security.factory',
      function ($rootScope, $scope, $location, DgcConfig, DGC_ObjProvidersSecurityFactory) {

      // log info [init Controllers]
      DgcConfig.services.utils.console.info('init Controllers :: DGC_Obj.controllers.security.login');

      $rootScope.pageClass = 'page-login';

      $scope.userlog = {
        login: '',
        password: ''
      };

      $scope.formLoginSubmit = function () {
        DGC_ObjProvidersSecurityFactory.checkLog($scope.userlog);
        DgcConfig.services.utils.console.log($scope.userlog);
      };

  }]);

  angular.module('dgcApp')
  .controller('DGC_Obj.controllers.security.check',
    ['$location', 'DgcConfig',
    function ($location, DgcConfig) {

      // Security check Authentication
      DgcConfig.services.security.checkRedirect($location);

  }]);
})();


/*
(function (_DGC_Obj, _DGC_ObjM, _DGC_ObjC) {

    $.extend(_DGC_ObjC, {
        "dGC_ObjControllersSecurity": _DGC_ObjM('dGC_ObjControllersSecurity', [])
    });

    // Login
    _DGC_ObjC.dGC_ObjControllersSecurity.controller('DGC_Obj.controllers.security.login',
        ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'DGC_Obj.providers.security.factory', 'DGC_Obj.services.security.factory',
            function ($rootScope, $scope, $routeParams, $http, $location, DGC_ObjProvidersSecurityFactory, DGC_ObjServicesSecurityFactory) {
                // log info [init Controllers]
                _DGC_Obj.services.utils.console.info("init Controllers :: DGC_Obj.controllers.security.login");

                $rootScope.pageClass = "page-login";

                $scope.userlog = {
                    login: '',
                    password: ''
                };

                $scope.formLoginSubmit = function () {
                    DGC_ObjProvidersSecurityFactory.checkLog($scope.userlog);
                    DGC_Obj.services.utils.console.log($scope.userlog);

                };

                //DGC_ObjProvidersSecurityFactory.checkLog();


            }])
        .controller('DGC_Obj.controllers.security.check',
        ['$rootScope', '$scope', '$routeParams', '$http', '$location',
            function ($rootScope, $scope, $routeParams, $http, $location) {
                // Security check Authentication
                _DGC_Obj.services.security.checkRedirect($location);


            }]);
})(DGC_Obj, DGC_Obj.modules, DGC_Obj.controllers);
*/