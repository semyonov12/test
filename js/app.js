document.addEventListener("DOMContentLoaded", function (e) {

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



