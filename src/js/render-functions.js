export function appendHitsMarkup(data, container) {
  const markup = data
    .map(
      item =>
        `<li class="gallery-item">
          <a href="${item.largeImageURL}">
            <img src="${item.webformatURL}" alt="${item.tags}" width="360" height="200"/>
            <div class="text-content-box">
                <p class="image-text"><span class="image-title">Likes</span> ${item.likes}</p>
                <p class="image-text"><span class="image-title">Views</span> ${item.views}</p>
                <p class="image-text"><span class="image-title">Comments</span> ${item.comments}</p>
                <p class="image-text"><span class="image-title">Downloads</span> ${item.downloads}</p>
            </div>
        </a>
      </li>`
    )
    .join('');

  container.insertAdjacentHTML('beforeend', markup);
}

export function clearHitsContainer(container) {
  container.innerHTML = '';
}






// export function loaderF() {                                  // Створюємо лоадер
//   const spanElement = document.createElement('span');
//   areaForLoader.appendChild(spanElement);
//   spanElement.classList.add('loader');
// }

// export function spanElementRem() {                           // Видаляємо лоадер
//   const loaderF = document.querySelector('.loader');
//   loaderF.remove();
// }
