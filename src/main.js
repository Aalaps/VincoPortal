function test() {
	"use strict";

	var fullHeight = function() {
		$('.js-fullheight').css('height', $(window).height());
		$(window).on(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();
	$('#sidebar').toggleClass('active');

// 	$('#sidebarCollapse').on('click', function () {
    
//   });

}(jQuery);
