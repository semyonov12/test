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
		const amountSlider = document.querySelector('#range-amount');
		const holdingSlider = document.querySelector('#range-holding');
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

		if (amountSlider && holdingSlider) {
			noUiSlider.create(amountSlider, {
				start: [0],
				connect: [true, false],
				range: {
					'min': 0,
					'max': 5000
				}
			});

			noUiSlider.create(holdingSlider, {
				start: [0],
				connect: [true, false],
				range: {
					'min': 0,
					'max': 30
				}
			});

			amountSlider.noUiSlider.on('update', function (values) {
				let amountStartValue = parseInt(values[0]);
				depositElement.value = formatNumberWithSpaces(amountStartValue);
				calculateBalanceAndAmount(amountStartValue, parseInt(daysElement.value.replace(/\s+/g, '')));
			});

			holdingSlider.noUiSlider.on('update', function (values) {
				let holdingStartValue = parseInt(values[0]);
				daysElement.value = formatNumberWithSpaces(holdingStartValue);
				calculateBalanceAndAmount(parseInt(depositElement.value.replace(/\s+/g, '')), holdingStartValue);
			});


			depositElement.addEventListener("input", function (e) {
				let value = parseInt(depositElement.value);
				if (!isNaN(value)) {
					amountSlider.noUiSlider.set(value);
				}
			});

			daysElement.addEventListener("input", function (e) {
				let value = parseInt(daysElement.value);
				if (!isNaN(value)) {
					holdingSlider.noUiSlider.set(value);
				}
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








// Изначальные углы поворота и изображения
const imagesConfig = [
	{ selector: '.earn__image-1', initialRotation: 90 },
	{ selector: '.earn__image-2', initialRotation: -90 }
];

// Функция для обновления угла поворота картинки
function updateRotation(element, angle) {
	element.style.transform = `rotate(${angle}deg)`;
}

// Универсальная функция для обработки скролла
function createScrollHandler(image, initialRotation) {
	let currentRotation = initialRotation;

	return function () {
		// Получаем координаты и размеры картинки
		const rect = image.getBoundingClientRect();
		const imageHalfHeight = rect.height / 2; // половина высоты картинки относительно окна

		// Получаем текущую позицию скролла
		const scrollPosition = window.scrollY || window.pageYOffset;

		// Определяем, когда начинать крутить картинку
		const imageOffsetTop = rect.top + scrollPosition;
		const startRotationPosition = imageOffsetTop - window.innerHeight + imageHalfHeight;

		// Определяем направление скролла и применяем эффекты
		if (scrollPosition > startRotationPosition) {
			// Скроллим вниз
			if (initialRotation > 0 && currentRotation > 0) {
				currentRotation -= 2; // Уменьшаем угол поворота по часовой стрелке на 2 градуса
			} else if (initialRotation < 0 && currentRotation < 0) {
				currentRotation += 2; // Увеличиваем угол поворота по часовой стрелке на 2 градуса
			}
		} else {
			// Скроллим вверх
			if (initialRotation > 0 && currentRotation < initialRotation) {
				currentRotation += 2; // Увеличиваем угол поворота против часовой стрелки на 2 градуса
			} else if (initialRotation < 0 && currentRotation > initialRotation) {
				currentRotation -= 2; // Уменьшаем угол поворота против часовой стрелки на 2 градуса
			}
		}
		updateRotation(image, currentRotation);
	};
}

// Добавляем обработчики события скролла для всех изображений
imagesConfig.forEach(config => {
	const image = document.querySelector(config.selector);
	if (image) {
		const scrollHandler = createScrollHandler(image, config.initialRotation);
		window.addEventListener('scroll', scrollHandler);
	}
});

});



