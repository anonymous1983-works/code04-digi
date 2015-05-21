'use strict';

/* Provider */
(function () {

  /* Login */
  angular.module('dgcApp')
  .factory('DGC_Obj.providers.search.factory', ['$http', 'DgcConfig',
    function ($http, DgcConfig) {
      var factory = {};

      factory.search = function () {

          angular.extend(DgcConfig.request.project.search.data, {
              //"search": _work_
              //"place_id": "ChIJAcX0u1YoQg0R6ZlFdkOQgIA",
              //"id":1
          });

          var req = DgcConfig.services.utils.path.webservice(DgcConfig.request.project.search);

          return $http(req);

      };

      return factory;
  }]);
})();

/*
(function (_DGC_Obj, _DGC_ObjM, _DGC_ObjP) {

    $.extend(_DGC_ObjP, {
        "dGC_ObjProvidersSearch": _DGC_ObjM('dGC_ObjProvidersSearch', ['ngResource'])
    });

    // Login
    _DGC_ObjP.dGC_ObjProvidersSearch.factory('DGC_Obj.providers.search.factory', ['$http',
        function ($http) {
            var factory = {};

            factory.search = function (_work_) {

                $.extend(_DGC_Obj.request.project.search.data, {
                    //"search": _work_
                    //"place_id": "ChIJAcX0u1YoQg0R6ZlFdkOQgIA",
                    //"id":1
                });

                var req = _DGC_Obj.services.utils.path.webservice(_DGC_Obj.request.project.search);

                return $http(req);

            };

            return factory;
        }]);
})(DGC_Obj, DGC_Obj.modules, DGC_Obj.providers);
*/