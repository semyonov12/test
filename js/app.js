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

	// Получение хеша в адресе сайта
	function getHash() {
		if (location.hash) { return location.hash.replace('#', ''); }
	}
	// Модуль плавной проктутки к блоку
	let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
		const targetBlockElement = document.querySelector(targetBlock);
		if (targetBlockElement) {
			let headerItem = '';
			let headerItemHeight = 0;
			if (noHeader) {
				headerItem = 'header.header';
				headerItemHeight = document.querySelector(headerItem).offsetHeight;
			}
			let options = {
				speedAsDuration: true,
				speed: speed,
				header: headerItem,
				offset: offsetTop,
				easing: 'easeOutQuad',
			};
			// Закрываем меню, если оно открыто
			document.querySelector('html').classList.contains("menu-open") ? menuClose() : null;

			if (typeof SmoothScroll !== 'undefined') {
				// Прокрутка с использованием дополнения
				new SmoothScroll().animateScroll(targetBlockElement, '', options);
			} else {
				// Прокрутка стандартными средствами
				let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
				targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
				targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
				window.scrollTo({
					top: targetBlockElementPosition,
					behavior: "smooth"
				});
			}
		}
	};
	// Плавная навигация по странице
	function pageNavigation() {
		// data-goto - указать ID блока
		// data-goto-header - учитывать header
		// data-goto-top - недокрутить на указанный размер
		// data-goto-speed - скорость (только если используется доп плагин)
		// Работаем при клике на пункт
		document.addEventListener("click", pageNavigationAction);
		// Если подключен scrollWatcher, подсвечиваем текущий пукт меню
		document.addEventListener("watcherCallback", pageNavigationAction);
		// Основная функция
		function pageNavigationAction(e) {
			if (e.type === "click") {
				const targetElement = e.target;
				if (targetElement.closest('[data-goto]')) {
					const gotoLink = targetElement.closest('[data-goto]');
					const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : '';
					const noHeader = gotoLink.hasAttribute('data-goto-header') ? true : false;
					const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
					const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
					gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
					e.preventDefault();
				}
			} else if (e.type === "watcherCallback" && e.detail) {
				const entry = e.detail.entry;
				const targetElement = entry.target;
				// Обработка пунктов навигации, если указано значение navigator подсвечиваем текущий пукт меню
				if (targetElement.dataset.watch === 'navigator') {
					const navigatorActiveItem = document.querySelector(`[data-goto]._navigator-active`);
					let navigatorCurrentItem;
					if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) {
						navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`);
					} else if (targetElement.classList.length) {
						for (let index = 0; index < targetElement.classList.length; index++) {
							const element = targetElement.classList[index];
							if (document.querySelector(`[data-goto=".${element}"]`)) {
								navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
								break;
							}
						}
					}
					if (entry.isIntersecting) {
						// Видим объект
						// navigatorActiveItem ? navigatorActiveItem.classList.remove('_navigator-active') : null;
						navigatorCurrentItem ? navigatorCurrentItem.classList.add('_navigator-active') : null;
					} else {
						// Не видим объект
						navigatorCurrentItem ? navigatorCurrentItem.classList.remove('_navigator-active') : null;
					}
				}
			}
		}
		// Прокрутка по хешу
		if (getHash()) {
			let goToHash;
			if (document.querySelector(`#${getHash()}`)) {
				goToHash = `#${getHash()}`;
			} else if (document.querySelector(`.${getHash()}`)) {
				goToHash = `.${getHash()}`;
			}
			goToHash ? gotoBlock(goToHash, true, 500, 20) : null;
		}
	}
	pageNavigation();

	// кнопка наверх

	const up = document.querySelector('.up');

	document.addEventListener("scroll", function (e) {
		if (up) {
			if (scrollY > 200) {
				up.classList.add('up-active');
			} else {
				up.classList.remove('up-active');
			}
		}
	});


});



