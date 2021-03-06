(function () {
  var jqueryVersion = '3.4.1';
  var siteUrl = 'https://127.0.0.1:8000/';
  var staticUrl = siteUrl + 'static/';
  var minWidth = 100;
  var minHeight = 100;

  function bookmarklet(msg) {
    // load css
    var css = jQuery('<link>');
    css.attr({
      rel: 'stylesheet',
      type: 'text/css',
      href:
        staticUrl +
        'css/bookmarklet.css?r=' +
        Math.floor(Math.random() * 99999999999999999999),
    });

    jQuery('head').append(css);

    // load HTML
    box_html =
      '<div id="bookmarklet"><a href="#" id="close">&times;</a><h1>Select an image to bookmark:</h1><div class="images"></div></div>';

    jQuery('body').append(box_html);

    // close event
    jQuery('#bookmarklet #close').click(function () {
      jQuery('#bookmarklet').remove();
    });

    // find images and display them
    jQuery.each(jQuery('img[src$="jpg"]'), function (index, image) {
      if (
        jQuery(image).width() >= minWidth &&
        jQuery(image).height() >= minHeight
      ) {
        imageUrl = jQuery(image).attr('src');
        console.log(imageUrl);
        jQuery('#bookmarklet .images').append(
          '<a href="#"><img src="' + imageUrl + '" /></a>'
        );
      }
    });

    // when an image is selected open URL with it
    jQuery('#bookmarklet .images a').click(function (e) {
      selected_image = jQuery(this).children('img').attr('src');
      // hide bookmarklet
      jQuery('#bookmartlet').hide();
      // open new window to submit the image
      window.open(
        siteUrl +
          'images/create/?url=' +
          selected_image +
          '&title=' +
          encodeURIComponent(jQuery('title').text()),
        '_blank'
      );
    });
  }

  // Check if jQuery is loaded
  if (typeof window.jQuery != 'undefined') {
    bookmarklet();
  } else {
    // check for conflicts
    var conflict = typeof window.$ != 'undefined';
    // Create the script and point to Google API
    var script = document.createElement('script');
    script.src =
      '//ajax.googleapis.com/ajax/libs/jquery/' +
      jqueryVersion +
      '/jquery.min.js';

    // Add the script to the 'head' for processing
    document.head.appendChild(script);
    // Create a way to wait until script loading
    var attemps = 15;
    (function () {
      // Check again if jQuery is undefined
      if (typeof window.jQuery == 'undefined') {
        if (--attemps > 0) {
          // Call himself in a few miliseconds
          window.setTimeout(arguments.callee, 250);
        } else {
          // Too much attemps to load, send error
          alert('An error occurred while loading jQuery');
        }
      } else {
        bookmarklet();
      }
    })();
  }
})();
