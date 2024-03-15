import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {SharedStyles} from '../../styles/sharedStyles';
import {useTranslation} from 'react-i18next';
import {
  Colors,
  Fonts,
  phoneWidth,
  PixelPerfect,
} from '../../styles/stylesConstants';
import {MessageIcon, StarIcon} from '../../assets/svg/icons';
import Totals from '../../content/Totals';
import MainButton from '../../components/buttons/MainButton';
import PopUp from '../../components/views/PopUp';
import RatePopUpContent from '../../content/modal/RatePopUpContent';
import BookingCard from '../../components/cards/BookingCard';
import MapView, {Marker} from 'react-native-maps';
import {axiosAPI} from '../../api/config';
import {match} from '../../constants/helpers';
import {showMessage} from 'react-native-flash-message';

const BookingDetails = () => {
  const {params}: any = useRoute();

  const {t} = useTranslation();
  const [ratePopUpvisiable, setRatePopUpvisiable] = useState(false);
  const [orderData, setOrderData] = useState({});
  const navigation = useNavigation();
  const getBookingDetails = async () => {
    try {
      const {data} = await axiosAPI.get(`orders/${params?.id}`);
      setOrderData(data);
    } catch (error) {
      console.log('====== error get order data =====');
      console.log(error);
    }
  };

  useEffect(() => {
    getBookingDetails();
  }, []);

  const tempMapLocation = {
    latitude: params?.boat?.lat,
    longitude: params?.boat?.lng,
    latitudeDelta: 0.0005,
    longitudeDelta: 0.0005,
  };

  const renderBookingType = () => {
    return (
      <View
        style={[
          styles.bookingTypeCont,
          params.status_id == 1 && {backgroundColor: '#4BD12A'},
          params.status_id == 2 && {backgroundColor: Colors.mainColor},
          params.status_id == 3 && {backgroundColor: '#F5596C'},
        ]}>
        <Text style={styles.textBookingType}>
          {params.status_id == 1 && t('new')}
          {params.status_id == 2 && t('done')}
          {params.status_id == 3 && t('canceled')}
        </Text>
      </View>
    );
  };

  const onOpenChat = async () => {
    try {
      const {data} = await axiosAPI.get(`orders/${params?.id}/message`);
      navigation.navigate('ChatScreen', {id: data?.id});
    } catch (error) {
      console.log('==================error==================');
      console.log(error);
      console.log(params?.id);
      showMessage({type: 'danger', message: 'حدث خطأ يرجي التواصل معنا'});
    }
  };

  const onChatOrRateHandler = () => {
    if (params.status_id == 1) {
      onOpenChat();
    } else {
      setRatePopUpvisiable(true);
    }
  };

  const onSendPress = () => {
    setRatePopUpvisiable(false);
  };

  return (
    <SafeView>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <View style={{...SharedStyles.paddingHorizontal}}>
          <MainHeader title={t('bookingDetails')} />
          <View style={styles.detailsCont}>
            <View style={styles.sharedTitleCont}>
              <Image
                style={styles.sharedIcons}
                source={require('../../assets/icons/coupon.png')}
              />
              <Text style={styles.textTime}>{t('bookingStatus')}</Text>
              {renderBookingType()}
            </View>

            <View style={styles.sharedTitleCont}>
              <Image
                style={styles.sharedIcons}
                source={require('../../assets/icons/hashtag.png')}
              />
              <Text style={styles.textTime}>
                {t('bookingNum')} {params?.id}
              </Text>
            </View>

            <View style={styles.sharedTitleCont}>
              <Image
                style={styles.sharedIcons}
                source={require('../../assets/icons/blue-calender.png')}
              />
              <View>
              
                <Text style={styles.textTimeTitle}>
                  <Text style={styles.textTime}>
                    {params?.to?.slice(0, 11)}{' '}
                    {params?.from?.slice(11, 16)} - {params?.to?.slice(11, 16)}
                  </Text>
                </Text>
              </View>
            </View>

      
            <View style={styles.sharedTitleCont}>
              <Image
                style={styles.sharedIcons}
                source={require('../../assets/icons/two-users.png')}
              />
              <Text style={styles.textTime}>
                {params?.no_passengers} {t('person')}
              </Text>
            </View>

            <View style={styles.sharedTitleCont}>
              <Image
                style={styles.sharedIcons}
                source={require('../../assets/icons/visa.png')}
              />
              <Text style={styles.textTime}>{t('paymentMethod')}</Text>
              <Image
                style={styles.paymentMethodImage}
                resizeMode="contain"
                source={
                    orderData?.payment_method == 'card'
                      ? require('../../assets/images/logo/visa.png')
                      : require('../../assets/images/logo/apple-pay.jpg')
                }
              />
            </View>
          </View>
        </View>
        <View style={styles.separator} />

        <BookingCard
          style={Platform.OS == 'ios' && {marginTop: 10}}
          item={params}
          showBookingNum
        />

        <View style={styles.imageNameCont}>
          <Image
            source={{uri: orderData?.provider?.avatar_link}}
            style={styles.imageStyle}
          />

          <Pressable style={styles.userDetailsCont}>
            <Text style={{...SharedStyles.textBold16, textAlign: 'left'}}>
              {t('owner')}: {orderData?.provider?.name}
            </Text>
          </Pressable>
        </View>

        <View style={styles.separator} />
        <Totals boadCost={orderData?.total_amount} vatConst={0} />
        <View style={styles.separator} />

        <View style={{...SharedStyles.paddingHorizontal, paddingVertical: 15}}>
          <Text
            style={{
              ...SharedStyles.textBold16,
              marginBottom: 5,
              textAlign: 'left',
            }}>
            {t('cancelConds')}
          </Text>
          <Text style={[styles.textTimeTitle, {marginLeft: 0}]}>
            {params?.boat?.terms_of_cancellation}
          </Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.separator} />


        { tempMapLocation.latitude != null && (
             <View style={{...SharedStyles.paddingHorizontal, paddingVertical: 15}}>
             <Text
               style={{
                 ...SharedStyles.textBold16,
                 marginBottom: 10,
                 textAlign: 'left',
               }}>
               {t('locationOnMap')}
             </Text>
   
             <MapView
               mapType="standard"
               provider="google"
               zoomEnabled={true}
               maxZoomLevel={13}
               style={{height: PixelPerfect(150), width: '100%', borderRadius: 10}}
               initialRegion={tempMapLocation}>
               <Marker coordinate={tempMapLocation} />
             </MapView>
             <Text style={[styles.textTimeTitle, {marginLeft: 0}]}>
               {params?.boat?.address}
             </Text>
           </View>
  )}

     

        <PopUp
          style={styles.popUpView}
          styleCont={{flex: 0.8}}
          visible={ratePopUpvisiable}
          onRequestClose={() => setRatePopUpvisiable(false)}>
          <RatePopUpContent orderId={params?.id} onSendPress={onSendPress} />
        </PopUp>
      </ScrollView>

      {params.status_id != 3 && (
        <View style={styles.buttonCont}>
          <MainButton
            title={
              params.status_id == 1 ? t('chatWithOwner') : t('rateExperince')
            }
            style={styles.button}
            buttonIcon={
              params.status_id == 1 ? (
                <MessageIcon fill={Colors.white} />
              ) : (
                <StarIcon />
              )
            }
            onPress={onChatOrRateHandler}
          />
        </View>
      )}
    </SafeView>
  );
};

export default BookingDetails;

const styles = StyleSheet.create({
  detailsCont: {
    marginTop: 20,
    paddingBottom: 10,
  },
  separator: {
    width: phoneWidth,
    borderBottomColor: '#F6F6F6',
    borderBottomWidth: 5,
    zIndex: 1,
  },
  sharedIcons: {
    height: PixelPerfect(20),
    width: PixelPerfect(20),
  },
  textTimeTitle: {
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Medium,
    color: '#9B9B9B',
    marginLeft: 5,
    textAlign: 'left',
    textAlignVertical: 'center',
    marginTop: match(1, 4),
  },
  textTime: {
    color: Colors.blackText,
    marginLeft: 5,
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Medium,
    marginTop: 2,
  },
  sharedTitleCont: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center',
  },
  paymentMethodImage: {
    height: PixelPerfect(25),
    width: PixelPerfect(40),
    marginHorizontal: 5,
  },
  userCont: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  userImage: {
    height: PixelPerfect(50),
    width: PixelPerfect(50),
    borderRadius: PixelPerfect(25),
  },
  textRateNum: {
    fontSize: PixelPerfect(12),
    fontFamily: Fonts.Regular,
    color: Colors.blackText,
    marginLeft: 5,
    marginTop: 2,
  },
  rateCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textPersonName: {
    ...SharedStyles.textBold14,
  },
  textSuccessBooking: {
    fontSize: PixelPerfect(13),
    fontFamily: Fonts.Regular,
    color: Colors.blackText,
    marginHorizontal: 5,
  },
  buttonCont: {
    ...SharedStyles.paddingHorizontal,
    position: 'absolute',
    bottom: 0,
    paddingTop: 10,
    paddingBottom: 20,
    width: '100%',
    backgroundColor: Colors.white,
  },
  button: {},
  bookingTypeCont: {
    paddingHorizontal: 15,
    borderRadius: PixelPerfect(30),
    marginLeft: 8,
    ...SharedStyles.centred,
    paddingVertical: 4,
  },
  textBookingType: {
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Medium,
    color: Colors.white,
  },
  popUpView: {
    backgroundColor: Colors.white,
    ...SharedStyles.paddingHorizontal,
  },
  imageNameCont: {
    flexDirection: 'row',
    marginVertical: 10,
    ...SharedStyles.paddingHorizontal,
  },
  userDetailsCont: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 8,
  },
  imageStyle: {
    height: PixelPerfect(64),
    width: PixelPerfect(64),
    borderRadius: PixelPerfect(32),
  },
});
