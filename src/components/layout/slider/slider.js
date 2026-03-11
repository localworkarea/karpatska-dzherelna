
import Swiper from 'swiper';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
/*
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation, EffectCards, EffectCoverflow
*/

import "./slider.scss";
// import 'swiper/css/bundle';
// import 'swiper/css/effect-cards';
// import 'swiper/css/effect-coverflow';

function initSliders() {
	if (document.querySelector('.sport-info__slider')) { 
		new Swiper('.sport-info__slider', { 
			modules: [Navigation, Pagination, EffectCoverflow],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 800,
			initialSlide: 1,

			//loop: true,
			//preloadImages: false,
			//lazy: true,

			// effect: 'cards',
		  // cardsEffect: {
			// 	perSlideOffset: 50,
			// 	perSlideRotate: 1,
			// 	rotate: true,
			// 	slideShadows: true
		  // },

			effect: 'coverflow',
  		// coverflowEffect: {
			// 	depth: 150,
			// 	modifier: 4.5,
			// 	scale: 1,
  		//   rotate: 0,
  		//   slideShadows: true,
			// 	stretch: 0
  		// },

			pagination: {
				el: '.sport-info__pagination',
				clickable: true,
			},

			navigation: {
				prevEl: '.sport-info__slider .swiper-button-prev',
				nextEl: '.sport-info__slider .swiper-button-next',
				addIcons: false, 
			},
			breakpoints: {
				320: {
					coverflowEffect: {
						depth: 150,
						modifier: 5.5,
						scale: 1,
						rotate: 0,
						slideShadows: true,
						stretch: 0
					},
				},
				414: {
					coverflowEffect: {
						depth: 150,
						modifier: 4.5,
						scale: 1,
  				  rotate: 0,
  				  slideShadows: true,
						stretch: 0
  				},
				}
			},
			// Події
			on: {
				slideChange() {

					const videos = document.querySelectorAll('.sport-info__video');

					videos.forEach(video => {
						video.pause();
						video.closest('.swiper-slide').classList.remove('--show');
					});
				
				}
			}
		});

		const videos = document.querySelectorAll('.sport-info__video');

		videos.forEach(video => {
		
			const slide = video.closest('.swiper-slide');
		
			video.addEventListener('click', () => {
			
				if (video.paused) {
				
					// остановить остальные
					videos.forEach(v => {
						v.pause();
						v.muted = true;
						v.closest('.swiper-slide').classList.remove('--show');
					});
				
					video.muted = false;
					video.play();
					slide.classList.add('--show');
				
				} else {
				
					video.pause();
					video.muted = true;
					slide.classList.remove('--show');
				
				}
			
			});
		
		});
	}
	// if (document.querySelector('.swiper')) { 
	// 	new Swiper('.swiper', { 
	// 		modules: [Navigation, Pagination],
	// 		observer: true,
	// 		observeParents: true,
	// 		slidesPerView: 1,
	// 		spaceBetween: 0,
	// 		speed: 800,

	// 		//loop: true,
	// 		//preloadImages: false,
	// 		//lazy: true,
	// 		pagination: {
	// 			el: '.swiper-pagination',
	// 			clickable: true,
	// 		},

	// 		navigation: {
	// 			prevEl: '.swiper-button-prev',
	// 			nextEl: '.swiper-button-next',
	// 		},
	// 		/*
	// 		breakpoints: {
	// 			640: {
	// 				slidesPerView: 1,
	// 				spaceBetween: 0,
	// 				autoHeight: true,
	// 			},
	// 			768: {
	// 				slidesPerView: 2,
	// 				spaceBetween: 20,
	// 			},
	// 			992: {
	// 				slidesPerView: 3,
	// 				spaceBetween: 20,
	// 			},
	// 			1268: {
	// 				slidesPerView: 4,
	// 				spaceBetween: 30,
	// 			},
	// 		},
	// 		*/
	// 		// Події
	// 		on: {

	// 		}
	// 	});
	// }
}
document.querySelector('[data-fls-slider]') ?
	window.addEventListener("load", initSliders) : null