'use strict';

(function() {

  angular.module('dgcOldApp')
    .constant('DgcConfig', {
      debug: false,
      activePackery: true,
      documentPackery : false,
      userid: 198,
      jsonServerUrl: 'http://dev-digicode.intramundi.com/digicode/',
      host: '#',
      environment: 'prod', // ['dev', 'prod', 'test']

      utils: {
        primaryColor: '#fe4472',
        console: {
          init: {
            background: '#222',
            color: '#bada55'
          }
        },
        tabOfClass: {
          code_quality: 'fa-dashboard',
          issues: 'fa-bug',
          continuous_integration: 'fa-refresh',
          repo: 'fa-cloud',
          scm: 'fa-code-fork'
        },
        dummyimage:{
          api: 'http://dummyimage.com/',
          backgroundColor: '3481c9',
          size: '300x300',
          foregroundColor: 'ffffff',
          format: 'png'
        },
        levelColor:['#CD4945', '#CFAE45', '#F8D053', '#10CFBD', '#10CFBD' ],
        project: {
          show: {
            grid: 'show-grid',
            list: 'show-list',
            default: 'show-grid'
          },
          taglimit: 8,
          langaguelimit: 3,
          event:{
            init: 3,
            step:3,
            type:{
              build:'BUILD',
              commit: 'COMMIT'
            }
          },
          json: {
            name: 'name',
            id: 'id',
            type: {
              application: 'application',
              library: 'library'
            },
            description: 'description',
            version: null,
            environment: [
              {
                type: 'code_quality',
                tool: 'sonar',
                url: 'https://dtp.intramundi.com/sonar/dashboard/index/247994',
                resource_id: '247994'
              },
              {
                type: 'issues',
                tool: 'mantis',
                url: 'http://mantis.intramundi.com/etudes',
                resource_id: null
              },
              {
                type: 'continuous_integration',
                tool: 'jenkins',
                url: 'https://dtp.intramundi.com/jenkins/job/ActiveDictionary%20-%20DEV%20-%20Build/',
                resource_id: null
              },
              {
                type: 'repo',
                tool: 'nexus',
                url: 'https://dtp.intramundi.com/nexus',
                resource_id: null
              },
              {
                type: 'scm',
                tool: 'git',
                url: 'https://git.intramundi.com/gitlab/activeframework/activedictionary.git',
                resource_id: null
              }
            ],
            languages: [],
            idDs: '710',
            idGroup: null,
            demo: null,
            homepage: 'https://git.intramundi.com/gitlab/activeframework/activedictionary/wikis/home',
            maintener: null,
            keywords: [],
            licence: null
          }

        }
      },

      // Security
      security: {
        active: false,
        form_login: {
          parameters: {
            username: '',
            password: ''
          },
          path: {
            login: '/login',
            check: ''
          }
        }
      },

      // Routing
      routing: {
        default: '/projects',
        login: '/login',
        project: '/project/:_projectId_',
        project_list: '/projects',
        project_search: '/projects/:_search_',
        dashboard: '/dashboard'
      },

      // path to folder
      path: {
        templates: 'templates/',
        views: 'templates/views/',
        avatar: {
          host: 'https://git.intramundi.com/gitlab',
          src: 'https://git.intramundi.com/gitlab/uploads/user/avatar/_id_/profil.jpg'
        },
        /*
         Path of view directive
         it's the path when you use ng-directives
         */
        directives: {
          main: {
            sidebar: {
              left:{
                src: 'tags/dgc.sidebar_left.tpl.html',
                log: 'Directive sidebarLeft Loaded OK!'
              },
              right:{
                src: 'tags/dgc.sidebar_right.tpl.html',
                log: 'Directive sidebarLeft Loaded OK!'
              }
            },
            header: {
              src: 'tags/dgc.header.tpl.html',
              log: 'Directive Header Loaded OK!'
            }
          },
          project: {
            sidebarStats: {
              src: 'tags/dgc.project_sidebar_stats.tpl.html',
              log: 'Directive projectWrapSidebarStats Loaded OK!'
            },
            item: {
              min: {
                src: 'tags/dgc.project_item_min.tpl.html',
                log: 'Directive projectItemMin Loaded OK!'
              }
            }
          },
          modal:{
            project:{
              json: {
                src: 'tags/dgc.modal_project_json.tpl.html',
                log: 'Directive ModalProjectJson Loaded OK!'
              }
            }
          }
        },

        /*
         Path of view include
         it's the path when you use ng-include
         */
        include: {
          view: {
            project: {
              item: {
                src: 'dgc.page_project.tpl.html',
                log: 'Page project Included OK!'
              },
              list: {
                src: 'dgc.page_project_list.tpl.html',
                log: 'Page project list Included OK!'
              }
            }
          }
        }
      },

      // Angular entity
      app: {},
      angular: window.angular,
      modules: angular.module,
      controllers: {},
      services: {},
      providers: {},
      directives: {},
      filter: {},

      // RESTfull web services
      request: {
        user: {
        // The RESTful user login web services
        // The system issues one authorization ticket to the user
        // by check if user exist and he having authorization to access application
        login: {
          method: 'POST',
          url: {
            prod: 'http://dev-digicode.intramundi.com/digicode/api/login',
            dev: 'http://dev-digicode.intramundi.com/digicode/api/login'
          },
          headers: {
            'Content-Type': 'application/json'
          },
          data: {},
          params: {}
        },
        // The RESTful user list web services
        // The system issues one list of uers
        list: {
          method: 'GET',
          url: {
            prod: 'http://dev-digicode.intramundi.com/digicode/api/users',
            dev: 'http://localhost:3000/users'
          },
          headers: {},
          data: {}
        },
        // The RESTful user getByAttribute web services
        // The system issues one user by specific Attribute
        getByAttribute: {
          method: 'GET',
          url: {
            prod: 'http://dev-digicode.intramundi.com/digicode/api/users',
            dev: 'http://localhost:3000/users'
          },
          headers: {},
          data: {}
        },
          // The RESTful user getById web services
          // The system issues one user by id
          getById: {
            method: 'GET',
            url: {
              prod: 'http://dev-digicode.intramundi.com/digicode/api/users',
              dev: 'http://localhost:3000/users'
            },
            headers: {},
            data: {}
          }
        },
        event:{
          user: {
            method: 'GET',
            url: {
              prod: 'http://dev-digicode.intramundi.com/digicode/api/events',
              dev: 'http://localhost:3000/event'
            },
            headers: {},
            data: {}
          },
          project:{
            method: 'GET',
            url: {
              prod: 'http://dev-digicode.intramundi.com/digicode/api/events',
              dev: 'http://localhost:3000/event'
            },
            headers: {},
            data: {}
          }
        },
        tags: {
          // The RESTful login web services
          // The system issues one authorization ticket to the user
          // by check if user exist and he having authorization to access application
          list: {
            method: 'GET',
            url: {
              prod: 'http://dev-digicode.intramundi.com/digicode/api/search/keywords/stats',
              dev: 'http://localhost:3000/tags'
            },
            headers: {},
            data: {},
            params: {}
          }
        },

        chart: {
          siteVisits: {
            method: 'GET',
            url: {
              prod: 'http://localhost:3000/siteVisits',
              dev: 'http://localhost:3000/siteVisits'
            },
            headers: {},
            data: {},
            params: {}
          }
        },

        project: {
          list: {
            method: 'GET',
            url: {
              prod: 'http://dev-digicode.intramundi.com/digicode/api/projects',
              dev: 'http://localhost:3000/projects-test'
            },
            headers: {
              'API-TOKEN': 'yRgJTCm8HHKoHEu6KpEq'
            },
            data: {},
            params: {}
          },
          search: {
            method: 'GET',
            url: {
              prod: 'http://dev-digicode.intramundi.com/digicode/api/search',
              dev: 'http://localhost:3000/search'
            },
            headers: {
              'API-TOKEN': 'yRgJTCm8HHKoHEu6KpEq'
            },
            data: {
                //search: '_word_'
            },
            params: {
                //search: '_word_'
            }
          }
        }
      }
    });

})();