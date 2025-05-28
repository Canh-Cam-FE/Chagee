import AOS from "aos";
import lozad from "lozad";
import {
	setBackgroundElement,
	detectCloseElement,
	buttonToTop,
	clickScrollToDiv,
	appendCaptchaASP,
	countUpInit,
} from "./helper";
import { header } from "./header";
import { swiperInit } from "./swiper";
import { form } from "./form";

$(document).ready(function () {
	setBackgroundElement();
	header.init();
	swiperInit();
	buttonToTop();
	form.init();
	// countUpInit();
});

// export function indicatorSlide() {
// 	if ($(".indicator-swipe").length > 0) {
// 		var callback = function (entries) {
// 			entries.forEach(function (entry) {
// 				if (entry.isIntersecting) {
// 					entry.target.classList.add("active");
// 					setTimeout(function () {
// 						entry.target.classList.remove("active");
// 					}, 3000);
// 				}
// 			});
// 		};

// 		var observer = new IntersectionObserver(callback);
// 		var animationItems = document.querySelectorAll(".indicator-swipe");
// 		animationItems.forEach(function (item) {
// 			observer.observe(item);
// 		});
// 	}
// }

// fancyfox popup
document.addEventListener("DOMContentLoaded", function () {
	Fancybox.bind("[data-fancybox]", {
		dragToClose: false,
		backdropClick: false,
		template: {
			closeButton:
				'<button class="fancybox-button fancybox-button--close" title="Close"><i class="fa-duotone fa-solid fa-xmark"></i></button>',
		},
	});
});

setTimeout(() => {
	if (!$("#popup-form").length) return;
	Fancybox.show([
		{
			src: "#popup-form",
			type: "inline",
			dragToClose: false,
			backdropClick: false,
		},
	]);
}, 1000);

/*==================== Aos Init ====================*/
AOS.init({
	offset: 100,
});
/*==================== Lazyload JS ====================*/
const observer = lozad(); // lazy loads elements with default selector as '.lozad'
observer.observe();
