'use strict';

(function() {

  angular.module('dgcApp')
    .constant('DgcPaths', {

      baseUrl: './assets/src/js/',
      templates: {
        dashboard: 'dashboard/templates/',
        login: 'login/templates/',
        main: 'main/templates/',
        projectDetail: 'projectdetail/templates/',
        projectList: 'projectlist/templates/'
      }

    });



})();
