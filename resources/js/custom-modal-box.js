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
			height : "250",
			width : "500",
      // position of the outer window
			top: "20%",
			left: "30%",
		},prop);

		return this.click(function(e){
      add_block_page();
    	add_popup_box();
    	add_styles();

	    $('.custom_modal_box').fadeIn();
		});

    function add_block_page(){
    	var block_page = $('<div class="custom_block_page"></div>');

    	$(block_page).appendTo('body');
    }

    function add_popup_box(){
      var $pop_up = $('<div class="custom_modal_box"></div>');
      var $close = $('<a href="#" class="custom_modal_close"></a>');
      var $inner = $('<div class="custom_inner_modal_box"></div>');

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
        $('.custom_block_page').fadeOut().remove();
        $(this).parent().fadeOut().remove();
    	});
    }

    function add_styles(){
      /*Block page overlay*/
    	var pageHeight = $(document).height();
    	var pageWidth = $(window).width();

    	$('.custom_block_page').css({
        'z-index':'10',
    		'position':'absolute',
    		'top':'0',
    		'left':'0',

    		'height':pageHeight,
    		'width':pageWidth,

        'background-color':'rgba(0,0,0,0.6)',
    	});

      $('.custom_modal_box').css({
        'display':'none',
        'z-index':'50',
    		'position':'absolute',
    		'left':options.left,
    		'top':options.top,

    		'height': options.height,
    		'width': options.width,

        'border':'1px solid #fff',
    		'box-shadow': '0px 2px 7px #292929',
    		'-moz-box-shadow': '0px 2px 7px #292929',
    		'-webkit-box-shadow': '0px 2px 7px #292929',
    		'border-radius':'10px',
    		'-moz-border-radius':'10px',
    		'-webkit-border-radius':'10px',

        // 'background': '#f2f2f2',
        'background': '#fff',
    	});

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

    	$('.custom_inner_modal_box').css({
    		'height':(options.height - 50) + 'px',
    		'width':(options.width - 50) + 'px',
    		'padding':'10px',
    		'margin':'15px',

        'border-radius':'10px',
    		'-moz-border-radius':'10px',
        '-webkit-border-radius':'10px',

        // 'background-color':'#fff',
        'background-color':'#F1E8E8',
    	});
    }

		return this;
	};

})(jQuery);
