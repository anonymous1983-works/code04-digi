'use strict';

(function ($) {

  /* Main */
  angular.module('dgcApp')
    .controller('DGC_Obj.controllers.main',
    ['$rootScope', 'DgcConfig',
    function ($rootScope, DgcConfig) {

      angular.extend($rootScope, {
        DGC_Obj: {
          utils: DgcConfig.utils,
          routing: DgcConfig.routing
        },
        pageClass: 'page-main page-project',
        _DGC_RS_user: DgcConfig.services.json.get(DgcConfig.services.session.get('_DGC_RS_user')),
        _DGC_RS_currentProjectSelected : {}
      });

      $('[data-toggle="tooltip"]').tooltip();

    }]);

    angular.module('dgcApp')
      .controller('DGC_Obj.controllers.header',
      ['$rootScope', '$scope', '$location', '$compile', 'DgcConfig',
      function ($rootScope, $scope, $location, $compile, DgcConfig) {

        $rootScope.pageClass += ' header-init ';

        angular.extend($rootScope, {
          _DGC_RS_currentProjectSelected: {},

          // Use ex. ng-click="DGC_ObjMainAction_createJsonProject($event)"
          DGC_ObjMainAction_createJsonProject: function (clickEvent) {

            $rootScope._DGC_RS_currentProjectSelected = null;
            $scope._DGC_currentProjectSelected = null;

            if(clickEvent.currentTarget.dataset.project) {
                $rootScope._DGC_RS_currentProjectSelected = DgcConfig.services.json.get(clickEvent.currentTarget.dataset.project);
                $scope._DGC_currentProjectSelected = $rootScope._DGC_RS_currentProjectSelected;
            }

            var directive = $compile('<dgc-modal-project-json></dgc-modal-project-json>')($scope);
            if ($('dgc-modal-project-json').length) {
              $('dgc-modal-project-json').remove();
            }
            $('body').append(directive);
          }
        });

        angular.extend($scope, {

          // Use ex. ng-click="DGC_ObjMainAction_logout()"
          DGC_ObjMainAction_logout: function () {
            DgcConfig.services.session.destroy('_DGC_RS_user');
            DgcConfig.services.session.destroy('_DGC_RS_id_user');
            $location.path(DgcConfig.routing.login);
            return false;
          }
        });

    }]);
})(jQuery);


/* Controllers *//*
(function (_DGC_Obj, _DGC_ObjM, _DGC_ObjC, _DGC_ObjS) {

    $.extend(_DGC_ObjC, {
        "dGC_ObjControllers": _DGC_ObjM('dGC_ObjControllers', ['dGC_ObjServicesSidebarMenu'])
    });

    _DGC_ObjC.dGC_ObjControllers.controller('DGC_Obj.controllers.main',
        ['$rootScope', '$scope', '$location', 'DGC_Obj.providers.user.factory',
            function ($rootScope, $scope, $location, DGC_ObjProvidersUserFactory) {

                angular.extend($rootScope, {
                    DGC_Obj: {
                        utils: _DGC_Obj.utils,
                        routing: _DGC_Obj.routing
                    },
                    pageClass: "page-main page-project",
                    _DGC_RS_user: _DGC_ObjS.json.get(_DGC_ObjS.session.get("_DGC_RS_user")),
                    _DGC_RS_currentProjectSelected : {}
                });

                $('[data-toggle="tooltip"]').tooltip();

                return true;
            }]);

    _DGC_ObjC.dGC_ObjControllers.controller('DGC_Obj.controllers.header',
        ['$rootScope', '$scope', '$location', '$compile', 'DGC_Obj.providers.user.factory',
            function ($rootScope, $scope, $location, $compile, DGC_ObjProvidersUserFactory) {

                $rootScope.pageClass += " header-init ";

                angular.extend($rootScope, {
                    _DGC_RS_currentProjectSelected: {},
                    DGC_ObjMainAction_createJsonProject: function (clickEvent) {

                        $rootScope._DGC_RS_currentProjectSelected = null;
                        $scope._DGC_currentProjectSelected = null;

                        if(clickEvent.currentTarget.dataset.project != '') {
                            $rootScope._DGC_RS_currentProjectSelected = _DGC_ObjS.json.get(clickEvent.currentTarget.dataset.project);
                            $scope._DGC_currentProjectSelected = $rootScope._DGC_RS_currentProjectSelected;
                        }



                        var directive = $compile("<dgc-modal-project-json></dgc-modal-project-json>")($scope);
                        if($('dgc-modal-project-json').length != 0)
                            $('dgc-modal-project-json').remove();
                        $('body').append(directive);

                    }
                });

                angular.extend($scope, {

                    DGC_ObjMainAction_logout: function () {
                        _DGC_ObjS.session.destroy("_DGC_RS_user");
                        _DGC_ObjS.session.destroy("_DGC_RS_id_user");
                        $location.path(_DGC_Obj.routing.login);
                        return false;
                    }
                });

            }]);
})(DGC_Obj, DGC_Obj.modules, DGC_Obj.controllers, DGC_Obj.services);*/