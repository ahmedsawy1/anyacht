import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {SharedStyles} from '../../styles/sharedStyles';
import BookingCard from '../../components/cards/BookingCard';
import {newBookingData} from '../../temp/data/myBookings';
import {useTranslation} from 'react-i18next';
import {fontStyle} from '../../styles/fonts';
import {
  Colors,
  Fonts,
  phoneWidth,
  PixelPerfect,
} from '../../styles/stylesConstants';
import Totals from '../../content/Totals';
import MainButton from '../../components/buttons/MainButton';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useAppDispatch, useAppSelector} from '../../store/hook';
import {NavigationProps} from '../../constants/interfaces';
import {useNavigation} from '@react-navigation/native';
import {reserveBoat} from '../../store/actions/requestAction';
const BookingConfirmation = () => {
  const {t} = useTranslation();
  const navigation: NavigationProps = useNavigation();

  const dispatch = useAppDispatch();

  const payAndReserve = () => {
    navigation.navigate('BookingSuccess');
  };

  return (
    <SafeView>
      {/* <Button title="test" onPress={() => {}} /> */}
      <ScrollView>
        <View style={{...SharedStyles.paddingHorizontal}}>
          <MainHeader />
          <Text style={styles.textTitle}>{t('confirmAndPay')}</Text>

          <BookingCard
            style={{paddingHorizontal: 0}}
            {...newBookingData[0]}
            showBookingNum={true}
          />
        </View>

        <View style={styles.separator} />

        <View style={{...SharedStyles.paddingHorizontal, marginTop: 8}}>
          <View style={[styles.sharedTitleCont, {alignItems: 'flex-start'}]}>
            <Image
              style={styles.sharedIcons}
              source={require('../../assets/icons/blue-calender.png')}
            />
          </View>

          <View style={styles.sharedTitleCont}>
            <Image
              style={styles.sharedIcons}
              source={require('../../assets/icons/driver.png')}
            />
            <Text style={styles.textTime}>{t('driver')}</Text>
          </View>

          <View style={styles.sharedTitleCont}>
            <Image
              style={styles.sharedIcons}
              source={require('../../assets/icons/two-users.png')}
            />
            <Text style={styles.textTime}>
              {12} {t('person')}
            </Text>
          </View>
        </View>

        <View style={styles.separator} />
        <Totals />
        <View style={styles.separator} />
      </ScrollView>

      <View style={{...SharedStyles.paddingHorizontal}}>
        <MainButton
          style={{marginVertical: 10}}
          title={t('payNow')}
          onPress={payAndReserve}
          otherButtonIcon={
            <EvilIcons
              name="arrow-left"
              size={PixelPerfect(28)}
              color={Colors.white}
            />
          }
        />
      </View>
    </SafeView>
  );
};

export default BookingConfirmation;

const styles = StyleSheet.create({
  textTitle: {
    ...fontStyle.Bold20,
    marginTop: 30,
    marginBottom: 10,
  },
  separator: {
    width: phoneWidth,
    borderBottomColor: '#F6F6F6',
    borderBottomWidth: 5,
    zIndex: 1,
    marginTop: 15,
  },
  sharedTitleCont: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center',
  },
  textTimeTitle: {
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Medium,
    color: '#9B9B9B',
    marginVertical: Platform.OS == 'ios' ? PixelPerfect(4) : 0,
  },
  textTime: {
    color: Colors.blackText,
    marginLeft: 5,
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Medium,
  },
  sharedIcons: {
    height: PixelPerfect(20),
    width: PixelPerfect(20),
  },
});
