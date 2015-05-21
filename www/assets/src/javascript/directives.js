'use strict';

(function ($, d3, nv) {

  angular.module('dgcApp')
    .directive('dgcSidebarLeft', ['DgcConfig', function (DgcConfig) {
      return {
        restrict: 'AE',
        templateUrl: DgcConfig.path.views + DgcConfig.path.directives.main.sidebar.left.src,
        link: function () {

          $('.page-sidebar.page-sidebar-left[data-pages="sidebar"]').each(function () {
            var $sidebar = $(this);
            $sidebar.sidebar($sidebar.data());
          });

          $('.page-sidebar [data-toggle="tooltip"]').tooltip();

        }
      };
  }]);

  angular.module('dgcApp')
    .directive('onFinishRender', ['$timeout', function ($timeout) {
      return {
        restrict: 'A',
        link: function (scope) {
          if (scope.$last) {
            $timeout(function () {
              scope.$emit('ngRepeatFinished');
            });
          }
        }
      };
  }]);

  angular.module('dgcApp')
    .directive('dgcSidebarRight', ['DgcConfig', function (DgcConfig) {
      return {
        restrict: 'AE',
        templateUrl: DgcConfig.path.views + DgcConfig.path.directives.main.sidebar.right.src,
        link: function () {

          $('.page-sidebar.page-sidebar-right[data-pages="sidebar"]').each(function () {
              var $sidebar = $(this);
              $sidebar.sidebar($sidebar.data());
          });

          $('.page-sidebar [data-toggle="tooltip"]').tooltip();

        }
      };
  }]);

  angular.module('dgcApp')
    .directive('dgcHeader', ['DgcConfig', function (DgcConfig) {
      return {
          restrict: 'AE',
          templateUrl: DgcConfig.path.views + DgcConfig.path.directives.main.header.src,
          link: function () {

            DgcConfig.services.jQuery.scrollbar.init('.header .notification-list .notification-body.scrollable');
            DgcConfig.services.jQuery.tooltip.init('.header [data-toggle="tooltip"]');

          }
      };
  }]);

  angular.module('dgcApp')
    .directive('dgcModalProjectJson', ['$timeout', '$window', 'DgcConfig',
    function ($timeout, $window, DgcConfig) {
      return {
        restrict: 'AE',
        templateUrl: DgcConfig.path.views + DgcConfig.path.directives.modal.project.json.src,
        link: function () {

          $timeout(function () {
            $('.custom-tag-input').tagsinput( function(){
              var tagsListHeight = Math.max($('.dgcModalProjectJson .tags-list.languages').innerHeight() , $('.dgcModalProjectJson .tags-list.keywords').innerHeight());
              $window.alert(tagsListHeight);
            });
            if(!$.fn.select2) { return; }
            $('[data-init-plugin="select2"]').each(function () {
              $(this).select2({
                  minimumResultsForSearch: ($(this).attr('data-disable-search') == 'true' ? -1 : 1)
              }).on('select2-opening', function () {
                  if(!$.fn.scrollbar) { return; }
                  $('.select2-results').scrollbar({
                    ignoreMobile: false
                  });
              });
            });

          }, 100);
          $('#idDgcModalProjectJson').modal('show');

        }
      };
  }]);

  angular.module('dgcApp')
    .directive('dgcProjectItemMin', ['DgcConfig', function (DgcConfig) {
      return {
        restrict: 'AE',
        templateUrl: DgcConfig.path.views + DgcConfig.path.directives.project.item.min.src,
        link: function () {

          // log info [init Directives]
          //_DGC_Obj.services.utils.console.init("init Directives :: dgcProjectItemMin " + _DGC_Obj.path.directives.project.item.min.log);

          //DGC_Obj.services.utils.console.info(_DGC_Obj.path.directives.project.item.min.log);

        }
      };
  }]);

  angular.module('dgcApp')
    .directive('dcgProjectWrapSidebarStats',['DgcConfig', function (DgcConfig) {
      return {
          restrict: 'AE',
          templateUrl: DgcConfig.path.views + DgcConfig.path.directives.project.sidebarStats.src,
          link: function (scope) {
              //http://cmaurer.github.io/angularjs-nvd3-directives/discrete.bar.chart.html
              //_DGC_Obj.services.utils.console.init("init Directives :: dcgProjectWrapSidebarStats " + _DGC_Obj.path.directives.project.sidebarStats.log);

              $('[data-pages="portlet"]').each(function () {
                var $portlet = $(this);
                $portlet.portlet($portlet.data());
              });

              DgcConfig.services.jQuery.tooltip.init('.project-wrap-sidebar-stats [data-toggle="tooltip"]');



              var dataJson = function() {
                return scope.controllersprojectevents.dataProjectEvents;
              };

              nv.addGraph(function() {
                var chart = nv.models.multiBarChart();

                chart.xAxis
                    .tickFormat(d3.format(',f'));

                chart.yAxis
                    .tickFormat(d3.format(',.1f'));

                chart.multibar.stacked(true);

                chart.color([
                    'rgba(72, 176, 247, 0.5)',
                    'rgba(16, 207, 189, 0.5)'

                ]);

                d3.select('#id-sswcccb svg')
                    .datum(dataJson())
                    .transition().duration(500)
                    .call(chart)
                ;

                nv.utils.windowResize(chart.update);

                return chart;
              });

          }
      };
  }]);

})(jQuery, d3, nv);


/* Directives */
/*
(function (_W, _DGC_Obj, _DGC_ObjM, _DGC_ObjD) {
    $.extend(_DGC_ObjD, {
        "dGC_ObjDirectives": _DGC_ObjM('dGC_ObjDirectives', [])
    });
    _DGC_ObjD.dGC_ObjDirectives.directive('dgcSidebarLeft', function () {
        return {
            restrict: 'AE',
            templateUrl: _DGC_Obj.path.views + _DGC_Obj.path.directives.main.sidebar.left.src,
            link: function (scope, element, attrs) {
                // log info [init Directives]
                //_DGC_Obj.services.utils.console.init("init Directives :: dgcSidebarLeft " + _DGC_Obj.path.directives.main.sidebar.left.log);

                $('.page-sidebar.page-sidebar-left[data-pages="sidebar"]').each(function () {
                    var $sidebar = $(this);
                    $sidebar.sidebar($sidebar.data());
                });

                $('.page-sidebar [data-toggle="tooltip"]').tooltip();

            }
        }
    }).directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        }
    }).directive('dgcSidebarRight', function () {
        return {
            restrict: 'AE',
            templateUrl: _DGC_Obj.path.views + _DGC_Obj.path.directives.main.sidebar.right.src,
            link: function (scope, element, attrs) {
                // log info [init Directives]
                //_DGC_Obj.services.utils.console.init("init Directives :: dgcSidebarLeft " + _DGC_Obj.path.directives.main.sidebar.right.log);

                $('.page-sidebar.page-sidebar-right[data-pages="sidebar"]').each(function () {
                    var $sidebar = $(this);
                    $sidebar.sidebar($sidebar.data());
                });

                $('.page-sidebar [data-toggle="tooltip"]').tooltip();

            }
        }
    }).directive('dgcHeader', function () {
        return {
            restrict: 'AE',
            templateUrl: _DGC_Obj.path.views + _DGC_Obj.path.directives.main.header.src,
            link: function (scope, element, attrs) {

                //DGC_Obj.services.utils.console.info(_DGC_Obj.path.directives.main.header.log);
                // log info [init Directives]
                //_DGC_Obj.services.utils.console.init("init Directives :: dgcHeader " + _DGC_Obj.path.directives.main.header.log);

                _DGC_Obj.services.jQuery.scrollbar.init('.header .notification-list .notification-body.scrollable');

                _DGC_Obj.services.jQuery.tooltip.init('.header [data-toggle="tooltip"]');

            }
        }
    }).directive('dgcModalProjectJson', function () {
        return {
            restrict: 'AE',
            templateUrl: _DGC_Obj.path.views + _DGC_Obj.path.directives.modal.project.json.src,
            link: function (scope, element, attrs) {

                // log info [init Directives]
                //_DGC_Obj.services.utils.console.init("init Directives :: dgcModalProjectJson " + _DGC_Obj.path.directives.modal.project.json.src);

                setTimeout(function () {

                    $('.custom-tag-input').tagsinput( function(){
                        var tagsListHeight = Math.max($('.dgcModalProjectJson .tags-list.languages').innerHeight() , $('.dgcModalProjectJson .tags-list.keywords').innerHeight());
                        alert(tagsListHeight);
                    });
                    $.fn.select2 && $('[data-init-plugin="select2"]').each(function () {
                        $(this).select2({
                            minimumResultsForSearch: ($(this).attr('data-disable-search') == 'true' ? -1 : 1)
                        }).on('select2-opening', function () {
                            $.fn.scrollbar && $('.select2-results').scrollbar({
                                ignoreMobile: false
                            })
                        });
                    });
                    //var tagsListHeight = Math.max($('.dgcModalProjectJson .tags-list.languages').innerHeight() , $('.dgcModalProjectJson .tags-list.keywords').innerHeight());
                    //alert(tagsListHeight);
                    //$('.dgcModalProjectJson .tags-list').css('min-height', tagsListHeight+"px");
                }, 100);
                $('#idDgcModalProjectJson').modal('show');

            }
        }
    }).directive('dgcProjectItemMin', function () {
        return {
            restrict: 'AE',
            templateUrl: _DGC_Obj.path.views + _DGC_Obj.path.directives.project.item.min.src,
            link: function (scope, element, attrs) {

                // log info [init Directives]
                //_DGC_Obj.services.utils.console.init("init Directives :: dgcProjectItemMin " + _DGC_Obj.path.directives.project.item.min.log);

                //DGC_Obj.services.utils.console.info(_DGC_Obj.path.directives.project.item.min.log);

            }
        }
    }).directive('dcgProjectWrapSidebarStats', function () {
        return {
            restrict: 'AE',
            templateUrl: _DGC_Obj.path.views + _DGC_Obj.path.directives.project.sidebarStats.src,
            link: function (scope, element, attrs) {
                //http://cmaurer.github.io/angularjs-nvd3-directives/discrete.bar.chart.html
                //_DGC_Obj.services.utils.console.init("init Directives :: dcgProjectWrapSidebarStats " + _DGC_Obj.path.directives.project.sidebarStats.log);

                $('[data-pages="portlet"]').each(function () {
                    var $portlet = $(this)
                    $portlet.portlet($portlet.data())
                });

                _DGC_Obj.services.jQuery.tooltip.init('.project-wrap-sidebar-stats [data-toggle="tooltip"]');



                var dataJson = function() {
                    return scope.controllersprojectevents.dataProjectEvents;
                };

                nv.addGraph(function() {


                    var chart = nv.models.multiBarChart();

                    chart.xAxis
                        .tickFormat(d3.format(',f'));

                    chart.yAxis
                        .tickFormat(d3.format(',.1f'));

                    chart.multibar.stacked(true);

                    chart.color([
                        "rgba(72, 176, 247, 0.5)",
                        "rgba(16, 207, 189, 0.5)"

                    ])

                    d3.select('#id-sswcccb svg')
                        .datum(dataJson())
                        .transition().duration(500)
                        .call(chart)
                    ;

                    nv.utils.windowResize(chart.update);

                    return chart;
                });

            }
        }
    });
})(window, DGC_Obj, DGC_Obj.modules, DGC_Obj.directives);
*/