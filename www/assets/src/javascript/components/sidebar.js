/**
 * Created by abid on 24/02/2015.
 */
/* ============================================================
 * Pages Sidebar
 * ============================================================ */

(function($) {
    'use strict';
    // SIDEBAR CLASS DEFINITION
    // ======================

    var Sidebar = function(element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, $.fn.sidebar.defaults, options);

        this.bezierEasing = [.05, .74, .27, .99];
        this.cssAnimation = true;
        this.menuClosedCSS;
        this.menuOpenCSS;
        this.css3d = true;

        this.sideBarWidth = 280;
        this.sideBarWidthCondensed = 280 - 70;

        this.$sidebarMenu = this.$element.find('.sidebar-menu > ul');
        this.$pageContainer = $(this.options.pageContainer);
        this.$body = $('body');

        if (!this.$sidebarMenu.length) return;

        // apply perfectScrollbar plugin only for desktops
        ($.Pages.getUserAgent() == 'desktop') && this.$sidebarMenu.scrollbar({
            ignoreOverlay:false
        });


        if (!Modernizr.csstransitions)
            this.cssAnimation = false;
        if (!Modernizr.csstransforms3d)
            this.css3d = false;

        this.menuOpenCSS = (this.css3d == true ? 'translate3d(' + this.sideBarWidthCondensed + 'px, 0,0)' : 'translate(' + this.sideBarWidthCondensed + 'px, 0)');
        this.menuClosedCSS = (this.css3d == true ? 'translate3d(0, 0,0)' : 'translate(0, 0)');


        // Bind events
        // Toggle sub menus
        this.$sidebarMenu.find('li > a').on('click', function(e) {

            if ($(this).parent().children('.sub-menu') === false) {
                return;
            }

            var parent = $(this).parent().parent();
            var tempElem = $(this).parent();

            parent.children('li.open').children('a').children('.arrow').removeClass('open');
            parent.children('li.open').children('a').children('.arrow').removeClass('active');
            parent.children('li.open').children('.sub-menu').slideUp(200, function() {

            });
            parent.children('li').removeClass('open');
            var sub = $(this).parent().children('.sub-menu');
            if (sub.is(":visible")) {
                $('.arrow', $(this)).removeClass("open");

                sub.slideUp(200, function() {
                    $(this).parent().removeClass("active");
                });
            } else {
                $('.arrow', $(this)).addClass("open");
                $(this).parent().addClass("open");
                sub.slideDown(200, function() {});
            }
            //e.preventDefault();
        });

        // Toggle sidebar
        $('.sidebar-slide-toggle').on('click touchend',function(e) {
            e.preventDefault();
            $(this).toggleClass('active');
            var el = $(this).attr('data-pages-toggle');
            if (el != null) {
                $(el).toggleClass('show');
            }
        });

        var _this = this;

        function sidebarMouseEnter(e) {
            if ($.Pages.isVisibleSm() || $.Pages.isVisibleXs()) {
                return false
            }
            if ($('.close-sidebar').data('clicked')) {
                return;
            }
            if (_this.$body.hasClass('menu-pin'))
                return;
            if (_this.cssAnimation) {
                _this.$element.css({
                    'transform': _this.menuOpenCSS
                });
                _this.$body.addClass('sidebar-visible');
            } else {
                _this.$element.stop().animate({
                    left: '0px'
                }, 400, $.bez(_this.bezierEasing), function() {
                    _this.$body.addClass('sidebar-visible');
                });
            }
        }

        function sidebarMouseLeave(e) {
            if ($.Pages.isVisibleSm() || $.Pages.isVisibleXs()) {
                return false
            }
            if (typeof e != 'undefined') {
                var target = $(e.target);
                if (target.parent('.page-sidebar').length) {
                    return;
                }
            }
            if (_this.$body.hasClass('menu-pin'))
                return;

            if ($('.sidebar-overlay-slide').hasClass('show')) {
                $('.sidebar-overlay-slide').removeClass('show')
                $("[data-pages-toggle]").removeClass('active')

            }

            if (_this.cssAnimation) {
                _this.$element.css({
                    'transform': _this.menuClosedCSS
                });
                _this.$body.removeClass('sidebar-visible');
            } else {

                _this.$element.stop().animate({
                    left: '-' + _this.sideBarWidthCondensed + 'px'
                }, 400, $.bez(_this.bezierEasing), function() {

                    _this.$body.removeClass('sidebar-visible')
                    setTimeout(function() {
                        $('.close-sidebar').data({
                            clicked: false
                        });
                    }, 100);
                });
            }
        }


        this.$element.bind('mouseenter mouseleave', sidebarMouseEnter);
        this.$pageContainer.bind('mouseover', sidebarMouseLeave);

        /*this.$element.hover(
            function() {
                //$( this ).append( $( "<span> ***</span>" ) );
                sidebarMouseEnter();
            }, function() {
                //$( this ).find( "span:last" ).remove();
                sidebarMouseLeave();
            }
        );*/

    }


    // Toggle sidebar for mobile view
    Sidebar.prototype.toggleSidebar = function(toggle) {
        var timer;
        if (this.$body.hasClass('sidebar-open')) {
            this.$body.removeClass('sidebar-open');
            timer = setTimeout(function() {
                this.$element.removeClass('visible');
            }.bind(this), 400);
        } else {
            clearTimeout(timer);
            this.$element.addClass('visible');
            setTimeout(function() {
                this.$body.addClass('sidebar-open');
            }.bind(this), 10);

        }

    }

    Sidebar.prototype.togglePinSidebar = function(toggle) {
        if (toggle == 'hide') {
            this.$body.removeClass('menu-pin');
        } else if (toggle == 'show') {
            this.$body.addClass('menu-pin');
        } else {
            this.$body.toggleClass('menu-pin');
        }

    }


    // SIDEBAR PLUGIN DEFINITION
    // =======================
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('pg.sidebar');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('pg.sidebar', (data = new Sidebar(this, options)));
            if (typeof option == 'string') data[option]();
        })
    }

    var old = $.fn.sidebar;

    $.fn.sidebar = Plugin;
    $.fn.sidebar.Constructor = Sidebar;


    $.fn.sidebar.defaults = {
        pageContainer: '.page-container'
    }

    // SIDEBAR PROGRESS NO CONFLICT
    // ====================

    $.fn.sidebar.noConflict = function() {
        $.fn.sidebar = old;
        return this;
    }

    // SIDEBAR PROGRESS DATA API
    //===================

    /*$(document).on('ready', function() {
        $('[data-pages="sidebar"]').each(function() {
            var $sidebar = $(this)
            $sidebar.sidebar($sidebar.data())
        })
    })*/

    $(document).on('click.pg.sidebar.data-api', '[data-toggle-pin="sidebar"]', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $target = $('[data-pages="sidebar"]');
        $target.data('pg.sidebar').togglePinSidebar();
        return false;
    })
    $(document).on('click.pg.sidebar.data-api touchstart', '[data-toggle="sidebar"]', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $target = $('[data-pages="sidebar"]');
        $target.data('pg.sidebar').toggleSidebar();
        return false
    })

})(window.jQuery);