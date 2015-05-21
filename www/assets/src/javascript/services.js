'use strict';

/* Services */
(function ($) {

  angular.module('dgcApp')
  .factory('InitFactory', ['$log', 'DgcConfig', function($log, DgcConfig) {

    return {
      init: function() {

        var
        //
        // Private function _log
            _counter = 0,
            _log = function (mode, msg) {
                if (!DgcConfig.debug) {
                  return;
                }
                // Remove first argument
                var args = Array.prototype.slice.apply(arguments, [1]);
                // Prepend timestamp
                var dt = new Date();
                var tag = dt.getHours() + ':' + dt.getMinutes() + ':' +
                    dt.getSeconds() + '.' + dt.getMilliseconds();
                args[0] = tag + ' - ' + args[0];
                try {
                  $log.debug(++_counter + ' :: [' + tag + ']');

                  switch (mode) {
                    case 'log':
                    case 'warn':
                    case 'error':
                    case 'debug':
                    case 'info':
                      $log[mode](msg);
                    break;
                    case 'init':
                    break;
                    default:
                      $log.log(msg);
                    break;
                  }
                } catch (e) {
                  if (!$log) {
                    DgcConfig.debug = false;
                  } else if (e.number === -2146827850) {

                  }
                }
            },
            _getUrl = function (service) {
                var url;
                switch (DgcConfig.environment) {
                    case 'prod':
                        url = service.url.prod;
                        break;
                    case 'dev':
                        url = service.url.dev;
                        break;
                    case 'test':
                        url = service.url.test;
                        break;
                    default:
                        url = service.url.prod;
                }
                return url;
            };

        angular.extend(DgcConfig.services, {
            'utils': {},
            'session': {},
            'json': {},
            'jQuery': {},
            'scope': {},
            'security': {}
        });

        /* Services :: Utils */
        angular.extend(DgcConfig.services.utils, {
            'console': {},
            'portlet': {},
            'path': {},
            'dummyimage': {},
            'css': {}
        });

        /* Services :: Utils :: Console */
        angular.extend(DgcConfig.services.utils.console, {
            'log': function (msg) {
                _log('log', msg);
            },
            'warn': function (msg) {
                _log('warn', msg);
            },
            'error': function (msg) {
                _log('error', msg);
            },
            'info': function (msg) {
                _log('info', msg);
            },
            'debug': function (msg) {
                _log('debug', msg);
            },
            'init': function (msg) {
                _log('init', msg);
            }

        });

        /* Services :: Utils :: Portlet */
        angular.extend(DgcConfig.services.utils.portlet, {
            'start': function (element) {
                $(element).portlet({
                    progress: 'circle',
                    progressColor: 'success',
                    refresh: true,
                    onRefresh: function () {
                        return true;
                    }
                });
            },
            'stop': function (element) {
                $(element).portlet({
                    refresh: false
                });
            }
        });

        /* Services :: Utils */
        angular.extend(DgcConfig.services.utils.path, {
            'view': function (url) {
                return DgcConfig.path.views + url;
            },
            'webservice': function (service) {
                return {
                    method: service.method,
                    url: _getUrl(service),
                    headers: service.headers,
                    data: service.data,
                    params: service.data
                };
            },
            'dummyimage': function (text) {
                return DgcConfig.utils.dummyimage.api + DgcConfig.utils.dummyimage.size + '/' + DgcConfig.utils.dummyimage.backgroundColor + '/' + DgcConfig.utils.dummyimage.foregroundColor + '.' + DgcConfig.utils.dummyimage.format + '&text=' + text;
            },
            'getRandomColor': function (withSharp) {
                var letters = '0123456789ABCDEF'.split('');
                withSharp = typeof withSharp !== 'undefined' ? withSharp : false;
                var color = (withSharp) ? '#' : '';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }
        });

        angular.extend(DgcConfig.services.utils.dummyimage, {
            'getImage': function (text) {
                return DgcConfig.utils.dummyimage.api + DgcConfig.utils.dummyimage.size + '/' + DgcConfig.utils.dummyimage.backgroundColor + '/' + DgcConfig.utils.dummyimage.foregroundColor + '.' + DgcConfig.utils.dummyimage.format + '&text=' + text;
            },
            'getBackgroundColor': function () {
                return '#' + DgcConfig.utils.dummyimage.backgroundColor;
            },
            'getRandomColor': function (withSharp) {
                var letters = '0123456789ABCDEF'.split('');
                withSharp = typeof withSharp !== 'undefined' ? withSharp : false;
                var color = (withSharp) ? '#' : '';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }
        });

        angular.extend(DgcConfig.services.utils.css, {
            'newGradient': function () {
                var colorA = {
                    r: Math.floor(Math.random()*255),
                    g: Math.floor(Math.random()*255),
                    b: Math.floor(Math.random()*255)
                    },
                    colorB = {
                    r: Math.floor(Math.random()*255),
                    g: Math.floor(Math.random()*255),
                    b: Math.floor(Math.random()*255)
                };
                colorA.rgb = 'rgb('+colorA.r+','+colorA.g+','+colorA.b+')';
                colorB.rgb = 'rgb('+colorB.r+','+colorB.g+','+colorB.b+')';
                //background: -webkit-radial-gradient( center, circle, red, blue);
                //background:    -moz-radial-gradient( center, circle, red, blue);
                //background:     -ms-radial-gradient( center, circle, red, blue);
                //background:      -o-radial-gradient( center, circle, red, blue);
                //background:         radial-gradient( circle at center, red, blue);
                return 'radial-gradient(at top left, '+colorA.rgb+', '+colorB.rgb+')';
            }
        });

        /* Services :: Session */
        angular.extend(DgcConfig.services.session, {
            'set': function (key, value) {
                return sessionStorage.setItem(key, value);
            },
            'get': function (key) {
                return sessionStorage.getItem(key);
            },
            'destroy': function (key) {
                return sessionStorage.removeItem(key);
            }
        });

        /* Services :: Json */
        angular.extend(DgcConfig.services.json, {
            'set': function (data) {
                return JSON.stringify(data);
            },
            'get': function (data) {
                return JSON.parse(data);
            }
        });


        /* Services :: jQuery */
        angular.extend(DgcConfig.services.jQuery, {
            'scrollbar': {},
            'tooltip': {}
        });


        /* Services :: jQuery : scrollbar */
        angular.extend(DgcConfig.services.jQuery.scrollbar, {
            'init': function (element) {
                element = typeof element !== 'undefined' ? element : '#dgc .scrollable';
                return $(element).scrollbar({
                        ignoreOverlay: true,
                        disableBodyScroll: true
                    }) && $.fn.scrollbar;
            }
        });

        /* Services :: jQuery : tooltip */
        angular.extend(DgcConfig.services.jQuery.tooltip, {
            'init': function (element) {
                element = typeof element !== 'undefined' ? element : '#dgc [data-toggle="tooltip"]';
                return $(element).tooltip();
            }
        });

        angular.extend(DgcConfig.services.security, {
            'checkRedirect': function ($location) {
                DgcConfig.services.utils.console.log($location.path());
                if (!DgcConfig.services.json.get(DgcConfig.services.session.get('_DGC_RS_user'))) {
                    if (DgcConfig.services.security.active)
                        $location.path(DgcConfig.services.routing.login);
                }
                return true;
            }
        });

      }
    };

  }]);

})(jQuery);

/*
(function (_W, _DGC_Obj, _DGC_ObjS) {

    var
    //
    // Private function _log
        _counter = 0,
        _log = function (mode, msg) {
            if (!_DGC_Obj.debug) {
                return;
            }
            // Remove first argument
            var args = Array.prototype.slice.apply(arguments, [1]);
            // Prepend timestamp
            var dt = new Date();
            var tag = dt.getHours() + ":" + dt.getMinutes() + ":" +
                dt.getSeconds() + "." + dt.getMilliseconds();
            args[0] = tag + " - " + args[0];
            try {
                _W.console.debug(++_counter + ' :: [' + tag + ']');
                switch (mode) {
                    case "log":
                        _W.console.log(msg);
                        break;
                    case "warn":
                        _W.console.warn(msg);
                        break;
                    case "error":
                        _W.console.error(msg);
                        break;
                    case "info":
                        _W.console.info(msg);
                        break;
                    case "debug":
                        _W.console.debug(msg);
                        break;
                    case "init":
                        //_W.console.log('%c ' + _counter + ' :: ', 'background: ' + _DGC_Obj.utils.console.init.background + '; color: ' + _DGC_Obj.utils.console.init.color + '', msg);
                        break;
                    default:
                        _W.console.log(msg);
                        break;
                }
            } catch (e) {
                if (!_W.console) {
                    _DGC_Obj.debug = false;
                } else if (e.number === -2146827850) {

                }
            }
        },
        _getUrl = function (service) {
            var url;
            switch (_DGC_Obj.environment) {
                case "prod":
                    url = service.url.prod;
                    break;
                case "dev":
                    url = service.url.dev;
                    break;
                case "test":
                    url = service.url.test;
                    break;
                default:
                    url = service.url.prod;
            }
            return url;
        };

    angular.extend(_DGC_ObjS, {
        "utils": {},
        "session": {},
        "json": {},
        "jQuery": {},
        "scope": {},
        "security": {}
    });

    // Services :: Utils
    angular.extend(_DGC_ObjS.utils, {
        "console": {},
        "portlet": {},
        "path": {},
        "dummyi": {},
        "css": {}
    });

    // Services :: Utils :: Console
    $.extend(_DGC_ObjS.utils.console, {
        "log": function (msg) {
            _log('log', msg);
        },
        "warn": function (msg) {
            _log('warn', msg);
        },
        "error": function (msg) {
            _log('error', msg);
        },
        "info": function (msg) {
            _log('info', msg);
        },
        "debug": function (msg) {
            _log('debug', msg);
        },
        "init": function (msg) {
            _log('init', msg);
        }

    });

    // Services :: Utils :: Portlet
    $.extend(_DGC_ObjS.utils.portlet, {
        "start": function (element) {
            $(element).portlet({
                progress: 'circle',
                progressColor: 'success',
                refresh: true,
                onRefresh: function () {
                    return true;
                }
            });
        },
        "stop": function (element) {
            $(element).portlet({
                refresh: false
            });
        }
    });

    // Services :: Utils
    $.extend(_DGC_ObjS.utils.path, {
        "view": function (url) {
            return _DGC_Obj.path.views + url;
        },
        "webservice": function (service) {
            return {
                method: service.method,
                url: _getUrl(service),
                headers: service.headers,
                data: service.data,
                params: service.data
            };
        },
        "dummyimage": function (text) {
            return _DGC_Obj.utils.dummyimage.api + _DGC_Obj.utils.dummyimage.size + '/' + _DGC_Obj.utils.dummyimage.backgroundColor + '/' + _DGC_Obj.utils.dummyimage.foregroundColor + '.' + _DGC_Obj.utils.dummyimage.format + "&text=" + text;
        },
        "getRandomColor": function (withSharp) {
            var letters = '0123456789ABCDEF'.split('');
            var withSharp = typeof withSharp !== 'undefined' ? withSharp : false;
            var color = (withSharp) ? '#' : '';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    });

    $.extend(_DGC_ObjS.utils.dummyi, {
        "getImage": function (text) {
            return _DGC_Obj.utils.dummyimage.api + _DGC_Obj.utils.dummyimage.size + '/' + _DGC_Obj.utils.dummyimage.backgroundColor + '/' + _DGC_Obj.utils.dummyimage.foregroundColor + '.' + _DGC_Obj.utils.dummyimage.format + "&text=" + text;
        },
        "getBbackgroundColor": function (t) {
            return "#"+_DGC_Obj.utils.dummyimage.backgroundColor;
        },
        "getRandomColor": function (withSharp) {
            var letters = '0123456789ABCDEF'.split('');
            var withSharp = typeof withSharp !== 'undefined' ? withSharp : false;
            var color = (withSharp) ? '#' : '';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    });

    $.extend(_DGC_ObjS.utils.css, {
        "newGradient": function () {
            var colorA = {
                r: Math.floor(Math.random()*255),
                g: Math.floor(Math.random()*255),
                b: Math.floor(Math.random()*255)
                },
                colorB = {
                r: Math.floor(Math.random()*255),
                g: Math.floor(Math.random()*255),
                b: Math.floor(Math.random()*255)
            };
            colorA.rgb = 'rgb('+colorA.r+','+colorA.g+','+colorA.b+')';
            colorB.rgb = 'rgb('+colorB.r+','+colorB.g+','+colorB.b+')';
            //background: -webkit-radial-gradient( center, circle, red, blue);
            //background:    -moz-radial-gradient( center, circle, red, blue);
            //background:     -ms-radial-gradient( center, circle, red, blue);
            //background:      -o-radial-gradient( center, circle, red, blue);
            //background:         radial-gradient( circle at center, red, blue);
            return 'radial-gradient(at top left, '+colorA.rgb+', '+colorB.rgb+')';
        }
    });

    // Services :: Session
    $.extend(_DGC_ObjS.session, {
        "set": function (key, value) {
            return sessionStorage.setItem(key, value);
        },
        "get": function (key) {
            return sessionStorage.getItem(key);
        },
        "destroy": function (key) {
            return sessionStorage.removeItem(key);
        }
    });

    // Services :: Json
    $.extend(_DGC_ObjS.json, {
        "set": function (data) {
            return JSON.stringify(data);
        },
        "get": function (data) {
            return JSON.parse(data);
        }
    });


    // Services :: jQuery
    $.extend(_DGC_ObjS.jQuery, {
        "scrollbar": {},
        "tooltip": {}
    });


    // Services :: jQuery : scrollbar
    $.extend(_DGC_ObjS.jQuery.scrollbar, {
        "init": function (element) {
            element = typeof element !== 'undefined' ? element : '#dgc .scrollable';
            return $(element).scrollbar({
                    ignoreOverlay: true,
                    disableBodyScroll: true
                }) && $.fn.scrollbar;
        }
    });

    // Services :: jQuery : tooltip
    $.extend(_DGC_ObjS.jQuery.tooltip, {
        "init": function (element) {
            element = typeof element !== 'undefined' ? element : '#dgc [data-toggle="tooltip"]';
            return $(element).tooltip();
        }
    });

    $.extend(_DGC_ObjS.security, {
        "checkRedirect": function ($location) {
            _DGC_ObjS.utils.console.log($location.path());
            if (!_DGC_ObjS.json.get(_DGC_ObjS.session.get("_DGC_RS_user"))) {
                if (_DGC_Obj.security.active)
                    $location.path(_DGC_Obj.routing.login);
            }
            return true;
        }
    });

})(window, DGC_Obj, DGC_Obj.services);
*/