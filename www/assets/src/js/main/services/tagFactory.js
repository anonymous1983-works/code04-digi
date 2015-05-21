'use strict';

(function() {

  angular.module('dgcApp')
    .factory('TagFactory', ['$http', '$q', 'DgcRest',
    function($http, $q, DgcRest) {

    var tf = {
        getTagList: function() {
          var defer   = $q.defer();

          var parms   = {
            method: DgcRest.reqs.tag.list.method,
            url:    DgcRest.baseUrl + DgcRest.reqs.tag.list.url
          };

          $http(parms)
            .success(function(data) {
              return defer.resolve(data);
            })
            .error(function(data, status) {
              return defer.reject(status);
            });

          return defer.promise;
        }
      };

      return {
        getTagList: tf.getTagList
      };

    }]);

})();
