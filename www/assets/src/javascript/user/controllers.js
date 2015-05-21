'use strict';

/* Controllers */
(function () {

  /* User */
  angular.module('dgcApp')
  .controller('DGC_Obj.controllers.user.main',
  ['$rootScope', '$scope', 'DgcConfig',
  function ($rootScope, $scope, DgcConfig) {

      DgcConfig.services.utils.console.log('main');

      $rootScope.pageClass = ' page-main';

      $scope.view = {
        url: DgcConfig.services.utils.path.view(DgcConfig.path.include.view.user.item.src)
      };

  }]);

})();


/*
(function (_DGC_Obj, _DGC_ObjM, _DGC_ObjC) {

    $.extend(_DGC_ObjC, {
        "dGC_ObjControllersUser": _DGC_ObjM('dGC_ObjControllersUser', [])
    });

    /* User
    _DGC_ObjC.dGC_ObjControllersUser.controller('DGC_Obj.controllers.user.main',
        ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'DGC_Obj.providers.user.factory', 'DGC_Obj.services.user.factory',
            function ($rootScope, $scope, $routeParams, $http, $location, DGC_ObjProvidersUserFactory, DGC_ObjServicesUserFactory) {

                DGC_Obj.services.utils.console.log('main');

                $rootScope.pageClass = " page-main";

                $scope.view = {
                    url: DGC_Obj.services.utils.path.view(_DGC_Obj.path.include.view.user.item.src)
                };

            }]);

})(DGC_Obj, DGC_Obj.modules, DGC_Obj.controllers);
*/