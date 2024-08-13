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


	 /* Проверка мобильного браузера */
	 let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
	 // Добавление класса _touch для HTML если браузер мобильный
	 if (isMobile.any()) document.documentElement.classList.add('touch');
 
	 // Выпадающие меню
	 document.addEventListener("click", function (e) {
		 const targetElement = e.target;
 
		 if (window.innerWidth > 767 && document.documentElement.classList.contains('touch')) {
			 if (targetElement.closest('.menu__wrap')) {
				 targetElement.closest('.menu__item').classList.toggle('hover');
			 }
			 if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item.hover').length) {
				 document.querySelectorAll('.menu__item.hover').forEach(element => {
					 element.classList.remove('hover');
				 });
			 }
		 }

		 if(targetElement.closest('.user-header__heading')) {
			document.querySelector('.user-header').classList.toggle('user-header-open');
		 } else if(!targetElement.closest('.user-header')) {
			document.querySelector('.user-header').classList.remove('user-header-open');
		 }


		 if(targetElement.closest('.table__button')) {
			targetElement.closest('.table__row').classList.toggle('table-open-menu');
		 } else if(!targetElement.closest('.table__menu')) {
			if(document.querySelector('.table__row')) {
				document.querySelector('.table__row').classList.remove('table-open-menu');
			}
		 }
	 });


	 const inputSearch = document.querySelector('.form-data__search-input');

	 inputSearch?.addEventListener("focus", function (e) {
		inputSearch.closest('.form-data').classList.add('list-open');
	 });

	 inputSearch?.addEventListener("blur", function (e) {
		inputSearch.closest('.form-data').classList.remove('list-open');
	 });




	 const inputs = document.querySelectorAll('#code .popup__input');

	 inputs.forEach((input, index) => {
		 input.setAttribute('maxlength', 1);
		 input.setAttribute('autocomplete', 'off');
 
		 input.addEventListener('input', function() {
			 if (input.value.length >= input.maxLength && index < inputs.length - 1) {
				 inputs[index + 1].focus();
			 }
		 });
	 });

	 

	//  function initSimpleBar() {
	// 	const element = document.querySelector('.courses-hero');

	// 	// Уничтожить SimpleBar, если он уже инициализирован
	// 	if (element.SimpleBar) {
	// 		element.SimpleBar.unMount();
	// 	}

	// 	// Инициализировать SimpleBar, если ширина окна больше 992 пикселей
	// 	if (window.innerWidth > 992) {
	// 		new SimpleBar(element, { autoHide: false });
	// 	}
	// }

	// window.addEventListener('resize', initSimpleBar);
	// initSimpleBar();  // Инициализируем при первой загрузке страницы


	// Dynamic Adapt v.1
	// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
	// e.x. data-da=".item,992,2"

	function DynamicAdapt(type) {
		this.type = type;
	}
	DynamicAdapt.prototype.init = function () {
		const _this = this;
		// массив объектов
		this.оbjects = [];
		this.daClassname = "_dynamic_adapt_";
		// массив DOM-элементов
		this.nodes = document.querySelectorAll("[data-da]");
		// наполнение оbjects объктами
		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.nodes[i];
			const data = node.dataset.da.trim();
			const dataArray = data.split(",");
			const оbject = {};
			оbject.element = node;
			оbject.parent = node.parentNode;
			оbject.destination = document.querySelector(dataArray[0].trim());
			оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
			оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.оbjects.push(оbject);
		}
		this.arraySort(this.оbjects);
		// массив уникальных медиа-запросов
		this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
			return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
		}, this);
		this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
			return Array.prototype.indexOf.call(self, item) === index;
		});
		// навешивание слушателя на медиа-запрос
		// и вызов обработчика при первом запуске
		for (let i = 0; i < this.mediaQueries.length; i++) {
			const media = this.mediaQueries[i];
			const mediaSplit = String.prototype.split.call(media, ',');
			const matchMedia = window.matchMedia(mediaSplit[0]);
			const mediaBreakpoint = mediaSplit[1];
			// массив объектов с подходящим брейкпоинтом
			const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
				return item.breakpoint === mediaBreakpoint;
			});
			matchMedia.addListener(function () {
				_this.mediaHandler(matchMedia, оbjectsFilter);
			});
			this.mediaHandler(matchMedia, оbjectsFilter);
		}
	};
	DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
		if (matchMedia.matches) {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				оbject.index = this.indexInParent(оbject.parent, оbject.element);
				this.moveTo(оbject.place, оbject.element, оbject.destination);
			}
		} else {
			//for (let i = 0; i < оbjects.length; i++) {
			for (let i = оbjects.length - 1; i >= 0; i--) {
				const оbject = оbjects[i];
				if (оbject.element.classList.contains(this.daClassname)) {
					this.moveBack(оbject.parent, оbject.element, оbject.index);
				}
			}
		}
	};
	// Функция перемещения
	DynamicAdapt.prototype.moveTo = function (place, element, destination) {
		element.classList.add(this.daClassname);
		if (place === 'last' || place >= destination.children.length) {
			destination.insertAdjacentElement('beforeend', element);
			return;
		}
		if (place === 'first') {
			destination.insertAdjacentElement('afterbegin', element);
			return;
		}
		destination.children[place].insertAdjacentElement('beforebegin', element);
	}
	// Функция возврата
	DynamicAdapt.prototype.moveBack = function (parent, element, index) {
		element.classList.remove(this.daClassname);
		if (parent.children[index] !== undefined) {
			parent.children[index].insertAdjacentElement('beforebegin', element);
		} else {
			parent.insertAdjacentElement('beforeend', element);
		}
	}
	// Функция получения индекса внутри родителя
	DynamicAdapt.prototype.indexInParent = function (parent, element) {
		const array = Array.prototype.slice.call(parent.children);
		return Array.prototype.indexOf.call(array, element);
	};
	// Функция сортировки массива по breakpoint и place 
	// по возрастанию для this.type = min
	// по убыванию для this.type = max
	DynamicAdapt.prototype.arraySort = function (arr) {
		if (this.type === "min") {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return -1;
					}

					if (a.place === "last" || b.place === "first") {
						return 1;
					}

					return a.place - b.place;
				}

				return a.breakpoint - b.breakpoint;
			});
		} else {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return 1;
					}

					if (a.place === "last" || b.place === "first") {
						return -1;
					}

					return b.place - a.place;
				}

				return b.breakpoint - a.breakpoint;
			});
			return;
		}
	};
	const da = new DynamicAdapt("max");
	da.init();

	let bodyLockStatus = true;
	let bodyLockToggle = (delay = 500) => {
		if (document.documentElement.classList.contains('lock')) {
			bodyUnlock(delay);
		} else {
			bodyLock(delay);
		}
	}
	let bodyUnlock = (delay = 500) => {
		let body = document.querySelector("body");
		if (bodyLockStatus) {
			let lock_padding = document.querySelectorAll("[data-lp]");
			setTimeout(() => {
				for (let index = 0; index < lock_padding.length; index++) {
					const el = lock_padding[index];
					el.style.paddingRight = '0px';
				}
				body.style.paddingRight = '0px';
				document.documentElement.classList.remove("lock");
			}, delay);
			bodyLockStatus = false;
			setTimeout(function () {
				bodyLockStatus = true;
			}, delay);
		}
	}
	let bodyLock = (delay = 500) => {
		let body = document.querySelector("body");
		if (bodyLockStatus) {
			let lock_padding = document.querySelectorAll("[data-lp]");
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
			}
			body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
			document.documentElement.classList.add("lock");

			bodyLockStatus = false;
			setTimeout(function () {
				bodyLockStatus = true;
			}, delay);
		}
	}

	// Класс Popup
	class Popup {
		constructor(options) {
			let config = {
				logging: true,
				init: true,
				// Для кнопок 
				attributeOpenButton: 'data-popup', // Атрибут для кнопки, которая вызывает попап
				attributeCloseButton: 'data-close', // Атрибут для кнопки, которая закрывает попап
				// Для сторонних объектов
				fixElementSelector: '[data-lp]', // Атрибут для элементов с левым паддингом (которые fixed)
				// Для объекта попапа
				youtubeAttribute: 'data-popup-youtube', // Атрибут для кода youtube
				youtubePlaceAttribute: 'data-popup-youtube-place', // Атрибут для вставки ролика youtube
				setAutoplayYoutube: true,
				// Изменение классов
				classes: {
					popup: 'popup',
					// popupWrapper: 'popup__wrapper',
					popupContent: 'popup__content',
					popupActive: 'popup_show', // Добавляется для попапа, когда он открывается
					bodyActive: 'popup-show', // Добавляется для боди, когда попап открыт
				},
				focusCatch: true, // Фокус внутри попапа зациклен
				closeEsc: true, // Закрытие по ESC
				bodyLock: true, // Блокировка скролла
				hashSettings: {
					location: true, // Хэш в адресной строке
					goHash: true, // Переход по наличию в адресной строке
				},
				on: { // События
					beforeOpen: function () { },
					afterOpen: function () { },
					beforeClose: function () { },
					afterClose: function () { },
				},
			}
			this.youTubeCode;
			this.isOpen = false;
			// Текущее окно
			this.targetOpen = {
				selector: false,
				element: false,
			}
			// Предыдущее открытое
			this.previousOpen = {
				selector: false,
				element: false,
			}
			// Последнее закрытое
			this.lastClosed = {
				selector: false,
				element: false,
			}
			this._dataValue = false;
			this.hash = false;

			this._reopen = false;
			this._selectorOpen = false;

			this.lastFocusEl = false;
			this._focusEl = [
				'a[href]',
				'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
				'button:not([disabled]):not([aria-hidden])',
				'select:not([disabled]):not([aria-hidden])',
				'textarea:not([disabled]):not([aria-hidden])',
				'area[href]',
				'iframe',
				'object',
				'embed',
				'[contenteditable]',
				'[tabindex]:not([tabindex^="-"])'
			];
			//this.options = Object.assign(config, options);
			this.options = {
				...config,
				...options,
				classes: {
					...config.classes,
					...options?.classes,
				},
				hashSettings: {
					...config.hashSettings,
					...options?.hashSettings,
				},
				on: {
					...config.on,
					...options?.on,
				}
			}
			this.bodyLock = false;
			this.options.init ? this.initPopups() : null
		}
		initPopups() {
			this.eventsPopup();
		}
		eventsPopup() {
			// Клик на всем документе
			document.addEventListener("click", function (e) {
				// Клик по кнопке "открыть"
				const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
				if (buttonOpen) {
					e.preventDefault();
					this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ?
						buttonOpen.getAttribute(this.options.attributeOpenButton) :
						'error';
					this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ?
						buttonOpen.getAttribute(this.options.youtubeAttribute) :
						null;
					if (this._dataValue !== 'error') {
						if (!this.isOpen) this.lastFocusEl = buttonOpen;
						this.targetOpen.selector = `${this._dataValue}`;
						this._selectorOpen = true;
						this.open();
						return;

					}

					return;
				}
				// Закрытие на пустом месте (popup__wrapper) и кнопки закрытия (popup__close) для закрытия
				const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
				if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
					e.preventDefault();
					this.close();
					return;
				}
			}.bind(this));
			// Закрытие по ESC
			document.addEventListener("keydown", function (e) {
				if (this.options.closeEsc && e.which == 27 && e.code === 'Escape' && this.isOpen) {
					e.preventDefault();
					this.close();
					return;
				}
				if (this.options.focusCatch && e.which == 9 && this.isOpen) {
					this._focusCatch(e);
					return;
				}
			}.bind(this))

			// Открытие по хешу
			if (this.options.hashSettings.goHash) {
				// Проверка изменения адресной строки
				window.addEventListener('hashchange', function () {
					if (window.location.hash) {
						this._openToHash();
					} else {
						this.close(this.targetOpen.selector);
					}
				}.bind(this))

				window.addEventListener('load', function () {
					if (window.location.hash) {
						this._openToHash();
					}
				}.bind(this))
			}
		}
		open(selectorValue) {
			if (bodyLockStatus) {
				// Если перед открытием попапа был режим lock
				this.bodyLock = document.documentElement.classList.contains('lock') ? true : false;

				// Если ввести значение селектора (селектор настраивается в options)
				if (selectorValue && typeof (selectorValue) === "string" && selectorValue.trim() !== "") {
					this.targetOpen.selector = selectorValue;
					this._selectorOpen = true;
				}
				if (this.isOpen) {
					this._reopen = true;
					this.close();
				}
				if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
				if (!this._reopen) this.previousActiveElement = document.activeElement;

				this.targetOpen.element = document.querySelector(this.targetOpen.selector);

				if (this.targetOpen.element) {
					// YouTube
					if (this.youTubeCode) {
						const codeVideo = this.youTubeCode;
						const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`
						const iframe = document.createElement('iframe');
						iframe.setAttribute('allowfullscreen', '');

						const autoplay = this.options.setAutoplayYoutube ? 'autoplay;' : '';
						iframe.setAttribute('allow', `${autoplay}; encrypted-media`);

						iframe.setAttribute('src', urlVideo);

						if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
							const youtubePlace = this.targetOpen.element.querySelector('.popup__text').setAttribute(`${this.options.youtubePlaceAttribute}`, '');
						}
						this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
					}
					if (this.options.hashSettings.location) {
						// Получение хэша и его выставление 
						this._getHash();
						this._setHash();
					}

					// До открытия
					this.options.on.beforeOpen(this);
					// Создаем свое событие после открытия попапа
					document.dispatchEvent(new CustomEvent("beforePopupOpen", {
						detail: {
							popup: this
						}
					}));

					this.targetOpen.element.classList.add(this.options.classes.popupActive);
					document.documentElement.classList.add(this.options.classes.bodyActive);

					if (!this._reopen) {
						!this.bodyLock ? bodyLock() : null;
					}
					else this._reopen = false;

					this.targetOpen.element.setAttribute('aria-hidden', 'false');

					// Запоминаю это открытое окно. Оно будет последним открытым
					this.previousOpen.selector = this.targetOpen.selector;
					this.previousOpen.element = this.targetOpen.element;

					this._selectorOpen = false;

					this.isOpen = true;

					setTimeout(() => {
						this._focusTrap();
					}, 50);

					// После открытия
					this.options.on.afterOpen(this);
					// Создаем свое событие после открытия попапа
					document.dispatchEvent(new CustomEvent("afterPopupOpen", {
						detail: {
							popup: this
						}
					}));

				}
			}
		}
		close(selectorValue) {
			if (selectorValue && typeof (selectorValue) === "string" && selectorValue.trim() !== "") {
				this.previousOpen.selector = selectorValue;
			}
			if (!this.isOpen || !bodyLockStatus) {
				return;
			}
			// До закрытия
			this.options.on.beforeClose(this);
			// Создаем свое событие перед закрытием попапа
			document.dispatchEvent(new CustomEvent("beforePopupClose", {
				detail: {
					popup: this
				}
			}));

			// YouTube
			if (this.youTubeCode) {
				if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`))
					this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = '';
			}
			this.previousOpen.element.classList.remove(this.options.classes.popupActive);
			// aria-hidden
			this.previousOpen.element.setAttribute('aria-hidden', 'true');
			if (!this._reopen) {
				document.documentElement.classList.remove(this.options.classes.bodyActive);
				!this.bodyLock ? bodyUnlock() : null;
				this.isOpen = false;
			}
			// Очищение адресной строки
			this._removeHash();
			if (this._selectorOpen) {
				this.lastClosed.selector = this.previousOpen.selector;
				this.lastClosed.element = this.previousOpen.element;

			}
			// После закрытия
			this.options.on.afterClose(this);
			// Создаем свое событие после закрытия попапа
			document.dispatchEvent(new CustomEvent("afterPopupClose", {
				detail: {
					popup: this
				}
			}));

			setTimeout(() => {
				this._focusTrap();
			}, 50);
		}
		// Получение хэша 
		_getHash() {
			if (this.options.hashSettings.location) {
				this.hash = this.targetOpen.selector.includes('#') ?
					this.targetOpen.selector : this.targetOpen.selector.replace('.', '#')
			}
		}
		_openToHash() {
			let classInHash = document.querySelector(`.${window.location.hash.replace('#', '')}`) ? `.${window.location.hash.replace('#', '')}` :
				document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` :
					null;

			const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace('.', "#")}"]`);
			if (buttons && classInHash) this.open(classInHash);
		}
		// Утсановка хэша
		_setHash() {
			history.pushState('', '', this.hash);
		}
		_removeHash() {
			history.pushState('', '', window.location.href.split('#')[0])
		}
		_focusCatch(e) {
			const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
			const focusArray = Array.prototype.slice.call(focusable);
			const focusedIndex = focusArray.indexOf(document.activeElement);

			if (e.shiftKey && focusedIndex === 0) {
				focusArray[focusArray.length - 1].focus();
				e.preventDefault();
			}
			if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
				focusArray[0].focus();
				e.preventDefault();
			}
		}
		_focusTrap() {
			const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
			if (!this.isOpen && this.lastFocusEl) {
				this.lastFocusEl.focus();
			} else {
				focusable[0].focus();
			}
		}

	}

	// Запускаем и добавляем в переменную
	let popupItem = new Popup({});
	//popupItem.open('#popup');


	//Слайдеры
	function initSliders() {
		if (document.querySelector('.hero__slider')) {
			new Swiper('.hero__slider', {
				observer: true,
				observeParents: true,
				slidesPerView: 1,
				spaceBetween: 0,
				autoHeight: false,
				centeredSlides: false,
				
				// Эффекты
				effect: 'fade',
				/*
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},
				*/

				// Пагинация

				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				breakpoints: {
					320: {
						autoHeight: true,
						speed: 0,
					},
					993: {
						autoHeight: false,
						speed: 300,
					},
				},
			});
			
		}
	}

	window.addEventListener("load", function (e) {
		// Запуск инициализации слайдеров
		initSliders();
	});

	// Вспомогательные модули плавного расскрытия и закрытия объекта ======================================================================================================================================================================
	let _slideUp = (target, duration = 500, showmore = 0) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = `${target.offsetHeight}px`;
			target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = showmore ? `${showmore}px` : `0px`;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout(() => {
				target.hidden = !showmore ? true : false;
				!showmore ? target.style.removeProperty('height') : null;
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				!showmore ? target.style.removeProperty('overflow') : null;
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
				// Создаем событие 
				document.dispatchEvent(new CustomEvent("slideUpDone", {
					detail: {
						target: target
					}
				}));
			}, duration);
		}
	}
	let _slideDown = (target, duration = 500, showmore = 0) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.hidden = target.hidden ? false : null;
			showmore ? target.style.removeProperty('height') : null;
			let height = target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = showmore ? `${showmore}px` : `0px`;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + 'ms';
			target.style.height = height + 'px';
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			window.setTimeout(() => {
				target.style.removeProperty('height');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
				// Создаем событие 
				document.dispatchEvent(new CustomEvent("slideDownDone", {
					detail: {
						target: target
					}
				}));
			}, duration);
		}
	}
	let _slideToggle = (target, duration = 500) => {
		if (target.hidden) {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}

	// Обработа медиа запросов из атрибутов 
	function dataMediaQueries(array, dataSetValue) {
		// Получение объектов с медиа запросами
		const media = Array.from(array).filter(function (item, index, self) {
			if (item.dataset[dataSetValue]) {
				return item.dataset[dataSetValue].split(",")[0];
			}
		});
		// Инициализация объектов с медиа запросами
		if (media.length) {
			const breakpointsArray = [];
			media.forEach(item => {
				const params = item.dataset[dataSetValue];
				const breakpoint = {};
				const paramsArray = params.split(",");
				breakpoint.value = paramsArray[0];
				breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
				breakpoint.item = item;
				breakpointsArray.push(breakpoint);
			});
			// Получаем уникальные брейкпоинты
			let mdQueries = breakpointsArray.map(function (item) {
				return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
			});
			mdQueries = uniqArray(mdQueries);
			const mdQueriesArray = [];

			if (mdQueries.length) {
				// Работаем с каждым брейкпоинтом
				mdQueries.forEach(breakpoint => {
					const paramsArray = breakpoint.split(",");
					const mediaBreakpoint = paramsArray[1];
					const mediaType = paramsArray[2];
					const matchMedia = window.matchMedia(paramsArray[0]);
					// Объекты с нужными условиями
					const itemsArray = breakpointsArray.filter(function (item) {
						if (item.value === mediaBreakpoint && item.type === mediaType) {
							return true;
						}
					});
					mdQueriesArray.push({
						itemsArray,
						matchMedia
					})
				});
				return mdQueriesArray;
			}
		}
	}

	// Уникализация массива
	function uniqArray(array) {
		return array.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});
	}



	const spollersArray = document.querySelectorAll('[data-spollers]');
	if (spollersArray.length > 0) {
		// Получение обычных слойлеров
		const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
			return !item.dataset.spollers.split(",")[0];
		});
		// Инициализация обычных слойлеров
		if (spollersRegular.length) {
			initSpollers(spollersRegular);
		}
		// Получение слойлеров с медиа запросами
		let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
		if (mdQueriesArray && mdQueriesArray.length) {
			mdQueriesArray.forEach(mdQueriesItem => {
				// Событие
				mdQueriesItem.matchMedia.addEventListener("change", function () {
					initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
				});
				initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
			});
		}
		// Инициализация
		function initSpollers(spollersArray, matchMedia = false) {
			spollersArray.forEach(spollersBlock => {
				spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
				if (matchMedia.matches || !matchMedia) {
					spollersBlock.classList.add('_spoller-init');
					initSpollerBody(spollersBlock);
					spollersBlock.addEventListener("click", setSpollerAction);
				} else {
					spollersBlock.classList.remove('_spoller-init');
					initSpollerBody(spollersBlock, false);
					spollersBlock.removeEventListener("click", setSpollerAction);
				}
			});
		}
		// Работа с контентом
		function initSpollerBody(spollersBlock, hideSpollerBody = true) {
			let spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
			if (spollerTitles.length) {
				spollerTitles = Array.from(spollerTitles).filter(item => item.closest('[data-spollers]') === spollersBlock);
				spollerTitles.forEach(spollerTitle => {
					if (hideSpollerBody) {
						spollerTitle.removeAttribute('tabindex');
						if (!spollerTitle.classList.contains('_spoller-active')) {
							spollerTitle.nextElementSibling.hidden = true;
						}
					} else {
						spollerTitle.setAttribute('tabindex', '-1');
						spollerTitle.nextElementSibling.hidden = false;
					}
				});
			}
		}
		function setSpollerAction(e) {
			const el = e.target;
			if (el.closest('[data-spoller]')) {
				const spollerTitle = el.closest('[data-spoller]');
				const spollersBlock = spollerTitle.closest('[data-spollers]');
				const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
				const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
				if (!spollersBlock.querySelectorAll('._slide').length) {
					if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
						hideSpollersBody(spollersBlock);
					}
					spollerTitle.classList.toggle('_spoller-active');
					_slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
				}
				e.preventDefault();
			}
		}
		function hideSpollersBody(spollersBlock) {
			const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active');
			const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
			if (spollerActiveTitle && !spollersBlock.querySelectorAll('._slide').length) {
				spollerActiveTitle.classList.remove('_spoller-active');
				_slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
			}
		}
		// Закрытие при клике вне спойлера
		const spollersClose = document.querySelectorAll('[data-spoller-close]');
		if (spollersClose.length) {
			document.addEventListener("click", function (e) {
				const el = e.target;
				if (!el.closest('[data-spollers]')) {
					spollersClose.forEach(spollerClose => {
						const spollersBlock = spollerClose.closest('[data-spollers]');
						const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
						spollerClose.classList.remove('_spoller-active');
						_slideUp(spollerClose.nextElementSibling, spollerSpeed);
					});
				}
			});
		}
	}

	// Класс построения Select
	class SelectConstructor {
		constructor(props, data = null) {
			let defaultConfig = {
				init: true,
				logging: true,
				speed: 150
			}
			this.config = Object.assign(defaultConfig, props);
			this.selectClasses = {
				classSelect: "select",
				classSelectBody: "select__body",
				classSelectTitle: "select__title",
				classSelectValue: "select__value",
				classSelectLabel: "select__label",
				classSelectInput: "select__input",
				classSelectText: "select__text",
				classSelectLink: "select__link",
				classSelectOptions: "select__options",
				classSelectOptionsScroll: "select__scroll",
				classSelectOption: "select__option",
				classSelectContent: "select__content",
				classSelectRow: "select__row",
				classSelectData: "select__asset",
				classSelectDisabled: "_select-disabled",
				classSelectTag: "_select-tag",
				classSelectOpen: "_select-open",
				classSelectActive: "_select-active",
				classSelectFocus: "_select-focus",
				classSelectMultiple: "_select-multiple",
				classSelectCheckBox: "_select-checkbox",
				classSelectOptionSelected: "_select-selected",
				classSelectPseudoLabel: "_select-pseudo-label",
			}
			this._this = this;
			if (this.config.init) {
				const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll('select');
				if (selectItems.length) {
					this.selectsInit(selectItems);
				}
			}
		}
		getSelectClass(className) {
			return `.${className}`;
		}

		getSelectElement(selectItem, className) {
			return {
				originalSelect: selectItem.querySelector('select'),
				selectElement: selectItem.querySelector(this.getSelectClass(className)),
			}
		}

		selectsInit(selectItems) {
			selectItems.forEach((originalSelect, index) => {
				this.selectInit(originalSelect, index + 1);
			});

			document.addEventListener('click', function (e) {
				this.selectsActions(e);
			}.bind(this));

			document.addEventListener('keydown', function (e) {
				this.selectsActions(e);
			}.bind(this));

			document.addEventListener('focusin', function (e) {
				this.selectsActions(e);
			}.bind(this));

			document.addEventListener('focusout', function (e) {
				this.selectsActions(e);
			}.bind(this));
		}

		selectInit(originalSelect, index) {
			const _this = this;

			let selectItem = document.createElement("div");
			selectItem.classList.add(this.selectClasses.classSelect);

			originalSelect.parentNode.insertBefore(selectItem, originalSelect);

			selectItem.appendChild(originalSelect);

			originalSelect.hidden = true;

			index ? originalSelect.dataset.id = index : null;


			if (this.getSelectPlaceholder(originalSelect)) {

				originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;

				if (this.getSelectPlaceholder(originalSelect).label.show) {
					const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
					selectItemTitle.insertAdjacentHTML('afterbegin', `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
				}
			}

			selectItem.insertAdjacentHTML('beforeend', `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);

			this.selectBuild(originalSelect);


			originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : this.config.speed;
			this.config.speed = +originalSelect.dataset.speed;

			originalSelect.addEventListener('change', function (e) {
				_this.selectChange(e);
			});
		}
		selectBuild(originalSelect) {
			const selectItem = originalSelect.parentElement;

			selectItem.dataset.id = originalSelect.dataset.id;

			originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;

			originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);

			originalSelect.hasAttribute('data-checkbox') && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);

			this.setSelectTitleValue(selectItem, originalSelect);

			this.setOptions(selectItem, originalSelect);

			originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;

			originalSelect.hasAttribute('data-open') ? this.selectAction(selectItem) : null;

			this.selectDisabled(selectItem, originalSelect);
		}

		selectsActions(e) {
			const targetElement = e.target;
			const targetType = e.type;
			if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
				const selectItem = targetElement.closest('.select') ? targetElement.closest('.select') : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
				const originalSelect = this.getSelectElement(selectItem).originalSelect;
				if (targetType === 'click') {
					if (!originalSelect.disabled) {
						if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {

							const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
							const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
							this.optionAction(selectItem, originalSelect, optionItem);
						} else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) {

							this.selectAction(selectItem);
						} else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {

							const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
							this.optionAction(selectItem, originalSelect, optionItem);
						}
					}
				} else if (targetType === 'focusin' || targetType === 'focusout') {
					if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) {
						targetType === 'focusin' ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
					}
				} else if (targetType === 'keydown' && e.code === 'Escape') {
					this.selectsСlose();
				}
			} else {
				this.selectsСlose();
			}
		}

		selectsСlose(selectOneGroup) {
			const selectsGroup = selectOneGroup ? selectOneGroup : document;
			const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
			if (selectActiveItems.length) {
				selectActiveItems.forEach(selectActiveItem => {
					this.selectСlose(selectActiveItem);
				});
			}
		}
		selectСlose(selectItem) {
			const originalSelect = this.getSelectElement(selectItem).originalSelect;
			const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
			if (!selectOptions.classList.contains('_slide')) {
				selectItem.classList.remove(this.selectClasses.classSelectOpen);
				_slideUp(selectOptions, originalSelect.dataset.speed);
				setTimeout(() => {
					selectItem.style.zIndex = '';
				}, originalSelect.dataset.speed);
			}
		}
		selectAction(selectItem) {
			const originalSelect = this.getSelectElement(selectItem).originalSelect;
			const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
			const selectOpenzIndex = originalSelect.dataset.zIndex ? originalSelect.dataset.zIndex : 3;

			this.setOptionsPosition(selectItem);

			if (originalSelect.closest('[data-one-select]')) {
				const selectOneGroup = originalSelect.closest('[data-one-select]');
				this.selectsСlose(selectOneGroup);
			}

			setTimeout(() => {
				if (!selectOptions.classList.contains('_slide')) {
					selectItem.classList.toggle(this.selectClasses.classSelectOpen);
					_slideToggle(selectOptions, originalSelect.dataset.speed);

					if (selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
						selectItem.style.zIndex = selectOpenzIndex;
					} else {
						setTimeout(() => {
							selectItem.style.zIndex = '';
						}, originalSelect.dataset.speed);
					}
				}
			}, 0);
		}
		setSelectTitleValue(selectItem, originalSelect) {
			const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
			const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
			if (selectItemTitle) selectItemTitle.remove();
			selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
			originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;
		}
		getSelectTitleValue(selectItem, originalSelect) {
			let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
			if (originalSelect.multiple && originalSelect.hasAttribute('data-tags')) {
				selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map(option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`).join('');

				if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
					document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
					if (originalSelect.hasAttribute('data-search')) selectTitleValue = false;
				}
			}
			selectTitleValue = selectTitleValue.length ? selectTitleValue : (originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : '');
			let pseudoAttribute = '';
			let pseudoAttributeClass = '';
			if (originalSelect.hasAttribute('data-pseudo-label')) {
				pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заповніть атрибут"`;
				pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
			}
			this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
			if (originalSelect.hasAttribute('data-search')) {
				return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
			} else {
				const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : '';
				return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
			}
		}

		getSelectElementContent(selectOption) {
			const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : '';
			const selectOptionDataHTML = selectOptionData.indexOf('img') >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
			let selectOptionContentHTML = ``;
			selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : '';
			selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : '';
			selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : '';
			selectOptionContentHTML += selectOptionData ? `</span>` : '';
			selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : '';
			selectOptionContentHTML += selectOption.textContent;
			selectOptionContentHTML += selectOptionData ? `</span>` : '';
			selectOptionContentHTML += selectOptionData ? `</span>` : '';
			return selectOptionContentHTML;
		}
		getSelectPlaceholder(originalSelect) {
			const selectPlaceholder = Array.from(originalSelect.options).find(option => !option.value);
			if (selectPlaceholder) {
				return {
					value: selectPlaceholder.textContent,
					show: selectPlaceholder.hasAttribute("data-show"),
					label: {
						show: selectPlaceholder.hasAttribute("data-label"),
						text: selectPlaceholder.dataset.label
					}
				}
			}
		}
		getSelectedOptionsData(originalSelect, type) {
			let selectedOptions = [];
			if (originalSelect.multiple) {
				selectedOptions = Array.from(originalSelect.options).filter(option => option.value).filter(option => option.selected);
			} else {

				selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
			}
			return {
				elements: selectedOptions.map(option => option),
				values: selectedOptions.filter(option => option.value).map(option => option.value),
				html: selectedOptions.map(option => this.getSelectElementContent(option))
			}
		}

		getOptions(originalSelect) {
			const selectOptionsScroll = originalSelect.hasAttribute('data-scroll') ? `data-simplebar` : '';
			const customMaxHeightValue = +originalSelect.dataset.scroll ? +originalSelect.dataset.scroll : null;
			let selectOptions = Array.from(originalSelect.options);
			if (selectOptions.length > 0) {
				let selectOptionsHTML = ``;

				if ((this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show) || originalSelect.multiple) {
					selectOptions = selectOptions.filter(option => option.value);
				}

				selectOptionsHTML += `<div ${selectOptionsScroll} ${selectOptionsScroll ? `style="max-height: ${customMaxHeightValue}px"` : ''} class="${this.selectClasses.classSelectOptionsScroll}">`;
				selectOptions.forEach(selectOption => {

					selectOptionsHTML += this.getOption(selectOption, originalSelect);
				});
				selectOptionsHTML += `</div>`;
				return selectOptionsHTML;
			}
		}

		getOption(selectOption, originalSelect) {

			const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : '';

			const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute('data-show-selected') && !originalSelect.multiple ? `hidden` : ``;

			const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : '';

			const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
			const selectOptionLinkTarget = selectOption.hasAttribute('data-href-blank') ? `target="_blank"` : '';

			let selectOptionHTML = ``;
			selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
			selectOptionHTML += this.getSelectElementContent(selectOption);
			selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
			return selectOptionHTML;
		}
		setOptions(selectItem, originalSelect) {
			const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
			selectItemOptions.innerHTML = this.getOptions(originalSelect);
		}
		setOptionsPosition(selectItem) {
			const originalSelect = this.getSelectElement(selectItem).originalSelect;
			const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
			const selectItemScroll = this.getSelectElement(selectItem, this.selectClasses.classSelectOptionsScroll).selectElement;
			const customMaxHeightValue = +originalSelect.dataset.scroll ? `${+originalSelect.dataset.scroll}px` : ``;
			const selectOptionsPosMargin = +originalSelect.dataset.optionsMargin ? +originalSelect.dataset.optionsMargin : 10;

			if (!selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
				selectOptions.hidden = false;
				const selectItemScrollHeight = selectItemScroll.offsetHeight ? selectItemScroll.offsetHeight : parseInt(window.getComputedStyle(selectItemScroll).getPropertyValue('max-height'));
				const selectOptionsHeight = selectOptions.offsetHeight > selectItemScrollHeight ? selectOptions.offsetHeight : selectItemScrollHeight + selectOptions.offsetHeight;
				const selectOptionsScrollHeight = selectOptionsHeight - selectItemScrollHeight;
				selectOptions.hidden = true;

				const selectItemHeight = selectItem.offsetHeight;
				const selectItemPos = selectItem.getBoundingClientRect().top;
				const selectItemTotal = selectItemPos + selectOptionsHeight + selectItemHeight + selectOptionsScrollHeight;
				const selectItemResult = window.innerHeight - (selectItemTotal + selectOptionsPosMargin);

				if (selectItemResult < 0) {
					const newMaxHeightValue = selectOptionsHeight + selectItemResult;
					if (newMaxHeightValue < 100) {
						selectItem.classList.add('select--show-top');
						selectItemScroll.style.maxHeight = selectItemPos < selectOptionsHeight ? `${selectItemPos - (selectOptionsHeight - selectItemPos)}px` : customMaxHeightValue;
					} else {
						selectItem.classList.remove('select--show-top');
						selectItemScroll.style.maxHeight = `${newMaxHeightValue}px`;
					}
				}
			} else {
				setTimeout(() => {
					selectItem.classList.remove('select--show-top');
					selectItemScroll.style.maxHeight = customMaxHeightValue;
				}, +originalSelect.dataset.speed);
			}
		}

		optionAction(selectItem, originalSelect, optionItem) {
			const selectOptions = selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOptions)}`);
			if (!selectOptions.classList.contains('_slide')) {
				if (originalSelect.multiple) {

					optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);

					const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
					originalSelectSelectedItems.forEach(originalSelectSelectedItem => {
						originalSelectSelectedItem.removeAttribute('selected');
					});

					const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
					selectSelectedItems.forEach(selectSelectedItems => {
						originalSelect.querySelector(`option[value = "${selectSelectedItems.dataset.value}"]`).setAttribute('selected', 'selected');
					});
				} else {

					if (!originalSelect.hasAttribute('data-show-selected')) {
						setTimeout(() => {
							if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) {
								selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
							}
							optionItem.hidden = true;
						}, this.config.speed);
					}
					originalSelect.value = optionItem.hasAttribute('data-value') ? optionItem.dataset.value : optionItem.textContent;
					this.selectAction(selectItem);
				}

				this.setSelectTitleValue(selectItem, originalSelect);

				this.setSelectChange(originalSelect);
			}
		}

		selectChange(e) {
			const originalSelect = e.target;
			this.selectBuild(originalSelect);
			this.setSelectChange(originalSelect);
		}

		setSelectChange(originalSelect) {

			if (originalSelect.hasAttribute('data-validate')) {
				formValidate.validateInput(originalSelect);
			}

			if (originalSelect.hasAttribute('data-submit') && originalSelect.value) {
				let tempButton = document.createElement("button");
				tempButton.type = "submit";
				originalSelect.closest('form').append(tempButton);
				tempButton.click();
				tempButton.remove();
			}
			const selectItem = originalSelect.parentElement;

			this.selectCallback(selectItem, originalSelect);
		}
		selectDisabled(selectItem, originalSelect) {
			if (originalSelect.disabled) {
				selectItem.classList.add(this.selectClasses.classSelectDisabled);
				this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
			} else {
				selectItem.classList.remove(this.selectClasses.classSelectDisabled);
				this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
			}
		}
		searchActions(selectItem) {
			const originalSelect = this.getSelectElement(selectItem).originalSelect;
			const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
			const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
			const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption} `);
			const _this = this;
			selectInput.addEventListener("input", function () {
				selectOptionsItems.forEach(selectOptionsItem => {
					if (selectOptionsItem.textContent.toUpperCase().includes(selectInput.value.toUpperCase())) {
						selectOptionsItem.hidden = false;
					} else {
						selectOptionsItem.hidden = true;
					}
				});
				selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
			});
		}
		selectCallback(selectItem, originalSelect) {
			document.dispatchEvent(new CustomEvent("selectCallback", {
				detail: {
					select: originalSelect
				}
			}));
		}

		resetSelect(selectItem, originalSelect) {
			originalSelect.selectedIndex = 0; // Устанавливаем первый элемент в качестве выбранного
			this.setSelectTitleValue(selectItem, originalSelect); // Обновляем заголовок селекта
			this.setSelectChange(originalSelect); // Вызываем обработчик изменения селекта
		}
	}

	let selectConstructor = new SelectConstructor({});

	// document.addEventListener("selectCallback", function (e) {
	// 	// Селект 
	// 	const currentSelect = e.detail.select;
	// });

	//////////////ТАБЫ

	// Обработа медиа запросов из атрибутов 
	function dataMediaQueries(array, dataSetValue) {
		// Получение объектов с медиа запросами
		const media = Array.from(array).filter(function (item, index, self) {
			if (item.dataset[dataSetValue]) {
				return item.dataset[dataSetValue].split(",")[0];
			}
		});
		// Инициализация объектов с медиа запросами
		if (media.length) {
			const breakpointsArray = [];
			media.forEach(item => {
				const params = item.dataset[dataSetValue];
				const breakpoint = {};
				const paramsArray = params.split(",");
				breakpoint.value = paramsArray[0];
				breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
				breakpoint.item = item;
				breakpointsArray.push(breakpoint);
			});
			// Получаем уникальные брейкпоинты
			let mdQueries = breakpointsArray.map(function (item) {
				return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
			});
			mdQueries = uniqArray(mdQueries);
			const mdQueriesArray = [];

			if (mdQueries.length) {
				// Работаем с каждым брейкпоинтом
				mdQueries.forEach(breakpoint => {
					const paramsArray = breakpoint.split(",");
					const mediaBreakpoint = paramsArray[1];
					const mediaType = paramsArray[2];
					const matchMedia = window.matchMedia(paramsArray[0]);
					// Объекты с нужными условиями
					const itemsArray = breakpointsArray.filter(function (item) {
						if (item.value === mediaBreakpoint && item.type === mediaType) {
							return true;
						}
					});
					mdQueriesArray.push({
						itemsArray,
						matchMedia
					})
				});
				return mdQueriesArray;
			}
		}
	}

	// Получение хеша в адресе сайта
	function getHash() {
		if (location.hash) { return location.hash.replace('#', ''); }
	}

	// Указание хеша в адрес сайта
	function setHash(hash) {
		hash = hash ? `#${hash}` : window.location.href.split('#')[0];
		history.pushState('', '', hash);
	}

	function tabs() {
		const tabs = document.querySelectorAll('[data-tabs]');
		let tabsActiveHash = [];

		if (tabs.length > 0) {
			const hash = getHash();
			if (hash && hash.startsWith('tab-')) {
				tabsActiveHash = hash.replace('tab-', '').split('-');
			}
			tabs.forEach((tabsBlock, index) => {
				tabsBlock.classList.add('_tab-init');
				tabsBlock.setAttribute('data-tabs-index', index);
				tabsBlock.addEventListener("click", setTabsAction);
				initTabs(tabsBlock);
			});

			// Получение слойлеров с медиа-запросами
			let mdQueriesArray = dataMediaQueries(tabs, "tabs");
			if (mdQueriesArray && mdQueriesArray.length) {
				mdQueriesArray.forEach(mdQueriesItem => {
					// Подія
					mdQueriesItem.matchMedia.addEventListener("change", function () {
						setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
					});
					setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
				});
			}
		}
		// Установка позиций заголовков
		function setTitlePosition(tabsMediaArray, matchMedia) {
			tabsMediaArray.forEach(tabsMediaItem => {
				tabsMediaItem = tabsMediaItem.item;
				let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
				let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
				let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
				let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
				tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
				tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
				tabsContentItems.forEach((tabsContentItem, index) => {
					if (matchMedia.matches) {
						tabsContent.append(tabsTitleItems[index]);
						tabsContent.append(tabsContentItem);
						tabsMediaItem.classList.add('_tab-spoller');
					} else {
						tabsTitles.append(tabsTitleItems[index]);
						tabsMediaItem.classList.remove('_tab-spoller');
					}
				});
			});
		}
		// Работа с контентом
		function initTabs(tabsBlock) {
			let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
			let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
			const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
			const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

			if (tabsActiveHashBlock) {
				const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
				tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
			}
			if (tabsContent.length) {
				//tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
				//tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
				tabsContent.forEach((tabsContentItem, index) => {
					tabsTitles[index].setAttribute('data-tabs-title', '');
					tabsContentItem.setAttribute('data-tabs-item', '');

					if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
						tabsTitles[index].classList.add('_tab-active');
					}
					tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
				});
			}
		}
		function setTabsStatus(tabsBlock) {
			let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
			let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
			const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
			function isTabsAnamate(tabsBlock) {
				if (tabsBlock.hasAttribute('data-tabs-animate')) {
					return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
				}
			}
			const tabsBlockAnimate = isTabsAnamate(tabsBlock);
			if (tabsContent.length > 0) {
				const isHash = tabsBlock.hasAttribute('data-tabs-hash');
				tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
				tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
				tabsContent.forEach((tabsContentItem, index) => {
					if (tabsTitles[index].classList.contains('_tab-active')) {
						if (tabsBlockAnimate) {
							_slideDown(tabsContentItem, tabsBlockAnimate);
						} else {
							tabsContentItem.hidden = false;
						}
						if (isHash && !tabsContentItem.closest('.popup')) {
							setHash(`tab-${tabsBlockIndex}-${index}`);
						}
					} else {
						if (tabsBlockAnimate) {
							_slideUp(tabsContentItem, tabsBlockAnimate);
						} else {
							tabsContentItem.hidden = true;
						}
					}
				});
			}
		}
		function setTabsAction(e) {
			const el = e.target;
			if (el.closest('[data-tabs-title]')) {
				const tabTitle = el.closest('[data-tabs-title]');
				const tabsBlock = tabTitle.closest('[data-tabs]');
				if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
					let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title]._tab-active');
					tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter(item => item.closest('[data-tabs]') === tabsBlock) : null;
					tabActiveTitle.length ? tabActiveTitle[0].classList.remove('_tab-active') : null;
					tabTitle.classList.add('_tab-active');
					setTabsStatus(tabsBlock);
				}
				e.preventDefault();
			}
		}
	}

	tabs();

	

});



