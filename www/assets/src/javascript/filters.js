/**
 * @author abid
 * @date 03/03/2015
 * @version 1.1.0
 * @description Global filters
 * @src app/assets/javascript/client-side/filters.js
 */

'use strict';

/* Filters */
(function (_$) {

  var _isset = function (input) {
      input = typeof input !== 'undefined' ? ( (input !== null) ? input : '' ) : '';
      return input;
  };

  angular.module('dgcApp')
    .filter('dgc_filter_avatar', ['DgcConfig', function (DgcConfig) {
      return function (input, name) {
        name = _isset(name) !== '' ? name : 'Digi Code';
        var _initial = name.match(/^[?A-Za-z]/g) + '' + _$.trim(name.match(/[ ][?A-Z]/g));

        //var _url = _DGC_Obj.path.avatar.host + input;
        //_url = (_url == _DGC_Obj.path.avatar.host || _url == _DGC_Obj.path.avatar.host+"undefined") ? "" : _url;

        return _isset(input) !== '' ? 'background-image:url(' + DgcConfig.path.avatar.host + input + ')' : 'background-size: 60% 60%; background-color:' + DgcConfig.services.utils.dummyimage.getBackgroundColor() + ' ;background-image:url(' + DgcConfig.services.utils.dummyimage.getImage(_initial) + ')';
      };
    }])
    .filter('dgc_filter_avatar_by_id', ['DgcConfig', function (DgcConfig) {
        return function (id) {
            return DgcConfig.path.avatar.src.replace(/_id_/i, _isset(id));
        };
    }])
    .filter('dgc_filter_level_color', ['DgcConfig', function (DgcConfig) {
        return function (_nbr_) {
            _nbr_ = (_nbr_ / 20)-1;
            return {color: DgcConfig.utils.levelColor[_nbr_]};
        };
    }])
    .filter('dgc_filter_routing',  ['DgcConfig', function (DgcConfig) {
        return function (url) {
            return DgcConfig.host.concat(DgcConfig.routing[url]);
        };
    }])
    .filter('dgc_filter_url',  ['DgcConfig', function (DgcConfig) {
        return function (url) {
            return DgcConfig.host.concat(url);
        };
    }])
    .filter('dgc_filter_url_project', ['DgcConfig', function (DgcConfig) {
        return function (url) {
            return DgcConfig.host.concat(DgcConfig.routing.project.replace(/:_projectId_/i, _isset(url)));
        };
    }])
    .filter('dgc_filter_url_search', ['DgcConfig', function (DgcConfig) {
        return function (url) {
            return DgcConfig.host.concat(DgcConfig.routing.project_search.replace(/:_search_/i, _isset(url)));
        };
    }])
    .filter('dgc_filter_name_project', ['$sce', function ($sce) {
        return function (input) {
            return $sce.trustAsHtml(_isset(input).replace(/[A-Z][a-z 0-9]*/, '<strong>$&</strong>'));
        };
    }])
    .filter('dgc_filter_first_word_strong', ['$sce', function ($sce) {
        return function (input) {
            return $sce.trustAsHtml(_isset(input).replace(/[A-Z a-z 0-9]*[ ]/, '<strong>$&</strong>'));
        };
    }])
    .filter('dgc_filter_environment_class', ['DgcConfig', function (DgcConfig) {
        return function (input) {
            return DgcConfig.utils.tabOfClass[input];
        };
    }])
    .filter('dgc_filter_environment_note_test', [function () {
        return function (input) {
            var tabNote = ['4/5','20','53','41','54'];
            return tabNote[input];
        };
    }])
    .filter('dgc_filter_html_persist', ['$sce', function ($sce) {
        return function (input) {
            return $sce.trustAsHtml('<div class="html_persist">' + _isset(input) + '</div>');
        };
    }])
    .filter('dgc_filter_background_gradient', ['DgcConfig', function (DgcConfig) {
        return function () {
            return 'background:' + DgcConfig.services.utils.css.newGradient();
        };
    }]);

})(jQuery);

/*
(function (_W, _$, _DGC_Obj, _DGC_ObjM, _DGC_ObjF) {
    $.extend(_DGC_ObjF, {
        "dGC_ObjFilter": _DGC_ObjM('dGC_ObjFilter', [])
    });

    var _isset = function (input) {
        input = typeof input !== 'undefined' ? ( (input !== null)? input : '' ) : '';
        return input;
    }

    _DGC_ObjF.dGC_ObjFilter.filter('dgc_filter_avatar', function () {
        return function (input, name) {
            name = (_isset(name) != '')? name : 'Digi Code';
            var _initial = name.match(/^[?A-Za-z]/g)+''+_$.trim(name.match(/[ ][?A-Z]/g));

            //var _url = _DGC_Obj.path.avatar.host + input;
            //_url = (_url == _DGC_Obj.path.avatar.host || _url == _DGC_Obj.path.avatar.host+"undefined") ? "" : _url;

            return (_isset(input) != '') ? "background-image:url("+_DGC_Obj.path.avatar.host + input+")" : "background-size: 60% 60%; background-color:"+DGC_Obj.services.utils.dummyi.getBbackgroundColor()+" ;background-image:url("+DGC_Obj.services.utils.dummyi.getImage(_initial)+")";
        }
    }).filter('dgc_filter_avatar_by_id', function () {
        return function (id) {
            return _DGC_Obj.path.avatar.src.replace(/_id_/i, _isset(id));
        }
    }).filter('dgc_filter_level_color', function () {
        return function (_nbr_) {
            _nbr_ = (_nbr_ / 20)-1;
            return {color:_DGC_Obj.utils.levelColor[_nbr_]};
        }
    }).filter('dgc_filter_routing', function () {
        return function (url) {
            return _DGC_Obj.host.concat(_DGC_Obj.routing[url]);
        }
    }).filter('dgc_filter_url', function () {
        return function (url) {
            return _DGC_Obj.host.concat(url);
        }
    }).filter('dgc_filter_url_project', function () {
        return function (url) {
            return _DGC_Obj.host.concat(_DGC_Obj.routing.project.replace(/:_projectId_/i, _isset(url)));
        }
    }).filter('dgc_filter_url_search', function () {
        return function (url) {
            return _DGC_Obj.host.concat(_DGC_Obj.routing.project_search.replace(/:_search_/i, _isset(url)));
        }
    }).filter('dgc_filter_name_project', function ($sce) {
        return function (input) {
            return $sce.trustAsHtml(_isset(input).replace(/[A-Z][a-z 0-9]*\/, "<strong>\$&</strong>"));
        }
    }).filter('dgc_filter_first_word_strong', function ($sce) {
        return function (input) {
            return $sce.trustAsHtml(_isset(input).replace(/[A-Z a-z 0-9]*[ ]/, "<strong>\$&</strong> "));
        }
    }).filter('dgc_filter_environment_class', function () {
        return function (input) {
            return _DGC_Obj.utils.tabOfClass[input];
        }
    }).filter('dgc_filter_environment_note_test', function () {
        return function (input) {
            var tabNote = ['4/5','20','53','41','54'];
            return tabNote[input];
        }
    }).filter('dgc_filter_html_persist', function ($sce) {
        return function (input) {
            return $sce.trustAsHtml("<div class='html_persist'>"+_isset(input)+"</div>");
        }
    }).filter('dgc_filter_background_gradient', function () {
            return function () {
                return "background:"+_DGC_Obj.services.utils.css.newGradient();
            }
        });
})(window,jQuery, DGC_Obj, DGC_Obj.modules, DGC_Obj.filter);
*/