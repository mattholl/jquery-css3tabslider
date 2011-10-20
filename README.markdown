##jQuery CSS3 Sliding Tabs

A jQuery plugin which use CSS3 2D transforms to slides tabbed panel horizontally. If CSS3 transforms aren't available jQuery DOM animation is used as a fallback.

###Basic markup

    <div id="panel_view">
      <div id="panel_container">
        <div class="panel">
          <!--panel content -->
        </div>
        <div class="panel">
          <!--panel content -->
        </div>
        <div class="panel">
          <!--panel content -->
        </div>
      </div>
      
      <div id="navigation">
        <ul>
          <li>One</li>
          <li>Two</li>
          <li>Three</li>
        </ul>
      </div>
    </div>


###Basic Syntax
    $('#panel_container').css3tabslider({options});

###Possible options
    panel_width: the width of each panel in pixels
    speed: the time taken to complete the movement of each panel in seconds
    easing: possible options are ease, ease-in, ease-out, ease-in-out
    
For example to create a sliding tabbed panel where each panel has a width of 500 pixels, the transition takes half a second to complete and the movement is eased using 'ease-in-out':

    $('#outermost_id').css3tabslider({
      panel_width: 500,
      speed: 0.5,
      easing: 'ease-in-out'
     });

[Live demo] (http://mattholl.com/jquery/css3tabslider)