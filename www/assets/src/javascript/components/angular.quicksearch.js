jQuery.fn.quickSearch = function (conf) {
    var config = jQuery.extend({
        url: '/search-results.php?q=',
        id: 'search-global-result',
        duration: 400,
        typeDelay: 200,
        loadingClass: 'loading',
        onSlideUp: function () {
        },
        uptadePosition: false,

        prepareResponse: function () {
        },
        onSubmit: function () {
        }

    }, conf);

    var quickSearch = jQuery('#' + config.id);

    // Create quick-search if it doesn't exist
    if (!quickSearch.length) {
        quickSearch = jQuery('<div id="' + config.id + '"></div>')
            .appendTo(document.body);
    }

    quickSearch.hide()
        .slideUp(0);

    // Close quick-search when clicking outside it
    jQuery(document.body).click(function (event) {
        var clicked = jQuery(event.target);

        if (!(clicked.is('#' + config.id) || clicked.parents('#' + config.id).length || clicked.is('input'))) {
            quickSearch.slideUp(config.duration, function () {
                config.onSlideUp();
            });
        }
    });


    return this.each(function () {
        var input = jQuery(this).attr('autocomplete', 'off');
        var quickSearchPaddingBorderHoriz = parseInt(quickSearch.css('paddingLeft'), 10) + parseInt(quickSearch.css('paddingRight'), 10) + parseInt(quickSearch.css('borderLeftWidth'), 10) + parseInt(quickSearch.css('borderRightWidth'), 10);

        // Re calculates live search's position
        var repositionQuickSearch = function () {
            var tmpOffset = input.offset();
            var inputDim = {
                left: tmpOffset.left,
                top: tmpOffset.top,
                width: input.outerWidth(),
                height: input.outerHeight()
            };

            inputDim.topPos = inputDim.top + inputDim.height;
            inputDim.totalWidth = inputDim.width - quickSearchPaddingBorderHoriz;

            quickSearch.css({
                position: 'absolute',
                left: inputDim.left + 'px',
                top: inputDim.topPos + 'px',
                width: inputDim.totalWidth + 'px'
            });
        };

        // Shows quick-search for this input
        var showQuickSearch = function () {
            // Always reposition the quick-search every time it is shown
            // in case user has resized browser-window or zoomed in or whatever
            repositionQuickSearch();

            // We need to bind a resize-event every time live search is shown
            // so it resizes based on the correct input element
            $(window).unbind('resize', repositionQuickSearch);
            $(window).bind('resize', repositionQuickSearch);

            quickSearch.slideDown(config.duration);
        };

        // Hides quick-search for this input
        var hideQuickSearch = function () {
            quickSearch.slideUp(config.duration, function () {
                config.onSlideUp();
            });
        };

        input
            // On focus, if the quick-search is empty, perform an new search
            // If not, just slide it down. Only do this if there's something in the input
            .focus(function () {
                if (this.value !== '') {
                    // Perform a new search if there are no search results
                    if (quickSearch.html() == '') {
                        this.lastValue = '';
                        input.keyup();
                    }
                    // If there are search results show live search
                    else {
                        // HACK: In case search field changes width onfocus
                        setTimeout(showQuickSearch, 1);
                    }
                }
            })
            // Auto update quick-search onkeyup
            .keyup(function (e) {
                if (e.keyCode == 13) {
                    conf.onSubmit(this.value);
                } else {
                    // Don't update quick-search if it's got the same value as last time
                    if (this.value != this.lastValue) {
                        input.addClass(config.loadingClass);

                        var q = this.value;

                        // Stop previous ajax-request
                        if (this.timer) {
                            clearTimeout(this.timer);
                        }

                        // Start a new ajax-request in X ms
                        this.timer = setTimeout(function () {
                            jQuery.get(config.url + q, function (data) {
                                input.removeClass(config.loadingClass);

                                // Show quick-search if results and search-term aren't empty
                                if (data.length && q.length) {
                                    //quickSearch.html(data);
                                    conf.prepareResponse(quickSearch, data);
                                    showQuickSearch();
                                }
                                else {
                                    hideQuickSearch();
                                }
                            });
                        }, config.typeDelay);

                        this.lastValue = this.value;
                    }
                }

            });
    });
};


/*

 var config = jQuery.extend({
 url: '',
 id: 'jquery-quick-search',
 duration: 400,
 typeDelay: 200,
 loadingClass: 'loading',
 onSlideUp: function () {
 },
 uptadePosition: false,
 prepareResponse: function () {
 },
 onSubmit: function () {
 }
 }, conf);

 var quickSearch = jQuery('#' + config.id);

 // Create quick-search if it doesn't exist
 if (!quickSearch.length) {
 quickSearch = jQuery('<div id="' + config.id + '"></div>')
 .appendTo(document.body)
 .hide()
 .slideUp(0);

 // Close quick-search when clicking outside it
 jQuery(document.body).click(function (event) {
 var clicked = jQuery(event.target);

 if (!(clicked.is('#' + config.id) || clicked.parents('#' + config.id).length || clicked.is('input'))) {
 quickSearch.slideUp(config.duration, function () {
 config.onSlideUp();
 });
 }
 });
 }

 return this.each(function () {
 var input = jQuery(this).attr('autocomplete', 'off');
 var quickSearchPaddingBorderHoriz = parseInt(quickSearch.css('paddingLeft'), 10) + parseInt(quickSearch.css('paddingRight'), 10) + parseInt(quickSearch.css('borderLeftWidth'), 10) + parseInt(quickSearch.css('borderRightWidth'), 10);

 // Re calculates live search's position
 var repositionQuickSearch = function () {
 var tmpOffset = input.offset();
 var inputDim = {
 left: tmpOffset.left,
 top: tmpOffset.top,
 width: input.outerWidth(),
 height: input.outerHeight()
 };

 inputDim.topPos = inputDim.top + inputDim.height;
 inputDim.totalWidth = inputDim.width - quickSearchPaddingBorderHoriz;

 quickSearch.css({
 position: 'absolute',
 left: inputDim.left + 'px',
 top: inputDim.topPos + 'px',
 width: inputDim.totalWidth + 'px'
 });
 };

 // Shows quick-search for this input
 var showQuickSearch = function () {
 // Always reposition the quick-search every time it is shown
 // in case user has resized browser-window or zoomed in or whatever
 repositionQuickSearch();

 // We need to bind a resize-event every time live search is shown
 // so it resizes based on the correct input element
 $(window).unbind('resize', repositionQuickSearch);
 $(window).bind('resize', repositionQuickSearch);

 quickSearch.slideDown(config.duration);
 };

 // Hides quick-search for this input
 var hideQuickSearch = function () {
 quickSearch.slideUp(config.duration, function () {
 config.onSlideUp();
 });
 };

 input
 // On focus, if the quick-search is empty, perform an new search
 // If not, just slide it down. Only do this if there's something in the input
 .focus(function () {
 if (this.value !== '') {
 // Perform a new search if there are no search results
 if (quickSearch.html() == '') {
 this.lastValue = '';
 input.keyup();
 }
 // If there are search results show live search
 else {
 // HACK: In case search field changes width onfocus
 setTimeout(showQuickSearch, 1);
 }
 }
 })
 // Auto update quick-search onkeyup
 .keyup(function (e) {

 // Don't update quick-search if it's got the same value as last time
 if (this.value != this.lastValue) {

 if (e.keyCode == 13) {
 conf.onSubmit(this.value);
 }

 input.addClass(config.loadingClass);

 var q = this.value;

 // Stop previous ajax-request
 if (this.timer) {
 clearTimeout(this.timer);
 }

 // Start a new ajax-request in X ms
 this.timer = setTimeout(function () {
 jQuery.get(config.url + q, function (data) {
 input.removeClass(config.loadingClass);

 // Show quick-search if results and search-term aren't empty
 if (data.length && q.length) {
 //console.log(data);
 conf.prepareResponse(quickSearch, data);
 //quickSearch.html('xxxxxx');
 showQuickSearch();
 }
 else {
 hideQuickSearch();
 }
 });
 }, config.typeDelay);

 this.lastValue = this.value;
 }


 });
 });
 };
 */