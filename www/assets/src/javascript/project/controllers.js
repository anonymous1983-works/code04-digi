'use strict';

/* Controllers */
(function ($) {

  /* Project */
  angular.module('dgcApp')
    .controller('DGC_Obj.controllers.project.main',
    ['$rootScope', '$scope', '$routeParams', '$location', 'DgcConfig','DGC_Obj.providers.project.factory', 'DGC_Obj.providers.event.factory',
    function ($rootScope, $scope, $routeParams, $location, DgcConfig, DGC_ObjProvidersProjectFactory, DGC_ObjProvidersEventFactory) {

      // Security check Authentication
      DgcConfig.services.security.checkRedirect($location);

      // log info [init Controllers]
      //_DGC_Obj.services.utils.console.init('init Controllers :: DGC_Obj.controllers.project.main');

      $rootScope.pageClass = ' page-main page-project page-project-main width-fixed ';

      $scope.controllersproject = '';

      $scope.view = {
          url: DgcConfig.services.utils.path.view(DgcConfig.path.include.view.project.item.src)
      };

      $scope.$on('ngRepeatFinished', function () {
          DgcConfig.services.jQuery.tooltip.init('.project-wrap-header [data-toggle="tooltip"]');
      });

      $scope.page_project_include = 'templates/views/include/project/dgc.page_project_home.tpl.html';

      DGC_ObjProvidersProjectFactory.getProjectById($routeParams._projectId_).then(
          function (response) {

              DgcConfig.services.utils.console.log(response.data);

              $scope.controllersproject = response.data;

              return response.data;
          },
          function (httpError) {
              // translate the error
              throw httpError.status + ' : ' + httpError.data;
          });


      $rootScope.controllersprojectevents = {
          list: {},
          limit: DgcConfig.utils.project.event.init
      };


      $rootScope.moreevents = function (nbr) {
          $rootScope.controllersprojectevents.limit += nbr;
      };

        DGC_ObjProvidersEventFactory.getEventProject($routeParams._projectId_).then(
            function (response) {

                DgcConfig.services.utils.console.log(response.data);

                $rootScope.controllersprojectevents.list = response.data;

                var dataProjectEvents = [],
                    obj = {
                        id: 0,
                        //date: 0,
                        day: 0,
                        activity: {
                            length: 0,
                            commit: 0,
                            build: 0
                        }
                    },
                    index = -1,
                    dayOld = -1,
                    day = -1;

                angular.forEach(response.data, function (item, key) {

                    var date = new Date();
                    date.setTime(item.creationDate);
                    day = date.getDate();


                    obj = {
                        id: item.creationDate.toString().substr(0, 6),
                        //date: item.creationDate,
                        day: date.getDate(),
                        //message: item.message,
                        activity: {
                            length: 1,
                            commit: ( (item.messageType == DgcConfig.utils.project.event.type.commit) ? 1 : 0),
                            build: ( (item.messageType == DgcConfig.utils.project.event.type.build) ? 1 : 0)
                        }
                    };

                    if (dayOld != day) {
                        dayOld = day;
                        index++;
                        this.push(obj);
                    } else {
                        this[index].activity.length++;
                        if (item.messageType == DgcConfig.utils.project.event.type.commit) this[index].activity.commit++;
                        if (item.messageType == DgcConfig.utils.project.event.type.build) this[index].activity.build++;
                    }
                }, dataProjectEvents);




                var dataJson = function (_dataProjectEvents) {

                    var obj = [
                        {
                            key: 'Commit',
                            values: []
                        },
                        {
                            key: 'Build',
                            values: []
                        }
                    ];

                        angular.forEach(_dataProjectEvents, function (item, key) {
                            obj[0].values.push(
                                {
                                    activity: 'commit',
                                    x: item.day,
                                    y: item.activity.commit
                                }
                            );
                            obj[1].values.push(
                                {
                                    activity: 'build',
                                    x: item.day,
                                    y: item.activity.build
                                }
                            )
                        });

                    return obj;


                };
                $rootScope.controllersprojectevents.dataProjectEvents = dataJson(dataProjectEvents);




                return response.data;
            },
            function (httpError) {
                // translate the error
                throw httpError.status + ' : ' + httpError.data;
            });

        DGC_ObjProvidersProjectFactory.getReadmeByProjectId($routeParams._projectId_).then(
            function (response) {

                DgcConfig.services.utils.console.log(response.data);

                $scope.controllersprojectreadme = response.data;

                return response.data;
            },
            function (httpError) {
                // translate the error
                throw httpError.status + ' : ' + httpError.data;
            });

/*        $scope.markdownToHTML = function () {
          markdown.toHTML($scope.controllersprojectreadme);
        };
*/
  }]);

  angular.module('dgcApp')
    .controller('DGC_Obj.controllers.project.list',
    ['$rootScope', '$scope', '$routeParams', '$http', '$location', '$timeout', 'DgcConfig', 'DGC_Obj.providers.project.factory', 'DGC_Obj.services.project.factory',
    function ($rootScope, $scope, $routeParams, $http, $location, $timeout, DgcConfig, DGC_ObjProvidersProjectFactory, DGC_ObjServicesProjectFactory) {

      // Security check Authentication
      DgcConfig.services.security.checkRedirect($location);

      // log info [init Controllers]
      //_DGC_Obj.services.utils.console.init('init Controllers :: DGC_Obj.controllers.project.list');

      var loader = '.page-portlet-loader';

      $rootScope.pageClass = ' side-bar-right-pin page-main page-project page-projects-list fixed-project-wrap-nav';

      $scope.$on('ngRepeatFinished', function () {
          var epsilon = 5;
          $('.project-description').each(function () {
              if (( $(this).height() + epsilon ) >= $(this).find('.text').height()) $(this).find('.more').remove();
          });
      });

                angular.extend($scope, {

                    view: {
                        url: DgcConfig.services.utils.path.view(DgcConfig.path.include.view.project.list.src)
                    },

                    controllersproject: '',

                    _DGC_showProjectGridList: DGC_ObjServicesProjectFactory.initShowProject(),

                    DGC_ObjProjectAction_more: function (clickEvent) {
                        $(clickEvent.target).parents('.item-min-project').toggleClass('plus');
                        DGC_ObjServicesProjectFactory.initPackeryProject();
                    },

                    DGC_ObjProjectAction_updateShowProject: function (valeur) {
                        $scope._DGC_showProjectGridList = DGC_ObjServicesProjectFactory.initShowProject(valeur);

                        $('.panel-project-wrap-body').toggleClass('show-list');

                        //($('.panel-project-wrap-body').hasClass('show-list'))? $('.panel-project-wrap-body').removeClass('show-list') : $('.panel-project-wrap-body').addClass('show-list');

                        DGC_ObjServicesProjectFactory.initPackeryProject();
                        /*$timeout(function () {
                         DGC_ObjServicesProjectFactory.initPackeryProject();
                         }, 2, false);*/

                        $scope.DGC_Obj.utils.project.taglimit = 20;

                    },

                    DGC_ObjProjectNgClass_type: function (valeur) {
                        return DgcConfig.utils.tabOfClass[valeur];
                    },

                    DGC_ObjProjectNgBind_note: function ($index) {
                        var tabNote = ['4/5', '20', '53', '41', '54'];
                        return tabNote[$index];
                    }

                });

                //DGC_Obj.services.utils.portlet.start(loader);

                DGC_ObjProvidersProjectFactory.getAllProjects().then(
                    function (response) {
                        $scope.controllersproject = response.data;

                        $timeout(function () {
                            DGC_ObjServicesProjectFactory.initPackeryProject();
                            //DGC_Obj.services.utils.portlet.stop(loader);
                            DgcConfig.services.jQuery.tooltip.init('.view-project-content [data-toggle="tooltip"]');
                        }, 200, false);

                        DGC_ObjServicesProjectFactory.initFilter();

                        return response.data;
                    },
                    function (httpError) {
                        // translate the error
                        throw httpError.status + ' : ' + httpError.data;
                    });

  }]);

  angular.module('dgcApp')
    .controller('DGC_Obj.controllers.project.search',
    ['$rootScope', '$scope', '$routeParams', '$http', '$q', '$location', '$timeout', 'DgcConfig', 'DGC_Obj.providers.project.factory', 'DGC_Obj.services.project.factory',
    function ($rootScope, $scope, $routeParams, $http, $q, $location, $timeout, DgcConfig, DGC_ObjProvidersProjectFactory, DGC_ObjServicesProjectFactory) {

      // Security check Authentication
      DgcConfig.services.security.checkRedirect($location);

      // log info [init Controllers]
      //_DGC_Obj.services.utils.console.init('init Controllers :: DGC_Obj.controllers.project.list');

      var loader = '.page-portlet-loader';

      $rootScope.pageClass = ' side-bar-right-pin page-main page-project page-projects-list fixed-project-wrap-nav ';

      $scope.controllersproject = '';


      $scope.$on('ngRepeatFinished', function () {
          var epsilon = 5;
          $('.project-description').each(function () {
              if (( $(this).height() + epsilon ) >= $(this).find('.text').height()) $(this).find('.more').remove();
          });
      });

      angular.extend($scope, {

          view: {
              url: DgcConfig.services.utils.path.view(DgcConfig.path.include.view.project.list.src)
          },

          controllersproject: '',

          _DGC_showProjectGridList: DGC_ObjServicesProjectFactory.initShowProject(),

          DGC_ObjProjectAction_more: function (clickEvent) {
              $(clickEvent.target).parents('.item-min-project').toggleClass('plus');
              DGC_ObjServicesProjectFactory.initPackeryProject();
          },

          DGC_ObjProjectAction_updateShowProject: function (valeur) {
              $scope._DGC_showProjectGridList = DGC_ObjServicesProjectFactory.initShowProject(valeur);

              $('.panel-project-wrap-body').toggleClass('show-list');

              //($('.panel-project-wrap-body').hasClass('show-list'))? $('.panel-project-wrap-body').removeClass('show-list') : $('.panel-project-wrap-body').addClass('show-list');

              DGC_ObjServicesProjectFactory.initPackeryProject();
              /*$timeout(function () {
               DGC_ObjServicesProjectFactory.initPackeryProject();
               }, 2, false);*/

              $scope.DGC_Obj.utils.project.taglimit = 20;

          },

          DGC_ObjProjectNgClass_type: function (valeur) {
              return DgcConfig.utils.tabOfClass[valeur];
          }
      });

      DGC_ObjProvidersProjectFactory.getSearchProjects($routeParams._search_).then(
          function (response) {

              var dataSearch = response.data,
                  arrayHttp = [];

              angular.forEach(dataSearch, function (response) {
                  //tmp.push(response.data);
                  arrayHttp.push(DGC_ObjProvidersProjectFactory.getProjectById(response.id));
                  //console.log('----------'+response.id);
              });

              $q.all(arrayHttp).then(function (result) {
                  var tmp = [];
                  angular.forEach(result, function (response) {
                      tmp.push(response.data);
                  });
                  return tmp;
              }).then(function (tmpResult) {

                  $scope.controllersproject = tmpResult;

              });

              $timeout(function () {
                  DGC_ObjServicesProjectFactory.initPackeryProject();
                  DgcConfig.services.jQuery.tooltip.init('.view-project-content[data-toggle="tooltip"]');
              }, 200, false);

              DGC_ObjServicesProjectFactory.initFilter();

              return response.data;
          },
          function (httpError) {
              // translate the error
              throw httpError.status + ' : ' + httpError.data;
          });

    }]);
})(jQuery);


/* Controllers */
/*
(function (_W, _DGC_Obj, _DGC_ObjM, _DGC_ObjC, _DGC_ObjS) {

    $.extend(_DGC_ObjC, {
        'dGC_ObjControllersProject': _DGC_ObjM('dGC_ObjControllersProject', [])
    });

    // Project
    _DGC_ObjC.dGC_ObjControllersProject.controller('DGC_Obj.controllers.project.main',
        ['$rootScope', '$scope', '$routeParams', '$http', '$location', 'DGC_Obj.providers.project.factory', 'DGC_Obj.services.project.factory', 'DGC_Obj.providers.event.factory',
            function ($rootScope, $scope, $routeParams, $http, $location, DGC_ObjProvidersProjectFactory, DGC_ObjServicesProjectFactory, DGC_ObjProvidersEventFactory) {
                // Security check Authentication
                _DGC_ObjS.security.checkRedirect($location);

                // log info [init Controllers]
                //_DGC_Obj.services.utils.console.init('init Controllers :: DGC_Obj.controllers.project.main');

                $rootScope.pageClass = ' page-main page-project page-project-main width-fixed ';

                $scope.controllersproject = '';

                $scope.view = {
                    url: _DGC_ObjS.utils.path.view(_DGC_Obj.path.include.view.project.item.src)
                };

                $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
                    _DGC_ObjS.jQuery.tooltip.init('.project-wrap-header [data-toggle="tooltip"]');
                });

                $scope.page_project_include = 'templates/views/include/project/dgc.page_project_home.tpl.html';

                DGC_ObjProvidersProjectFactory.getProjectById($routeParams._projectId_).then(
                    function (response) {

                        _DGC_ObjS.utils.console.log(response.data);

                        $scope.controllersproject = response.data;

                        return response.data;
                    },
                    function (httpError) {
                        // translate the error
                        throw httpError.status + ' : ' + httpError.data;
                    });


                $rootScope.controllersprojectevents = {
                    list: {},
                    limit: _DGC_Obj.utils.project.event.init
                }


                $rootScope.moreevents = function (nbr) {
                    $rootScope.controllersprojectevents.limit += nbr;
                }

                DGC_ObjProvidersEventFactory.getEventProject($routeParams._projectId_).then(
                    function (response) {

                        _DGC_ObjS.utils.console.log(response.data);

                        $rootScope.controllersprojectevents.list = response.data;

                        var dataProjectEvents = [],
                            obj = {
                                id: 0,
                                //date: 0,
                                day: 0,
                                activity: {
                                    length: 0,
                                    commit: 0,
                                    build: 0
                                }
                            },
                            index = -1,
                            dayOld = -1,
                            day = -1;

                        angular.forEach(response.data, function (item, key) {

                            var date = new Date();
                            date.setTime(item.creationDate);
                            day = date.getDate();


                            obj = {
                                id: item.creationDate.toString().substr(0, 6),
                                //date: item.creationDate,
                                day: date.getDate(),
                                //message: item.message,
                                activity: {
                                    length: 1,
                                    commit: ( (item.messageType == _DGC_Obj.utils.project.event.type.commit) ? 1 : 0),
                                    build: ( (item.messageType == _DGC_Obj.utils.project.event.type.build) ? 1 : 0)
                                }
                            };

                            if (dayOld != day) {
                                dayOld = day;
                                index++;
                                this.push(obj);
                            } else {
                                this[index].activity.length++;
                                if (item.messageType == _DGC_Obj.utils.project.event.type.commit) this[index].activity.commit++;
                                if (item.messageType == _DGC_Obj.utils.project.event.type.build) this[index].activity.build++;
                            }
                        }, dataProjectEvents);




                        var dataJson = function (_dataProjectEvents) {

                            var obj = [
                                {
                                    key: 'Commit',
                                    values: []
                                },
                                {
                                    key: 'Build',
                                    values: []
                                }
                            ];

                                angular.forEach(_dataProjectEvents, function (item, key) {
                                    obj[0].values.push(
                                        {
                                            activity: 'commit',
                                            x: item.day,
                                            y: item.activity.commit
                                        }
                                    );
                                    obj[1].values.push(
                                        {
                                            activity: 'build',
                                            x: item.day,
                                            y: item.activity.build
                                        }
                                    )
                                });

                            return obj;


                        };
                        $rootScope.controllersprojectevents.dataProjectEvents = dataJson(dataProjectEvents);




                        return response.data;
                    },
                    function (httpError) {
                        // translate the error
                        throw httpError.status + ' : ' + httpError.data;
                    });

                DGC_ObjProvidersProjectFactory.getReadmeByProjectId($routeParams._projectId_).then(
                    function (response) {

                        _DGC_ObjS.utils.console.log(response.data);

                        $scope.controllersprojectreadme = response.data;

                        return response.data;
                    },
                    function (httpError) {
                        // translate the error
                        throw httpError.status + ' : ' + httpError.data;
                    });

                $scope.markdownToHTML = function () {
                    markdown.toHTML($scope.controllersprojectreadme);
                }


            }]);

    _DGC_ObjC.dGC_ObjControllersProject.controller('DGC_Obj.controllers.project.list',
        ['$rootScope', '$scope', '$routeParams', '$http', '$location', '$timeout', 'DGC_Obj.providers.project.factory', 'DGC_Obj.services.project.factory',
            function ($rootScope, $scope, $routeParams, $http, $location, $timeout, DGC_ObjProvidersProjectFactory, DGC_ObjServicesProjectFactory) {
                // Security check Authentication
                _DGC_ObjS.security.checkRedirect($location);

                // log info [init Controllers]
                //_DGC_Obj.services.utils.console.init('init Controllers :: DGC_Obj.controllers.project.list');

                var loader = '.page-portlet-loader';

                $rootScope.pageClass = ' side-bar-right-pin page-main page-project page-projects-list fixed-project-wrap-nav';

                $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
                    var epsilon = 5;
                    $('.project-description').each(function () {
                        if (( $(this).height() + epsilon ) >= $(this).find('.text').height()) $(this).find('.more').remove();
                    })
                });

                angular.extend($scope, {

                    view: {
                        url: _DGC_ObjS.utils.path.view(_DGC_Obj.path.include.view.project.list.src)
                    },

                    controllersproject: '',

                    _DGC_showProjectGridList: DGC_ObjServicesProjectFactory.initShowProject(),

                    DGC_ObjProjectAction_more: function (clickEvent) {
                        $(clickEvent.target).parents('.item-min-project').toggleClass('plus');
                        DGC_ObjServicesProjectFactory.initPackeryProject();
                    },

                    DGC_ObjProjectAction_updateShowProject: function (valeur) {
                        $scope._DGC_showProjectGridList = DGC_ObjServicesProjectFactory.initShowProject(valeur);

                        $('.panel-project-wrap-body').toggleClass('show-list');

                        //($('.panel-project-wrap-body').hasClass('show-list'))? $('.panel-project-wrap-body').removeClass('show-list') : $('.panel-project-wrap-body').addClass('show-list');

                        DGC_ObjServicesProjectFactory.initPackeryProject();
                        //$timeout(function () {
                        // DGC_ObjServicesProjectFactory.initPackeryProject();
                        // }, 2, false);

                        $scope.DGC_Obj.utils.project.taglimit = 20;

                    },

                    DGC_ObjProjectNgClass_type: function (valeur) {
                        return _DGC_Obj.utils.tabOfClass[valeur];
                    },

                    DGC_ObjProjectNgBind_note: function ($index) {
                        var tabNote = ['4/5', '20', '53', '41', '54'];
                        return tabNote[$index];
                    }

                });

                //DGC_Obj.services.utils.portlet.start(loader);

                DGC_ObjProvidersProjectFactory.getAllProjects().then(
                    function (response) {
                        $scope.controllersproject = response.data;

                        $timeout(function () {
                            DGC_ObjServicesProjectFactory.initPackeryProject();
                            //DGC_Obj.services.utils.portlet.stop(loader);
                            _DGC_ObjS.jQuery.tooltip.init('.view-project-content [data-toggle="tooltip"]');
                        }, 200, false);

                        DGC_ObjServicesProjectFactory.initFilter();

                        return response.data;
                    },
                    function (httpError) {
                        // translate the error
                        throw httpError.status + ' : ' + httpError.data;
                    });

            }]);
    _DGC_ObjC.dGC_ObjControllersProject.controller('DGC_Obj.controllers.project.search',
        ['$rootScope', '$scope', '$routeParams', '$http', '$q', '$location', '$timeout', 'DGC_Obj.providers.project.factory', 'DGC_Obj.services.project.factory',
            function ($rootScope, $scope, $routeParams, $http, $q, $location, $timeout, DGC_ObjProvidersProjectFactory, DGC_ObjServicesProjectFactory) {
                // Security check Authentication
                _DGC_ObjS.security.checkRedirect($location);

                // log info [init Controllers]
                //_DGC_Obj.services.utils.console.init('init Controllers :: DGC_Obj.controllers.project.list');

                var loader = '.page-portlet-loader';

                $rootScope.pageClass = ' side-bar-right-pin page-main page-project page-projects-list fixed-project-wrap-nav ';

                $scope.controllersproject = '';


                $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
                    var epsilon = 5;
                    $('.project-description').each(function () {
                        if (( $(this).height() + epsilon ) >= $(this).find('.text').height()) $(this).find('.more').remove();
                    })
                });

                angular.extend($scope, {

                    view: {
                        url: _DGC_ObjS.utils.path.view(_DGC_Obj.path.include.view.project.list.src)
                    },

                    controllersproject: '',

                    _DGC_showProjectGridList: DGC_ObjServicesProjectFactory.initShowProject(),

                    DGC_ObjProjectAction_more: function (clickEvent) {
                        $(clickEvent.target).parents('.item-min-project').toggleClass('plus');
                        DGC_ObjServicesProjectFactory.initPackeryProject();
                    },

                    DGC_ObjProjectAction_updateShowProject: function (valeur) {
                        $scope._DGC_showProjectGridList = DGC_ObjServicesProjectFactory.initShowProject(valeur);

                        $('.panel-project-wrap-body').toggleClass('show-list');

                        //($('.panel-project-wrap-body').hasClass('show-list'))? $('.panel-project-wrap-body').removeClass('show-list') : $('.panel-project-wrap-body').addClass('show-list');

                        DGC_ObjServicesProjectFactory.initPackeryProject();
                        //$timeout(function () {
                        // DGC_ObjServicesProjectFactory.initPackeryProject();
                        // }, 2, false);

                        $scope.DGC_Obj.utils.project.taglimit = 20;

                    },

                    DGC_ObjProjectNgClass_type: function (valeur) {
                        return _DGC_Obj.utils.tabOfClass[valeur];
                    }
                });

                //DGC_Obj.services.utils.portlet.start(loader);

                DGC_ObjProvidersProjectFactory.getSearchProjects($routeParams._search_).then(
                    function (response) {

                        var dataSearch = response.data,
                            arrayHttp = new Array();

                        angular.forEach(dataSearch, function (response) {
                            //tmp.push(response.data);
                            arrayHttp.push(DGC_ObjProvidersProjectFactory.getProjectById(response.id));
                            //console.log('----------'+response.id);
                        });

                        $q.all(arrayHttp).then(function (result) {
                            var tmp = [];
                            angular.forEach(result, function (response) {
                                tmp.push(response.data);
                            });
                            return tmp;
                        }).then(function (tmpResult) {

                            $scope.controllersproject = tmpResult;

                        });

                        $timeout(function () {
                            DGC_ObjServicesProjectFactory.initPackeryProject();
                            //DGC_Obj.services.utils.portlet.stop(loader);
                            _DGC_ObjS.jQuery.tooltip.init('.view-project-content[data-toggle="tooltip"]');
                        }, 200, false);

                        DGC_ObjServicesProjectFactory.initFilter();

                        return response.data;
                    },
                    function (httpError) {
                        // translate the error
                        throw httpError.status + ' : ' + httpError.data;
                    });

            }]);
})(window, DGC_Obj, DGC_Obj.modules, DGC_Obj.controllers, DGC_Obj.services);
*/