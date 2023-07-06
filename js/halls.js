export default class Hall {
   // получение открытых залов
   static getHall(halls) {
      let result = halls.filter(hall => hall['hall_open'] === '1');
      return result; 
   }
}