import galleryItems from "/js/gallery-items.js";

const listOfgalleryItems = document.querySelector(".js-gallery");
const galleryItemsMarkup = addImageItems(galleryItems);
listOfgalleryItems.insertAdjacentHTML("beforeend", galleryItemsMarkup);

function addImageItems(galleryItems) {
  return galleryItems
    .map(({ original, preview, description }) => {
      return `<li class="gallery__item">
          <a
              class="gallery__link"
              href="${original}"
            >
          <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
        `;
    })
    .join("");
}

const divForModal = document.querySelector(".lightbox");
const modalImage = document.querySelector(".lightbox__image");

function getBigImageUrl(event) {
  event.preventDefault();
  modalImage.src = event.target.dataset.source;
}

listOfgalleryItems.addEventListener("click", onOpenModal);

function onOpenModal(event) {
  divForModal.classList.add("is-open");
  getBigImageUrl(event);
}
