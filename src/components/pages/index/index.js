import { isMobile, FLS } from "@js/common/functions.js";

if (isMobile.any()) {

	const sportStrBody = document.querySelectorAll('.sport-strength__body');
	if (sportStrBody.length) {
		sportStrBody.forEach(body => {
			body.addEventListener('click', () => {
				const card = body.closest('.sport-strength__card');
				document.querySelectorAll('.sport-strength__card.--show').forEach(active => {
					if (active !== card) {
						active.classList.remove('--show');
					}
				});
				card.classList.toggle('--show');
			});
		});
	}
}

// function initSocialPagination() {

// 	const slider = document.querySelector('.sport-social__cards-slider');
// 	if (!slider) return;

// 	const cardsContainer = slider.querySelector('.sport-social__cards');
// 	const cards = slider.querySelectorAll('.sport-social__card');
// 	const pagination = slider.querySelector('.social-pagination');

// 	if (!cards.length || !pagination) return;

// 	// создаём буллеты
// 	pagination.innerHTML = '';

// 	cards.forEach((_, i) => {
// 		const bullet = document.createElement('span');
// 		bullet.className = 'social-pagination-bullet';
// 		if (i === 0) bullet.classList.add('social-pagination-bullet-active');
// 		pagination.appendChild(bullet);
// 	});

// 	const bullets = pagination.querySelectorAll('.social-pagination-bullet');

// 	// observer
// 	const observer = new IntersectionObserver((entries) => {

// 		entries.forEach(entry => {

// 			if (entry.isIntersecting) {

// 				const index = [...cards].indexOf(entry.target);

// 				bullets.forEach(b => b.classList.remove('social-pagination-bullet-active'));
// 				bullets[index].classList.add('social-pagination-bullet-active');

// 			}

// 		});

// 	}, {
// 		root: cardsContainer,
// 		threshold: 0.6
// 	});

// 	cards.forEach(card => observer.observe(card));

// }

// window.addEventListener('load', initSocialPagination);