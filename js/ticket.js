// извлечение информации из хранилища
const seanceInfo = JSON.parse(sessionStorage.getItem('seanceInfo')); 
const date = JSON.parse(sessionStorage.getItem('date'));
const hallInfo = JSON.parse(sessionStorage.getItem('hallInfo'));

// заполнение информации о сеансе
document.querySelector('.ticket__title').innerText = seanceInfo.film;
document.querySelector('.ticket__start').innerText = `${date.day} в ${seanceInfo.time}`;
document.querySelector('.ticket__hall').innerText = hallInfo.hall;
document.querySelector('.ticket__chairs').innerText = hallInfo.places;

// формирование QR-кода
const qrWrapper = document.querySelector('.ticket__info-qr');
const qrInfo = `Билет действителен на: ${date.day}. Фильм: ${seanceInfo.film}. Начало сеанса: ${seanceInfo.time}. Зал: ${hallInfo.hall}, ряд/место: ${hallInfo.places}`;
const qrCode = QRCreator(qrInfo, {image: 'SVG'});
qrWrapper.append(qrCode.result);

// кнопка скачивания QR-кода
const downloadBtn = document.querySelector('.acceptin-button');
downloadBtn.onclick = (event) => {
   event.preventDefault();
   qrCode.download();
}