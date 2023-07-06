// импорт классов 
import Schedule from './schedule.js';
import Film from './film.js';
import Hall from './halls.js';
import Seance from './seances.js';

document.addEventListener("DOMContentLoaded", () => start());

// получение текущей даты
const currentTime = new Date();
currentTime.setHours(0, 0, 0, 0);
const timestamp = currentTime.getTime();

// создание ленты с расписанием 
const scheduleWeek = new Schedule();
scheduleWeek.getSchedule();

async function start() {
   const response = await createRequest('event=update'); 
   // получение списков всех фильмов, залов и сеансов
   const films = response.films.result;
   const halls = response.halls.result;
   const seances = response.seances.result;
   const film = new Film();  // отрисовка афиши фильмов
   film.fillInfo(films);
   const seance = new Seance(seances);
   seance.openHalls = Hall.getHall(halls);
   seance.showSeances();   // отрисовка сеансов с учетом доступных залов
   scheduleWeek.setSeancesSchedule(timestamp); 
}