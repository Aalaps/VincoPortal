function test(event) {
	"use strict";
    var fullHeight = function() {
        $('.js-fullheight').css('height', $(window).height());
        $(window).on(function(){
            $('.js-fullheight').css('height', $(window).height());
        });
    };
    fullHeight();
    // $('#sidebar').toggleClass('active');
    $('ul.components > li').removeClass('active');
    $(event.currentTarget).addClass('active');

}(jQuery);
