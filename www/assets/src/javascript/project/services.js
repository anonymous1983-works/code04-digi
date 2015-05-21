'use strict';

/* Services */

(function ($) {

    /* Login */
  angular.module('dgcApp')
    .factory('DGC_Obj.services.project.factory', ['$log', 'DgcConfig',
    function ($log, DgcConfig) {
      var services = {};

      services.initFilter = function () {

        $('.project-wrap-nav-filter .types .checkbox input').change(function () {
          $log.log($(this).is(':checked'));
          //$('.panel-project-wrap-body-container')
          $log.log('.panel-project-wrap-body-container .item-min-project[data-type=' + $(this).val() + ']');
          $('.panel-project-wrap-body-container .item-min-project[data-type=' + $(this).val() + ']').toggle();
          services.initPackeryProject();
        });

      };
      services.initPackery = function () {
          if (DgcConfig.activePackery) {
              /*if(_DGC_Obj.documentPackery){
                  _DGC_Obj.documentPackery.packery('destroy');
              }*/
              DgcConfig.documentPackery = $('#panel-project-wrap-body-container').packery();
          }
          return true;
      };
      services.initPackeryProject = function () {
          if (DgcConfig.activePackery) {
              /*if(_DGC_Obj.documentPackery){
               _DGC_Obj.documentPackery.packery('destroy');
               }*/
              DgcConfig.documentPackery = $('#panel-project-wrap-body-container').packery();
          }
          return true;
      };
      services.initShowProject = function (valeur) {
          if (valeur) {
              DgcConfig.services.session.set('_DGC_showProjectGridList', valeur);
              return valeur;
          } else {
              // Get showProjectGridList
              var showProjectGridList = DgcConfig.services.session.get('_DGC_showProjectGridList');
              if (showProjectGridList) {
                  return showProjectGridList;
              } else {
                  DgcConfig.services.session.set('_DGC_showProjectGridList', DgcConfig.utils.project.show.default);
                  return DgcConfig.utils.project.show.default;
              }
          }
      };

      return services;
    }]);
})(jQuery);


/*
(function (_W, _DGC_Obj, _DGC_ObjM, _DGC_ObjS) {

    $.extend(_DGC_ObjS, {
        "dGC_ObjServicesProject": _DGC_ObjM('dGC_ObjServicesProject', ['ngResource'])
    });

    // Login
    _DGC_ObjS.dGC_ObjServicesProject.factory('DGC_Obj.services.project.factory', ['$http',
        function ($http) {
            var services = {};

            services.initFilter = function () {

                $('.project-wrap-nav-filter .types .checkbox input').change(function () {
                    console.log($(this).is(":checked"))
                    //$('.panel-project-wrap-body-container')
                    console.log('.panel-project-wrap-body-container .item-min-project[data-type=' + $(this).val() + ']');
                    $('.panel-project-wrap-body-container .item-min-project[data-type=' + $(this).val() + ']').toggle();
                    services.initPackeryProject();
                })

            };
            services.initPackery = function () {
                if (_DGC_Obj.activePackery) {
                    /*if(_DGC_Obj.documentPackery){
                        _DGC_Obj.documentPackery.packery('destroy');
                    }
                    _DGC_Obj.documentPackery = $('#panel-project-wrap-body-container').packery();
                }
                return true;
            };
            services.initPackeryProject = function () {
                if (_DGC_Obj.activePackery) {
                    /*if(_DGC_Obj.documentPackery){
                     _DGC_Obj.documentPackery.packery('destroy');
                     }
                    _DGC_Obj.documentPackery = $('#panel-project-wrap-body-container').packery();
                }
                return true;
            };
            services.initShowProject = function (valeur) {
                if (valeur) {
                    DGC_Obj.services.session.set("_DGC_showProjectGridList", valeur);
                    return valeur;
                } else {
                    // Get showProjectGridList
                    var showProjectGridList = DGC_Obj.services.session.get("_DGC_showProjectGridList");
                    if (showProjectGridList) {
                        return showProjectGridList;
                    } else {
                        DGC_Obj.services.session.set("_DGC_showProjectGridList", DGC_Obj.utils.project.show.default);
                        return DGC_Obj.utils.project.show.default;
                    }
                }
            }
            return services;
        }]);
})(window, DGC_Obj, DGC_Obj.modules, DGC_Obj.services);
*/