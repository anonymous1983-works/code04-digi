'use strict';

/* Services */
(function () {

    /* Login */
    angular.module('dgcApp')
    .factory('DGC_Obj.services.tags.factory', [
        function () {
            var services = {};

            return services;
        }]);
})();


/*
(function (_DGC_ObjM, _DGC_ObjS) {

    $.extend(_DGC_ObjS, {
        "dGC_ObjServicesTags": _DGC_ObjM('dGC_ObjServicesTags', ['ngResource'])
    });

    /* Login
    _DGC_ObjS.dGC_ObjServicesTags.factory('DGC_Obj.services.tags.factory', ['$http',
        function ($http) {
            var services = {};

            return services;
        }]);
})(DGC_Obj.modules, DGC_Obj.services);
*/