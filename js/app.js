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
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  modalImage.src = event.target.dataset.source;
}

function onOpenModal(event) {
  window.addEventListener("keydown", onEscPress);
  divForModal.classList.add("is-open");
  getBigImageUrl(event);
  window.addEventListener("keydown", slideImages);
}

function onCloseModal(event) {
  window.removeEventListener("keydown", onEscPress);
  divForModal.classList.remove("is-open");
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
//first failed option
// function slideImages(event) {
//   const slideRight = event.code === "ArrowRight";
//   const slideLeft = event.code === "ArrowLeft";
//   let images = [];
//   galleryItems.forEach((galleryItem) => {
//     images.push(galleryItem.original);
//   });

//   for (let i = 0; i < images.length - 1; i += 1) {
//     if (slideRight) {
//       if (images.indexOf(images[i]) === i) {
//         let counter = i + 1;
//         if (counter <= images.length) {
//           modalImage.src = images[i + 1];
//         } else {
//           counter %= images.length;
//           modalImage.src = images[i + 1];
//         }
//       }
//     }
//   }
// }

// ///////////////////////////////////////////////////////////////////////////////////////

//second failed option
// function slideImages(event) {
//   const slideRight = event.code === "ArrowRight";
//   console.log(galleryItems.length);

//   for (let i = 0; i < galleryItems.length; i += 1) {
//     if (slideRight) {
//       let indexOfCurrentImg = galleryItems.indexOf(galleryItems[i]);
//       let indexOfNextImg = galleryItems.indexOf(galleryItems[i]) + 1;
//       indexOfNextImg %= galleryItems.length;
//       modalImage.src = galleryItems[indexOfNextImg].original;
//       console.log(modalImage.src);
//     }
//   }
// }
