'use strict';

(function() {

  angular.module('dgcApp')
    .factory('TokenFactory', [function() {

      return {
        request: function (config) {
          var user = JSON.parse(sessionStorage.getItem('dgc.user')) || {};
          angular.extend(config.headers, {
            'API-TOKEN': user.id || ''
          });
          return config;
        }
      };

    }]);
})();