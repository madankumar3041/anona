var removeEvt,slideshow_img_wd,slideshow_img_ht,banner_img,popup_link,popup_link_base,menu_evt,menu_evt_base,leftShape,quick_link,quick_link_base,quick_view_wd,quick_view_ht,quick_view_top,quick_view_left,cart,imgtodrag,top_position_cart,imgclone;
var favourite_contents_ht=$('.favourite-contents').height();
$(document).ready(function(){
	"use strict";
	/*$('.search-link').click(function(){
		$(this).toggleClass('active');
		$('.search-sub').fadeToggle();
	});*/
	$('.account-link').click(function(){
		if($(this).hasClass('active')){
			$('.account-ul').removeClass('showul');
			setTimeout(function(){
				$('.account-div').removeClass('opened');
			},100);
			$(this).removeClass('active')
		}
		else{
			$('.account-div').addClass('opened');
			setTimeout(function(){
				$('.account-ul').addClass('showul');
			},100);
			$(this).addClass('active')
		}
	});
	
	/*$('.cart-link').click(function(){
		if(! $(this).hasClass('active')){
			$('.cart-link').addClass('active')
			$('.shoppingcart-main').addClass('opened');
		}
		else{
			$('.cart-link').removeClass('active')
			$('.shoppingcart-main').removeClass('opened');
		}
	});*/
	
	$(".scrollbar").mCustomScrollbar();
	$(".horizontalScrollbar").mCustomScrollbar({
		axis:"x",
		autoExpandScrollbar:true,
		advanced:{autoExpandHorizontalScroll:true}
	});
	 
	
	$('.forgot-link').click(function(){
		$('.forgot-main').slideToggle();
	});
	$('.tabs li a').click(function(){
		var this_evt=$(this);
		if(!this_evt.hasClass('active')){
			$('.tabs li a').removeClass('active');
			var tab_rel=this_evt.attr('rel');
			if(tab_rel == "week1"){
				this_evt.addClass('active');
				$('.weekone').slideDown();
				$('.weektwo').slideUp();
				swiperweek1.update();
			}
			else if(tab_rel == "week2"){
				this_evt.addClass('active');
				$('.weektwo').slideDown();
				$('.weekone').slideUp();
				swiperweek2.update();
			}
			else{
				
			}
		}
	});
	
	$('select').change(function () {
		if($(this).val() == "0") $(this).addClass("empty");
		else $(this).removeClass("empty")
	});
	$('select').change();
	var food_val='dish-breakfast';
	$('.allfood li input[name="food"]').change(function () {
		if($(this).is(":checked")){
			$('.'+food_val).slideUp();
			food_val = $(this).val();
			$('.'+food_val).slideDown();
		}
		else{
			
		}
	});
	/*var data_pack=1;
	$('.food-div ul li a').click(function(){
		if(!$(this).hasClass('active')){
			$('.food-div ul li a').removeClass('active');
			$('#pack'+data_pack).slideUp();
			data_pack=$(this).attr('data-pack');
			$('#pack'+data_pack).slideDown();
			$(this).addClass('active');
			swiperweek.update();
		}
		else{}
	});*/
	var rel=1;
	$('.choose-dish-tabs .swiper-slide a').click(function(){
		rel=$(this).attr('rel');
		if(rel=='1'){
			$('#ids2').slideUp();
			$('#ids1').slideDown();
			$('.choose-dish-tabs .swiper-slide a').removeClass('active');
			$(this).addClass('active');
		}
		else if(rel=='2'){
			$('#ids1').slideUp();
			$('#ids2').slideDown();
			$('.choose-dish-tabs .swiper-slide a').removeClass('active');
			$(this).addClass('active');
		}
		else{}
	});	 
		
		
	$('.change-btn').click(function () {
        $(this).parents('.myprofile-main').find('.profiledata').slideUp();
        $(this).parents('.myprofile-main').find('.profileform').slideDown();
    });
    $('.closebutton').click(function () {
        $(this).parents('.myprofile-main').find('.profiledata').slideDown();
        $(this).parents('.myprofile-main').find('.profileform').slideUp();
    });
	$('.order-crumb').click(function(){
		$(this).parents('.order-history-main').find('.history-item-main').slideToggle();
		$(this).toggleClass('active');
	});
	
	$('.faq-link').click(function(){
		$(this).toggleClass('active');
		$(this).next('.faq-contents').slideToggle();
	})
	addRemoveStyle();
});
 
 
var ht,amount;
$(window).scroll(function(){
	 "use strict";
	if ($(this).scrollTop() > 100){
		$('header').addClass('small-header');
	} else {		   
		$('header').removeClass('small-header');
	}
});
var win_width,win_height,header_ht,banner_ht;
function addRemoveStyle(){
	"use strict";
	win_width=$(window).width();
	win_height=$(window).height();
	header_ht=$('header').innerHeight();
	banner_ht=win_height-header_ht;
	//$('.slideshow-container,.slideshow-container .swiper-slide .slideshow-img').css({'height':win_height});
	/*$('.guest-icon').css({'height':$('.guest-icon').width()});
	$('.slideshow-container .swiper-slide').each(function(){
		banner_img=$(this).find('.slideshow-img img');
		slideshow_img_wd=banner_img.width();
		slideshow_img_ht=banner_img.height();
		banner_img.css({'width':win_width});
		banner_img.css({'height':'auto'});
		slideshow_img_wd=banner_img.width();
		slideshow_img_ht=banner_img.height();		
		if(slideshow_img_ht < win_height){
			banner_img.css({'width':'auto'});
			banner_img.css({'height':win_height});
			slideshow_img_wd=banner_img.width();
			slideshow_img_ht=banner_img.height();
			if(slideshow_img_wd < win_width){
				banner_img.css({'height':'auto'});
				banner_img.css({'width':win_width});
			}
		}
	});*/
	$('.news-div,.news-thumb').css({'height':$('.news-thumb').width()});
	$('.news-div span').css({'height':$('.news-thumb').width()/2});
	$('.savoir-faire-column').css({'min-height':win_height});
	/*banner_ht=$('.banner-main').innerHeight();
	if(win_width < 781){
		removeNaviAttr();		
	}
	else{
		banner_ht=win_height-header_ht;
		$('.slideshow-img').css({'height':banner_ht});
	}*/
	/*if(win_width < 781){
		$('.slideshow-container,.slideshow-container .swiper-slide .slideshow-img').css({'height':'auto'});
	}
	else{
		$('.slideshow-container,.slideshow-container .swiper-slide .slideshow-img').css({'height':win_height});
	}*/
} 
$(document).mouseup(function(e)
{
	"use strict";
	/*var search1 = $('.search-sub');
	var search2 = $('.search-link');
	if (!search1.is(e.target) && search1.has(e.target).length === 0) 
	{
		if (!search2.is(e.target) && search2.has(e.target).length === 0) 
		{			
			$('.search-sub').fadeOut();
			$('.search-link').removeClass('active');
		}
	}*/
	var account1 = $('.account-div');
	var account2 = $('.account-link');
	if (!account1.is(e.target) && account1.has(e.target).length === 0) 
	{
		if (!account2.is(e.target) && account2.has(e.target).length === 0) 
		{
			$('.account-ul').removeClass('showul');
			setTimeout(function(){
				$('.account-div').removeClass('opened');
			},100);
			$('.account-link').removeClass('active')
		}
	}
	 
}); 
function goToByScroll(ids){
	"use strict";
	$('html,body').animate({scrollTop: $("#"+ids).offset().top-75},1000);
}
$(window).load(function() {
	"use strict";	
	addRemoveStyle();
	///$(".catogories-scroll").mCustomScrollbar("scrollTo","0px");
});
$(window).resize(function() {
	"use strict";
	setTimeout(function(){
		addRemoveStyle();
	},100)
	
});