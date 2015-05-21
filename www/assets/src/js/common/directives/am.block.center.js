'use strict';

(function() {

  angular.module('dgcApp')
    .directive('amBlockCenter', ['$window', '$timeout',
    function($window, $timeout) {

      return {
        restrict: 'A',
        link: function(scope, elem) {

          var size = {
            render: function() {

              var nbElems = elem[0].children.length;
              angular.element(elem[0].children[nbElems-1])
                .css({

                });
            }
          };

          angular.element($window).on('resize', function() {
            size.render();
          });
          scope.$on('$destroy', function() {
            angular.element($window).off();
          });

          $timeout(function() {
            size.render();
          });

        }
      };

    }]);

})();