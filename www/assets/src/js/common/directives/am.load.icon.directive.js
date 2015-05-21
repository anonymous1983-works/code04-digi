'use strict';

(function() {

  angular.module('dgcApp')
    .directive('amLoadIcon', ['DgcRest',
    function(DgcRest) {

      return {
        restrict: 'A',
        scope: {
          amLoadIcon: '@'
        },
        link: function(scope, elem) {

          elem.css({
            opacity: 0,
            transition: 'opacity ease-out 300ms'
          });

          var img = new Image();
          img.src = DgcRest.baseUrl + 'projects/' + scope.amLoadIcon + '/icon';
          angular.element(img).on('load', function() {
            if(!img.naturalWidth) { return; }
            elem.css({
              'background-image': 'url(' + img.src + ')',
              opacity: 1
            });
            angular.element(img).off('load');
          });
        }
      };
    }]);

})();