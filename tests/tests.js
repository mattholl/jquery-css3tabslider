//Qunit tests

module('namespace check');
test('css3tabslider is a single namespace within jQuery object', function() {
  expect(1);
  ok($.fn.css3tabslider, 'css3tabslider is present');
});

//check for variables
module('variables and vendors array');
test('the vendors array is present + correct entries', function() {
  expect(2);
  deepEqual($.css3tabslider.vendors, ['Khtml','Ks','O','Moz','Webkit'], 'vendors array is correct');
  equal(typeof $.css3tabslider.css3transforms, 'boolean', 'testing for css3 capability returns boolean datatype');
});

test('check that the jquery easing object returns the correct equations', function() {
  //is this the right way to check these functions?
  
  equal($.easing['ease'](1,2,3,4,5), $.easing['ease-out'](1,2,3,4,5), 'ease-out is used as ease');
  equal($.easing['ease-out'](1,2,3,4,5), $.easing[$.easing.def](1,2,3,4,5), 'ease-out used as default');
  equal(jQuery.easing['ease-in'](1,2,3,4,5), 3.2560000000000002, 'ease-in returns correct function');
  equal($.easing['ease-out'](1,2,3,4,5), 6.136, 'ease-out returns correct function');
  equal($.easing['ease-in-out'](1,2,3,4,5), 4.024, 'ease-in-out returns the correct function');

});

module('plugin setup and css', {
  setup: function() {
    $('#panel_view').css3tabslider({
      'panel_width': 600,
      'speed': 0.5,
      'easing': 'ease-in'
    });
  }
});

test('css values set in dom', function() {
    equal($('#panel_view').css('width'), '600px', 'panel view width set');
    equal($('#panel_view').css('overflow'), 'hidden', 'overflow property set');
    
    equal($('#panel_container').css('width'), '1200px', 'panel container width set');
    
    $('.panel').each(function(element) {
      equal($(this).css('width'), '600px', 'panel widths set')
      equal($(this).css('float'), 'left', 'panel float set')
    })
  
});

module('check panel movement', {
  setup: function() {
    $('#panel_view').css3tabslider({
      'panel_width': 600,
      'speed': 0.5,
      'easing': 'ease-in'
    });
  }
});

if($.css3tabslider.css3transforms) {
  //browser supports css3 transforms
  test('check that clicks use css3 transform on left', function() {
    var element = $('#navigation ul').children('li')[1];
    $(element).trigger('click');

    //need to cover all possible browser vendors - change to case switch
    if($.browser.webkit) {
      stop();
      setTimeout(function() {
        equal($('.panel').css('-webkit-transform'), 'matrix(1, 0, 0, 1, -600, 0)', 'click event triggers transform');
        start();
      }, 1000);
    } else if($.browser.msie) {
      stop();
      setTimeout(function() {
        equal($('.panel').css('-ms-transform'), 'matrix(1, 0, 0, 1, -600, 0)', 'click event triggers transform');
        start();
      }, 1000);
    
    } else if($.browser.mozilla) {
      stop();
      setTimeout(function() {
        equal($('.panel').css('-moz-transform'), 'matrix(1, 0, 0, 1, -600px, 0px)', 'click event triggers transform');
        start();
      }, 1000);
    }  else if($.browser.opera) {
      stop();
      setTimeout(function() {
        equal($('.panel').css('-o-transform'), 'matrix(1, 0, 0, 1, -600, 0)', 'click event triggers transform');
        start();
      }, 1000);
    } else {
      stop();
      setTimeout(function() {
        equal($('.panel').css('transform'), 'matrix(1, 0, 0, 1, -600, 0)', 'click event triggers transform');
        start();
      }, 1000);
    }
  });
    
} else {
    //browser doesn't support css3 transforms using jquery animation
    test('check that jquery animation moves panels', function() {
      var element = $('#navigation ul li')[1];
      $(element).trigger('click');

      stop();
      setTimeout(function() {
        equal($('#panel_container').css('marginLeft'), '-600px', 'navigation click moves panel');
        start();
      }, 1000);
  });
  
}