
document.addEventListener("DOMContentLoaded", function (e) {

		/* Проверка мобильного браузера */
		let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
	
		// Добавление класса _touch для HTML если браузер мобильный
		if (isMobile.any()) document.documentElement.classList.add('touch');

	function fullVHfix() {
		const fullScreens = document.querySelectorAll('[data-fullscreen]');
		if (fullScreens.length && isMobile.any()) {
			window.addEventListener('resize', fixHeight);
			function fixHeight() {
				let vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty('--vh', `${vh}px`);
			}
			fixHeight();
		}
	}
	
	
	fullVHfix();
	

	// бургер меню
	let burger = document.querySelector(".burger-menu");
	let close = document.querySelector(".menu__close");
	let documentBody = document.documentElement;

	function menuOpen() {
		documentBody.classList.add("lock");
		documentBody.classList.add("menu-open");
	};

	function menuClose() {
		documentBody.classList.remove("menu-open");
		documentBody.classList.remove("lock");
	};


	if (burger) {
		burger.addEventListener("click", function () {
			menuOpen();
		});
	}

	if (close) {
		close.addEventListener("click", function () {
			menuClose();
		});
	}

	/// прокрутка к блоку
	const smoothLink = document.querySelector('.hero__button');

	smoothLink?.addEventListener('click', function (e) {
		e.preventDefault();

		document.querySelector('.works').scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	});



	const items = document.querySelector('[data-iso-items]');

	if (items) {
		const itemsGrid = new Isotope(items, {
			itemSelector: '[data-iso-item]',
			percentPosition: true,
			masonry: {
				columnWidth: '[data-iso-item]'
				//fitWidth: true,
				//gutter: 50
			}
		});

		document.querySelectorAll('.works__title').forEach(el => {
		el.addEventListener('click', (e) => {
			let filter = e.currentTarget.dataset.filter;

			// Filter items using Isotope
			itemsGrid.arrange({ filter: `${filter}` });

			// Update filter-active class
			document.querySelectorAll('.works__title').forEach(btn => btn.classList.remove('filter-active'));
			el.classList.add('filter-active');

			// Update data-fancybox attribute
			document.querySelectorAll('[data-iso-item]').forEach(item => {
				if (item.matches(filter)) {
					item.setAttribute('data-fancybox', 'gallery');
				} else {
					item.removeAttribute('data-fancybox');
				}
			});
		});
	});
	}

	Fancybox.bind("[data-fancybox]", {
		  Images: {
			zoom: false,
		  },
	  });

});



