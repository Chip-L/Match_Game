/**
 * from https://paulund.co.uk/how-to-create-a-simple-modal-box-with-jquery
 * The one on the site is not responsive. I had to make it responsive.
 * The only properties exposed right now are position, size, and content. Since site design is done more or less globaly, I figure it is fine to just modify colors directly here. I could add the colors to be modifiable too, but pretty soon, I'm adding the entire CSS. This is the problem with this template. This CAN still be overridden by the site's CSS.
 */
(function($){

	// Defining our jQuery plugin
	$.fn.custom_modal_box = function(prop){

		// Default parameters

		var options = $.extend({
      // content of the window (URL overrides title/description)
      title:"JQuery Modal Box Demo",
      description: "Example of how to create a modal box.",
      url: "",
      // size of the window
			height : "auto",
			width : "auto",
      // position of the outer window
			top: "20%",
			left: "10%",
		},prop);

		return this.click(function(e){
      add_block_page();
    	add_popup_box();
    	add_styles();

	    $('.custom_modal_box').fadeIn();
		});

    /*
      adds the dark background
    */
    function add_block_page(){
    	var block_page = $('<div class="custom_block_page"></div>');

    	$(block_page).appendTo('body');
    }

    /*
      adds the actual popup box
    */
    function add_popup_box(){
      var $pop_up = $('<div class="custom_modal_box"></div>');
      var $close = $('<a href="#" class="custom_modal_close"></a>');
      var $inner = $('<div class="custom_inner_modal_box"></div>');

      // Add the content - if url, load the page otherwise use the text
      if (options.url != "") {
        $inner.load(options.url);
      } else {
        $inner.append(
            '<h2>' + options.title + '</h2>' +
            '<p>' + options.description + '</p>'
        );
      }

      $pop_up.append($close).append($inner);

    	$pop_up.appendTo('.custom_block_page');

    	$('.custom_modal_close').click(function(){
        modal_close();
    	});

      $(window).resize( function() {
        add_styles();
      } );
    }

    /*
      this defines styles for everything in the modal
    */
    function add_styles(){
      /*Block page overlay*/
    	var pageHeight = $(document).height();
    	var pageWidth = $(window).width();
      var outerHeight = calculateMaxSize(options.top, pageHeight);
      var outerWidth = calculateMaxSize(options.left, pageWidth);


      // covers the background
    	$('.custom_block_page').css({
        'z-index':'10',
    		'position':'absolute',
    		'top':'0',
    		'left':'0',

    		'height':pageHeight,
    		'width':pageWidth,

        'background-color':'rgba(0,0,0,0.6)',
    	});

      // outer box
      $('.custom_modal_box').css({
        'display':'none',
        'z-index':'50',
    		'position':'absolute',
    		'left':options.left,
    		'top':options.top,

        'height': 'auto',
        'width': 'auto',
    		'max-height': outerHeight,
    		'max-width': outerWidth,

        'border':'1px solid rgba(0, 0, 0, 0.2)',
    		'box-shadow': '0px 2px 7px #292929',
    		'-moz-box-shadow': '0px 2px 7px #292929',
    		'-webkit-box-shadow': '0px 2px 7px #292929',
    		'border-radius':'10px',
    		'-moz-border-radius':'10px',
    		'-webkit-border-radius':'10px',

        // this color is based off of the background color in the inner at .5 opacity (opacity won't work here without using RGBA)
        'background': '#aba4a4',
    	});

      // close button (floats up and to the right)
    	$('.custom_modal_close').css({
        'display':'block',
    		'position':'relative',
        'float':'right',
    		'top':'-25px',
    		'left':'20px',

        'height':'50px',
    		'width':'50px',

        'background': 'url(./resources/images/Actions-window-close-icon.png)',
        'background-size': 'contain',
        'background-repeat': 'no-repeat',
    	});

      // inner box -
    	$('.custom_inner_modal_box').css({
    		'height': 'auto',
        'width': 'auto',
    		'max-height':(outerHeight - 50),
    		'max-width':(outerWidth - 50),
    		'padding':'10px',
    		'margin':'15px',

        'border-radius':'10px',
    		'-moz-border-radius':'10px',
        '-webkit-border-radius':'10px',

        // customize this for the site
        'background-color':'#F1E8E8',
    	});
    }

    /*
      separate close so that it can be accessed by other buttons/functions
    */
    function modal_close() {
      $('.custom_block_page').fadeOut().remove();
      $(this).parent().fadeOut().remove();
    };

    /*
      Calculates the maximum size allowed for the pop-up box based on the positioning (keeps it centered)

      Input:
        sizeVal = options.height/width (size desired of pop_up_box)
        positionVal = options.top/left (position of pop_up_box)
        pageVal = pageHeight/pageWidth (area covered by block_page)
      Return:
        calculated size in px as a numberic value (px is automatic by HTML)
    */
    function calculateMaxSize(positionVal, pageVal) {
      var pos = getValue(positionVal);

      var maxSize = 0;

      if(pos.unit == '%') { // equal percentage from each side
        maxSize = pageVal - (pageVal * (2 * pos.number / 100));
      } else { // still need to calculate
        pos.number = (pos.unit === 'px') ? pos.number : convertRemToPixels(pos.number);
        maxSize = pageVal - (2 * pos.number);
      }

      if((maxSize + 25) >= pageVal) {
          maxSize -= 25;
      }

      // error check
      try {
        if(maxSize <=0) throw 'maxSize = ' + maxSize;
      } catch (e) {
        console.log('fn calculateMaxSize:' + e);
      } finally {
        if(maxSize <=0) {
          maxSize = 10;
        }
      }

      return(maxSize);
    };

    function getValue(value) {
      var myRegEx = /[a-zA-Z]+$|%$/
      var unit = myRegEx.exec(value)[0];
    	var num = value.replace(unit, "");
    	return({number: num, unit: unit});
    };

    function convertRemToPixels(num) {
        return num * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

		return this;
	};

})(jQuery);
