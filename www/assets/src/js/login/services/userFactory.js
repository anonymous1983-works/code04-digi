'use strict';

(function() {
  angular.module('dgcApp')
    .factory('UserFactory', ['$http', '$q', '$state', 'DgcRest',
    function($http, $q, $state, DgcRest) {

      var userKey = 'dgc.user';

      var lf = {
        login: function(user, password) {
          var defer = $q.defer();

          var params = {
            login: user,
            password: password
          };

          $http({
            method:   DgcRest.reqs.user.login.method,
            url:      DgcRest.baseUrl + DgcRest.reqs.user.login.url,
            headers: {
              'Content-Type': 'application/json'
            },
            data: params,
            timeout: 3000
          })
          .success(function(data, status) {
            if (status === 200) {
              sessionStorage.setItem(userKey, JSON.stringify(data));
              defer.resolve(data);
            } else {
              defer.reject(status);
            }
          })
          .error(function(data, status) {
            defer.reject(status);
          });

          return defer.promise;
        },

        checkConnexion: function(evt) {
          var userSession = lf.getCurrentUser();
          if (!userSession && $state.current.name !== 'login') {
            evt.preventDefault();
            $state.go('login', {}, {reload: true});
          }
        },

        getCurrentUser: function() {
          return JSON.parse(sessionStorage.getItem(userKey));
        },

        resetUser: function() {
          sessionStorage.removeItem(userKey);
        }
      };

      return lf;

    }]);
})();