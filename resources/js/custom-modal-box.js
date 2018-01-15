/**
 * from https://paulund.co.uk/how-to-create-a-simple-modal-box-with-jquery
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
      // position of the window
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
    		'position':'absolute',
    		'top':'0',
    		'left':'0',
    		'background-color':'rgba(0,0,0,0.6)',
    		'height':pageHeight,
    		'width':pageWidth,
    		'z-index':'10'
    	});

      $('.custom_modal_box').css({
    		'position':'absolute',
    		'left':options.left,
    		'top':options.top,
    		'display':'none',
    		'height': options.height + 'px',
    		'width': options.width + 'px',
    		'border':'1px solid #fff',
    		'box-shadow': '0px 2px 7px #292929',
    		'-moz-box-shadow': '0px 2px 7px #292929',
    		'-webkit-box-shadow': '0px 2px 7px #292929',
    		'border-radius':'10px',
    		'-moz-border-radius':'10px',
    		'-webkit-border-radius':'10px',
    		'background': '#f2f2f2',
    		'z-index':'50',
    	});

    	$('.custom_modal_close').css({
    		'position':'relative',
    		'top':'-25px',
    		'left':'20px',
    		'float':'right',
    		'display':'block',
    		'height':'50px',
    		'width':'50px',
    		'background': 'url(./resources/images/Actions-window-close-icon.png)',
        'background-size': 'contain',
        'background-repeat': 'no-repeat',
        // 'background' : '#ffffff',
    	});

    	$('.custom_inner_modal_box').css({
    		'background-color':'#fff',
    		'height':(options.height - 50) + 'px',
    		'width':(options.width - 50) + 'px',
    		'padding':'10px',
    		'margin':'15px',
    		'border-radius':'10px',
    		'-moz-border-radius':'10px',
        '-webkit-border-radius':'10px'
    	});
    }

		return this;
	};

})(jQuery);
