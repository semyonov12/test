document.addEventListener("DOMContentLoaded", function (e) {

	// Скролл

	const button = document.querySelector('.hero__icon');

	button?.addEventListener("click", function (e) {
		e.preventDefault();

		document.querySelector('.ready').scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	});


	function rangeInit() {
		const priceSlider = document.querySelector('#range-amount');
		const squareSlider = document.querySelector('#range-holding');
		const depositElement = document.querySelector('#deposit');
		const balanceElement = document.querySelector('#balance');
		const daysElement = document.querySelector('#days');
		const amountElement = document.querySelector('#amount');

		// Функция для форматирования числа с пробелами между тысячами
		function formatNumberWithSpaces(number) {
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		}

		// Функция для расчета баланса и суммы
		function calculateBalanceAndAmount(deposit, days) {
			let sum = deposit * (1.0067 ** days);
			balanceElement.innerHTML = formatNumberWithSpaces(sum.toFixed(0));
			amountElement.innerHTML = formatNumberWithSpaces(parseInt(sum.toFixed(0)) - deposit);
		}

		if (priceSlider && squareSlider) {
			noUiSlider.create(priceSlider, {
				start: [0],
				connect: [true, false],
				range: {
					'min': 0,
					'max': 5000
				}
			});

			noUiSlider.create(squareSlider, {
				start: [0],
				connect: [true, false],
				range: {
					'min': 0,
					'max': 30
				}
			});

			priceSlider.noUiSlider.on('update', function (values) {
				let priceStartValue = parseInt(values[0]);
				depositElement.innerHTML = formatNumberWithSpaces(priceStartValue);
				calculateBalanceAndAmount(priceStartValue, parseInt(daysElement.innerHTML));
			});

			squareSlider.noUiSlider.on('update', function (values) {
				let squareStartValue = parseInt(values[0]);
				daysElement.innerHTML = formatNumberWithSpaces(squareStartValue);
				calculateBalanceAndAmount(parseInt(depositElement.innerHTML), squareStartValue);
			});
		}
	}

	rangeInit();





	// Добавление loaded для HTML после полной загрузки страницы
	function addLoadedClass() {
		if (!document.documentElement.classList.contains('loading')) {
			window.addEventListener("load", function () {
				setTimeout(function () {
					document.documentElement.classList.add('loaded');
				}, 0);
			});
		}
	}

	addLoadedClass();


	function uniqArray(array) {
		return array.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});
	}

	let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };


	// Наблюдатель объектов [всевидещее око]
	// data-watch - можно писать значение для применения кастомного кода
	// data-watch-root - родитель внутри которого налюдать за объектом
	// data-watch-margin - отступ
	// data-watch-threshold - процент показа объекта для срабатывания
	// data-watch-once - наблюдать только один раз
	// _watcher-view - класс который добавляется при появлении объекта

	class ScrollWatcher {
		constructor(props) {
			let defaultConfig = {
				logging: true,
			}
			this.config = Object.assign(defaultConfig, props);
			this.observer;
			!document.documentElement.classList.contains('watcher') ? this.scrollWatcherRun() : null;
		}
		// Обновляем конструктор
		scrollWatcherUpdate() {
			this.scrollWatcherRun();
		}
		// Запускаем конструктор
		scrollWatcherRun() {
			document.documentElement.classList.add('watcher');
			this.scrollWatcherConstructor(document.querySelectorAll('[data-watch]'));
		}
		// Конструктор наблюдателей
		scrollWatcherConstructor(items) {
			if (items.length) {
				// Уникализируем параметры
				let uniqParams = uniqArray(Array.from(items).map(function (item) {
					return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : '0px'}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
				}));
				// Получаем группы объектов с одинаковыми параметрами,
				// создаем настройки, инициализируем наблюдатель
				uniqParams.forEach(uniqParam => {
					let uniqParamArray = uniqParam.split('|');
					let paramsWatch = {
						root: uniqParamArray[0],
						margin: uniqParamArray[1],
						threshold: uniqParamArray[2]
					}
					let groupItems = Array.from(items).filter(function (item) {
						let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
						let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : '0px';
						let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
						if (
							String(watchRoot) === paramsWatch.root &&
							String(watchMargin) === paramsWatch.margin &&
							String(watchThreshold) === paramsWatch.threshold
						) {
							return item;
						}
					});

					let configWatcher = this.getScrollWatcherConfig(paramsWatch);

					// Инициализация наблюдателя со своими настройками
					this.scrollWatcherInit(groupItems, configWatcher);
				});
			}
		}
		// Функция создания настроек
		getScrollWatcherConfig(paramsWatch) {
			// Создаем настройки
			let configWatcher = {}
			// Родитель, внутри которого ведется наблюдение
			if (document.querySelector(paramsWatch.root)) {
				configWatcher.root = document.querySelector(paramsWatch.root);
			}
			// Отступ срабатывания
			configWatcher.rootMargin = paramsWatch.margin;
			// Точки срабатывания
			if (paramsWatch.threshold === 'prx') {
				// Режим параллакса
				paramsWatch.threshold = [];
				for (let i = 0; i <= 1.0; i += 0.005) {
					paramsWatch.threshold.push(i);
				}
			} else {
				paramsWatch.threshold = paramsWatch.threshold.split(',');
			}
			configWatcher.threshold = paramsWatch.threshold;

			return configWatcher;
		}
		// Функция создания нового наблюдателя со своими настройками
		scrollWatcherCreate(configWatcher) {
			this.observer = new IntersectionObserver((entries, observer) => {
				entries.forEach(entry => {
					this.scrollWatcherCallback(entry, observer);
				});
			}, configWatcher);
		}
		// Функция инициализации наблюдателя со своими настройками
		scrollWatcherInit(items, configWatcher) {
			// Создание нового наблюдателя со своими настройками
			this.scrollWatcherCreate(configWatcher);
			// Передача наблюдателю элементов
			items.forEach(item => this.observer.observe(item));
		}
		// Функция обработки базовых действий точек срабатываения
		scrollWatcherIntersecting(entry, targetElement) {
			if (entry.isIntersecting) {
				// Видим объект
				// Добавляем класс
				!targetElement.classList.contains('_watcher-view') ? targetElement.classList.add('_watcher-view') : null;
			} else {
				// Не видим объект
				// Убираем класс
				targetElement.classList.contains('_watcher-view') ? targetElement.classList.remove('_watcher-view') : null;
			}
		}
		// Функция отключения слежения за объектом
		scrollWatcherOff(targetElement, observer) {
			observer.unobserve(targetElement);
		}

		// Функция обработки наблюдения
		scrollWatcherCallback(entry, observer) {
			const targetElement = entry.target;
			// Обработка базовых действий точек срабатываения
			this.scrollWatcherIntersecting(entry, targetElement);
			// Если есть атрибут data-watch-once убираем слежку
			targetElement.hasAttribute('data-watch-once') && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
			// Создаем свое событие отбратной связи
			document.dispatchEvent(new CustomEvent("watcherCallback", {
				detail: {
					entry: entry
				}
			}));

			/*
			// Выбираем нужные объекты
			if (targetElement.dataset.watch === 'some value') {
				// пишем уникальную специфику
			}
			if (entry.isIntersecting) {
				// Видим объект
			} else {
				// Не видим объект
			}
			*/
		}
	}
	// Запускаем и добавляем в переменную
	let scrollWatcher = new ScrollWatcher({});









	// Изначальный угол поворота
	const initialRotation1 = 90;
	const image1 = document.querySelector('.earn__image-1');
	// Функция для обновления угла поворота картинки
	function updateRotation(element, angle) {
		element.style.transform = `rotate(${angle}deg)`;
	}

	// Функция для обработки скролла для первой картинки
	function handleScroll1() {
		let currentRotation = initialRotation1;
	
		return function() {
			// Получаем координаты и размеры картинки
			const rect = image1.getBoundingClientRect();
			const imageHalfHeight = rect.height / 2; // половина высоты картинки относительно окна
	
			// Получаем текущую позицию скролла
			const scrollPosition = window.scrollY || window.pageYOffset;
	
			// Определяем, когда начинать крутить картинку
			const imageOffsetTop = rect.top + scrollPosition;
			const startRotationPosition = imageOffsetTop - window.innerHeight + imageHalfHeight;
	
			// Определяем направление скролла и применяем эффекты
			if (scrollPosition > startRotationPosition) {
				// Скроллим вниз
				if (currentRotation > 0) { // Условие для уменьшения угла поворота до 0 градусов
					currentRotation -= 2; // Уменьшаем угол поворота по часовой стрелке на 1 градус
					updateRotation(image1, currentRotation);
				}
			} else {
				// Скроллим вверх
				if (currentRotation < 90) { // Условие для увеличения угла поворота до 90 градусов
					currentRotation += 2; // Увеличиваем угол поворота против часовой стрелки на 1 градус
					updateRotation(image1, currentRotation);
				}
			}
		};
	}

	// Создаем обработчик события скролла для первой картинки
	const scrollHandler1 = handleScroll1();

	// Добавляем обработчик события скролла
	window.addEventListener('scroll', scrollHandler1);













	// Изначальный угол поворота
	const initialRotation2 = -90;
	const image2 = document.querySelector('.earn__image-2');

	// Функция для обработки скролла для второй картинки
	function handleScroll2() {
		let currentRotation = initialRotation2;

		return function () {
			// Получаем координаты и размеры картинки
			const rect = image2.getBoundingClientRect();
			const imageHalfHeight = rect.height / 2; // половина высоты картинки относительно окна

			// Получаем текущую позицию скролла
			const scrollPosition = window.scrollY || window.pageYOffset;

			// Определяем, когда начинать крутить картинку
			const imageOffsetTop = rect.top + scrollPosition;
			const startRotationPosition = imageOffsetTop - window.innerHeight + imageHalfHeight;

			// Определяем направление скролла и применяем эффекты
			if (scrollPosition > startRotationPosition) {
				// Скроллим вниз
				if (currentRotation < 0) {
					currentRotation += 2; // Увеличиваем угол поворота по часовой стрелке на 1 градус
					updateRotation(image2, currentRotation);
				}
			} else {
				// Скроллим вверх
				if (currentRotation > -90) {
					currentRotation -= 2; // Уменьшаем угол поворота против часовой стрелки на 1 градус
					updateRotation(image2, currentRotation);
				}
			}
		};
	}

	// Создаем обработчик события скролла для второй картинки
	const scrollHandler2 = handleScroll2();

	// Добавляем обработчик события скролла
	window.addEventListener('scroll', scrollHandler2);

});



