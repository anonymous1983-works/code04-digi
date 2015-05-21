'use strict';

/* Services */
(function (_$) {

    /* Login */
    angular.module('dgcApp')
    .factory('DGC_Obj.services.search.factory', ['DgcConfig',
        function (DgcConfig) {
          var services = {};

          services.quickSearch = function($scope, $filter){

            _$('#input-filter-query').quickSearch({
                url: DgcConfig.request.project.search.url.prod + '?search=',
                //id: "search-global-result",
                prepareResponse: function (quickSearch, data) {
                  var html = '';
                  angular.forEach(data, function(value) {
                    html += '<li class="hvr-sweep-to-right ' + value.type + '"><a href="' + $filter('dgc_filter_url_project')(value.id) + '"><span>' + value.type.charAt(0).toUpperCase() + '</span>' + value.name + '</a></li>';
                  });
                  quickSearch.find('.search-global-result-ul').html(html);
                  DgcConfig.services.jQuery.scrollbar.init('#search-global-result .search-global-result-ul');

                },
                onSubmit: function(){
                  _$('#input-filter-query-submit').trigger('click');
                }
            });

          };

      return services;
  }]);
})(jQuery);

/*
(function (_W, _$, _AN, _DGC_Obj, _DGC_ObjM, _DGC_ObjS) {

    $.extend(_DGC_ObjS, {
        "dGC_ObjServicesSearch": _DGC_ObjM('dGC_ObjServicesSearch', ['ngResource'])
    });

    // Login
    _DGC_ObjS.dGC_ObjServicesSearch.factory('DGC_Obj.services.search.factory', ['$http',
        function ($http) {
            var services = {};

            services.quickSearch = function($scope, $filter){

                _$('#input-filter-query').quickSearch({
                    url: _DGC_Obj.request.project.search.url.prod + '?search=',
                    //id: "search-global-result",
                    prepareResponse: function (quickSearch, data) {
                        var html = "";
                        _AN.forEach(data, function(value, key) {
                            //$scope.artists.push(value);
                            html += "<li class='hvr-sweep-to-right "+value.type+"'><a href='" + $filter('dgc_filter_url_project')(value.id) + "'><span>"+ value.type.charAt(0).toUpperCase() +"</span>" + value.name + "</a></li>"
                        });
                        quickSearch.find('.search-global-result-ul').html(html);
                        _DGC_Obj.services.jQuery.scrollbar.init('#search-global-result .search-global-result-ul');

                    },
                    onSubmit: function(value){
                        _$('#input-filter-query-submit').trigger('click');
                    }
                });


            }



            return services;
        }]);
})(window, jQuery, angular,  DGC_Obj, DGC_Obj.modules, DGC_Obj.services);
*/