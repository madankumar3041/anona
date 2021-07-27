document.addEventListener("touchstart", function() {},false);  
$(function() {
	$('#wsnavtoggle').click(function () {
		$('.wsmenucontainer').toggleClass('wsoffcanvasopener');
	});
	$('.overlapblackbg').click(function () {
	  $('.wsmenucontainer').removeClass('wsoffcanvasopener');
	});

	$('.wsmenu-list> li').has('.wsmenu-submenu').find('> a').append('<span class="wsmenu-click"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');
	$('.wsmenu-list > li').has('.megamenu').prepend('<span class="wsmenu-click"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');
	$('.wsmenu-list > li > a').click(function(){
		if($(window).width() < 781){
			if(!$(this).find('span').hasClass('ws-activearrow')){
				$('.wsmenu-submenu').slideUp('slow');
				$('.ws-activearrow').removeClass('ws-activearrow');  
			}
		}
	});	
	$('.wsmenu-click').click(function(){
		if($(window).width() < 781){
			if(!$(this).hasClass('ws-activearrow')){
				$(this).parent('a').siblings('.wsmenu-submenu').slideDown('slow');
				$(this).addClass('ws-activearrow');
			}
			else{
				$(this).removeClass('ws-activearrow');
				$(this).parent('a').siblings('.wsmenu-submenu').slideUp('slow');
			}
		}	
		/*$(this).toggleClass('ws-activearrow')
		.parent().siblings().children().removeClass('ws-activearrow');
		$(".wsmenu-submenu, .megamenu").not($(this).parent('a').siblings('.wsmenu-submenu, .megamenu')).slideUp('slow');
		$(this).parent('a').siblings('.wsmenu-submenu').slideToggle('slow');
		$(this).parent('a').siblings('.megamenu').slideToggle('slow');	*/
	});
	
	$('.wsmenu-list > li > ul > li').has('.wsmenu-submenu-sub').prepend('<span class="wsmenu-click02"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');
	$('.wsmenu-list > li > ul > li > ul > li').has('.wsmenu-submenu-sub-sub').prepend('<span class="wsmenu-click02"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');

	$('.wsmenu-click02').click(function(){
		$(this).children('.wsmenu-arrow').toggleClass('wsmenu-rotate');
		$(this).siblings('.wsmenu-submenu-sub').slideToggle('slow');
		$(this).siblings('.wsmenu-submenu-sub-sub').slideToggle('slow');
	
	});

});