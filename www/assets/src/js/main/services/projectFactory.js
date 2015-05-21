'use strict';

(function() {

  angular.module('dgcApp')
    .factory('ProjectFactory', ['$http', '$q', 'DgcRest',
    function($http, $q, DgcRest) {

      var plf = {
        getProjectList: function(searchParm) {
          var defer   = $q.defer();

          var url     = searchParm ? 'search' : 'list';
          var search  = searchParm ? {search: searchParm} : {};
          var parms   = {
            method: DgcRest.reqs.project[url].method,
            url:    DgcRest.baseUrl + DgcRest.reqs.project[url].url,
            params: search
          };

          $http(parms)
            .success(function(data) {
              return plf.getProjectData(data, searchParm).then(function(qData) {
                return defer.resolve(qData);
              });
            })
            .error(function(data, status) {
              return defer.reject(status);
            });

          return defer.promise;
        },

        getProjectData: function(data, searchParm) {
          var defer = $q.defer();
          if(!searchParm) {
            defer.resolve(data);
            return defer.promise;
          }

          var requests = [];
          angular.forEach(data, function(project) {
            requests.push(plf.getProjectById(project.id));
          });

          $q.all(requests).then(function(result) {
            defer.resolve(result);
          });

          return defer.promise;
        },

        getProjectById: function(projectId) {
          var defer   = $q.defer();

          var parms   = {
            method: DgcRest.reqs.project.list.method,
            url:    DgcRest.baseUrl + DgcRest.reqs.project.list.url + '/' + projectId
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
        getProjectList: plf.getProjectList,
        getProjectById: plf.getProjectById
      };

    }]);

})();