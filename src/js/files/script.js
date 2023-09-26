// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


if (document.querySelector(".filter-open")) {
  document.addEventListener("click", function (e) {
    if (e.target.closest('.filter-open')) {
      document.documentElement.classList.toggle("_open-filter");
      if (window.innerWidth <= 700) {
        document.documentElement.classList.toggle("lock");
      }
    }
  });
};

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
