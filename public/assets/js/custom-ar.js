wow = new WOW(
  {
	animateClass: 'animated',
	offset:       100,
	callback:     function(box) {
	  console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
	}
  }
);
var removeEvt,slideshow_img_wd,slideshow_img_ht,banner_img,popup_link,popup_link_base,leftShape,quick_link,quick_link_base,quick_view_wd,quick_view_ht,quick_view_top,quick_view_left,cart,imgtodrag,top_position_cart,imgclone;
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
	$('.favourite-link').click(function(){		
		if(! $(this).hasClass('active')){
			$(this).addClass('active');
			$('.favourite-sub').animate({'height':favourite_contents_ht+'px'});
		}
		else{
			$('.favourite-link').removeClass('active')
			$('.favourite-sub').animate({'height':'1px'});
		}
	});
	$('.fave-clise-btn').click(function(){		
		$('.favourite-link').removeClass('active')
		$('.favourite-sub').animate({'height':'1px'});
	});
	$('.cart-link').click(function(){
		if(! $(this).hasClass('active')){
			$(this).addClass('active')
			$('.shoppingcart-main').addClass('opened');
		}
		else{
			$('.cart-link').removeClass('active')
			$('.shoppingcart-main').removeClass('opened');
		}
	});
	$('.remove-link').click(function(){
		removeEvt=$(this);
		$(this).parents('.collection-column').addClass('remove-item');
		$(this).parents('.collection-column').find('.popular-thumb').css('transform', 'scale(0)');
		$(this).parents('.collection-column').css({'margin-top':(favourite_contents_ht/3)});
		setTimeout(function(){
			removeEvt.parents('.collection-column').remove();
		},1000);
	});
	$('.foot-logo').click(function(){
		goToByScroll('main');
	});	
	$(".scrollbar").mCustomScrollbar();
	$(".horizontalScrollbar").mCustomScrollbar({
		axis:"x",
		autoExpandScrollbar:true,
		advanced:{autoExpandHorizontalScroll:true}
	});
	$('.addtocart').on('click', function () {
		$('.cart-link').trigger('click');
        cart = $('.shoppingcart-main');
		top_position_cart=cart.height()/3;
        imgtodrag = $(this).parents('.popular-thumb').find(".popular-img img").eq(0);
        if (imgtodrag) {
            imgclone = imgtodrag.clone()
                .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            }).css({
                'opacity':'1',	
				'position':'absolute',
				'width':imgtodrag.width(),
				'z-index':'999'
            })
			.appendTo($('body'))
			.animate({
                'top':cart.offset().top+top_position_cart,
				'left':0,
				'width':cart.width()
            }, 1000 );
            imgclone.animate({
                'opacity':0
            },function(){
                $(this).detach();
				setTimeout(function(){
					$('.cart-link').trigger('click');
				},10)
            });
        }
    });
	$('.product-page-detail .qv-addtocart').on('click', function () {
		$('.cart-link').trigger('click');
        cart = $('.shoppingcart-main');
		top_position_cart=cart.height()/3;
        imgtodrag = $('.producy-detail-right').find(".pro-holder img").eq(0);
        if (imgtodrag) {
            imgclone = imgtodrag.clone()
                .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            }).css({
                'opacity':'1',	
				'position':'absolute',
				'width':imgtodrag.width(),
				'z-index':'999'
            })
			.appendTo($('body'))
			.animate({
                'top':cart.offset().top+top_position_cart,
				'left':0,
				'width':cart.width()
            }, 1000 );
            imgclone.animate({
                'opacity':0
            },function(){
                $(this).detach();
				setTimeout(function(){
					$('.cart-link').trigger('click');
				},10)
            });
        }
    });
	$('.like-link,.fav-detail-btn').on('click', function () {
		cart = $('.favourite-list');
		$('.favourite-link').trigger('click');
		top_position_cart=favourite_contents_ht;
		if($(this).hasClass('like-link')){
		   imgtodrag = $(this).parents('.popular-thumb').find(".popular-img img").eq(0);
		}
		else{
			imgtodrag = $('.product-page-detail').find(".pro-holder img").eq(0);	
		}
        if (imgtodrag) {
            imgclone = imgtodrag.clone()
                .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            }).css({
                'opacity':'1',	
				'position':'absolute',
				'width':imgtodrag.width(),
				'z-index':'999'
            })
			.appendTo($('body'))
			.animate({
                'top':cart.offset().top,
				'left':win_width-(cart.width()/1.63),
				'width':favourite_contents_ht/1.8
            }, 1000 );
            imgclone.animate({
                'opacity':0
            },function(){
                $(this).detach();
				setTimeout(function(){
					$('.favourite-link').trigger('click');
				},10)
            });
        }
    });
	
	$('.forgot-link').click(function(){
		$('.forgot-main').slideToggle();
	});
	$('select').change(function () {
		if($(this).val() == "0") $(this).addClass("empty");
		else $(this).removeClass("empty")
	});
	$('select').change();
	$('.search-link').on('click',function(){
		popup_link=$(this);
		popup_link.addClass('active');
		popup_link_base=$(this);
		$('.shape-popup-wrapper')
		.offset({top:$(popup_link_base).offset().top,left:$(popup_link_base).offset().left})
		.css({'width':$(popup_link_base).innerWidth(),'height':$(popup_link_base).innerHeight()}).animate({'opacity':1},125);
		setTimeout(function(){
			//var centerbase=$('.center-base');
			$('.shape-popup-wrapper').addClass('easing2');
			if(win_width > win_height){
				leftShape=win_width*1.2;
				$('.shape-popup-wrapper').animate({top:-(leftShape-win_height)/2,left:-(leftShape-win_width)/2,width:leftShape,height:leftShape});
			}
			else{
				leftShape=win_height*1.2;
				$('.shape-popup-wrapper').animate({top:-(leftShape-win_height)/2,left:-(leftShape-win_width)/2,width:leftShape,height:leftShape});
			}
			setTimeout(function(){
				$('.shape-popup-wrapper').addClass('easing');
			},300);
		},100);
		searchPopup();
	});
	$('.quick-view-link').on('click',function(){
		quick_link=$(this);
		quick_link.addClass('active');
		quick_link_base=$(this).parents('.popular-thumb');
		$('.shape-quick-wrapper')
		.offset({top:$(quick_link_base).offset().top,left:$(quick_link_base).offset().left})
		.css({'width':$(quick_link_base).innerWidth(),'height':$(quick_link_base).innerHeight()}).animate({'opacity':1},125);
		setTimeout(function(){
			$('.shape-quick-wrapper').addClass('easing2');
			var left_pos=win_width/2;
			var top_pos=win_height/2;
			$('.shape-quick-wrapper').animate({top:top_pos/2,left:(left_pos/2)+10,width:left_pos,height:top_pos});
			setTimeout(function(){
				$('.shape-quick-wrapper').addClass('easing');
			},300);
		},100);
		quickPopup();
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
	addRemoveStyle();
});
function searchPopup(){
	'use strict';
	setTimeout(function(){
		$.fancybox.open({			
			src:$(popup_link).attr('data-src'),
			type:'inline',
			autoFocus: false,
			opts:{beforeShow:function(){
				$('.fancybox-container').addClass('no-bg');
			},afterShow:function(){				
				/*quick_view_wd=$('.quick-view-main').innerWidth()+50;
				quick_view_ht=$('.quick-view-main').innerHeight()+50;
				quick_view_top=(win_height-quick_view_ht)/2;
				quick_view_left=(win_width-quick_view_wd)/2;
				$('.shape-popup-wrapper').animate({'height':quick_view_ht,'top':quick_view_top,'width':quick_view_wd,'left':quick_view_left+9});*/
			},
			afterClose:function(){
				if(win_width > 781){
				$('.shape-popup-wrapper')
		.offset({top:$(popup_link_base).offset().top,left:$(popup_link_base).offset().left-10})
		.css({'width':$(popup_link_base).innerWidth(),'height':$(popup_link_base).innerHeight()}).animate({'opacity':1},125);
				}
				else{
					$('.shape-popup-wrapper')
		.offset({top:$(popup_link_base).offset().top,left:$(popup_link_base).offset().left})
		.css({'width':$(popup_link_base).innerWidth(),'height':$(popup_link_base).innerHeight()}).animate({'opacity':1},125);
				}
				$('.shape-popup-wrapper').removeClass('easing2');
				setTimeout(function(){
					$('.shape-popup-wrapper').removeClass('easing');
					$('.shape-popup-wrapper').animate({opacity:0});
					setTimeout(function(){
						$('.shape-popup-wrapper').removeAttr('style');
						$('.search-link').removeClass('active');
					},300);					
				},500);
			}
		}
		});
	},1000);
}
function quickPopup(){
	'use strict';
	setTimeout(function(){
		$.fancybox.open({			
			src:$(quick_link).attr('data-src'),
			type:'ajax',
			autoFocus: false,
			backFocus : false,
			opts:{beforeShow:function(){
				$('.fancybox-container').addClass('quickview-no-bg');
			},afterShow:function(){
				quick_view_wd=$('.product-detail').innerWidth()+50;
				quick_view_ht=$('.product-detail').innerHeight()+50;
				quick_view_top=(win_height-quick_view_ht)/2;
				quick_view_left=(win_width-quick_view_wd)/2;
				$('.shape-quick-wrapper').animate({'height':quick_view_ht,'top':quick_view_top,'width':quick_view_wd,'left':quick_view_left+9,opacity:0.9});
			},
			afterClose:function(){
				$('.shape-quick-wrapper')
		.offset({top:$(quick_link_base).offset().top,left:$(quick_link_base).offset().left-10})
		.css({'width':$(quick_link_base).innerWidth(),'height':$(quick_link_base).innerHeight()}).animate({'opacity':1},125);
				$('.shape-quick-wrapper').removeClass('easing2');
				setTimeout(function(){
					$('.shape-quick-wrapper').removeClass('easing');
					$('.shape-quick-wrapper').animate({opacity:0});
					setTimeout(function(){
						$('.shape-quick-wrapper').removeAttr('style');
					},300);	
				},500);
			}
		}
		});
	},700);
}
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
	$('.slideshow-container,.slideshow-container .swiper-slide .slideshow-img').css({'height':banner_ht});
	$('.guest-icon').css({'height':$('.guest-icon').width()});
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
	});
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
	
	
	var shopping_head=$('.shoppingcart-main').find('h4').innerHeight();
	var viewcart_checkout_btns=$('.shoppingcart-main').find('.viewcart-checkout-btns').innerHeight();
	$('.shoppingcart-sub').css({'height':win_height - (shopping_head+viewcart_checkout_btns)+'px'});
	faviourit();
	favourite_contents_ht=$('.favourite-contents').height();
	
	/*product_thumb_wd=$('.product-thumb').width()/1.45;
	$('head').append('<style type="text/css">.product-thumb .product-img{height:'+product_thumb_wd+'px}</style>');
	news_thumb_wd = $('.news-thumb .news-img').width()/1.47;
	$('head').append('<style type="text/css">.news-thumb .news-img{height:'+news_thumb_wd+'px}</style>');*/
}
var like_column_width;
function faviourit(){	
	if(win_width < 575){
		like_column_width=win_width/2;
	}
	else if(win_width < 781 && win_width > 575){
		like_column_width=win_width/3;
	}
	else{
		like_column_width=win_width/4;
	}
	//var fav_clomn_wd=$('.favourite-list').find('.collection-column').width();
	//var fav_clomn_wd=$('.favourite-list').find('.collection-column .popular-thumb').width();
	var fav_vlomn_length=$('.favourite-list').find('.collection-column').length;
	//$('.favourite-list').find('.mCSB_container').css({'width':fav_tots_wd});
	var fav_tots_wd = like_column_width * fav_vlomn_length;
	/*if(fav_tots_wd > win_width){
		$('.favourite-list').css({'width':fav_tots_wd+'px'});
		$('head').append('<style type="text/css">.collection-column.col-lg-3{-webkit-box-flex:0;-ms-flex: 0 0 '+like_column_width+'px;flex: 0 0 '+like_column_width+'px;max-width:'+like_column_width+'px}</style>');
	}
	else{
		$('.favourite-list').css({'width':'auto'});
	}*/
	
	 $('head').append('<style type="text/css">.favourite-list .mCSB_container{width:'+fav_tots_wd+'px!important}.favourite-list .collection-column.col-lg-3{-webkit-box-flex:0;-ms-flex: 0 0 '+like_column_width+'px;flex: 0 0 '+like_column_width+'px;max-width:'+like_column_width+'px}}</style>');
	$('.favourite-list .mCSB_container').css({'left':'0'});
	
	//console.log('like_column_width: '+like_column_width+'  fav_vlomn_length: '+fav_vlomn_length+'  fav_tots_wd: '+fav_tots_wd);
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
	var fav1 = $('.favourite-main');
	var fav2 = $('.favourite-link');
	if (!fav1.is(e.target) && fav1.has(e.target).length === 0) 
	{
		if (!fav2.is(e.target) && fav2.has(e.target).length === 0) 
		{
			$('.favourite-sub').animate({'height':'1px'});
			$('.favourite-link').removeClass('active')
		}
	}
	var cart1 = $('.shoppingcart-main');
	var cart2 = $('.cart-link');
	var cart3 = $('.fancybox-container');
	if (!cart1.is(e.target) && cart1.has(e.target).length === 0) 
	{
		if (!cart2.is(e.target) && cart2.has(e.target).length === 0) 
		{
			if(!cart3.is(e.target) && cart3.has(e.target).length == 0)
			{
				$('.shoppingcart-main').removeClass('opened');
				$('.cart-link').removeClass('active')
			}		
		}
	}
});
function removeNaviAttr(){
	setTimeout(function(){
		$('.navigation').removeClass('fadeInUp');
		$('.navigation').removeClass('wow');
		$('.navigation').removeClass('animated');
		$('.navigation').removeAttr('style');
		$('.wsmain').css({'height':win_height});
		setTimeout(function(){
			$('.animated-arrow').css({'opacity':1});
		},1000);	
	},500);
}
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