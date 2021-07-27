// JavaScript Document
var banner_main_ht,howitwork_main_ht,competition_main_ht,total_sec_ht;
$(window).ready(function(){	
	$('body').jpreLoader({
		splashID:"#jSplash",
		loaderVPos:'50%',
		autoClose:true,
		closeBtnText:"Let's Begin!",
		splashFunction:function(){ 
		}
	}, function() {//callback function
		$('header,footer,.section-main,.banner-main,.inner-banner-main,.innerpages-main,.shoppingcart-main').animate({'opacity':1});
		var swiper = new Swiper('.swiper-container', {
		effect: 'slide',	
		autoplay: {
			delay: 5000,
		},
		  pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		loop:true,	
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		  }
		});
		/*var slideshowContainer=new Swiper('.slideshow-container',{
				slidesPerView:1,
				preloadImages:true,
				spaceBetween:0,
				effect:'slide',
				loop:true,
					autoplay:{
					delay:4000,disableOnInteraction: false
				},
				speed:1000,
			 pagination: {
				el: '.slideshow-pagination',
				 clickable: true,
			  },
				navigation:{
				nextEl:'.slideshow-button-next',
				prevEl:'.slideshow-button-prev',
			}
		});*/ 
	});
});