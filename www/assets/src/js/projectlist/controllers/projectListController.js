'use strict';

(function() {

  angular.module('dgcApp')
    .controller('ProjectListController', ['$scope', 'ProjectListData', 'TagListData',
    function($scope, ProjectListData, TagListData) {

      $scope.list = {
        projects: ProjectListData,
        tags:     TagListData,
        projectFilterType: '',
        toggleTags: function() {
          $scope.main.tagVisible = !$scope.main.tagVisible;
        }
      };

    }]);

})();