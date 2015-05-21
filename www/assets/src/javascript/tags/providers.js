'use strict';

/* Provider */
(function () {

  /* Login */
  angular.module('dgcApp')
  .factory('DGC_Obj.providers.tags.factory', ['$http', 'DgcConfig',
      function ($http, DgcConfig) {
          var factory = {};

          factory.getTags = function () {

            var req = DgcConfig.services.utils.path.webservice(DgcConfig.request.tags.list);

            return $http(req);

          };
          return factory;
      }]);
})();


/*
(function (_DGC_Obj, _DGC_ObjM, _DGC_ObjP) {

    $.extend(_DGC_ObjP, {
        "dGC_ObjProvidersTags": _DGC_ObjM('dGC_ObjProvidersTags', ['ngResource'])
    });

    /* Login
    _DGC_ObjP.dGC_ObjProvidersTags.factory('DGC_Obj.providers.tags.factory', ['$http',
        function ($http) {
            var factory = {};

            factory.getTags = function (success, error) {

                var req = _DGC_Obj.services.utils.path.webservice(DGC_Obj.request.tags.list);

                return $http(req);

            };
            return factory;
        }]);
})(DGC_Obj, DGC_Obj.modules, DGC_Obj.providers);
*/