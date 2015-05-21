'use strict';

/* Provider */
(function () {

    /* Login */
  angular.module('dgcApp')
    .factory('DGC_Obj.providers.event.factory', ['$http', 'DgcConfig',
    function ($http, DgcConfig) {
      var factory = {

        getEventProject: function (_id_) {
          var req = DgcConfig.services.utils.path.webservice(DgcConfig.request.event.project);
          req.url = req.url + '/' + _id_;
          return $http(req);
        },
        getEventUser: function (_id_) {
          var req = DgcConfig.services.utils.path.webservice(DgcConfig.request.event.user);
          req.url = req.url + '/' + _id_;
          return $http(req);
        }
      };

      return factory;
    }]);
})();

/*
(function (_DGC_Obj, _DGC_ObjM, _DGC_ObjP) {

    $.extend(_DGC_ObjP, {
        "dGC_ObjProvidersEvent": _DGC_ObjM('dGC_ObjProvidersEvent', ['ngResource'])
    });

    // Login
    _DGC_ObjP.dGC_ObjProvidersEvent.factory('DGC_Obj.providers.event.factory', ['$http',
        function ($http) {
            var factory = {};

            factory.getEventProject = function (_id_) {

                var req = _DGC_Obj.services.utils.path.webservice(DGC_Obj.request.event.project);

                req.url = req.url+"/"+_id_;

                return $http(req);

            };

            factory.getEventUser = function (_id_) {

                var req = _DGC_Obj.services.utils.path.webservice(DGC_Obj.request.event.user);

                req.url = req.url+"/"+_id_;

                return $http(req);

            };
            return factory;
        }]);
})(DGC_Obj, DGC_Obj.modules, DGC_Obj.providers);
*/