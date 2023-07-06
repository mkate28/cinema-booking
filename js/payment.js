// извлечение информации из хранилища
const seanceInfo = JSON.parse(sessionStorage.getItem('seanceInfo')); 
const date = JSON.parse(sessionStorage.getItem('date'));
const buyInfo = JSON.parse(sessionStorage.getItem('buyInfo'));
const timestamp = sessionStorage.getItem('timestamp');
const hallConfiguration = sessionStorage.getItem('hallConfig');

document.addEventListener("DOMContentLoaded", () => booking(timestamp, seanceInfo.hallId, seanceInfo.id, hallConfiguration));

// заполнение информации о сеансе 
const infoHall = document.querySelector('.ticket__hall');
const infoPlaces = document.querySelector('.ticket__chairs');
const seanseDate = `${date.day} в ${seanceInfo.time}`;
const allChairs = buyInfo.selectedSeats;
allChairs.forEach(chair => {
   infoPlaces.innerText += ` ${chair.row}/${chair.place}, `;
});
infoHall.innerText = seanceInfo.hall.slice(3);
infoPlaces.innerText = infoPlaces.innerText.slice(0, - 1);
document.querySelector('.ticket__title').innerText = seanceInfo.film;
document.querySelector('.ticket__start').innerText = seanseDate;
document.querySelector('.ticket__cost').innerText = buyInfo.totalPrice;

const obj = {
   places: infoPlaces.innerText,
   hall: infoHall.innerText
}
// сохранение информации в хранилище
sessionStorage.setItem('hallInfo', JSON.stringify(obj)); // информация о купленных местах и номер зала

async function booking(value1, value2, value3, value4) {
   const request = `event=sale_add&timestamp=${value1}&hallId=${value2}&seanceId=${value3}&hallConfiguration=${value4}`;
   await createRequest(request);
}