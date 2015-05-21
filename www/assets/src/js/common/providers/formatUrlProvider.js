'use strict';

(function() {

  angular.module('dgcApp')
    .provider('FormatUrl', ['DgcPaths', function(DgcPaths) {

      this.getBaseUrl = function() {
        return DgcPaths.baseUrl;
      };

      this.getTemplatePath = function(stringUrl) {
        return this.getBaseUrl() + DgcPaths.templates[stringUrl];
      };

      this.$get = [function() {

        return {

        };

      }];
    }]);

})();