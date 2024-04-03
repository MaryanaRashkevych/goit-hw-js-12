import { refs } from "../main";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const simpleLightbox = new SimpleLightbox('.images a', {
  captionPosition: 'bottom',
  captionDelay: 250,
  captionsData: 'alt',
});
function imageTemplate(obj){
  const {largeImageURL, webformatURL, tags, likes, views, comments, downloads } = obj;
return `<li class="gallery-item">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" width="360" height="200" loading ="lazy"/>
            <div class="text-content-box">
                <p class="image-text"><span class="image-title">Likes</span> ${likes}</p>
                <p class="image-text"><span class="image-title">Views</span> ${views}</p>
                <p class="image-text"><span class="image-title">Comments</span> ${comments}</p>
                <p class="image-text"><span class="image-title">Downloads</span> ${downloads}</p>
            </div>
        </a>
      </li>`
};

 function imagesTemplate(arr){
return arr.map(imageTemplate).join('');
};

export function renderImages(arr){
  const markup = imagesTemplate(arr);
  refs.imagesContainer.insertAdjacentHTML('beforeend', markup);
  simpleLightbox.refresh();
};
 