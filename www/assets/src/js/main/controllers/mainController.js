'use strict';

(function() {

  angular.module('dgcApp')
    .controller('MainController', ['$scope', '$state', 'UserFactory',
    function($scope, $state, UserFactory) {

      $scope.main = {
        tagVisible: false,
        searchVisible: false,
        user: UserFactory.getCurrentUser(),
        quickSearch: function() {
          $state.go('main.list', {search: $scope.main.searchInput});
        },
        toggleSearch: function() {
          $scope.main.searchVisible = !$scope.main.searchVisible;
        },
        searchInput: $state.params.search || ''
      };

    }]);

})();