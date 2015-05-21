'use strict';

(function() {

  angular.module('dgcApp')
    .directive('amIndicator', [function() {

      return {
        restrict: 'E',
        replace: true,
        templateUrl: './assets/src/js/common/templates/am.indicator.html',
        scope: {
          title: '@',
          type: '@',
          value: '@'
        }
      };

    }]);

})();