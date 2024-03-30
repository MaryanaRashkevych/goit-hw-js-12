import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://pixabay.com/api/';

export class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}?key=43036736-59573289802154025d43bab67&q=${this.searchQuery}&lang=en&per_page=15&Page=${this.page}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.total === 0) {
          onError();
        }

        this.incrementPage();
        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export function onError(error) {
  iziToast.show({
    message: `Sorry, there are no images matching <br> your search query. Please, try again!`,
    position: 'topCenter',
    timeout: 5000,
    backgroundColor: '#ef4040',
    messageColor: '#ffffff',
    messageSize: '12',
    close: true,
    closeOnEscape: true,
    progressBarColor: '#B51B1B',
    progressBar: true,
    layout: 2,
    maxWidth: 432,
    maxHeigth: 88,
    animateInside: true,
    iconUrl: './img/x-octagon.svg',
    transitionIn: 'fadeInRight',
    transitionOut: 'fadeOutRight',
  });
}



// export function checkInputValidity() {                   // Перевірка валідності запиту
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


