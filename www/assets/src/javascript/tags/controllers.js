'use strict';

/* Controllers */
(function () {

  /* Login */
  angular.module('dgcApp')
  .controller('DGC_Obj.controllers.tags',
      ['$scope', '$timeout', 'DgcConfig','DGC_Obj.providers.tags.factory',
      function ($scope, $timeout, DgcConfig, DGC_ObjProvidersTagsFactory) {

        $scope.tags = '';

        DGC_ObjProvidersTagsFactory.getTags().then(
          function (response) {
              $scope.tags = response.data;

              $timeout(function () {
                  DgcConfig.services.jQuery.scrollbar.init('.page-sidebar-right .list-unstyled');
              }, 200, false);

              return response.data;
          },
          function (httpError) {

              // translate the error
              throw httpError.status + ' : ' + httpError.data;
          });

        return true;
    }]);
})();

/*
(function (_DGC_Obj, _DGC_ObjM, _DGC_ObjC) {

    $.extend(_DGC_ObjC, {
        "dGC_ObjControllersTags": _DGC_ObjM('dGC_ObjControllersTags', [])
    });

    // Login
    _DGC_ObjC.dGC_ObjControllersTags.controller('DGC_Obj.controllers.tags',
        ['$scope', '$routeParams', '$http', '$location', '$timeout', 'DGC_Obj.providers.tags.factory', 'DGC_Obj.services.tags.factory', 'DGC_Obj.services.main.sidebar.menu.service',
            function ($scope, $routeParams, $http, $location, $timeout, DGC_ObjProvidersTagsFactory, DGC_ObjServicesTagsFactory, DGC_ObjServicesMainSidebarMenuService) {

                $scope.tags = "";

                DGC_ObjProvidersTagsFactory.getTags().then(
                    function (response) {
                        $scope.tags = response.data;

                        $timeout(function () {
                            _DGC_Obj.services.jQuery.scrollbar.init('.page-sidebar-right .list-unstyled');
                        }, 200, false);

                        return response.data;
                    },
                    function (httpError) {
                        // translate the error
                        throw httpError.status + " : " + httpError.data;
                    });

                return true;
            }]);
})(DGC_Obj, DGC_Obj.modules, DGC_Obj.controllers);
*/