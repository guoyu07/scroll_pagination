/*
**      Henry Lee
**      manageyp@gmail.com -- feel free to contact me for bugs or new implementations.
**      jQuery Mobile Scroll Pagination
**      2013/06/27
**
**      This script inspired by the following two plugins:
**      http://andersonferminiano.com/jqueryscrollpagination/
**      http://www.inserthtml.com/2013/01/scroll-pagination/
**
**      You may use this script for free, but keep my credits.
**      Thank you.
*/

(function($) {

  $.fn.scrollPagination = function(options) {
    
    var settings = {
      error   : '<label id="paginateDoneText" for="text-4" class="ui-input-text">数据已经全部加载~</label>',
      url     : null,
      nop     : 10,
      offset  : 0,
      delay   : 500,
      scroll  : true,
      afterLoad : null,
      beforeLoad : null,
      extra_data : null
    }
    
    // Extend the options so they work with the plugin
    if(options) {
      $.extend(settings, options);
    }
    
    // For each so that we keep chainability.
    return this.each(function() {
      // Some variables 
      $this = $(this);
      $settings = settings;
      var offset = $settings.offset;
      var busy = false;

      function getData(url) {
        $settings.beforeLoad();
        // Post data to ajax.php
        $.post(url, {
            action        : 'scrollpagination',
            extra_data    : $settings.extra_data,
            number        : $settings.nop,
            offset        : offset
        }, function(data) {
          // If there is no data returned, there are no more posts to be shown. Show error
          if(data == "") {
            $('#content').append($settings.error);
            $settings.afterLoad();

            setTimeout(function() {
              $("#paginateDoneText").fadeOut();
            }, 2000);
          } else {
            // Offset increases
            offset = offset+$settings.nop;
            // Append the data to the content div
            $('#content').append(data);
            // No longer busy!  
            busy = false;
            $settings.afterLoad();
          } 
        });
      }
      // If scrolling is enabled
      if($settings.scroll == true) {
        // .. and the user is scrolling
        $(window).scroll(function() {
          // Check the user is at the bottom of the element
          if($(window).scrollTop() + $(window).height() > $this.height() && !busy) {
            busy = true;
            setTimeout(function() {
              getData($settings.url); 
            }, $settings.delay);
          } 
        });
      }
      
    });
  }

})(jQuery);
