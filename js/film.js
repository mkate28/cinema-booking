// отрисовывет карточки с фильмами 
export default class Film {
   constructor() {
      this.filmsWrapper = document.querySelector('main');
   }
   fillInfo(data) {
      for (let item of data) {
         const duration = item['film_duration'];
         function getDuration() {
            if (duration % 10 === 1) {
               return `${duration} минута`;
            } else if (duration % 10 === 2 || duration % 10 === 3 || duration % 10 === 4) {
               return `${duration} минуты`;
            } else {
               return `${duration} минут`;
            }
         }
         const infoHTML = `
         <section class="movie" data-id="${item['film_id']}">
            <div class="movie__info">
               <div class="movie__poster">
                  <img class="movie__poster-image" alt="Звёздные войны постер" src="${item['film_poster']}">
               </div>
               <div class="movie__description">
                  <h2 class="movie__title">${item['film_name']}</h2>
                  <p class="movie__synopsis">${item['film_description']}</p>
                  <p class="movie__data">
                     <span class="movie__data-duration">${getDuration()}</span>
                     <span class="movie__data-origin">${item['film_origin']}</span>
                  </p>
               </div>
            </div>
         </section>`;
         this.filmsWrapper.insertAdjacentHTML('beforeend', infoHTML);
      }
   }
}