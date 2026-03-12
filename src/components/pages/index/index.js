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