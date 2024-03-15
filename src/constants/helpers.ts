import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform, Share} from 'react-native';
import {PixelPerfect} from '../styles/stylesConstants';

export enum AsyncKeys {
  USER_DATA = 'USER_DATA',
  LANGUAGE = 'LANGUAGE',
  AUTH_TOKEN = 'AUTH_TOKEN',
  NOTIFICATIONS_TOKEN = 'NOTIFICATIONS_TOKEN',
  INTRO_SHOWN = 'INTRO_SHOWN',
}

export const regex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
export const regexSaudiNumber = new RegExp(
  /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
);

export const saveItem = async (key: string, data: object) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error: any) {
    console.log(error.message);
  }
  return false;
};

export const getItem = async (key: string) => {
  try {
    const retrievedItem: any = await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error: any) {
    console.log(error.message);
  }
  return null;
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error: any) {
    console.log(error.message);
  }
  return false;
};

export const clear = async () => {
  await AsyncStorage.clear();
};

export function RemoveHTMLFromString(encodedString: string) {
  var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  var translate: any = {
    nbsp: ' ',
    amp: '&',
    quot: '"',
    lt: '<',
    gt: '>',
  };
  return encodedString
    ?.replace(translate_re, function (match, entity) {
      return translate[entity];
    })
    ?.replace(/&#(\d+);/gi, function (match, numStr) {
      var num = parseInt(numStr, 10);
      return String.fromCharCode(num);
    });
}

export function getDaysInMonthUTC(month: number, year: number) {
  let date = new Date(Date.UTC(year, month));

  let days: Date[] = [];
  while (date.getUTCMonth() === month) {
    days.push(new Date(date));
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return days;
}

export const dayNumToDayString = (num: number) => {
  const weekday = ['sun', 'mon', 'tue', 'wed', 'thr', 'fri', 'sat'];
  return weekday[num];
};

export const arrOfMonthes = [
  {en: 'JUN', ar: 'يناير'},
  {en: 'JUN', ar: 'فبراير'},
  {en: 'JUN', ar: 'مارس'},
  {en: 'JUN', ar: 'أبريل'},
  {en: 'JUN', ar: 'مايو'},
  {en: 'JUN', ar: 'يونيو'},
  {en: 'JUN', ar: 'يوليو'},
  {en: 'JUN', ar: 'أغسطس'},
  {en: 'JUN', ar: 'سبتمبر'},
  {en: 'JUN', ar: 'أكتوبر'},
  {en: 'JUN', ar: 'نوفمبر'},
  {en: 'JUN', ar: 'ديسمبر'},
];

export const onShareHandler = async () => {
  try {
    const result = await Share.share({
      message: 'AnYacht App \n شارك التطبيق مع أصدقائك',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

export const createNumbers = numbers => {
  return Array(numbers - 1 + 1)
    .fill()
    .map((_, idx) => 1 + idx);
};

export const match = (android: number, ios: number) =>
  Platform.OS == 'android' ? PixelPerfect(android) : PixelPerfect(ios);
