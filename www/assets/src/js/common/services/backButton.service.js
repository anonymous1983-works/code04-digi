'use strict';

(function() {

  // routing bug fix
  angular.module('dgcApp')
    .service('BackButton', ['$window', '$state', '$location',
    function($window, $state, $location) {

    this.routerFix = function() {
      $window.addEventListener('popstate', function() {
        var anguPath = $location.path();
        var realPath = $window.location.hash.replace(/#/, '');
        if(anguPath !== realPath) {
          $state.reload();
        }
      });
    };

  }]);

})();