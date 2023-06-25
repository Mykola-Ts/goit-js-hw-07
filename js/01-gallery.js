import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

const gallery = document.querySelector(".gallery");
let modal;

/**
 * Створює розмітку на підставі масиву даних
 * @param {Array} arr
 * @returns {String} Розмітка елементів
 */
function createMarkupItems(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `
      <li class="gallery__item">
      <a class="gallery__link" href="${original}">
      <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
     />
     </a>
    </li>`
    )
    .join("");
}

gallery.insertAdjacentHTML("beforeend", createMarkupItems(galleryItems));

const linksItemsGallery = document.querySelectorAll(".gallery__link");

linksItemsGallery.forEach((elem) =>
  elem.addEventListener("click", handlerPreventDefault)
);

/**
 * Cкасування дії браузера за замовчуванням в об'єкта події
 * @param {InputEvent} evt
 */
function handlerPreventDefault(evt) {
  evt.preventDefault();
}

gallery.addEventListener("click", handlerModal);

/**
 * Управління модальним вікном, створеним за допомогою бібліотеки basicLightbox
 * @param {InputEvent} evt
 */
function handlerModal(evt) {
  if (evt.target === evt.currentTarget) {
    return;
  }

  modal = createModal(evt);

  modal.show();

  closeModal();
}

/**
 * Створення модального вікна за допомогою бібліотеки basicLightbox
 * @param {InputEvent} evt
 * @returns {Object} Модальне вікно
 */
function createModal(evt) {
  return basicLightbox.create(`
    <img
      src="${evt.target.dataset.source}"
      alt="${evt.target.alt}"
      width="1280"
     />`);
}

/**
 * Додавання слухача подій для зкриття модального вікна
 */
function closeModal() {
  if (!modal.visible()) {
    return;
  }

  window.addEventListener("keydown", handlerCloseModal);
}

/**
 * Закриття модального вікна, створеного за допомогою бібліотеки basicLightbox в результаті події
 * @param {InputEvent} evt
 */
function handlerCloseModal(evt) {
  if (evt.code !== "Escape") {
    return;
  }

  modal.close();

  window.removeEventListener("keydown", handlerCloseModal);
}
