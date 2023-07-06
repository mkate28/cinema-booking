export default class Seance {
  constructor(seances) {
    this.seances = seances;
  }
  get movies() {
    return document.querySelectorAll('.movie');
  }
  set openHalls(data) {
    this.halls = data;
  }
  get openHalls() {
    return this.halls;
  }

  // показ сеансов для существующих фильмов и открытых залов
  showSeances() {
    const openHalls = this.openHalls;
    this.movies.forEach(movie => {
      openHalls.forEach(hall => {
        const seances = this.seances.filter(item => item['seance_hallid'] === hall['hall_id'] && item['seance_filmid'] === movie.dataset.id);
        if (seances.length > 0) {
          let seanceHTML = `
          <div class="movie-seances__hall" data-id="${hall['hall_id']}">
            <h3 class="movie-seances__hall-title">${hall['hall_name']}</h3>
            <ul class="movie-seances__list">`;
          for (let seance of seances) {
            const obj = {
              film: movie.querySelector('.movie__title').innerText, 
              time: seance['seance_time'],
              start: seance['seance_start'],
              id: seance['seance_id'],
              hall: hall['hall_name'],
              hallId: hall['hall_id'],
              standardPrice: hall['hall_price_standart'],  
              vipPrice: hall['hall_price_vip']
            };
            const seanceInfo = JSON.stringify(obj);
            seanceHTML += `<li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html" data-info='${seanceInfo}' data-start='${seance['seance_start']}'>${seance['seance_time']}</a></li>`;
          }
          seanceHTML += `</ul></div>`;
          movie.insertAdjacentHTML('beforeend', seanceHTML);
        }
      });
      movie.addEventListener('click', function(e) {
        const timeObject = {
          day: document.querySelector('.page-nav__day_chosen').dataset.date,
          time: Number(document.querySelector('.page-nav__day_chosen').dataset.day) / 1000
        }
        if (e.target.classList.contains('movie-seances__time')) {
          const idHall = e.target.closest('.movie-seances__hall').dataset.id;
          const currentHall = openHalls.find(hall => hall['hall_id'] === idHall);
          // сохранение информации в хранилище
          sessionStorage.setItem('date', JSON.stringify(timeObject)); // выбранная дата
          sessionStorage.setItem('seanceInfo', e.target.dataset.info); // информация о сеансе
          sessionStorage.setItem('hallConfig', currentHall['hall_config']); // конфигурация выбранного зала
        } 
      });
    })
  }
}