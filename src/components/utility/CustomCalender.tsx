import React, {FC, useEffect} from 'react';
import {
  I18nManager,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getAvailableTimes} from '../../store/actions/requestAction';
import {useAppDispatch, useAppSelector} from '../../store/hook';
import {selectOneDay} from '../../store/reducers/selectDate';
import {SharedStyles} from '../../styles/sharedStyles';
import {
  Colors,
  Fonts,
  phoneWidth,
  PixelPerfect,
} from '../../styles/stylesConstants';
import Dayjs from 'dayjs';
import {showMessage} from 'react-native-flash-message';
import {getTimesOfWeek} from '../../store/actions/timesActions';
import {dayNumToDayString} from '../../constants/helpers';

let daysShort = ['سبت', 'أحد', 'ثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة'];

export const totalWidth = phoneWidth * 0.9;
const itemDimension = totalWidth / 7.2;

const CustomCalender: FC<{
  monthDays: Date[];
  monthName: string;
  cb?: () => void;
  boatID: number;
}> = React.memo(({monthDays, monthName, cb, boatID}) => {
  const dispatch = useAppDispatch();
  const {oneDay, selectedDays, onlyOneDay} = useAppSelector(
    state => state.dateSlice,
  );
  const {timeOfWeekArr} = useAppSelector(state => state.timesSlice);

  const onSelectDay = (mapItem: any) => {
    const selectedDayString = Dayjs(mapItem).format('YYYY-MM-DD');

    dispatch(
      getAvailableTimes({
        boatId: boatID,
        cb(data) {},
        dateString: selectedDayString,
      }),
    );

    dispatch(selectOneDay(selectedDayString));
  };

  const currentDate = Dayjs();
  useEffect(() => {
    dispatch(getTimesOfWeek({boatId: boatID, cb(data) {}}));
  }, []);

  return (
    <View style={{width: totalWidth, marginTop: PixelPerfect(35)}}>
      <Text style={styles.textMonthName}>{monthName}</Text>
      <ScrollView horizontal contentContainerStyle={styles.daysNamesCont}>
        {daysShort.map((item, index) => (
          <Text key={index} style={styles.textDayName}>
            {item}
          </Text>
        ))}
      </ScrollView>

      <View style={{flexWrap: 'wrap', flexDirection: 'row-reverse'}}>
        {monthDays.map((mapItem: any, mapIndex: number) => {
          const itemDayjs = Dayjs(mapItem);
          const formatedItem = itemDayjs.format('YYYY-MM-DD');
          const isNotAvailableCondtion =
            +currentDate > +mapItem ||
            !timeOfWeekArr.some(
              obj => obj.day == dayNumToDayString(itemDayjs.get('d')),
            );

          return (
            <TouchableOpacity
              onPress={() => {
                if (isNotAvailableCondtion) {
                  showMessage({
                    type: 'danger',
                    message: 'لاتوجد اوقات متاحة',
                  });
                } else {
                  onSelectDay(mapItem);
                  cb && cb();
                }
              }}
              key={mapIndex}
              style={[
                styles.dayCont,
                mapItem?.getDay() + 1 != 7 && {
                  marginRight: I18nManager.isRTL
                    ? mapIndex == 0
                      ? itemDimension * (mapItem?.getDay() + 1)
                      : 0
                    : 0,
                },
              ]}>
              <View
                style={[
                  styles.circleNumCont,
                  onlyOneDay &&
                    selectedDays?.includes(formatedItem) &&
                    selectedDays?.includes(oneDay) && {
                      backgroundColor: Colors.mainColor,
                      borderRadius: PixelPerfect(50),
                    },

                  isNotAvailableCondtion && {
                    backgroundColor: Colors.lightGray,
                    borderRadius: PixelPerfect(50),
                    opacity: 0.4,
                  },
                ]}>
                <Text
                  style={[
                    styles.textDayNum,
                    selectedDays?.includes(formatedItem) && {
                      color: Colors.white,
                    },
                  ]}>
                  {mapItem?.getDate()}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
});
export default CustomCalender;

const styles = StyleSheet.create({
  textMonthName: {
    ...SharedStyles.textBold16,
    marginHorizontal: PixelPerfect(22),
    marginBottom: Platform.OS == 'ios' ? PixelPerfect(15) : 10,
    textAlign: 'left',
  },
  dayCont: {
    borderRadius: 30,
    width: itemDimension,
    height: PixelPerfect(40),
    ...SharedStyles.centred,
  },
  daysNamesCont: {
    flexDirection: 'row-reverse',
    width: totalWidth,
    marginBottom: PixelPerfect(10),
  },
  textDayName: {
    width: itemDimension,
    textAlign: 'center',
    fontSize: PixelPerfect(13),
    fontFamily: Fonts.Regular,
    color: Colors.grayMain,
  },
  textDayNum: {
    ...SharedStyles.textRegular16,
  },
  circleNumCont: {
    height: PixelPerfect(32),
    width: PixelPerfect(32),
    ...SharedStyles.centred,
  },
});
