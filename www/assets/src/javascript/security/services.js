'use strict';

/* Services */
(function () {

    /* Login */
  angular.module('dgcApp')
    .factory('DGC_Obj.services.security.factory',
    ['$http', 'DgcConfig',
    function ($http, DgcConfig) {
      var factory = {};

      factory.getUser = function () {
        angular.extend(DgcConfig.request.user.login.data, {
            login: 'abid',
            password: 'Amundi@1983'
        });
        var req = DgcConfig.request.user.login;

        $http(req).success(function (data) {

            // this callback will be called asynchronously
            // when the response is available
            DgcConfig.services.utils.console.info(data);
        }).error(function () {

            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
      };
      return factory;
  }]);
})();


/*
(function (_DGC_ObjM, _DGC_ObjS) {

    $.extend(_DGC_ObjS, {
        "dGC_ObjServicesSecurity": _DGC_ObjM('dGC_ObjServicesSecurity', ['ngResource'])
    });

    // Login
    _DGC_ObjS.dGC_ObjServicesSecurity.factory('DGC_Obj.services.security.factory', ['$http',
        function ($http) {
            var factory = {};

            factory.getUser = function () {
                $.extend(DGC_Obj.request.user.login.data, {
                    "login": "abid",
                    "password": "Amundi@1983"
                });
                var req = DGC_Obj.request.user.login;

                $http(req).success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    DGC_Obj.services.utils.console.info(data);
                }).error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            };
            return factory;
        }]);
})(DGC_Obj.modules, DGC_Obj.services);
*/