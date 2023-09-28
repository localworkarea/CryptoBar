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
        document.documentElement.classList.toggle("_open-filter");
        document.documentElement.classList.toggle("lock");
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
