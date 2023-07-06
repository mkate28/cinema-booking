const confWrapper = document.querySelector('.conf-step__wrapper');
const acceptBtn = document.querySelector('.acceptin-button');

// извлечение информации из хранилища
const seanceInfo = JSON.parse(sessionStorage.getItem('seanceInfo')); 
const date = JSON.parse(sessionStorage.getItem('date'));
const hallConfig = sessionStorage.getItem('hallConfig'); 
const timestamp = date.time + Number(seanceInfo.start * 60);

document.addEventListener("DOMContentLoaded", () => config(timestamp, seanceInfo.hallId, seanceInfo.id));

// заполнение информации о сеансе 
const seanseDate = `Начало сеанса: ${date.day} в ${seanceInfo.time}`;
document.querySelector('.buying__info-start').innerText = seanseDate;
document.querySelector('.buying__info-title').innerText = seanceInfo.film;
document.querySelector('.buying__info-hall').innerText = seanceInfo.hall;
document.querySelector('.price-standart').innerText = seanceInfo.standardPrice;
document.querySelector('.price-vip').innerText = seanceInfo.vipPrice;

async function config(value1, value2, value3) {
   const request = `event=get_hallConfig&timestamp=${value1}&hallId=${value2}&seanceId=${value3}`;
   const configuration = await createRequest(request);
   const hallHTML = (configuration === null) ? hallConfig : configuration; 
   confWrapper.insertAdjacentHTML('beforeend', hallHTML);

   acceptBtn.addEventListener('click', function(event) {
      event.preventDefault();
      window.location = 'payment.html';
   });
 
   const rows = Array.from(document.querySelectorAll('.conf-step__row'));
   for (let row of rows) {
      const seats = Array.from(row.querySelectorAll('.conf-step__chair'));
      seats.forEach(seat => {
         seat.dataset.row = rows.indexOf(row) + 1;
         seat.dataset.place = seats.indexOf(seat) + 1;
      })
   }

   confWrapper.addEventListener('click', function(e) {
      if (e.target.classList.contains('conf-step__chair') && !e.target.classList.contains('conf-step__chair_taken') && !e.target.classList.contains('conf-step__chair_disabled')) {
         e.target.classList.toggle('conf-step__chair_selected');
         updateSelectedCount();
      }
   });

   function updateSelectedCount() {
      const selectedSeats = confWrapper.querySelectorAll('.conf-step__chair_selected');
      if (selectedSeats.length > 0) {
         acceptBtn.removeAttribute('disabled');
         let seats = [];
         let countPrice = 0;
         selectedSeats.forEach(seat => {
            seats.push({
               row: seat.dataset.row,
               place: seat.dataset.place
            });
            if (seat.classList.contains('conf-step__chair_vip')) {
               countPrice += Number(seanceInfo.vipPrice);
            } else {
               countPrice += Number(seanceInfo.standardPrice);
            }
         });
         const buyInfo = {
            selectedSeats: seats,
            totalPrice: countPrice
         }
         // сохраняем информацию в хранилище
         sessionStorage.setItem('buyInfo', JSON.stringify(buyInfo)); // выбранные места и стоимость билетов
         sessionStorage.setItem('timestamp', timestamp); // время начала сеанса
         sessionStorage.setItem('hallConfig', confWrapper.innerHTML); // конфигурация зала с выбранными местами
      } else {
         acceptBtn.setAttribute('disabled', 'disabled');
      }
   }
}