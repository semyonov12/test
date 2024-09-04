document.addEventListener("DOMContentLoaded", function (e) {

	// бургер меню
	let burger = document.querySelector(".burger-menu");
	let documentBody = document.documentElement;

	function menuOpen() {
		documentBody.classList.toggle("lock");
		documentBody.classList.toggle("menu-open");
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

	// Получение хеша в адресе сайта
	function getHash() {
		if (location.hash) { return location.hash.replace('#', ''); }
	}


	// Работа с шапкой при скроле
	function headerScroll() {
		const header = document.querySelector('header.header');
		const headerShow = header.hasAttribute('data-scroll-show');
		const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
		const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
		let scrollDirection = 0;
		let timer;
		document.addEventListener("scroll", function (e) {
			const scrollTop = window.scrollY;
			clearTimeout(timer);
			if (scrollTop >= startPoint) {
				!header.classList.contains('_header-scroll') ? header.classList.add('_header-scroll') : null;
				if (headerShow) {
					if (scrollTop > scrollDirection) {
						// downscroll code
						header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
					} else {
						// upscroll code
						!header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
					}
					timer = setTimeout(() => {
						!header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
					}, headerShowTimer);
				}
			} else {
				header.classList.contains('_header-scroll') ? header.classList.remove('_header-scroll') : null;
				if (headerShow) {
					header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
				}
			}
			scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
		});
	}

	headerScroll();

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
	
				// Вычисляем прокрутку к центру элемента
				const windowHeight = window.innerHeight;
				const elementHeight = targetBlockElement.offsetHeight;
				const scrollToPosition = targetBlockElementPosition - ((windowHeight / 2) - (elementHeight / 2));
	
				targetBlockElementPosition = headerItemHeight ? scrollToPosition - headerItemHeight : scrollToPosition;
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

});



