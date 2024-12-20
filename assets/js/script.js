var $ = jQuery.noConflict();
function headerScroll() {
	// var headerTop = $(".header-main").outerHeight();
	if ($(this).scrollTop() > 1) {
		$(".header-main").addClass("header-fixed");
	} else {
		$(".header-main").removeClass("header-fixed");
	}
}

$(document).ready(function () {
	headerScroll();
	/* Menu Toggle Js */
	const mediaQuery = window.matchMedia('(max-width: 991px)')
	if (mediaQuery.matches) {
		$(".navbar-toggler").click(function (e) {
			e.stopPropagation();
			$("body").toggleClass("menu-open");
		});
		jQuery(document).on('click', function (e) {
			if (jQuery(e.target).closest(".header-menu").length <= 0) {
				jQuery("body").removeClass('menu-open');
			}
		});
		if (window.matchMedia('(max-width: 992px)').matches) {
			$("body").removeClass("menu-open");
		}
		$(".menu-item-has-children>a").after("<span class='span_indicator'></span>");
		$(document).on('click', '.span_indicator', function (e) {
			e.stopPropagation();
			$(this).toggleClass('active');
			$(this).next('.sub-menu').slideToggle();
			$(this).parent('li').siblings().find('.sub-menu').slideUp();
			$(this).parent('li').siblings().find('.span_indicator').removeClass('active');
		});
	}
	/* Menu Toggle Js */
	/* start :: testimonial-js */
	if (jQuery('.testimonial-section .swiper-slide').length > 1) {
		var swiper = new Swiper(".testimonail-slider", {
			loop: true,
			speed: 1500,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});
	}
	else {
		$('.testimonial-section .sliderarrow').css('display', 'none');
	}
	/* end :: testimonial-js */
	/* project-detail-slider */
	if (jQuery('.project-detail-slider').length > 0) {
		const swiper = new Swiper(".project-detail-slider", {
			slidesPerView: 1,
			loop: true,
			speed: 300,
			navigation: {
				nextEl: ".project-detail-slider-section .swiper-button-next",
				prevEl: ".project-detail-slider-section .swiper-button-prev",
			},
			pagination: {
				el: '.project-detail-slider-section .swiper-pagination-counter',
				type: 'custom',
				renderCustom: function (swiper, current, total) {
					return current + '/' + total;
				}
			},
		});
	}

	/* project-detail-slider */
	/* Animation Js Start*/
	jQuery(window).load(function () {
		var $animation_elements = $('.animatable');
		var $window = $(window);

		function scrollAnimation() {
			var window_height = $window.height();
			var window_top_position = $window.scrollTop();
			var window_bottom_position = (window_top_position + window_height);
			jQuery.each($animation_elements, function () {
				var $element = $(this);
				var element_height = $element.outerHeight();
				var element_top_position = $element.offset().top;
				var element_bottom_position = (element_top_position + element_height);
				if ((element_bottom_position >= window_top_position) &&
					(element_top_position <= window_bottom_position)) {
					$element.addClass('animated');
				}
			});
		}
		$window.on('scroll resize', scrollAnimation);
		$window.trigger('scroll');
		var _has = window.location.hash.slice(1);
		if (_has) {
			jQuery('html, body').animate({
				scrollTop: jQuery('.' + _has).offset().top - 10
			}, 1000);
		}
	});
	/* Animation Js End*/
	// Faq js start
	let $questions = $(".question");
	$questions.each(function () {
		$(this).on("click", function () {
			const $active = $(".question.active");

			if ($active.length && $active[0] !== this) {
				$active.removeClass("active");
				$active.next().css("max-height", 0);
			}

			$(this).toggleClass("active");
			const $answer = $(this).next();

			if ($(this).hasClass("active")) {
				$answer.css("max-height", $answer[0].scrollHeight + "px");
			} else {
				$answer.css("max-height", 0);
			}
		});
	});

	// faq js end

	timeline_slider_scroll();


});
function timeline_slider_scroll() {
	var $timeline = jQuery(".timeline"),
		$items = $timeline.find("li"),
		$greyLine = $timeline.find(".default-line"),
		$lineToDraw = $timeline.find(".draw-line");

	if ($lineToDraw.length) {
		jQuery(window).on('scroll', function () {
			var redLineHeight = $lineToDraw.height(),
				greyLineHeight = $greyLine.height(),
				scrollPos = jQuery(window).scrollTop(),
				halfWindowHeight = jQuery(window).height() / 2,
				timelineOffset = $timeline.offset().top;

			if (scrollPos >= timelineOffset - halfWindowHeight) {
				var lineHeight = Math.min(scrollPos - timelineOffset + halfWindowHeight + 15, greyLineHeight);
				$lineToDraw.css('height', lineHeight + 'px');
			}

			// Handle in-view classes
			var lineBottom = $lineToDraw.offset().top + $lineToDraw.outerHeight(true);
			$items.each(function () {
				jQuery(this).toggleClass('in-view', lineBottom > jQuery(this).offset().top);
			});
		});
	}

	setTimeout(function () {
		if ($timeline.length) {
			// Get the height of the last li element
			var lastItemHeight = $items.last().height();

			// Subtract 30px from the last li element height
			var totalHeight = $timeline.find('ul').height() - lastItemHeight + 20;

			// Set the default-line height
			$greyLine.css('height', totalHeight + 'px');
		}
	}, 100);
}

let lastScrollPosition = 0; // Variable to track the last scroll position

// document.addEventListener('scroll', function() {
// 	const sections = document.querySelectorAll('.background-img-with-heading');
// 	const scrollPosition = window.scrollY + window.innerHeight / 2;

// 	sections.forEach(section => {
// 		const sectionTop = section.offsetTop;
// 		const sectionHeight = section.offsetHeight;
// 		const bgImg = section.querySelector('.bg-img');
// 		const sectionInView = scrollPosition > sectionTop && scrollPosition < sectionTop + sectionHeight;

// 		if (sectionInView) {
// 			const scrollPercentage = (scrollPosition - sectionTop) / sectionHeight;
// 			let newWidth;
// 			if (scrollPosition > lastScrollPosition) {
// 				// Scrolling down - increase width
// 				newWidth = 85 + (30 * scrollPercentage);
// 			} else {
// 				// Scrolling up - decrease width
// 				newWidth = 100 - (30 * (1 - scrollPercentage));
// 			}
// 			// Ensure width stays within the 85% - 100% range
// 			if (newWidth > 100) {
// 				newWidth = 100;
// 			} else if (newWidth < 85) {
// 				newWidth = 85;
// 			}
// 			bgImg.style.width = `${newWidth}%`;
// 		}
// 		lastScrollPosition = window.scrollY; // Update last scroll position
// 	});
// });

$(window).scroll(function () {
	headerScroll();
});
// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
	smooth: true, // Enable smooth scrolling
	duration: 1.2 // Adjust the duration for a smoother feel
  });
  
  // RequestAnimationFrame to sync Lenis updates with the scroll position
  function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  
  // Function to update the translateY position of each container element based on scroll
  const container = document.querySelectorAll(".scroll-used-section");
  
  const mainFunction = (scrollY) => {
	container.forEach((elm, i) => {
	  // Use translateY for smooth, GPU-accelerated scrolling without layout shifts
	  const translateYValue = -i * 100 + (scrollY / window.innerHeight) * 100;
	  elm.style.transform = `translateY(${translateYValue}vh)`;
	});
  };
  
  // Sync Lenis with the main function to get smooth updates without flickering
  lenis.on("scroll", ({ scroll }) => {
	mainFunction(scroll);
  });
  
  // Auto-scroll function
  const autoScroll = () => {
	const halfWindowHeight = window.innerHeight;
  
	// Scroll to half the window height
	lenis.scrollTo(halfWindowHeight, { duration: 0.5, easing: (t) => t });
  
	// After a delay, scroll back to the top
	setTimeout(() => {
	  lenis.scrollTo(0, { duration: 1.5, easing: (t) => t });
	}, 800); // Adjust delay as needed
  };
  
  // Start auto-scroll after a short delay
  setTimeout(autoScroll, 1000); // Start auto-scrolling after 1 second