'use strict';

require.config({
    name: 'readium',
    baseUrl: '/assets/js',
    dir: '../../../RediumCustom',
    paths: {
        jquery: 'assets/vendor/jquery/jquery',
        hljs: 'assets/vendor/highlightjs/highlight.pack',
        fluidbox: 'assets/vendor/fluidbox/jquery.fluidbox',
        imagesloaded: 'assets/vendor/imagesloaded/imagesloaded',
        'eventEmitter/EventEmitter': 'assets/vendor/eventEmitter/EventEmitter',
        'eventie/eventie': 'assets/vendor/eventie/eventie',
        headroomBase: 'assets/vendor/headroom.js/dist/headroom',
        headroom: 'assets/vendor/headroom.js/dist/jQuery.headroom'
    },
    shim: {
        fluidbox: {
            deps: ['imagesloaded', 'eventEmitter/EventEmitter', 'eventie/eventie'],
            exports: 'jQuery.fn.fluidbox'
        },
        imagesloaded: {
            deps: ['jquery'],
            exports: 'jQuery.fn.imagesloaded'
        },
        hljs: {
            exports: 'hljs'
        },
        headroom: {
            deps: ['jquery', 'headroomBase'],
            exports: 'jQuery.fn.headroom'
        }
    }
});

require(['jquery', 'hljs', 'ttr', 'fluidbox', 'headroom'], function($, hljs, ttr) {
    var cover = $('img[alt="img-post-cover"]'),
        container = $('#img-post-cover'),
        imageList = $('img'),
        articleList = $('.contentlist__article');

    $('#headroom').headroom({
        classes: {
            initial: 'animated',
            pinned: 'slideDown',
            unpinned: 'slideUp'
        }
    });

    $('.sidebar__userimage').on('click', function() {
        location.href = '/';
    });

    hljs.initHighlighting();

    if (cover.length > 0) {
        container = $('#img-post-cover');
        container.css('background-image', 'url(' + cover.attr('src') + ')')
            .show();

        cover.remove();
    } else {
        container.remove();
    }

    if (articleList.length > 0) {
        articleList.each(function() {
            var article = $(this),
                estimatedReadingTime = ttr(article.find('.contentlist__full').text());

            article.find('.ttr').html(estimatedReadingTime + ' min to read');
        });
    }

    if (imageList.length > 0) {
        imageList.each(function() {
            $(this).wrap(function() {
                var image = $(this);

                return '<a data-fluidbox href="' + image.attr('src') + '"><img src="' + image.attr('src') + '"></a>';
            });
        });
    }

    $('a[data-fluidbox]').fluidbox({
        viewportFill: 0.8
    });
});