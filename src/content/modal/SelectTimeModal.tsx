import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import MainHeader from '../../components/headers/MainHeader';
import {
  resetDates,
  selectTimeFrom,
  selectTimeTo,
} from '../../store/reducers/selectDate';
import {
  resetAvailableTimes,
} from '../../store/reducers/requestReducer';


import {useAppDispatch, useAppSelector} from '../../store/hook';
import SafeView from '../../components/views/SafeView';
import {SharedStyles} from '../../styles/sharedStyles';
import DatesText from '../../components/texts/DatesText';
import MainButton from '../../components/buttons/MainButton';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';
import {useTranslation} from 'react-i18next';
import TimeButton from '../../components/buttons/TimeButton';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../constants/interfaces';
import {fontStyle} from '../../styles/fonts';
import dayjs from 'dayjs';
import {match} from '../../constants/helpers';
var utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

interface Props {
  selectTimeOpen: boolean;
  onRequestClose: () => void;
}

const SelectTimeModal: FC<Props> = ({selectTimeOpen, onRequestClose}) => {

  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const navigation: NavigationProps = useNavigation();
  const {availableTimes, loader} = useAppSelector(state => state.requestSlice);
  const {timeFrom, timeTo} = useAppSelector(s => s.dateSlice);
  const [errorMessage, setErrorMessage] = useState('');

  const onConfirmTimePress = () => {

    if (timeFrom == 0) {
      setErrorMessage('اختر وقت بداية الرحلة');
      console.log('اختر وقت بداية الرحلة');
    } else if (timeTo == 0) {
      setErrorMessage('اختر وقت نهاية الرحلة');
      console.log('اختر وقت نهاية الرحلة');
    } else {
      let suit = false;

      for (let index = 0; index < availableTimes.schedule.length; index++) {
        const element: {to: string; from: String} = availableTimes.schedule[index];
        if (
          `${timeFrom}:00` >= element.from &&
          `${timeTo}:00` <= element.to &&
          timeFrom < timeTo
        ) {
          suit = true;
        } else {
          console.log('هذا الوقت غير متاح يرجي تغيير الموعد');
          setErrorMessage('هذا الوقت غير متاح يرجي تغيير الموعد');
        }
      }

      if (suit) {
        navigation.navigate('CheckoutScreen');
      }
    }
  };

  const AVAILABLE_DAY =
    !availableTimes.hasOwnProperty('order_id') && availableTimes.schedule.length > 0;

  const [selectedDuration, setSelectedDuration] = useState(60);

  let arrOfTimeToRender = [];

  for (let index = 0; index < availableTimes?.schedule.length; index++) {
    const element = availableTimes.schedule[index];

    const timeStartMath = dayjs(`2023-03-04T${element?.from}.000Z`).utc();
    const timeEndMath = dayjs(`2023-03-04T${element?.to}.000Z`).utc();

    const subt = timeEndMath.subtract(timeStartMath);
    let updatedTime = timeStartMath;
    for (
      let index = 0;
      index < subt.get('h') / (selectedDuration / 60);
      index++
    ) {
      if (index != 0) {
        updatedTime = updatedTime?.add(selectedDuration, 'm');
      }
      arrOfTimeToRender?.push({text: updatedTime.format('HH:mm'), booked: false});
    }
  }
  if(availableTimes.booked.length > 0){
    for (let index = 0; index < availableTimes.booked.length; index++) {
      const foundBooking = arrOfTimeToRender.findIndex(obj => {
        return obj.text === availableTimes.booked[index].from.slice(0, 5);
      });
      if(foundBooking != -1){
        arrOfTimeToRender[foundBooking].booked = true;
      }
    }
  }

  return (
    <Modal
      animationType="slide"
      visible={selectTimeOpen}
      onRequestClose={onRequestClose}>
      <SafeView style={{...SharedStyles.paddingHorizontal}}>
        <MainHeader
          hasBack={false}
          style={{marginBottom: 15}}
          refreshButton
          onResetPress={() => {
            onRequestClose && onRequestClose();
            dispatch(resetDates());
            dispatch(resetAvailableTimes());
          }}
        />
        <DatesText />

        {loader ? (
          <ActivityIndicator />
        ) : !AVAILABLE_DAY ? (
          <View style={styles.noTimesView}>
            <Text style={{...fontStyle.Bold18}}>غير متاح!</Text>
            <Text style={styles.subTitle}>
              عذرا هذا القارب غير متاح هذا اليوم يرجي اختيار قارب اخر او اختيار
              يوم اخر
            </Text>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <Text style={styles.selectTimeText}>اختر المدة</Text>
            <View style={[styles.timesCont, {justifyContent: 'space-between'}]}>
              {[120, 90, 60]?.map((item, index) => {
                return (
                  <TimeButton
                    key={index}
                    timeText={`${item}\n دقيقة`}
                    style={[
                      {width: '30%'},
                      selectedDuration == item && {
                        borderColor: Colors.mainColor,
                      },
                    ]}
                    styleText={
                      selectedDuration == item && {color: Colors.mainColor}
                    }
                    onPress={() => {
                      dispatch(selectTimeFrom(''));
                      dispatch(selectTimeTo(''));
                      setSelectedDuration(item);
                    }}
                  />
                );
              })}
            </View>

            <Text style={styles.selectTimeText}>
              الاوقات المتاحة لهذا اليوم هي
            </Text>

            <ScrollView
              contentContainerStyle={{paddingBottom: match(20, 50)}}
              showsVerticalScrollIndicator={false}>
              {arrOfTimeToRender?.map((item, index) => {
                return (
                  <TimeButton
                    key={index}
                    timeText={item.text}
                    style={[
                      {width: '100%'},
                      timeFrom == item.text && {
                        borderColor: Colors.mainColor,
                      },
                    ]}
                    styleText={timeFrom == item.text && {color: Colors.mainColor}}
                    booked={item.booked}
                    onPress={() => {
                      const timeFromObj = dayjs(
                        `2023-03-04T${item.text}:00.000Z`,
                      ).utc();
                      dispatch(selectTimeFrom(item.text));
                      const timeToObj = timeFromObj.add(selectedDuration, 'm');
                      dispatch(selectTimeTo(timeToObj.format('HH:mm')));
                    }}
                  />
                );
              })}
            </ScrollView>
          </View>
        )}

        {loader
          ? null
          : AVAILABLE_DAY && (
              <MainButton
                style={{marginVertical: -10}}
                title={t('completeBooking')}
                onPress={onConfirmTimePress}
                disable={timeFrom == ''}
                otherButtonIcon={
                  <EvilIcons
                    name="arrow-left"
                    size={PixelPerfect(28)}
                    color={Colors.white}
                  />
                }
              />
            )}
      </SafeView>
    </Modal>
  );
};

export default SelectTimeModal;

const styles = StyleSheet.create({
  noTimesView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: PixelPerfect(50),
  },
  subTitle: {
    ...fontStyle.Medium16,
    textAlign: 'center',
    marginTop: 8,
  },
  selectTimeText: {
    ...fontStyle.Regular13,
    marginVertical: match(5, 10),
    textAlign: 'left',
  },
  errorText: {
    textAlign: 'center',
    ...fontStyle.Regular15,
    color: 'red',
  },
  timesCont: {
    flexWrap: 'wrap',
    flexDirection: 'row-reverse',
    justifyContent: 'space-evenly',
  },
});
