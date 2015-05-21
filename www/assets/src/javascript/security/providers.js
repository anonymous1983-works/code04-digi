'use strict';

/* Provider */
(function ($) {

  /* Login */
  angular.module('dgcApp')
    .factory('DGC_Obj.providers.security.factory',
      ['$http', '$location', '$rootScope', 'DgcConfig',
      function ($http, $location, $rootScope, DgcConfig) {
        var factory = {};

        factory.getUser = function (_login, _password) {

            angular.extend(DgcConfig.request.user.login.data, {
              login: _login,
              password: _password
            });

            var req = DgcConfig.services.utils.path.webservice(DgcConfig.request.user.login);

            $http(req).success(function (data, status) {

                // this callback will be called asynchronously
                // when the response is available
                DgcConfig.services.utils.console.info('Status : ' + status);
                DgcConfig.services.utils.console.log(data);

                // Set session id
                $rootScope._DGC_RS_id_user = data.id;
                DgcConfig.services.session.set('_DGC_RS_id_user', DgcConfig.services.json.set(data.id));

                // Set session _DGC_RS_user
                $rootScope._DGC_RS_user = data;
                DgcConfig.services.session.set('_DGC_RS_user', DgcConfig.services.json.set(data));

                // get session userlog
                var userlog = DgcConfig.services.json.get(DgcConfig.services.session.get('_DGC_RS_user'));
                DgcConfig.services.utils.console.info(userlog.name);

                $location.path(DgcConfig.routing.default);

            }).error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

                DgcConfig.services.utils.console.info('_login : ' + _login);
                DgcConfig.services.utils.console.info('_password : ' + _password);
                DgcConfig.services.utils.console.info('Status : ' + config);

                $('.form-group').addClass('has-error');

                /*if (_login != "" || _password != "")
                    $('body').djcNotification({
                        style: 'flip',
                        message: 'Login Service is temporarily unavailable please try again late!',
                        position: 'top-right',
                        timeout: 2000,
                        type: 'error'
                    }).show();*/
            });

        };

        factory.checkLog = function (userlog) {
            factory.getUser(userlog.login, userlog.password);
        };

    return factory;
  }]);
})(jQuery);

/*
(function (_DGC_Obj, _DGC_ObjM, _DGC_ObjP) {

    $.extend(_DGC_ObjP, {
        "dGC_ObjProvidersSecurity": _DGC_ObjM('dGC_ObjProvidersSecurity', ['ngResource'])
    });

    // Login
    _DGC_ObjP.dGC_ObjProvidersSecurity.factory('DGC_Obj.providers.security.factory', ['$http', '$location', '$rootScope', 'DGC_Obj.providers.user.factory',
        function ($http, $location, $rootScope, DGC_ObjProvidersUserFactory) {
            var factory = {};

            factory.getUser = function (_login, _password) {

                $.extend(DGC_Obj.request.user.login.data, {
                    "login": _login,
                    "password": _password
                });

                var req = _DGC_Obj.services.utils.path.webservice(DGC_Obj.request.user.login);

                $http(req).success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    DGC_Obj.services.utils.console.info("Status : " + status);
                    DGC_Obj.services.utils.console.log(data);
                    // Set session id
                    $rootScope._DGC_RS_id_user = data.id;
                    DGC_Obj.services.session.set("_DGC_RS_id_user", DGC_Obj.services.json.set(data.id));
                    // Set session _DGC_RS_user
                    $rootScope._DGC_RS_user = data;
                    DGC_Obj.services.session.set("_DGC_RS_user", DGC_Obj.services.json.set(data));

                    // get session userlog
                    var userlog = DGC_Obj.services.json.get(DGC_Obj.services.session.get("_DGC_RS_user"));
                    DGC_Obj.services.utils.console.info(userlog.name);

                    // get User data
                    /*DGC_ObjProvidersUserFactory.getUserById(data.id).then(
                        function (response) {
                            DGC_Obj.services.utils.console.log(response.data);
                            $rootScope.RS_user = response.data;
                            DGC_Obj.services.session.set("_DGC_RS_user", DGC_Obj.services.json.set(response.data));

                            // Redirect for default path
                            $location.path(_DGC_Obj.routing.default);
                        },
                        function (httpError) {
                            // translate the error
                            throw httpError.status + " : " + httpError.data;
                        });

                    $location.path(_DGC_Obj.routing.default);

                }).error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.

                    DGC_Obj.services.utils.console.info("_login : " + _login);
                    DGC_Obj.services.utils.console.info("_password : " + _password);
                    DGC_Obj.services.utils.console.info("Status : " + config);
                    //console.log(this.statusCode());
                    //DGC_Obj.services.utils.console.info("Header : " + responseError);

                    $('.form-group').addClass('has-error');

                    /*if (_login != "" || _password != "")
                        $('body').djcNotification({
                            style: 'flip',
                            message: 'Login Service is temporarily unavailable please try again late!',
                            position: 'top-right',
                            timeout: 2000,
                            type: 'error'
                        }).show();
                });

            }, factory.checkLog = function (userlog) {
                factory.getUser(userlog.login, userlog.password);
            };
            return factory;
        }]);
})(DGC_Obj, DGC_Obj.modules, DGC_Obj.providers);
*/