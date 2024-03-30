import { appendHitsMarkup, clearHitsContainer } from './js/render-functions';
import { ImagesApiService, onError } from './js/pixabay-api';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  waitingText: document.querySelector('.js-waiting-text'),
  imagesContainer: document.querySelector('.js-images-container'),
};

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  refs.waitingText.style.display = 'block';

  imagesApiService.query = e.currentTarget.elements.query.value;
  imagesApiService.resetPage();

  if (imagesApiService.query === '') {
    onError();
    clearWaitingText();
    clearHitsContainer(refs.imagesContainer);
    return;
  }

  imagesApiService
    .fetchImages()
    .then(hits => {
      clearWaitingText();
      clearHitsContainer(refs.imagesContainer);
      appendHitsMarkup(hits, refs.imagesContainer);
      initializeSimpleLightbox();
    })
    .catch(error => {
      onError(error);
    });

  refs.searchForm.reset();
}

function clearWaitingText() {
  refs.waitingText.style.display = 'none';
}

function initializeSimpleLightbox() {
  const simpleLightbox = new SimpleLightbox('.images a', {
    captionPosition: 'bottom',
    captionDelay: 250,
    captionsData: 'alt',
  });
  simpleLightbox.refresh();
}




// import iziToast from 'izitoast';                                  // Бібліотека для повідомлень
// import 'izitoast/dist/css/iziToast.min.css';

// import SimpleLightbox from 'simplelightbox';                      // Бібліотека для галереї
// import 'simplelightbox/dist/simple-lightbox.min.css';

// import { checkInputValidity } from './js/pixabay-api';
// import { fetchImages } from './js/pixabay-api';
// import { renderImg } from './js/render-functions';
// import { loaderF } from './js/render-functions';
// import { spanElementRem } from './js/render-functions';

// const inputOfWords = document.querySelector('.inputOfWords');     // Інпут
// const buttonForInput = document.querySelector('.buttonForInput'); // Кнопка
// const userList = document.querySelector('.userList');             // Галерея
// const areaForLoader = document.querySelector('.areaForLoader');   // Лоадер

// let wordOfUser = '';
// let imagesLength = '';

// const lightbox = new SimpleLightbox('.gallery a', {   // Великі картинки 
//   captionDelay: 250,
//   captionsData: 'alt',
// });

// buttonForInput.addEventListener('click', event => {   // Надсилання запиту на сервер
//   loaderF();
//   event.preventDefault();
//   userList.innerHTML = '';
//   setTimeout(() => {
//     wordOfUser = inputOfWords.value.trim();
//     checkInputValidity();
//   }, 2000);
// });

// function checkInputValidity() {                   // Перевірка валідності запиту
//   fetchImages()
//     .then(images => {
//       if (wordOfUser === '') {
//         iziToast.show({
//           color: 'red',
//           message: `Sorry, the input field must be filled in to start the photo search.`,
//           position: 'topCenter',
//         });
//       } else if (images.length === 0) {
//         iziToast.show({
//           color: 'red',
//           message: `Sorry, there are no images matching your search query. Please try again!`,
//           position: 'topCenter',
//         });
//       } else {
//         renderImg(images);
//       }
//     })
//     .catch(error => console.log(error))
//     .finally(() => spanElementRem());
// }

// function renderImg(images) {                        // Рендар фото в браузері
//   imagesLength = images.length;

//   const markupImg = images                          
//     .map(image => {
//       return `<div class="blockForAllElements">
//           <li>
//           <a href=${image.largeImageURL} download="false">
//           <img src=${image.webformatURL} alt = "${image.tags}" class = "imgOfUser">
//           </a>
//           </li>
//           <div class = "divForDescription"> 
//           <ul class="blockOfInfo"> 
//             <li class="title">Likes</li>
//             <li class="info">${image.likes}</li>
//           </ul>
//           <ul class="block">
//             <li class="title">Views</li>
//             <li class="info">${image.views}</li>
//           </ul>
//           <ul class="block">
//             <li class="title">Comments</li>
//             <li class="info">${image.comments}</li>
//           </ul>
//           <ul class="block">
//             <li class="title">Downloads</li>
//             <li class="info">${image.downloads}</li>
//           </ul>
//           </div>
//         </div>`;
//     })
//     .join('');
//   userList.insertAdjacentHTML('beforeend', markupImg);

//   lightbox.refresh();
// }

// function fetchImages() {                            // Запит на сервер для отримання фото
//   return fetch(
//     `https://pixabay.com/api/?key=43036736-59573289802154025d43bab67&q=${wordOfUser}&image_type=photo&per_page=15&orientation=horizontal&safesearch=true`
//   )
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .then(data => data.hits);
// }

// function loaderF() {                                  // Створюємо лоадер
//   const spanElement = document.createElement('span');
//   areaForLoader.appendChild(spanElement);
//   spanElement.classList.add('loader');
// }

// function spanElementRem() {                           // Видаляємо лоадер
//   const loaderF = document.querySelector('.loader');
//   loaderF.remove();
// }