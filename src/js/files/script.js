// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";



// if (document.querySelector(".filter-open")) {
//   document.addEventListener("click", function (e) {
//     if (e.target.closest('.filter-open')) {
//       document.documentElement.classList.toggle("_open-filter");
//       if (window.innerWidth <= 700) {
//           document.documentElement.classList.toggle("lock");
//       }
//     }
//     if (window.innerWidth <= 700) {
//       if (!e.target.closest('.filters__body') && !e.target.closest('.filter-open')) {
//         document.documentElement.classList.toggle("_open-filter");
//         document.documentElement.classList.toggle("lock");
//       }
//     }
//   });
// }

// == загрузка страницы ==========================================
if (!document.documentElement.classList.contains('loading')) {
  window.addEventListener("load", function () {
    setTimeout(function () {
      document.documentElement.classList.add('loaded');
    }, 0);
  });
}


if (document.querySelector("[data-filter-open]")) {
  document.addEventListener("click", function (e) {
    if (e.target.closest('[data-filter-open]')) {
      document.documentElement.classList.toggle("_open-filter");
      if (window.innerWidth <= 700) {
        document.documentElement.classList.toggle("lock");
      }
    }
    if (window.innerWidth <= 700) {
      if (!e.target.closest('.filters__body') && !e.target.closest('[data-filter-open]')) {
        document.documentElement.classList.remove("_open-filter");
        document.documentElement.classList.remove("lock");
      }
    }
  });
}


// Показать кнопку Close если текст введен ===================================
const searchInput = document.getElementById("searchInput");
const searchBtn = document.querySelector(".search-filters__btn");
const searchBody = document.querySelector('.search-filters__body');

if(searchBtn) {
  searchInput.addEventListener("input", function() {
    if (this.value.trim() !== "") {
      searchBody.classList.add("typed");
    } else {
      searchBody.classList.remove("typed");
    }
  });
}

// Прокрутка вверх ===========================================================
const scrollToTopBtn = document.querySelector('.up-art__btn');
if (scrollToTopBtn) {
  window.onscroll = function() {
      if (document.documentElement.scrollTop > 100) {
          scrollToTopBtn.classList.add("show-btn");
      } else {
          scrollToTopBtn.classList.remove("show-btn");
      }
  };
  
  scrollToTopBtn.addEventListener("click", function() {
      document.documentElement.style.scrollBehavior = "smooth";
      document.documentElement.scrollTop = 0;
      
      setTimeout(function() {
          document.documentElement.style.scrollBehavior = "auto";
      }, 1000);
  });
}

// Кабинет - управление классами для кнопок ===================================
const menuButtons = document.querySelectorAll(".btn-menu");

if (menuButtons) {
  if (window.innerWidth <= 700) {
    // Удалить класс _active у всех кнопок
    menuButtons.forEach((button) => {
      if (button.classList.contains("_active")) {
        button.classList.remove("_active");
      }
    });

    // Удалить класс _show-item у всех элементов .content-cab__item
    const contentItems = document.querySelectorAll(".content-cab__item");
    contentItems.forEach((item) => {
      item.classList.remove("_show-item");
    });
  }

  const contentItems = document.querySelectorAll(".content-cab__item");
  const backButton = document.querySelectorAll(".content-cab__btn-back");

  menuButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Удалить класс _active у всех кнопок
      menuButtons.forEach((item) => {
        item.classList.remove("_active");
      });

      // Добавить класс _active только к текущей кнопке
      this.classList.add("_active");

      // Найти элемент с классом _show-item
      const currentlyActiveItem = document.querySelector(".content-cab__item._show-item");

      // Получить класс, который нужно применить к другому элементу .content-cab__item
      const targetClass = this.classList.contains("btn-menu-profile")
        ? "item-profile"
        : this.classList.contains("btn-menu-faq")
        ? "item-faq"
        : this.classList.contains("btn-menu-transaction")
        ? "item-transaction"
        : "";

      // Удалить класс _show-item у элемента, который изначально его имел
      if (currentlyActiveItem) {
        currentlyActiveItem.classList.remove("_show-item");
      }

      // Добавить класс _show-item к элементу .content-cab__item, который соответствует выбранной кнопке
      contentItems.forEach((item) => {
        if (item.classList.contains(targetClass)) {
          item.classList.add("_show-item");
        }
      });
    });
  });

  backButton.forEach((button) => {
    button.addEventListener("click", function () {
      // Найти текущий элемент с классом _show-item и удалить его
      const currentlyActiveItem = document.querySelector(".content-cab__item._show-item");
      if (currentlyActiveItem) {
        currentlyActiveItem.classList.remove("_show-item");
      }
    });
  });
}


// Спойлеры =====================================================
function spollers() {
	const spollersArray = document.querySelectorAll('[data-spollers]');
	if (spollersArray.length > 0) {
		// Подія кліку
		document.addEventListener("click", setSpollerAction);
		// Отримання звичайних слойлерів
		const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
			return !item.dataset.spollers.split(",")[0];
		});
		// Ініціалізація звичайних слойлерів
		if (spollersRegular.length) {
			initSpollers(spollersRegular);
		}
		// Отримання слойлерів з медіа-запитами
		// let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
		// if (mdQueriesArray && mdQueriesArray.length) {
		// 	mdQueriesArray.forEach(mdQueriesItem => {
		// 		// Подія
		// 		mdQueriesItem.matchMedia.addEventListener("change", function () {
		// 			initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
		// 		});
		// 		initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
		// 	});
		// }
		// Ініціалізація
		function initSpollers(spollersArray, matchMedia = false) {
			spollersArray.forEach(spollersBlock => {
				spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
				if (matchMedia.matches || !matchMedia) {
					spollersBlock.classList.add('_spoller-init');
					initSpollerBody(spollersBlock);
				} else {
					spollersBlock.classList.remove('_spoller-init');
					initSpollerBody(spollersBlock, false);
				}
			});
		}
		// Робота з контентом
		function initSpollerBody(spollersBlock, hideSpollerBody = true) {
			let spollerItems = spollersBlock.querySelectorAll('details');
			if (spollerItems.length) {
				//spollerItems = Array.from(spollerItems).filter(item => item.closest('[data-spollers]') === spollersBlock);
				spollerItems.forEach(spollerItem => {
					let spollerTitle = spollerItem.querySelector('summary');
					if (hideSpollerBody) {
						spollerTitle.removeAttribute('tabindex');
						if (!spollerItem.hasAttribute('data-open')) {
							spollerItem.open = false;
							spollerTitle.nextElementSibling.hidden = true;
						} else {
							spollerTitle.classList.add('_spoller-active');
							spollerItem.open = true;
						}
					} else {
						spollerTitle.setAttribute('tabindex', '-1');
						spollerTitle.classList.remove('_spoller-active');
						spollerItem.open = true;
						spollerTitle.nextElementSibling.hidden = false;
					}
				});
			}
		}
		function setSpollerAction(e) {
			const el = e.target;
			if (el.closest('summary') && el.closest('[data-spollers]')) {
				e.preventDefault();
				if (el.closest('[data-spollers]').classList.contains('_spoller-init')) {
					const spollerTitle = el.closest('summary');
					const spollerBlock = spollerTitle.closest('details');
					const spollersBlock = spollerTitle.closest('[data-spollers]');
					const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
					const scrollSpoller = spollerBlock.hasAttribute('data-spoller-scroll');
					const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
					if (!spollersBlock.querySelectorAll('._slide').length) {
						if (oneSpoller && !spollerBlock.open) {
							hideSpollersBody(spollersBlock);
						}

						!spollerBlock.open ? spollerBlock.open = true : setTimeout(() => { spollerBlock.open = false }, spollerSpeed);

						spollerTitle.classList.toggle('_spoller-active');
						_slideToggle(spollerTitle.nextElementSibling, spollerSpeed);

						if (scrollSpoller && spollerTitle.classList.contains('_spoller-active')) {
							const scrollSpollerValue = spollerBlock.dataset.spollerScroll;
							const scrollSpollerOffset = +scrollSpollerValue ? +scrollSpollerValue : 0;
							const scrollSpollerNoHeader = spollerBlock.hasAttribute('data-spoller-scroll-noheader') ? document.querySelector('.header').offsetHeight : 0;

							//setTimeout(() => {
							window.scrollTo(
								{
									top: spollerBlock.offsetTop - (scrollSpollerOffset + scrollSpollerNoHeader),
									behavior: "smooth",
								}
							);
							//}, spollerSpeed);
						}
					}
				}
			}
			// Закриття при кліку поза спойлером
			if (!el.closest('[data-spollers]')) {
				const spollersClose = document.querySelectorAll('[data-spoller-close]');
				if (spollersClose.length) {
					spollersClose.forEach(spollerClose => {
						const spollersBlock = spollerClose.closest('[data-spollers]');
						const spollerCloseBlock = spollerClose.parentNode;
						if (spollersBlock.classList.contains('_spoller-init')) {
							const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
							spollerClose.classList.remove('_spoller-active');
							_slideUp(spollerClose.nextElementSibling, spollerSpeed);
							setTimeout(() => { spollerCloseBlock.open = false }, spollerSpeed);
						}
					});
				}
			}
		}
		function hideSpollersBody(spollersBlock) {
			const spollerActiveBlock = spollersBlock.querySelector('details[open]');
			if (spollerActiveBlock && !spollersBlock.querySelectorAll('._slide').length) {
				const spollerActiveTitle = spollerActiveBlock.querySelector('summary');
				const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
				spollerActiveTitle.classList.remove('_spoller-active');
				_slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
				setTimeout(() => { spollerActiveBlock.open = false }, spollerSpeed);
			}
		}
	}
}
spollers();

// Допоміжні модулі плавного розкриття та закриття об'єкта ======================================================
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
			// Створюємо подію 
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
			// Створюємо подію
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