(function ($) {
	$window = $(window);

	let scrollpos = window.scrollY
	setTimeout(() => {
		const header = document.getElementById("header")
		const header_height = header.offsetHeight

		const add_class_on_scroll = () => header.classList.add("scrolling")
		const remove_class_on_scroll = () => header.classList.remove("scrolling")

		window.addEventListener('scroll', function() {
			scrollpos = window.scrollY;

			if (scrollpos >= header_height) { add_class_on_scroll() }
			else { remove_class_on_scroll() }
		})
	}, 500);

	$(document).ready(function () {
    });
    
	$window.on('load', function () {
		"use strict";
		window.scrollTo(0, 0);

    });
    
	$window.scroll(function () { });

    
})(jQuery);

pageSetup = (function () {
	return {
		init: pageSetupProcess,
	};
})();

function pageSetupProcess() {
	try {
		$window = $(window);
		let scrollpos = window.scrollY
		setTimeout(() => {
			const header = document.getElementById("header")
			const header_height = header.offsetHeight

			const add_class_on_scroll = () => header.classList.add("scrolling")
			const remove_class_on_scroll = () => header.classList.remove("scrolling")

			window.addEventListener('scroll', function() {
				scrollpos = window.scrollY;
	
				if (scrollpos >= header_height) { add_class_on_scroll() }
				else { remove_class_on_scroll() }
	
			})
		}, 500);

	} catch (err) {
		console.log(err);
	}

}