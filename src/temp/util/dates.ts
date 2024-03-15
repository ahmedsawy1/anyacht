import Dayjs from 'dayjs';
import {getDaysInMonthUTC} from '../../constants/helpers';

const dateData = Dayjs();

console.log('================logggg====================');
console.log(dateData.get('M'));
console.log(dateData.get('years'));
console.log('====================================');

const getMonthes = (current: number) => {
  const year = dateData.get('years');
  let monthes = [
    getDaysInMonthUTC(current, year),
    getDaysInMonthUTC(current + 1, year),
    getDaysInMonthUTC(current + 2, year),
  ];

  if (current == 10) {
    monthes = [
      getDaysInMonthUTC(current, year),
      getDaysInMonthUTC(current + 1, year),
      getDaysInMonthUTC(0, year + 1),
    ];
  }

  if (current == 11) {
    monthes = [
      getDaysInMonthUTC(current, year),
      getDaysInMonthUTC(0, year + 1),
      getDaysInMonthUTC(1, year + 1),
    ];
  }

  return monthes;
};

export const monthes = getMonthes(dateData.get('M'));

// export const monthes = [
//   getDaysInMonthUTC(5 - 1, 2023),
//   getDaysInMonthUTC(6 - 1, 2023),
//   getDaysInMonthUTC(7 - 1, 2023),
// ];
