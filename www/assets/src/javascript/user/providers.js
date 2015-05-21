'use strict';

/* Provider */
(function () {

  /* Login */
  angular.module('dgcApp')
    .factory('DGC_Obj.providers.user.factory', ['$http', 'DgcConfig',
    function ($http, DgcConfig) {
      var factory = {};

      factory.getAllUsers = function () {

        var req = DgcConfig.services.utils.path.webservice(DgcConfig.request.user.list);

        return $http(req);

      };

      factory.getUserById = function (_id) {

        var req = DgcConfig.services.utils.path.webservice(DgcConfig.request.user.getById);

        req.url = req.url + '/' + _id;

        return $http(req);

      };
      return factory;
    }]);
})();


/*
(function (_DGC_Obj, _DGC_ObjM, _DGC_ObjP) {

    $.extend(_DGC_ObjP, {
        "dGC_ObjProvidersUser": _DGC_ObjM('dGC_ObjProvidersUser', ['ngResource'])
    });

    /* Login
    _DGC_ObjP.dGC_ObjProvidersUser.factory('DGC_Obj.providers.user.factory', ['$http', '$location',
        function ($http, $location) {
            var factory = {};

            factory.getAllUsers = function () {

                var req = _DGC_Obj.services.utils.path.webservice(DGC_Obj.request.user.list);

                return $http(req);

            };

            factory.getUserById = function (_id) {

                var req = _DGC_Obj.services.utils.path.webservice(DGC_Obj.request.user.getById);

                req.url = req.url+"/"+_id;

                return $http(req);

            };
            return factory;
        }]);
})(DGC_Obj, DGC_Obj.modules, DGC_Obj.providers);
*/