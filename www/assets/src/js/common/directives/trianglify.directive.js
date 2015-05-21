'use strict';


(function () {

  angular.module('dgcApp')
    .directive('amTrianglify', ['$window',
      function ($window) {
      return {
        restrict: 'A',
        scope: {},
        link: function (scope, elem, attrs) {

          var attrsObj = angular.fromJson(attrs.amTrianglify);
          var oldWidth = elem[0].clientWidth;

          function getPng() {
            var pngURI = Trianglify({
              width: elem[0].clientWidth,
              height: elem[0].clientHeight,
              variance: 0,
              cell_size: 15,
              seed: attrsObj.name.replace(/ /g, '_')
            }).png();

            elem.css({'background-image': 'url(' + pngURI + ')'});
          }
          angular.element($window).on('resize', function() {
            if(oldWidth === elem[0].clientWidth) { return; }
            oldWidth = elem[0].clientWidth;
            getPng();
          });
          scope.$on('$destroy', function() {
            angular.element($window).off();
          });

          getPng();
        }
      };
    }]);

})();