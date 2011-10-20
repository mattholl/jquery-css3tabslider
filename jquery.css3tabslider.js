/* jquery.css3tabslider.js v.01 2011-10-20
*
*  http://mattholl.com/jquery/css3tabslider/
*
*  Copyright 2011 Matthew Hollings except where noted.
*  A jquery plugin which use CSS3 2D transforms if available and jQuery animation as a fallback if not
*
*/

;(function($) {
  //check for css3 support use basic if else

  $.css3tabslider = {};
  $.css3tabslider.vendors = ['Khtml','Ks', 'O', 'Moz', 'Webkit'];
  $.css3tabslider.css3transforms = (function() {
    var div = document.createElement('div');
    var property = 'transform';

    if(property in div.style) {
      return true;
    } else {
      property = property.replace(/^[a-z]/, function(val) {  
          return val.toUpperCase();  
      });
      
      for(var i = 0, vendors = $.css3tabslider.vendors, len = vendors.length; i < len; i++) {
        if(vendors[i] + property in div.style) {

          //the browser supports css3 transforms
          return true;

        }
      }
    }
    //the browser doesn't support css3 transforms
    return false;
  })();

  //add easing for js animation - map to same string values as in css3 transforms
  //http://gsgd.co.uk/sandbox/jquery/easing/jquery.easing.1.3.js
  // t: current time, b: begInnIng value, c: change In value, d: duration

  $.easing['jswing'] = $.easing['swing'];
  $.extend( $.easing, {
    'def': 'ease-out',
    'ease': function (x, t, b, c, d) {
      return $.easing[$.easing.def](x, t, b, c, d);
    },
    'ease-in': function (x, t, b, c, d) {
      return c*(t/=d)*t*t + b;
    },
    'ease-out': function (x, t, b, c, d) {
      return c*((t=t/d-1)*t*t + 1) + b;
    },
    'ease-in-out': function (x, t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t + b;
      return c/2*((t-=2)*t*t + 2) + b;
    },
  });

  /***********************************************************************/
  
  //plugin setup return code
  
  $.fn.css3tabslider = function(settings) {

    //combine default settings with those passed in through settings object
    
    var opts = $.extend({}, $.fn.css3tabslider.defaults, settings);

    return this.each(function() {
      var obj = $(this);
      
      //apply setup css to slides
      obj.css('width', opts.panel_width);
      obj.css('overflow', 'hidden');
      var num_slides = obj.children('#panel_container').children().size();
      var container_width = num_slides * opts.panel_width;

      obj.children('#panel_container').css('width', container_width);

      obj.children('#panel_container').children().each(function() {
         $(this).css('width', opts.panel_width);
         $(this).css('float', 'left');
      });

      if ($.css3tabslider.css3transforms == true) {
        //use css3 transforms
        var slide = 0;
        
        //find navigation and attach event to click
        var links = obj.children('#navigation').children('ul').children('li');

         links.each(function(index) {

            $(this).bind('click', function() {

              for(var i = 0, len = $.css3tabslider.vendors.length; i < len; i ++) {
              
                var vendor = $.css3tabslider.vendors[i].replace(/^[A-Z]/, function(val) {
                      return val.toLowerCase();  
                });

                $('.panel').css('-'+vendor+'-transform', 'translateX(' + index*-opts.panel_width +'px)');
                $('.panel').css('-'+vendor+'-transition', '-'+vendor+'-transform '+opts.speed+'s '+opts.easing);
              }
              
              //also if there's no vendor prefix
              $('.panel').css('transform', 'translateX(' + index*-opts.panel_width +'px)');
              $('.panel').css('transition', '-'+vendor+'-transform '+opts.speed+'s ' +opts.easing);
              slide = index;
            });
          });
       } else {
        //browser doesn't support css transforms - use jquery animation fallback
        var current = 1;
         $('#navigation ul li').each(function(index) {
 
          $(this).bind('click', function(e){
            $('#panel_container').stop().animate({
                marginLeft: index*-opts.panel_width + 'px'
            },{
              speed: opts.speed*1000,
              easing: opts.easing
            });
            e.preventDefault();
           
          });
        });
      }
    });
  }

  //default settings
  $.fn.css3tabslider.defaults = {
    'panel_width': 400,
    'speed': 1000,
    'easing': 'linear'
  }
})(jQuery);