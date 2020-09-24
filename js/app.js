import galleryItems from "./gallery-items.js";

const listOfgalleryItems = document.querySelector(".js-gallery");
const galleryItemsMarkup = addImageItems(galleryItems);
const divForModal = document.querySelector(".lightbox");
const modalImage = document.querySelector(".lightbox__image");
const modalCloseBtn = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const overlaySpaceEl = document.querySelector(".lightbox__overlay");

listOfgalleryItems.insertAdjacentHTML("beforeend", galleryItemsMarkup);
listOfgalleryItems.addEventListener("click", onOpenModal);
modalCloseBtn.addEventListener("click", onCloseModal);
overlaySpaceEl.addEventListener("click", onOverlayClick);

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

function getBigImageUrl(event) {
  event.preventDefault();
  //   if (!evt.target.classList.contains("gallery__image")) {
  //     return;
  //   }

  modalImage.src = event.target.dataset.source;
}

function onOpenModal(event) {
  window.addEventListener("keydown", onEscPress);
  divForModal.classList.add("is-open");
  getBigImageUrl(event);
  //   console.log(modalImage.src);
  window.addEventListener("keydown", slideImages);
}

function onCloseModal(event) {
  window.removeEventListener("keydown", onEscPress);
  divForModal.classList.remove("is-open");
  //   getBigImageUrl(event);
  modalImage.src = "";
}

function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscPress(event) {
  const isEscKey = event.code === "Escape";
  if (isEscKey) {
    onCloseModal();
  }
}

// function slideImages(event) {
//   const slideRight = event.code === "ArrowRight";
//   //   console.log(slideRight);
//   console.log(galleryItems.length);
//   //   console.log(galleryItems[0].original);
//   if (slideRight) {
//     // for (let i; i < galleryItems.length; i += 1) {
//     //   modalImage.src = galleryItems[i + 1].original;
//     //   //    console.log(galleryItems[i].original);
//     // }
//     for (let i; i < galleryItems.length; i += 1) {
//       console.log(indexOf(galleryItems[i]));
//     }

//     // galleryItems.map((galleryItem) => console.log(galleryItem.original));
//     // console.log(indexOf(galleryItems));
//   }
// }
// console.log(galleryItems[0].original);
// ///////////////////////////////////////////////////////////////////////////////////////
