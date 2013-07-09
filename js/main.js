/*
 * Bootstrap Image Gallery JS Example 2.9
 * https://github.com/blueimp/Bootstrap-Image-Gallery
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint unparam: true */
/*global window, document, $ */

$(function () {
    'use strict';

    // Start slideshow button:
    $('#start-slideshow').button().click(function () {
        var options = $(this).data(),
            modal = $(options.target),
            data = modal.data('modal');
        if (data) {
            $.extend(data.options, options);
        } else {
            options = $.extend(modal.data(), options);
        }
        modal.find('.modal-slideshow').find('i')
            .removeClass('icon-play')
            .addClass('icon-pause');
        modal.modal(options);
    });

    // Toggle fullscreen button:
    $('#toggle-fullscreen').button().click(function () {
        var button = $(this),
            root = document.documentElement;
        if (!button.hasClass('active')) {
            $('#modal-gallery').addClass('modal-fullscreen');
            if (root.webkitRequestFullScreen) {
                root.webkitRequestFullScreen(
                    window.Element.ALLOW_KEYBOARD_INPUT
                );
            } else if (root.mozRequestFullScreen) {
                root.mozRequestFullScreen();
            }
        } else {
            $('#modal-gallery').removeClass('modal-fullscreen');
            (document.webkitCancelFullScreen ||
                document.mozCancelFullScreen ||
                $.noop).apply(document);
        }
    });

    function shuffle(o){ //v1.0
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    // Load images via flickr for demonstration purposes:
    $.getJSON('user_objects.json', function (data) {
        var gallery = $('#gallery');
        shuffle(data);
        for (var i = 0; i < data.length; i++) {
            var url = "";
            var url2 = "";
            var website_github = "", website_linkedin = "", website_facebook = "", website_gplus = "";
            try {
                url = data[i].photo_60;
                url2 = data[i].photo;
                website_linkedin = data[i].website_linkedin;
                if (data[i].website_github != "")
                    website_github = "http://github.com/" + data[i].website_github;
                if (data[i].website_facebook != "")
                    website_facebook = "http://facebook.com/" + data[i].website_facebook;
                if (data[i].website_gplus != "")
                    website_gplus =  "http://plus.google.com/" + data[i].website_gplus;
                if (url != "") {
                  var a = $('<a data-gallery="gallery"/>')
                      .prop('href', url2)
                      .data('websites', {LinkedIn: website_linkedin, Github: website_github, Facebook: website_facebook, GPlus: website_gplus})
                      .data('bio', data[i].bio)
                      .data('location', data[i].location)
                      .prop('title', data[i].display_name)
                      .append($('<img>').prop('src', url))
                      .appendTo(gallery);
                  }
            }
            catch (ReferenceError) {
            }

        }
    });
});
