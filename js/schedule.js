export default class Schedule {
   constructor(date = new Date()) {
      this.currentDate = date;
   }
   get navigation() { 
     return document.querySelector('.page-nav');
   }
   get sections() {  
     return this.navigation.querySelectorAll('.page-nav__day');
   }

   // отрисовываем ленту расписания
   getSchedule() {
      const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
      for (let section of this.sections) {
         const weekDay = section.querySelector('.page-nav__day-week');
         const dateNum = section.querySelector('.page-nav__day-number');
         let day = this.currentDate.getDate();
         if (day < 10) day = '0' + day;
         let month = (this.currentDate.getMonth() + 1);
         if (month < 10) month = '0' + month;
         let currentDay = this.currentDate.getDay();
         if (currentDay === 0 || currentDay  === 6) {
            section.classList.add('page-nav__day_weekend');
         }
         weekDay.innerText = days[currentDay];
         dateNum.innerText = `${day}.${month}`;
         section.dataset.date = `${day}.${month}.${this.currentDate.getFullYear()}`;
         this.currentDate.setDate(this.currentDate.getDate() + 1);
      }
   }

   // выбираем сеанс в определенный день, делаем прошедшие сеансы неактивными
   setSeancesSchedule(timestamp) {
      const timeBlocks = document.querySelectorAll('.movie-seances__time');
      const navItems = Array.from(this.sections);
      navItems.forEach(item => {
         const index = navItems.indexOf(item);
         item.dataset.day = timestamp + (index * 24 * 3600 * 1000);
         item.addEventListener('click', function(event) {
            event.preventDefault();
            navItems.forEach(nav => {
               nav.classList.remove('page-nav__day_chosen');
            })
            item.classList.add('page-nav__day_chosen');
            const activeDay = document.querySelector('.page-nav__day_chosen');
            timeBlocks.forEach(block => {
               const startTime = Number(block.dataset.start) * 60 * 1000;
               const dayTimestamp = Number(activeDay.dataset.day);
               if (Date.now() > (dayTimestamp + startTime)) {
                  block.classList.add('acceptin-button-disabled');
               } else {
                  block.classList.remove('acceptin-button-disabled');
               }
            })
         });
      });
      navItems[0].click();
   }
}