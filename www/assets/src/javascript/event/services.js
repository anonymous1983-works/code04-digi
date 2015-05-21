'use strict';

/* Services */
(function () {

  /* Login */
  angular.module('dgcApp')
    .factory('DGC_Obj.services.event.factory', [
      function () {
        var services = {};
        return services;
      }]);
})();

/*
(function (_DGC_ObjM, _DGC_ObjS) {

  $.extend(_DGC_ObjS, {
      "dGC_ObjServicesEvent": _DGC_ObjM('dGC_ObjServicesEvent', ['ngResource'])
  });

  //
  _DGC_ObjS.dGC_ObjServicesEvent.factory('DGC_Obj.services.event.factory', ['$http',
      function ($http) {
          var services = {};

          return services;
      }]);
})(DGC_Obj.modules, DGC_Obj.services);
*/