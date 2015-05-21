'use strict';

/* Controllers */
(function () {

  /* Login */
  angular.module('dgcApp')
    .controller('DGC_Obj.controllers.event',
    ['$scope', '$timeout', 'DGC_Obj.providers.event.factory', 'DgcConfig',
    function ($scope, $timeout, DGC_ObjProvidersEventFactory, DgcConfig) {

        $scope.event = '';

        DGC_ObjProvidersEventFactory.getEvent().then(
          function (response) {
              $scope.event = response.data;

              $timeout(function () {
                  DgcConfig.services.jQuery.scrollbar.init('.page-sidebar-right .list-unstyled');
              }, 200, false);

              return response.data;
          },
          function (httpError) {

              // translate the error
              throw httpError.status + ' : ' + httpError.data;
          }
        );

    }]);

})();

/*
(function (_DGC_Obj, _DGC_ObjM, _DGC_ObjC) {

    $.extend(_DGC_ObjC, {
        "dGC_ObjControllersEvent": _DGC_ObjM('dGC_ObjControllersEvent', [])
    });

    //
    _DGC_ObjC.dGC_ObjControllersEvent.controller('DGC_Obj.controllers.event',
        ['$scope', '$routeParams', '$http', '$location', '$timeout', 'DGC_Obj.providers.event.factory', 'DGC_Obj.services.event.factory',
            function ($scope, $routeParams, $http, $location, $timeout, DGC_ObjProvidersEventFactory, DGC_ObjServicesEventFactory) {

                $scope.event = "";

                DGC_ObjProvidersEventFactory.getEvent().then(
                    function (response) {
                        $scope.event = response.data;

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