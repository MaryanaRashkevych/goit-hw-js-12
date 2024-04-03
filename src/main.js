import { renderImages } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImages } from './js/pixabay-api';

let query;
let currentPage = 1;
let maxPage = 0;
const pageSize = 15;

export const refs = {
  searchForm: document.querySelector('.js-search-form'),
  btnShowMore: document.querySelector('.btn-show-more'),
  imagesContainer: document.querySelector('.js-images-container'),
  loader: document.querySelector('.loader'),
};

refs.searchForm.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
  e.preventDefault();
  query = e.target.elements.query.value.trim();
  refs.imagesContainer.innerHTML = '';

  currentPage = 1;
  showLoader();
  const data = await getImages(query, currentPage);

  if (!checkValidity(query, data.hits)) {
    hideLoader();
    hideLoadMore();
    return;
  }

  maxPage = Math.ceil(data.totalHits / pageSize);
  renderImages(data.hits);
  // initializeSimpleLightbox();
  hideLoader();
  checkBtnStatus();
  e.target.reset();

}

refs.btnShowMore.addEventListener('click', onLoadMoreClick);



async function onLoadMoreClick() {
  currentPage += 1;
  showLoader();

  try {
    const data = await getImages(query, currentPage);
    renderImages(data.hits);
    
    if (currentPage >= maxPage) {
      hideLoadMore();
      iziToast.show({
        color: 'green',
        message: `Sorry, you have reached the end of collection.`,
        position: 'topCenter',
        timeout: 3000,
      });
    }
  } catch (err) {
    console.log(err);
  }

  hideLoader();
  checkBtnStatus();
}
function checkValidity(query, hits) {
  if (!query.trim()) {
    iziToast.show({
      color: 'black',
      message: `Sorry, the input field must be filled in to start the photo search.`,
      position: 'topCenter',
      timeout: 3000,
    });
    return false;
  } else if (hits.length === 0) {
    iziToast.show({
      color: 'red',
      message: `Sorry, there are no images matching your search query. Please try again!`,
      position: 'topCenter',
      timeout: 3000,
    });
    return false;
  }
  return true;
}

function showLoadMore() {
  refs.btnShowMore.classList.remove('hidden');
}

function hideLoadMore() {
  refs.btnShowMore.classList.add('hidden');
}

function showLoader() {
  refs.loader.classList.remove('hidden');
}

function hideLoader() {
  refs.loader.classList.add('hidden');
}

function checkBtnStatus() {
  if (currentPage >= maxPage) {
    hideLoadMore();
  } else {
    showLoadMore();
  }
}
// function initializeSimpleLightbox() {
//   const simpleLightbox = new SimpleLightbox('.images a', {
//     captionPosition: 'bottom',
//     captionDelay: 250,
//     captionsData: 'alt',
//   });
//  simpleLightbox.refresh();
// }
