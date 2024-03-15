import {
  Alert,
  BackHandler,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeView from '../../components/views/SafeView';
import LogoHeader from '../../components/headers/LogoHeader';
import {MessageIcon, TickInCircle} from '../../assets/svg/icons';
import MainButton from '../../components/buttons/MainButton';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';
import {fontStyle} from '../../styles/fonts';
import {useTranslation} from 'react-i18next';
import {useNavigation, useRoute} from '@react-navigation/native';
import {axiosAPI} from '../../api/config';

const BookingSuccess = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [details, setDetails] = useState({});
  const {params} = useRoute();

  const onBackHandler = () => {
    navigation.navigate('SearchScreen');
    return true;
  };

  const getDetails = async () => {
    try {
      const {data} = await axiosAPI.get(`orders/${params?.id}/transaction`);
      setDetails(data);
    } catch (error) {
      console.log('Error getDetails');
      console.log(error);
    }
  };

  console.log('==================details==================');
  console.log(Platform.OS == 'ios' ? 'details' : details);
  console.log('====================================');

  useEffect(() => {
    getDetails();
  }, []);

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     onBackHandler,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  // useEffect(
  //   () =>
  //     navigation.addListener('beforeRemove', e => {
  //       onBackHandler();
  //     }),
  //   [navigation],
  // );

  return (
    <SafeView hasPaddingHorizontal style={styles.cont}>
      <LogoHeader />

      {details && (
        <View
          style={{flex: 1, marginTop: PixelPerfect(80), alignItems: 'center'}}>
          <TickInCircle />

          <Text style={{...fontStyle.Bold16, marginVertical: 20}}>
            {t('bookingConfirmedSuccessfully')}
          </Text>

          <Text style={styles.confirmSuccess}>
            تكلفة الحجز {details?.transaction?.amount} ريال سعودي
          </Text>

          <Text style={styles.confirmSuccess}>
            {t('uCanReviewDetails', {number: details?.transaction?.order_id})}
            <Text
              onPress={() => navigation.navigate('MyBookings')}
              style={{
                color: Colors.mainColor,
                textDecorationLine: 'underline',
              }}>
              {' '}
              {t('reservations')}
            </Text>
          </Text>

          <Text style={styles.key}>
            معرف العملية: {details?.transaction?.key}
          </Text>
        </View>
      )}

      <MainButton
        title={t('chatWithOwner')}
        style={styles.button}
        buttonIcon={<MessageIcon fill={Colors.white} />}
        onPress={() => navigation.navigate('MyMessages')}
      />
    </SafeView>
  );
};

export default BookingSuccess;

const styles = StyleSheet.create({
  cont: {
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
  },
  confirmSuccess: {
    ...fontStyle.Medium16,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: PixelPerfect(20),
  },
  key: {
    ...fontStyle.Regular13,
    marginTop: PixelPerfect(10),
    color: Colors.grayMain,
  },
});
