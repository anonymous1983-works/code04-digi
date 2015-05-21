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

  angular.module('dgcApp')
    .constant('DgcRest', {
      baseUrl: 'http://dev-digicode.intramundi.com/digicode/api/',
      reqs: {
        user: {
          login: {
            method: 'POST',
            url: 'login'
          }
        },
        project: {
          list: {
            method: 'GET',
            url: 'projects'
          },
          search: {
            method: 'GET',
            url: 'search'
          }
        },
        tag: {
          list: {
            method: 'GET',
            url: 'search/keywords/stats'
          }
        }
      }
    });

})();
