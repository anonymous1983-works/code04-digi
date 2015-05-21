'use strict';

(function() {

  angular.module('dgcApp')
    .controller('ProjectDetailController', ['$scope', 'ProjectDetailData',
    function($scope, ProjectDetailData) {

      $scope.detail = {
        data: ProjectDetailData,
        img: ProjectDetailData.id
      };

    }]);

})();