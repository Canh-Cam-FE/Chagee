// export function headerSearch() {
// 	function closeSearch() {
// 		$(".header-search-form").removeClass("active");
// 		$(".header-search").removeClass("active");
// 		$("body").removeClass("disable");
// 	}
// 	$(".header-search").on("click", function () {
// 		$(".header-search-form").addClass("active");
// 		$("body").addClass("disable");
// 		setTimeout(() => {
// 			$(".header-search-form .searchinput").focus();
// 		}, 400);
// 	});
// 	$(".header-search-form .close").on("click", function () {
// 		closeSearch();
// 	});
// 	$(document).keyup(function (e) {
// 		if (e.key === "Escape") {
// 			closeSearch();
// 		}
// 	});
// 	$(document).on("click", function (e) {
// 		if ($(".header-search-form").hasClass("active")) {
// 			console.log(e.target);
// 			if (!$(e.target).closest(".productsearchbox").length && !$(e.target).is('.header-search')) {
// 				closeSearch();
// 			}
// 		}
// 	});
// }

export function headerSearch() {
	const $searchBtns = $(".header-search, .header-search-mobile");
	const $searchBar = $(".search-bar-container");
	const $searchMobileClose = $(".search-mobile-close");

	// Gán sự kiện 1 lần duy nhất
	if ($searchBar.length && $searchBtns.length) {
		$searchBtns.on("click", function () {
			toggleSearchBar($(this));
		});
	}

	if ($searchMobileClose.length) {
		$searchMobileClose.on("click", closeSearchBar);
	}

	$searchBar.on("click", function (e) {
		if ($(e.target).is($searchBar)) closeSearchBar();
	});

	function toggleSearchBar($btn) {
		$searchBar.toggleClass("active");
		$("body").toggleClass("search-open");

		const $icon = $btn.find("i");
		$icon.toggleClass("fa-magnifying-glass", !$searchBar.hasClass("active"));
		$icon.toggleClass("fa-times", $searchBar.hasClass("active"));
	}

	function closeSearchBar() {
		$searchBar.removeClass("active");
		$("body").removeClass("search-open");
		resetSearchIcons();
	}

	function resetSearchIcons() {
		$searchBtns.each(function () {
			const $icon = $(this).find("i");
			$icon.removeClass("fa-times");
			$icon.addClass("fa-magnifying-glass");
		});
	}
}
