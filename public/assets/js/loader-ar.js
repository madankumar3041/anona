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
		wow.init();
		$('header,footer,.section-main,.banner-main,.inner-banner-main,.innerpages-main').animate({'opacity':1});
		var slideshowContainer=new Swiper('.slideshow-container',{
				slidesPerView:1,
				preloadImages:true,
				spaceBetween:0,
				effect:'slide',
				loop:true,
					autoplay:{
					delay:3000,disableOnInteraction: false
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
		});
		setTimeout(function(){
			$('.boucheron,.search-main,.account-navi,.favourite-div,.cart-div,.language-link,.navigation').addClass('animated');
			$('.boucheron,.search-main,.account-navi,.favourite-div,.cart-div,.language-link,.navigation').css({'visibility':'visible'});
			$('.boucheron,.navigation').css({'animation-name':'fadeInUp'});
			$('.search-main,.account-navi,.favourite-div,.cart-div,.language-link').css({'animation-name':'fadeInLeft'});
			if($(window).width() < 781){
				removeNaviAttr();
			}
		},10);
	});
});