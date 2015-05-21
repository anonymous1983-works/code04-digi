'use strict';

(function() {

  angular.module('dgcApp')
    .controller('LoginController', ['$scope', '$state','UserFactory',
    function($scope, $state, UserFactory) {

      $scope.userlog = {
        login: null,
        password: null,
        keepSigned: false,
        loginError: false,

        submitLogin: function() {
          UserFactory.login($scope.userlog.login, $scope.userlog.password)
            .then(function() {
              $state.go('main.list');
            }, function() {
              $scope.userlog.loginError = true;
            });
        }
      };

      // Initialize user session
      UserFactory.resetUser();

    }]);

})();