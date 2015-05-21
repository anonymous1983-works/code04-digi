'use strict';

/* Controllers */
(function () {

  /* Search */
  angular.module('dgcApp')
    .controller('DGC_Obj.controllers.search.main',
    ['$rootScope', '$scope', '$location', '$filter', 'DgcConfig','DGC_Obj.services.search.factory',
    function ($rootScope, $scope, $location, $filter, DgcConfig, DGC_ObjServicesSearchFactory) {

      $rootScope.controllerssearch = '';
      $rootScope._DGC_RS_search = '';
      $scope.inputFilterQuery = '';

      $scope.searchSubmit = function () {
        if (!$scope.inputFilterQuery) {
          return false;
        }
        $location.path(DgcConfig.routing.project_search.replace(/:_search_/i, $scope.inputFilterQuery));
      };

      DGC_ObjServicesSearchFactory.quickSearch($scope, $filter);

  }]);
})();


/*
(function (_DGC_Obj, _DGC_ObjM, _DGC_ObjC) {

    $.extend(_DGC_ObjC, {
        "dGC_ObjControllersSearch": _DGC_ObjM('dGC_ObjControllersSearch', [])
    });

    // Search
    _DGC_ObjC.dGC_ObjControllersSearch.controller('DGC_Obj.controllers.search.main',
        ['$rootScope', '$scope', '$routeParams', '$http', '$location', '$filter', 'DGC_Obj.providers.search.factory', 'DGC_Obj.services.search.factory',
            function ($rootScope, $scope, $routeParams, $http, $location, $filter, DGC_ObjProvidersSearchFactory, DGC_ObjServicesSearchFactory) {
                // log info [init Controllers]
                //_DGC_Obj.services.utils.console.init("init Controllers :: DGC_Obj.controllers.search.main");

                $rootScope.controllerssearch = "";
                $rootScope._DGC_RS_search = "";



                $scope.inputFilterQuery = "";

                $scope.searchSubmit = function () {
                    if (!$scope.inputFilterQuery)
                        return false;
                    $location.path(_DGC_Obj.routing.project_search.replace(/:_search_/i, $scope.inputFilterQuery));
                }

                DGC_ObjServicesSearchFactory.quickSearch($scope, $filter);


            }]);
})(DGC_Obj, DGC_Obj.modules, DGC_Obj.controllers);
*/