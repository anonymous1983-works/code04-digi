'use strict';

/* Directives */
(function () {

  angular.module('dgcApp')
  .directive('unknownDirectiveName', ['$interval', 'dateFilter', function($interval, dateFilter) {

      function link(scope, element, attrs) {
          var format,
              timeoutId;

          function updateTime() {
              element.text(dateFilter(new Date(), format));
          }

          scope.$watch(attrs.myCurrentTime, function(value) {
              format = value;
              updateTime();
          });

          element.on('$destroy', function() {
              $interval.cancel(timeoutId);
          });

          // start the UI update process; save the timeoutId for canceling
          timeoutId = $interval(function() {
              updateTime(); // update DOM
          }, 1000);
      }

      return {
          link: link
      };
  }]);

})();

/*
(function (_W, _DGC_Obj, _DGC_ObjM, _DGC_ObjD) {
    $.extend(_DGC_ObjD, {
        "dGC_ObjDirectivesSearch": _DGC_ObjM('dGC_ObjDirectivesSearch', [])
    });


    _DGC_ObjD.dGC_ObjDirectivesSearch.directive('', ['$interval', 'dateFilter', function($interval, dateFilter) {

        function link(scope, element, attrs) {
            var format,
                timeoutId;

            function updateTime() {
                element.text(dateFilter(new Date(), format));
            }

            scope.$watch(attrs.myCurrentTime, function(value) {
                format = value;
                updateTime();
            });

            element.on('$destroy', function() {
                $interval.cancel(timeoutId);
            });

            // start the UI update process; save the timeoutId for canceling
            timeoutId = $interval(function() {
                updateTime(); // update DOM
            }, 1000);
        }

        return {
            link: link
        };
    }]);

})(window, DGC_Obj, DGC_Obj.modules, DGC_Obj.directives);
*/

