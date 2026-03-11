$(document).ready(function(){
	initOpenerMainNav();
	initPosAnimate();
	initVideoPlay();
	initProductEvent();
	initInput();
	initValForm();
	initMedia();
	initAboutAnchors();
	initLanding();
	initSelect();

	if (device.mobile() || device.tablet()) {
		$('.video-list, .product-list').remove();
		$(window).on("orientationchange", function() {
			$('.header-panel').addClass('absolute');
			setTimeout(function(){
				$('.header-panel').removeClass('absolute');
			},300);
		});
	}else{
		initProductSlider();
	}


		if($('.product-gallery').length){
			var swiperItemLangth = $('.product-gallery .swiper-slide').length;
			var swiperI;
			var _slidesPerView = 4;
			var wB = 34;
			var wM = 22;
			var wD = 25;
			if(swiperItemLangth<4){
				_slidesPerView = swiperItemLangth;
				if(swiperItemLangth == 3){
					wB = 40;
					wM = 30;
					wD = 33.33;
				}
				if(swiperItemLangth == 2){
					wB = 60;
					wM = 40;
					wD = 50;
				}
				$('.product-gallery .swiper-button').addClass('disabled');
			}else{
				if(swiperItemLangth == 4){
					$('.product-gallery .swiper-button').addClass('disabled');
				}
			}
			$('.product-gallery').attr('data-visual',_slidesPerView);
		}
	
	function initSelect(){
		var $st = $(".select");
		if($st.length){
			$st.each(function(){
				var _th = $(this);
				_th.dropdown({
					cover: true,
					label: _th.data('placeholder'),
				});
			});
		}
	}
	function initLanding(){
		if($('.landing-wrapper').length){
			var itemWrap = '.landing-wrapper';
			var item = '[data-animate]';
			var d = 1-$('.landing-block3').data('delta');
			initScroll();
			$(itemWrap).scroll(function(){
				initScroll();
			});
			function initScroll(){
				$(item).each(function(){
					$('.landing-holder').height( $('.landing-fixed').height() - ($('.landing-fixed').height() - $(window).height()+80)*d);
					var self = $(this);
					var speed = self.data('speed');
					var delta = self.data('delta');
					var pos = $(itemWrap).scrollTop() / delta;
					var time = 100;
					self.css({
					    'transform':'translate3d(0px, -' + pos + 'px,0) ',
					    'transition-duration':time/speed+'ms'
				    });
				    self.find('.landing-block2-inner').css({
					    'transform':'translate3d(0px, ' + pos/50 + 'px,0) ',
					    'transition-duration':time/speed+'ms'
				    });
				});
			}
		}
	}
	function initMedia(){
		if($('.fancybox-media').length){
			$('.fancybox-media').fancybox({
				openEffect  : 'none',
				closeEffect : 'none',
				helpers : {
					media : {}
				}
			});
		}
	}
	function initAboutAnchors(){
		if($('.about-wrapper').length){
			var posItem = [];
			var scrollPos = 0;
			$('.about-nav li').eq(0).addClass('active');
			initPositionMbItem();
			initMbBg();
			$(window).resize(function(){
				initPositionMbItem();
				initMbBg();
			});
			$('.inner-scroll').scroll(function(){
				initMbBg();
			});
			function initMbBg(){
				if($(window).width()>999){
					scrollPos = $('.inner-scroll').scrollTop();
					for(var i=0; i<posItem.length; i++){
						if((scrollPos>=posItem[i] && scrollPos<posItem[i+1]) || (scrollPos+$(window).height()>=$('.inner-scroll-wrap').outerHeight()) || (scrollPos>=posItem[i] && scrollPos<=posItem[i]+$(window).height())){
							$('.about-nav li').removeClass('active').eq(i).addClass('active');
						}
					}
				}
			}
			function initPositionMbItem(){
				if($(window).width()>999){
					posItem = [];
					$('.about-sections').each(function(){
						posItem.push(scrollPos+$(this).offset().top);
					});
				}
			}
			$('.about-nav a').click(function(){
				var _href = $(this).attr('href');
				$('.inner-scroll').animate({
					'scrollTop':scrollPos+$(_href).offset().top+5
				},600);
				return false;
			});
		}
	}
	function initInput() {
		if ($(".tel-input").length) $(".tel-input").mask("+380 (99) 999-99-99", {
			placeholder: "_"
		});
		if($('input[type=file]').length){
			$('input[type=file]').customFile();
		}
	}
	function initValForm(){
		$('.contact-form').each(function(){
	      var form=$(this),
	      	input=form.find('input');
			 form.find('.phone').blur(function(){
	            var val=$(this).val();
	             if((/^[0-9\s-\(\)\+]{18,20}$/ig).test(val)){
	                $(this).removeClass('error');
	            }
	            else{
	                $(this).addClass('error');
					$(this).val('');
	            }
	        });
	        form.on('keyup keydown', '.phone.error', function(){
	            var val=$(this).val();
	            if((/^[0-9\s-\(\)\+]{18,20}$/ig).test(val)){
	                $(this).removeClass('error');
	            }
	            else{
	                $(this).addClass('error');
	            }
	        });
	      form.find('.email').blur(function(){
	          var val=$(this).val();
	          if((/^[-\._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/ig).test(val) && val.length<=30){
	              $(this).removeClass('error');
	          }
	          else{
	              $(this).addClass('error');
				  $(this).val('');
	          }
	      });
	      form.on('keyup keydown', '.email.error', function(){
	          var val=$(this).val();
	          if((/^[-\._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/ig).test(val) && val.length<=30){
	              $(this).removeClass('error');
	          }
	          else{
	              $(this).addClass('error');
	          }
	      });
	      form.submit(function(e){
	        var _this = $(this);
	      	if(grecaptcha.getResponse().length !== 0){
	  		   form.find('.g-recaptcha').removeClass('error');
	  		   $('.captch-info').hide();
	  		} else {
	  			$('.captch-info').show();
	  			form.find('.g-recaptcha').addClass('error');
	  		}
	          input.trigger('blur');
	          if(form.find('.error').length > 0){
				//alert('error');
				return false;
			} else {
				var values = new FormData(_this.get(0));
				$.ajax({
					url: form.attr('action'),
					type: "post",
			        contentType: false,
			        processData: false,
					data: values,
					success: function(){
						// успех
						window.location.replace("http://kmw.com.ua/feedbacksent");
					},
					error:function(){
						// ошибка
						console.log('ошибка')
					}
				});
				return false;
			}
	      });
	  });
	}
	function initProductSlider(){

		var productWrap = '.swiper-product';
		var productWrapItem = productWrap+' .slide-wrap';
		var productPagination = '.product-pagination';
		var productLength=[];
		var productBg = productWrap+' .bg';
		var flasResize = true;
		var swiperM;
		if($(productWrap).length){
			$(productPagination+'>*').each(function(){
				productLength.push($(this).html());
			});
			var _set = {
				pagination: productPagination,
				direction: 'vertical',
				slidesPerView: 1,
				paginationClickable: true,
				spaceBetween: 432,
				mousewheelControl: true,
				simulateTouch: true,
				speed:1000,
				observer:true,
				//loop:true,
				onInit:function(swiper){
		       		$(productPagination+'>*').each(function(i){
		       			$(this).append(productLength[i]);
		       		});
		       		$(productBg).eq(swiper.realIndex).addClass('active');
		       		$(productWrapItem).eq(swiper.realIndex).addClass('text-visible');
		       		swiper.update(true);
		        },
		        onPaginationRendered:function(swiper, paginationContainer){
		       		$(productPagination+'>*').each(function(i){
		       			$(this).append(productLength[i]);
		       		});
		        },
		        onSlideChangeStart:function(swiper){
					$(productWrapItem).removeClass('text-visible');
		        },
		        onTransitionEnd:function(swiper){

		        	$(productWrapItem).eq(swiper.realIndex).addClass('text-visible');
					$(productBg).removeClass('active').eq(swiper.realIndex).addClass('active');
					$('.slide-wrap .bg-img-wrap.visible').each(function(){
						var _defaultimg = $(this).find('img').data('defaultimg');
						$(this).removeClass('visible').find('img').attr('src',_defaultimg);
					});
					$('.product-assortment-list').slideUp(0);
					$('.open-assortment').removeClass('open-assortment');
		        },
		        onAfterResize:function(swiper){
		        	if(($(window).width()<=999 && !flasResize) || ($(window).height()<=480 && !flasResize)){
		        		flasResize = true;
		        		swiperM.destroy(true, true);
		        	}
		        }
			}
			
			if($(window).width()>999 && $(window).height()>480 && flasResize){
				flasResize = false;
				swiperM = new Swiper(productWrap, _set);
			}else{
				flasResize = true;
			}
			$(window).resize(function(){
				if($(window).width()>999 && $(window).height()>480 && flasResize){
					flasResize = false;
					$(productWrap).scrollTop(0);
					setTimeout(function(){
						swiperM = new Swiper(productWrap, _set);
					},10);
				}
				if((window.innerWidth()<=999 && !flasResize) || ($(window).height()<=480 && !flasResize)){
					flasResize = true;
					swiperM.destroy(true, true);

				}
			});
		}
		var scrollFlag = false;
		// $('.product-wrap').each(function(){
		// 	$(this).swiper({
		// 		direction: 'vertical',
		// 		slidesPerView: 'auto',
		// 		mousewheelControl: true,
		// 		simulateTouch: false,
		// 		freeMode: true,
		// 		onScroll:function(swiper, e){
		//         	if(e.wheelDelta<0){
		//         		scrollFlag = false;
		//         	}else{
		//         		scrollFlag = true;
		//         	}
		//         },
		//         onSetTranslate:function(swiper, translate){
		//         	if(scrollFlag){
		//         		if(swiper.isBeginning && translate>=0 && $(window).width()>999 && $(window).height()>480){
		// 	        		swiperM.enableMousewheelControl();
		// 	        	}
		//         	}else{
		//         		if(swiper.isEnd && translate<0 && $(window).width()>999 && $(window).height()>480){
		// 	        		swiperM.enableMousewheelControl();
		// 	        	}
		//         	}
		//         	if(!swiper.isBeginning && !swiper.isEnd && $(window).width()>999 && $(window).height()>480){
		//         		swiperM.disableMousewheelControl();
		//         	}
		//         }
		// 	});
		// });
		var productGallery = '.product-gallery';
		if($(productGallery).length){
			
			var _set = {
				//slidesPerView: _slidesPerView,
				slidesPerView: 'auto',
				spaceBetween: 0,
				mousewheelControl: false,
				simulateTouch: true,
				speed:600,
				watchSlidesVisibility: true,
				nextButton: $(productGallery+' .swiper-button-next'),
				prevButton: $(productGallery+' .swiper-button-prev'),
				onInit:function(swiper){
		       		$(productGallery).scrollTop(0);
		        },
		        onPaginationRendered:function(swiper, paginationContainer){
		       		
		        },
		        onSlideChangeStart:function(swiper){
					
		        },
		        onSlideChangeEnd:function(swiper){
		        	
		        },
		        onAfterResize:function(swiper){
		        	if(($(window).width()<=999 && !flasResize) || ($(window).height()<=480 && !flasResize)){
		        		flasResize = true;
		        		swiperI.destroy(true, true);
		        	}
		        }
			}
			if($(window).width()>999 && $(window).height()>480 && flasResize){
				flasResize = false;
				swiperI = new Swiper(productGallery, _set);
			}else{
				flasResize = true;
			}
			$(window).resize(function(){
				if($(window).width()>999 && $(window).height()>480 && flasResize){
					flasResize = false;
					$(productGallery).scrollTop(0);
					setTimeout(function(){
						swiperI = new Swiper(productGallery, _set);
					},10);
				}
				if(($(window).width()<=999 && !flasResize) || ($(window).height()<=480 && !flasResize)){
					flasResize = true;
					swiperI.destroy(true, true);

				}
			});
			var __set;
			if($(window).width()>999 && $(window).height()>480){
				$(productGallery+' .swiper-slide').mouseenter(function(){
					var self = $(this);
					__set = setTimeout(function(){
						self.animate({
							'width': wB+'%'
						},300);
						$('.swiper-slide-visible').not(self).animate({
							'width': wM+'%'
						},300);
					},100);
				}).mouseleave(function(){
					clearTimeout(__set);
				});
				$(productGallery+' .swiper-button').mouseenter(function(){
					$('.swiper-slide-visible').animate({
						'width': wD+'%'
					},300);
				});
				$(productGallery).mouseleave(function(){
					$('.swiper-slide-visible').animate({
						'width': wD+'%'
					},300);
				});
			}
		}
	}
	function initProductEvent(){
		$('.slide-wrap').find('.bg-img-wrap img').each(function(){
			$(this).attr('data-defaultimg',$(this).attr('src'));
		});
		$('.opener-assortment').click(function(){
			if($(this).parent().hasClass('open-assortment')){
				$(this).parent().removeClass('open-assortment');
				$(this).parent().find('.product-assortment-list').slideUp(300);
				var _defaultimg = $(this).closest('.slide-wrap').find('.bg-img-wrap').find('img').data('defaultimg');
				$(this).closest('.slide-wrap').find('.bg-img-wrap').removeClass('visible').find('img').attr('src',_defaultimg);
			}else{
				$(this).parent().addClass('open-assortment');
				$(this).parent().find('.product-assortment-list').slideDown(300);
			}
		});
		$('.product-assortment-item').click(function(){
			var src = $(this).data('img');
			$(this).parent().find('.product-assortment-item').removeClass('active');
			$(this).addClass('active');
			$(this).closest('.slide-wrap').find('.bg-img-wrap').addClass('visible').find('img').attr('src',src);
		});
		$('.mb-opener').click(function(){
			$(this).closest('.product-character-wrap').find('.mb-opener').removeClass('active');
			$(this).addClass('active');
			var _text = $(this).parent().find('.text').text();
			if($(this).closest('.product-character-wrap').find('.mb-text').length){
				$(this).closest('.product-character-wrap').find('.mb-text').text(_text);
			}else{
				$(this).closest('.product-character-wrap').prepend('<div class="mb-text">'+_text+'</div>');
			}
		});
		if($('.swiper-product').length){
			var posItem = [];
			var scrollPos = 0;
			$('.product-bg-list .bg').eq(0).addClass('mb-active');
			initPositionMbItem();
			initMbBg();
			$(window).resize(function(){
				initPositionMbItem();
				initMbBg();
			});
			$('.swiper-product').scroll(function(){
				initMbBg();
			});
			function initMbBg(){
				if($(window).width()<=1024){
					scrollPos = $('.swiper-product').scrollTop();
					for(var i=0; i<posItem.length; i++){
						if((scrollPos>=posItem[i] && scrollPos<posItem[i+1]) || (scrollPos>=posItem[i] && scrollPos<=posItem[i]+$(window).height())){
							$('.product-bg-list .bg').removeClass('mb-active').eq(i).addClass('mb-active');
						}
					}
				}
			}
			function initPositionMbItem(){
				if($(window).width()<=1024){
					posItem = [];
					$('.swiper-product .slide-wrap').each(function(){
						posItem.push(scrollPos+$(this).offset().top-70-$(window).height()/2);
					});
				}
			}
		}
	}
	function initOpenerMainNav(){
		$('.opener-menu,.menu-content-close').on('click',function(){
			$('body').toggleClass('open-menu');
			return false;
		});
		$('.opener-mb-drop').on('click',function(){
			if(!$(this).closest('.main-nav__item').hasClass('open')){
				$('body').addClass('open-mb-menu');
				$('.main-nav__item').removeClass('open prev next');
				$(this).closest('.main-nav__item').addClass('open').prev().addClass('prev').end().next().addClass('next');
			}else{
				$('body').removeClass('open-mb-menu');
				$('.main-nav__item').removeClass('open prev next');
			}
			return false;
		});
	}
	function initPosAnimate(){
		var _length;
		$('[data-animate]').each(function(){
			_length = $(this).find('li').length;
			$(this).find('li').each(function(i){
				$(this).attr('data-pos',_length-i);
			});
		});
	}
	function initVideoPlay(){
		var navPlayItem = '.main-nav__item';
		var videoPlayDefault = '.video-list>.video-list__item';
		var videoPlayInner = '.video-list-inner .video-list__item';
		var activeClass = 'hover';
		var video = 'video';
		$(navPlayItem).on('mouseenter',function(){
			var _index = $(this).index();
			if($(videoPlayInner).find(video).length && $(window).width()>1024){
				$(videoPlayDefault).removeClass(activeClass).find(video).get(0).pause();
				$(videoPlayDefault).find(video).get(0).currentTime = 0;
				$(videoPlayInner).find(video).each(function(){
					$(this).get(0).pause();
					$(this).get(0).currentTime = 0;
				});
				
				if($(videoPlayInner).eq(_index).find(video).length){
					$(videoPlayInner).eq(_index).find(video).get(0).play();
				}
			}else{
				if($(videoPlayDefault).find(video).length && $(window).width()>999){
					$(videoPlayDefault).removeClass(activeClass).find(video).get(0).pause();
				}
				$(videoPlayInner).removeClass(activeClass).eq(_index).addClass(activeClass);
			}
		}).on('mouseleave',function(){
			if($(videoPlayDefault).find(video).length && $(window).width()>999){
				$(videoPlayInner).removeClass(activeClass).find(video).each(function(){
					$(this).get(0).pause();
					$(this).get(0).currentTime = 0;
				});
				$(videoPlayDefault).addClass(activeClass).find(video).get(0).play();
			}
		});
	}
	
});
/*! device.js 0.2.7 */
(function(){var a,b,c,d,e,f,g,h,i,j;b=window.device,a={},window.device=a,d=window.document.documentElement,j=window.navigator.userAgent.toLowerCase(),a.ios=function(){return a.iphone()||a.ipod()||a.ipad()},a.iphone=function(){return!a.windows()&&e("iphone")},a.ipod=function(){return e("ipod")},a.ipad=function(){return e("ipad")},a.android=function(){return!a.windows()&&e("android")},a.androidPhone=function(){return a.android()&&e("mobile")},a.androidTablet=function(){return a.android()&&!e("mobile")},a.blackberry=function(){return e("blackberry")||e("bb10")||e("rim")},a.blackberryPhone=function(){return a.blackberry()&&!e("tablet")},a.blackberryTablet=function(){return a.blackberry()&&e("tablet")},a.windows=function(){return e("windows")},a.windowsPhone=function(){return a.windows()&&e("phone")},a.windowsTablet=function(){return a.windows()&&e("touch")&&!a.windowsPhone()},a.fxos=function(){return(e("(mobile;")||e("(tablet;"))&&e("; rv:")},a.fxosPhone=function(){return a.fxos()&&e("mobile")},a.fxosTablet=function(){return a.fxos()&&e("tablet")},a.meego=function(){return e("meego")},a.cordova=function(){return window.cordova&&"file:"===location.protocol},a.nodeWebkit=function(){return"object"==typeof window.process},a.mobile=function(){return a.androidPhone()||a.iphone()||a.ipod()||a.windowsPhone()||a.blackberryPhone()||a.fxosPhone()||a.meego()},a.tablet=function(){return a.ipad()||a.androidTablet()||a.blackberryTablet()||a.windowsTablet()||a.fxosTablet()},a.desktop=function(){return!a.tablet()&&!a.mobile()},a.television=function(){var a;for(television=["googletv","viera","smarttv","internet.tv","netcast","nettv","appletv","boxee","kylo","roku","dlnadoc","roku","pov_tv","hbbtv","ce-html"],a=0;a<television.length;){if(e(television[a]))return!0;a++}return!1},a.portrait=function(){return window.innerHeight/window.innerWidth>1},a.landscape=function(){return window.innerHeight/window.innerWidth<1},a.noConflict=function(){return window.device=b,this},e=function(a){return-1!==j.indexOf(a)},g=function(a){var b;return b=new RegExp(a,"i"),d.className.match(b)},c=function(a){var b=null;g(a)||(b=d.className.replace(/^\s+|\s+$/g,""),d.className=b+" "+a)},i=function(a){g(a)&&(d.className=d.className.replace(" "+a,""))},a.ios()?a.ipad()?c("ios ipad tablet"):a.iphone()?c("ios iphone mobile"):a.ipod()&&c("ios ipod mobile"):a.android()?c(a.androidTablet()?"android tablet":"android mobile"):a.blackberry()?c(a.blackberryTablet()?"blackberry tablet":"blackberry mobile"):a.windows()?c(a.windowsTablet()?"windows tablet":a.windowsPhone()?"windows mobile":"desktop"):a.fxos()?c(a.fxosTablet()?"fxos tablet":"fxos mobile"):a.meego()?c("meego mobile"):a.nodeWebkit()?c("node-webkit"):a.television()?c("television"):a.desktop()&&c("desktop"),a.cordova()&&c("cordova"),f=function(){a.landscape()?(i("portrait"),c("landscape")):(i("landscape"),c("portrait"))},h=Object.prototype.hasOwnProperty.call(window,"onorientationchange")?"orientationchange":"resize",window.addEventListener?window.addEventListener(h,f,!1):window.attachEvent?window.attachEvent(h,f):window[h]=f,f(),"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return a}):"undefined"!=typeof module&&module.exports?module.exports=a:window.device=a}).call(this);
/*! pace 1.0.2 */
//(function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X=[].slice,Y={}.hasOwnProperty,Z=function(a,b){function c(){this.constructor=a}for(var d in b)Y.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},$=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};for(u={catchupTime:100,initialRate:.03,minTime:250,ghostTime:100,maxProgressPerFrame:20,easeFactor:1.25,startOnPageLoad:!0,restartOnPushState:!0,restartOnRequestAfter:500,target:"body",elements:{checkInterval:100,selectors:["body"]},eventLag:{minSamples:10,sampleCount:3,lagThreshold:3},ajax:{trackMethods:["GET"],trackWebSockets:!0,ignoreURLs:[]}},C=function(){var a;return null!=(a="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance.now():void 0)?a:+new Date},E=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,t=window.cancelAnimationFrame||window.mozCancelAnimationFrame,null==E&&(E=function(a){return setTimeout(a,50)},t=function(a){return clearTimeout(a)}),G=function(a){var b,c;return b=C(),(c=function(){var d;return d=C()-b,d>=33?(b=C(),a(d,function(){return E(c)})):setTimeout(c,33-d)})()},F=function(){var a,b,c;return c=arguments[0],b=arguments[1],a=3<=arguments.length?X.call(arguments,2):[],"function"==typeof c[b]?c[b].apply(c,a):c[b]},v=function(){var a,b,c,d,e,f,g;for(b=arguments[0],d=2<=arguments.length?X.call(arguments,1):[],f=0,g=d.length;g>f;f++)if(c=d[f])for(a in c)Y.call(c,a)&&(e=c[a],null!=b[a]&&"object"==typeof b[a]&&null!=e&&"object"==typeof e?v(b[a],e):b[a]=e);return b},q=function(a){var b,c,d,e,f;for(c=b=0,e=0,f=a.length;f>e;e++)d=a[e],c+=Math.abs(d),b++;return c/b},x=function(a,b){var c,d,e;if(null==a&&(a="options"),null==b&&(b=!0),e=document.querySelector("[data-pace-"+a+"]")){if(c=e.getAttribute("data-pace-"+a),!b)return c;try{return JSON.parse(c)}catch(f){return d=f,"undefined"!=typeof console&&null!==console?console.error("Error parsing inline pace options",d):void 0}}},g=function(){function a(){}return a.prototype.on=function(a,b,c,d){var e;return null==d&&(d=!1),null==this.bindings&&(this.bindings={}),null==(e=this.bindings)[a]&&(e[a]=[]),this.bindings[a].push({handler:b,ctx:c,once:d})},a.prototype.once=function(a,b,c){return this.on(a,b,c,!0)},a.prototype.off=function(a,b){var c,d,e;if(null!=(null!=(d=this.bindings)?d[a]:void 0)){if(null==b)return delete this.bindings[a];for(c=0,e=[];c<this.bindings[a].length;)e.push(this.bindings[a][c].handler===b?this.bindings[a].splice(c,1):c++);return e}},a.prototype.trigger=function(){var a,b,c,d,e,f,g,h,i;if(c=arguments[0],a=2<=arguments.length?X.call(arguments,1):[],null!=(g=this.bindings)?g[c]:void 0){for(e=0,i=[];e<this.bindings[c].length;)h=this.bindings[c][e],d=h.handler,b=h.ctx,f=h.once,d.apply(null!=b?b:this,a),i.push(f?this.bindings[c].splice(e,1):e++);return i}},a}(),j=window.Pace||{},window.Pace=j,v(j,g.prototype),D=j.options=v({},u,window.paceOptions,x()),U=["ajax","document","eventLag","elements"],Q=0,S=U.length;S>Q;Q++)K=U[Q],D[K]===!0&&(D[K]=u[K]);i=function(a){function b(){return V=b.__super__.constructor.apply(this,arguments)}return Z(b,a),b}(Error),b=function(){function a(){this.progress=0}return a.prototype.getElement=function(){var a;if(null==this.el){if(a=document.querySelector(D.target),!a)throw new i;this.el=document.createElement("div"),this.el.className="pace pace-active",document.body.className=document.body.className.replace(/pace-done/g,""),document.body.className+=" pace-running",this.el.innerHTML='<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>',null!=a.firstChild?a.insertBefore(this.el,a.firstChild):a.appendChild(this.el)}return this.el},a.prototype.finish=function(){var a;return a=this.getElement(),a.className=a.className.replace("pace-active",""),a.className+=" pace-inactive",document.body.className=document.body.className.replace("pace-running",""),document.body.className+=" pace-done"},a.prototype.update=function(a){return this.progress=a,this.render()},a.prototype.destroy=function(){try{this.getElement().parentNode.removeChild(this.getElement())}catch(a){i=a}return this.el=void 0},a.prototype.render=function(){var a,b,c,d,e,f,g;if(null==document.querySelector(D.target))return!1;for(a=this.getElement(),d="translate3d("+this.progress+"%, 0, 0)",g=["webkitTransform","msTransform","transform"],e=0,f=g.length;f>e;e++)b=g[e],a.children[0].style[b]=d;return(!this.lastRenderedProgress||this.lastRenderedProgress|0!==this.progress|0)&&(a.children[0].setAttribute("data-progress-text",""+(0|this.progress)+"%"),this.progress>=100?c="99":(c=this.progress<10?"0":"",c+=0|this.progress),a.children[0].setAttribute("data-progress",""+c)),this.lastRenderedProgress=this.progress},a.prototype.done=function(){return this.progress>=100},a}(),h=function(){function a(){this.bindings={}}return a.prototype.trigger=function(a,b){var c,d,e,f,g;if(null!=this.bindings[a]){for(f=this.bindings[a],g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push(c.call(this,b));return g}},a.prototype.on=function(a,b){var c;return null==(c=this.bindings)[a]&&(c[a]=[]),this.bindings[a].push(b)},a}(),P=window.XMLHttpRequest,O=window.XDomainRequest,N=window.WebSocket,w=function(a,b){var c,d,e;e=[];for(d in b.prototype)try{e.push(null==a[d]&&"function"!=typeof b[d]?"function"==typeof Object.defineProperty?Object.defineProperty(a,d,{get:function(){return b.prototype[d]},configurable:!0,enumerable:!0}):a[d]=b.prototype[d]:void 0)}catch(f){c=f}return e},A=[],j.ignore=function(){var a,b,c;return b=arguments[0],a=2<=arguments.length?X.call(arguments,1):[],A.unshift("ignore"),c=b.apply(null,a),A.shift(),c},j.track=function(){var a,b,c;return b=arguments[0],a=2<=arguments.length?X.call(arguments,1):[],A.unshift("track"),c=b.apply(null,a),A.shift(),c},J=function(a){var b;if(null==a&&(a="GET"),"track"===A[0])return"force";if(!A.length&&D.ajax){if("socket"===a&&D.ajax.trackWebSockets)return!0;if(b=a.toUpperCase(),$.call(D.ajax.trackMethods,b)>=0)return!0}return!1},k=function(a){function b(){var a,c=this;b.__super__.constructor.apply(this,arguments),a=function(a){var b;return b=a.open,a.open=function(d,e){return J(d)&&c.trigger("request",{type:d,url:e,request:a}),b.apply(a,arguments)}},window.XMLHttpRequest=function(b){var c;return c=new P(b),a(c),c};try{w(window.XMLHttpRequest,P)}catch(d){}if(null!=O){window.XDomainRequest=function(){var b;return b=new O,a(b),b};try{w(window.XDomainRequest,O)}catch(d){}}if(null!=N&&D.ajax.trackWebSockets){window.WebSocket=function(a,b){var d;return d=null!=b?new N(a,b):new N(a),J("socket")&&c.trigger("request",{type:"socket",url:a,protocols:b,request:d}),d};try{w(window.WebSocket,N)}catch(d){}}}return Z(b,a),b}(h),R=null,y=function(){return null==R&&(R=new k),R},I=function(a){var b,c,d,e;for(e=D.ajax.ignoreURLs,c=0,d=e.length;d>c;c++)if(b=e[c],"string"==typeof b){if(-1!==a.indexOf(b))return!0}else if(b.test(a))return!0;return!1},y().on("request",function(b){var c,d,e,f,g;return f=b.type,e=b.request,g=b.url,I(g)?void 0:j.running||D.restartOnRequestAfter===!1&&"force"!==J(f)?void 0:(d=arguments,c=D.restartOnRequestAfter||0,"boolean"==typeof c&&(c=0),setTimeout(function(){var b,c,g,h,i,k;if(b="socket"===f?e.readyState<2:0<(h=e.readyState)&&4>h){for(j.restart(),i=j.sources,k=[],c=0,g=i.length;g>c;c++){if(K=i[c],K instanceof a){K.watch.apply(K,d);break}k.push(void 0)}return k}},c))}),a=function(){function a(){var a=this;this.elements=[],y().on("request",function(){return a.watch.apply(a,arguments)})}return a.prototype.watch=function(a){var b,c,d,e;return d=a.type,b=a.request,e=a.url,I(e)?void 0:(c="socket"===d?new n(b):new o(b),this.elements.push(c))},a}(),o=function(){function a(a){var b,c,d,e,f,g,h=this;if(this.progress=0,null!=window.ProgressEvent)for(c=null,a.addEventListener("progress",function(a){return h.progress=a.lengthComputable?100*a.loaded/a.total:h.progress+(100-h.progress)/2},!1),g=["load","abort","timeout","error"],d=0,e=g.length;e>d;d++)b=g[d],a.addEventListener(b,function(){return h.progress=100},!1);else f=a.onreadystatechange,a.onreadystatechange=function(){var b;return 0===(b=a.readyState)||4===b?h.progress=100:3===a.readyState&&(h.progress=50),"function"==typeof f?f.apply(null,arguments):void 0}}return a}(),n=function(){function a(a){var b,c,d,e,f=this;for(this.progress=0,e=["error","open"],c=0,d=e.length;d>c;c++)b=e[c],a.addEventListener(b,function(){return f.progress=100},!1)}return a}(),d=function(){function a(a){var b,c,d,f;for(null==a&&(a={}),this.elements=[],null==a.selectors&&(a.selectors=[]),f=a.selectors,c=0,d=f.length;d>c;c++)b=f[c],this.elements.push(new e(b))}return a}(),e=function(){function a(a){this.selector=a,this.progress=0,this.check()}return a.prototype.check=function(){var a=this;return document.querySelector(this.selector)?this.done():setTimeout(function(){return a.check()},D.elements.checkInterval)},a.prototype.done=function(){return this.progress=100},a}(),c=function(){function a(){var a,b,c=this;this.progress=null!=(b=this.states[document.readyState])?b:100,a=document.onreadystatechange,document.onreadystatechange=function(){return null!=c.states[document.readyState]&&(c.progress=c.states[document.readyState]),"function"==typeof a?a.apply(null,arguments):void 0}}return a.prototype.states={loading:0,interactive:50,complete:100},a}(),f=function(){function a(){var a,b,c,d,e,f=this;this.progress=0,a=0,e=[],d=0,c=C(),b=setInterval(function(){var g;return g=C()-c-50,c=C(),e.push(g),e.length>D.eventLag.sampleCount&&e.shift(),a=q(e),++d>=D.eventLag.minSamples&&a<D.eventLag.lagThreshold?(f.progress=100,clearInterval(b)):f.progress=100*(3/(a+3))},50)}return a}(),m=function(){function a(a){this.source=a,this.last=this.sinceLastUpdate=0,this.rate=D.initialRate,this.catchup=0,this.progress=this.lastProgress=0,null!=this.source&&(this.progress=F(this.source,"progress"))}return a.prototype.tick=function(a,b){var c;return null==b&&(b=F(this.source,"progress")),b>=100&&(this.done=!0),b===this.last?this.sinceLastUpdate+=a:(this.sinceLastUpdate&&(this.rate=(b-this.last)/this.sinceLastUpdate),this.catchup=(b-this.progress)/D.catchupTime,this.sinceLastUpdate=0,this.last=b),b>this.progress&&(this.progress+=this.catchup*a),c=1-Math.pow(this.progress/100,D.easeFactor),this.progress+=c*this.rate*a,this.progress=Math.min(this.lastProgress+D.maxProgressPerFrame,this.progress),this.progress=Math.max(0,this.progress),this.progress=Math.min(100,this.progress),this.lastProgress=this.progress,this.progress},a}(),L=null,H=null,r=null,M=null,p=null,s=null,j.running=!1,z=function(){return D.restartOnPushState?j.restart():void 0},null!=window.history.pushState&&(T=window.history.pushState,window.history.pushState=function(){return z(),T.apply(window.history,arguments)}),null!=window.history.replaceState&&(W=window.history.replaceState,window.history.replaceState=function(){return z(),W.apply(window.history,arguments)}),l={ajax:a,elements:d,document:c,eventLag:f},(B=function(){var a,c,d,e,f,g,h,i;for(j.sources=L=[],g=["ajax","elements","document","eventLag"],c=0,e=g.length;e>c;c++)a=g[c],D[a]!==!1&&L.push(new l[a](D[a]));for(i=null!=(h=D.extraSources)?h:[],d=0,f=i.length;f>d;d++)K=i[d],L.push(new K(D));return j.bar=r=new b,H=[],M=new m})(),j.stop=function(){return j.trigger("stop"),j.running=!1,r.destroy(),s=!0,null!=p&&("function"==typeof t&&t(p),p=null),B()},j.restart=function(){return j.trigger("restart"),j.stop(),j.start()},j.go=function(){var a;return j.running=!0,r.render(),a=C(),s=!1,p=G(function(b,c){var d,e,f,g,h,i,k,l,n,o,p,q,t,u,v,w;for(l=100-r.progress,e=p=0,f=!0,i=q=0,u=L.length;u>q;i=++q)for(K=L[i],o=null!=H[i]?H[i]:H[i]=[],h=null!=(w=K.elements)?w:[K],k=t=0,v=h.length;v>t;k=++t)g=h[k],n=null!=o[k]?o[k]:o[k]=new m(g),f&=n.done,n.done||(e++,p+=n.tick(b));return d=p/e,r.update(M.tick(b,d)),r.done()||f||s?(r.update(100),j.trigger("done"),setTimeout(function(){return r.finish(),j.running=!1,j.trigger("hide")},Math.max(D.ghostTime,Math.max(D.minTime-(C()-a),0)))):c()})},j.start=function(a){v(D,a),j.running=!0;try{r.render()}catch(b){i=b}return document.querySelector(".pace")?(j.trigger("start"),j.go()):setTimeout(j.start,50)},"function"==typeof define&&define.amd?define(["pace"],function(){return j}):"object"==typeof exports?module.exports=j:D.startOnPageLoad&&j.start()}).call(this);
/*! masked input */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){var t,n=navigator.userAgent,a=/iphone/i.test(n),i=/chrome/i.test(n),r=/android/i.test(n);e.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},e.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden")&&this.get(0)===document.activeElement)return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&(n=this.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(n,o){var c,l,u,f,s,g,h,m;if(!n&&this.length>0){c=e(this[0]);var d=c.data(e.mask.dataName);return d?d():void 0}return o=e.extend({autoclear:e.mask.autoclear,placeholder:e.mask.placeholder,completed:null},o),l=e.mask.definitions,u=[],f=h=n.length,s=null,n=String(n),e.each(n.split(""),function(e,t){"?"==t?(h--,f=e):l[t]?(u.push(new RegExp(l[t])),null===s&&(s=u.length-1),f>e&&(g=u.length-1)):u.push(null)}),this.trigger("unmask").each(function(){function c(){if(o.completed){for(var e=s;g>=e;e++)if(u[e]&&E[e]===d(e))return;o.completed.call(w)}}function d(e){return e<o.placeholder.length?o.placeholder.charAt(e):o.placeholder.charAt(0)}function p(e){for(;++e<h&&!u[e];);return e}function v(e){for(;--e>=0&&!u[e];);return e}function b(e,t){var n,a;if(!(0>e)){for(n=e,a=p(t);h>n;n++)if(u[n]){if(!(h>a&&u[n].test(E[a])))break;E[n]=E[a],E[a]=d(a),a=p(a)}S(),w.caret(Math.max(s,e))}}function k(e){var t,n,a,i;for(t=e,n=d(e);h>t;t++)if(u[t]){if(a=p(t),i=E[t],E[t]=n,!(h>a&&u[a].test(i)))break;n=i}}function y(e){var t=w.val(),n=w.caret();if(m&&m.length&&m.length>t.length){for(T(!0);n.begin>0&&!u[n.begin-1];)n.begin--;if(0===n.begin)for(;n.begin<s&&!u[n.begin];)n.begin++;w.caret(n.begin,n.begin)}else{var a=(T(!0),t.charAt(n.begin));n.begin<h&&(u[n.begin]?u[n.begin].test(a)&&n.begin++:(n.begin++,u[n.begin].test(a)&&n.begin++)),w.caret(n.begin,n.begin)}c()}function x(e){T(),w.val()!=D&&w.change()}function j(e){if(!w.prop("readonly")){var t,n,i,r=e.which||e.keyCode;m=w.val(),8===r||46===r||a&&127===r?(t=w.caret(),n=t.begin,i=t.end,i-n===0&&(n=46!==r?v(n):i=p(n-1),i=46===r?p(i):i),R(n,i),b(n,i-1),e.preventDefault()):13===r?x.call(this,e):27===r&&(w.val(D),w.caret(0,T()),e.preventDefault())}}function A(t){if(!w.prop("readonly")){var n,a,i,o=t.which||t.keyCode,l=w.caret();if(!(t.ctrlKey||t.altKey||t.metaKey||32>o)&&o&&13!==o){if(l.end-l.begin!==0&&(R(l.begin,l.end),b(l.begin,l.end-1)),n=p(l.begin-1),h>n&&(a=String.fromCharCode(o),u[n].test(a))){if(k(n),E[n]=a,S(),i=p(n),r){var f=function(){e.proxy(e.fn.caret,w,i)()};setTimeout(f,0)}else w.caret(i);l.begin<=g&&c()}t.preventDefault()}}}function R(e,t){var n;for(n=e;t>n&&h>n;n++)u[n]&&(E[n]=d(n))}function S(){w.val(E.join(""))}function T(e){var t,n,a,i=w.val(),r=-1;for(t=0,a=0;h>t;t++)if(u[t]){for(E[t]=d(t);a++<i.length;)if(n=i.charAt(a-1),u[t].test(n)){E[t]=n,r=t;break}if(a>i.length){R(t+1,h);break}}else E[t]===i.charAt(a)&&a++,f>t&&(r=t);return e?S():f>r+1?o.autoclear||E.join("")===C?(w.val()&&w.val(""),R(0,h)):S():(S(),w.val(w.val().substring(0,r+1))),f?t:s}var w=e(this),E=e.map(n.split(""),function(e,t){return"?"!=e?l[e]?d(t):e:void 0}),C=E.join(""),D=w.val();w.data(e.mask.dataName,function(){return e.map(E,function(e,t){return u[t]&&e!=d(t)?e:null}).join("")}),w.one("unmask",function(){w.off(".mask").removeData(e.mask.dataName)}).on("focus.mask",function(){if(!w.prop("readonly")){clearTimeout(t);var e;D=w.val(),e=T(),t=setTimeout(function(){w.get(0)===document.activeElement&&(S(),e==n.replace("?","").length?w.caret(0,e):w.caret(e))},10)}}).on("blur.mask",x).on("keydown.mask",j).on("keypress.mask",A).on("input.mask paste.mask",function(){w.prop("readonly")||setTimeout(function(){var e=T(!0);w.caret(e),c()},0)}),i&&r&&w.off("input.mask").on("input.mask",y),T()})}})});
/*! file input */
!function(t){var e="undefined"!=typeof t("<input/>")[0].multiple,i=/msie/i.test(navigator.userAgent);t.fn.customFile=function(){return this.each(function(){var n=t(this).addClass("custom-file-upload-hidden"),a=t('<div class="file-upload-wrapper">'),l=t(this).data("palceholder"),u=t(this).data("name"),o=t('<input placeholder="'+l+'" type="text" class="file-upload-input" />'),c=t('<button type="button" class="file-upload-button">'+u+"</button>"),r=t('<label class="file-upload-button" for="'+n[0].id+'">Select a File</label>');n.css({position:"absolute"}),a.insertAfter(n).append(n,o,i?r:c),n.attr("tabIndex",-1),c.attr("tabIndex",-1),c.click(function(){n.focus().click()}),n.change(function(){var t,i,a=[];if(e){t=n[0].files;for(var l=0,u=t.length;u>l;l++)a.push(t[l].name);i=a.join(", ")}else i=n.val().split("\\").pop();o.val(i).attr("title",i).focus()}),o.on({blur:function(){n.trigger("blur")},keydown:function(t){if(13===t.which)i||n.trigger("click");else{if(8!==t.which&&46!==t.which)return 9===t.which?void 0:!1;n.replaceWith(n=n.clone(!0)),n.trigger("change"),o.val("")}}})})},e||t(document).on("change","input.customfile",function(){var e=t(this),i="customfile_"+(new Date).getTime(),n=e.parent(),a=n.siblings().find(".file-upload-input").filter(function(){return!this.value}),l=t('<input type="file" id="'+i+'" name="'+e.attr("name")+'"/>');setTimeout(function(){e.val()?a.length||(n.after(l),l.customFile()):(a.parent().remove(),n.appendTo(n.parent()),n.find("input").focus())},1)})}(jQuery);