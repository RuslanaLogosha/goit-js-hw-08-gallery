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
    .map(({ original, preview, description }, i) => {
      return `<li class="gallery__item">
          <a
              class="gallery__link"
              href="${original}"
            >
          <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              data-index="${i}"
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

  const { source, index } = event.target.dataset;

  modalImage.src = source;
  modalImage.setAttribute("data-index", index);
}

function onOpenModal(event) {
  window.addEventListener("keydown", onEscPress);
  divForModal.classList.add("is-open");
  getBigImageUrl(event);
  let parent = event.target.closest("li");
  parent.classList.add("img-in-modal");

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

//1st working option
function slideImages(event) {
  const slideRight = event.code === "ArrowRight";
  const slideLeft = event.code === "ArrowLeft";
  const parentLiElem = document.querySelector(".gallery__item.img-in-modal");

  if (slideRight) {
    const nextSibl = parentLiElem.nextElementSibling;
    nextSibl.classList.add("img-in-modal");
    parentLiElem.classList.remove("img-in-modal");
    const nextSiblImage = nextSibl.querySelector(".gallery__image");
    modalImage.src = nextSiblImage.dataset.source;
  }

  if (slideLeft) {
    const prevSibl = parentLiElem.previousElementSibling;
    prevSibl.classList.add("img-in-modal");
    parentLiElem.classList.remove("img-in-modal");
    const prevSiblImage = prevSibl.querySelector(".gallery__image");
    modalImage.src = prevSiblImage.dataset.source;
  }
}

//2nd working option
// function slideImages(event) {
//   const { code: clickButton } = event;

//   if (clickButton === "ArrowRight") {
//     let { index } = modalImage.dataset;
//     index = Number(index);

//     if (index < galleryItems.length - 1) {
//       index += 1;
//       modalImage.src = galleryItems[index].original;
//       modalImage.setAttribute("data-index", index);
//     }
//   } else if (clickButton === "ArrowLeft") {
//     let { index } = modalImage.dataset;
//     index = Number(index);

//     if (index < galleryItems.length - 1) {
//       index -= 1;
//       modalImage.src = galleryItems[index].original;
//       modalImage.setAttribute("data-index", index);
//     }
//   }
// }

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
