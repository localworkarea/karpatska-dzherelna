function initSmallBanner() {
	const banners = document.querySelectorAll('.banner-sm');

	if (!banners.length) return;

	banners.forEach(banner => {
		const closeBtn = banner.querySelector('.banner-sm__close');

		if (!closeBtn) return;

		closeBtn.addEventListener('click', () => {
			banner.classList.add('--hidden');
		});
	});
}

document.addEventListener('DOMContentLoaded', initSmallBanner);

// function initBigBannerAnimation() {
// 	const bigBanner = document.querySelector('.banner-big');
// 	const smallBanner = document.querySelector('.banner-sm');

// 	if (!bigBanner || !smallBanner) return;

// 	let timer;

// 	const startAnimation = () => {

// 		const bigRect = bigBanner.getBoundingClientRect();
// 		const smallRect = smallBanner.getBoundingClientRect();

// 		const scaleX = smallRect.width / bigRect.width;
// 		const scaleY = smallRect.height / bigRect.height;

// 		const translateX = smallRect.right - bigRect.right;
// 		const translateY = smallRect.bottom - bigRect.bottom;

// 		const duration = 900;
// 		const fadeDelay = 450;

// 		bigBanner.style.transformOrigin = 'bottom right';

// 		bigBanner.style.transition = `
// 			transform ${duration}ms ease,
// 			opacity 300ms linear
// 		`;

// 		// сразу блокируем клики
// 		bigBanner.style.pointerEvents = 'none';

// 		requestAnimationFrame(() => {
// 			bigBanner.style.transform = `
// 				translate(${translateX}px, ${translateY}px)
// 				scale(${scaleX}, ${scaleY})
// 			`;
// 		});

// 		// через 0.45s начинаем скрывать
// 		setTimeout(() => {
// 			bigBanner.style.opacity = '0';
// 		}, fadeDelay);

// 		// конец анимации
// 		setTimeout(() => {
// 			bigBanner.style.visibility = 'hidden';
// 			bigBanner.classList.add('--hidden');
// 		},900);
// 	};

// 	timer = setTimeout(startAnimation, 3000);

// 	window.addEventListener('resize', () => {
// 		clearTimeout(timer);
// 		timer = setTimeout(startAnimation, 3000);
// 	});
// }

// document.addEventListener('DOMContentLoaded', initBigBannerAnimation);

function initBigBannerAnimation() {
	const bigBanner = document.querySelector('.banner-big');
	const smallBanner = document.querySelector('.banner-sm');

	if (!bigBanner || !smallBanner) return;

	let timer;

	const startAnimation = () => {

		const isMobile = window.matchMedia("(max-width: 51.311em)").matches;

		const bigRect = bigBanner.getBoundingClientRect();
		const smallRect = smallBanner.getBoundingClientRect();

		let translateX;
		let translateY;
		let scaleX;
		let scaleY;
		let duration;

		if (isMobile) {
			// MOBILE LOGIC

			duration = 650;

			const scale = smallRect.width / bigRect.width;

			scaleX = scale;
			scaleY = scale;

			translateX = smallRect.left - bigRect.left;
			translateY = smallRect.top - bigRect.top;

			bigBanner.style.transformOrigin = 'top left';

		} else {
			// DESKTOP LOGIC

			duration = 900;

			scaleX = smallRect.width / bigRect.width;
			scaleY = smallRect.height / bigRect.height;

			translateX = smallRect.right - bigRect.right;
			translateY = smallRect.bottom - bigRect.bottom;

			bigBanner.style.transformOrigin = 'bottom right';
		}

		const fadeDelay = duration * 0.5;

		bigBanner.style.transition = `
			transform ${duration}ms ease,
			opacity 300ms linear
		`;

		bigBanner.style.pointerEvents = 'none';

		requestAnimationFrame(() => {
			bigBanner.style.transform = `
				translate(${translateX}px, ${translateY}px)
				scale(${scaleX}, ${scaleY})
			`;
		});

		setTimeout(() => {
			bigBanner.style.opacity = '0';
		}, fadeDelay);

		setTimeout(() => {
			bigBanner.style.visibility = 'hidden';
			bigBanner.classList.add('--hidden');
		}, duration);
	};

	timer = setTimeout(startAnimation, 3000);

	window.addEventListener('resize', () => {
		clearTimeout(timer);
		timer = setTimeout(startAnimation, 3000);
	});
}

document.addEventListener('DOMContentLoaded', initBigBannerAnimation);
