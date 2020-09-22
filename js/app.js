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

console.log(galleryItemsMarkup);
