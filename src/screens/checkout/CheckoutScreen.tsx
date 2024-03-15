import {
  Alert,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {SharedStyles} from '../../styles/sharedStyles';
import {useTranslation} from 'react-i18next';
import {fontStyle} from '../../styles/fonts';
import CustomSelector from '../../components/utility/CustomSelector';
import {
  Colors,
  Fonts,
  phoneWidth,
  PixelPerfect,
} from '../../styles/stylesConstants';
import {useAppDispatch, useAppSelector} from '../../store/hook';
import MainButton from '../../components/buttons/MainButton';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Totals from '../../content/Totals';
import {reserveBoat} from '../../store/actions/requestAction';
import {showMessage} from 'react-native-flash-message';
import {createNumbers} from '../../constants/helpers';
import PayScreen from '../Reservations/PayScreen';
import PayWebview from '../Reservations/PayWebview';
import {ApplePayButton, PaymentRequest} from 'react-native-payments';
import {METHOD_DATA} from '../../data/apple-pay';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';

const CheckoutScreen = () => {
  const translate = useTranslation();
  const {oneDay, timeFrom, timeTo} = useAppSelector(state => state.dateSlice);
  const passengersNumbersArr = createNumbers(12);
  const [passengersNumbers, setPassengersNumbers] = useState(1);
  const [showOptions, setShowOptions] = useState(false);
  const [payVisible, setPayVisible] = useState(false);
  const [webviewURI, setWebviewURI] = useState('');
  const [orderID, setOrderID] = useState('');
  const navigation = useNavigation<any>();
  const [loader, setLoader] = useState(false);

  const {singleBoatData} = useAppSelector(s => s.requestSlice);

  const dispatch = useAppDispatch();

  const onlyDate = oneDay == '' ? '' : oneDay;

  const bodyObjAndroid: any = {
    from: `${onlyDate} ${timeFrom}`,
    to: `${onlyDate} ${timeTo}`,
    no_passengers: passengersNumbers,
    payment_method: 'card',
  };

  const payAndReserveAndroid = () => {
    setLoader(true);
    dispatch(
      reserveBoat({
        boatId: singleBoatData?.boat?.id,
        body: bodyObjAndroid,
        cb(data: any) {
          setWebviewURI(data?.link);
          setOrderID(data?.order_id);
          setLoader(false);
        },
        cbErr() {
          setLoader(false);
          showMessage({
            type: 'danger',
            message: 'عذرا حدث خطأ ولم يتم ارسال الطلب بنجاح',
          });
        },
      }),
    );
  };

  // IOS
  const timeFromFormated = dayjs(`2023-03-29T${timeFrom}:00.895Z`);
  const timeToFormated = dayjs(`2023-03-29T${timeTo}:00.895Z`);

  const timeDiff = timeToFormated.diff(timeFromFormated, 'm');
  const netTotal = (timeDiff / 60) * singleBoatData?.boat?.price_per_hour;

  const DETAILS = {
    id: 'basic-example',
    displayItems: [
      {
        label: 'حجز مركب',
        amount: {currency: 'SAR', value: netTotal},
      },
    ],
    total: {
      label: 'Anyacht App',
      amount: {currency: 'SAR', value: netTotal},
    },
  };

  const bodyObjIOS = {
    from: `${onlyDate} ${timeFrom}`,
    to: `${onlyDate} ${timeTo}`,
    no_passengers: passengersNumbers,
    payment_method: 'apple_pay',
    apple_pay: {
      paymentData: '',
      paymentMethod: {
        network: '',
        displayName: '',
        type: '',
      },
      transactionIdentifier: '',
    },
  };

  const showPaymentSheet = (succeed = true) => {
    const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
    paymentRequest.canMakePayments().then((data:any) => {
      console.log(data);
      paymentRequest
      .show()
      .then((paymentResponse: any) => {
        const card_token = paymentResponse.details.paymentToken;
        console.log('===============got token =====================');
        // console.log(JSON.stringify(paymentResponse._details, null, 3));
        // console.log('====================================');

        if (succeed) {
          // Alert.alert(
          //   `Payment request completed with card token ${card_token}`,
          // );
          bodyObjIOS.apple_pay.paymentData =
            paymentResponse._details.paymentData;
          bodyObjIOS.apple_pay.transactionIdentifier =
            paymentResponse._details.transactionIdentifier;
          bodyObjIOS.apple_pay.paymentMethod = {
            ...paymentResponse._details.paymentMethod,
          };

          dispatch(
            reserveBoat({
              boatId: singleBoatData?.boat?.id,
              body: bodyObjIOS,
              cb(data: any) {
                if (data?.status) {
                  paymentResponse.complete('success');
                  navigation.navigate('BookingSuccess', {id: data?.order_id});
                } else {
                  paymentResponse.complete('failure');
                  showMessage({
                    type: 'danger',
                    message: 'عذرا حدث خطأ ولم يتم ارسال الطلب بنجاح',
                  });
                }
              },
              cbErr() {
                paymentResponse.complete('failure');
                showMessage({
                  type: 'danger',
                  message: 'عذرا حدث خطأ ولم يتم ارسال الطلب بنجاح',
                });
              },
            }),
          );
        } else {
          paymentResponse.complete('failure');
          navigation.navigate('FaildPayScreen');
        }
      })
      .catch((error: any) => {
        if (error.message === 'AbortError') {
          Alert.alert('Payment request was dismissed');
        }
      });
    }, (err:any) => {
      console.log(err);
    })
   
  };

  return (
    <SafeView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}>
        <View style={{...SharedStyles.paddingHorizontal}}>
          <MainHeader />

          <Text style={styles.textTitle}>{translate.t('personsNum')}</Text>
          <CustomSelector
            selected={passengersNumbers}
            show={showOptions}
            onPress={() => setShowOptions(cb => !cb)}
            content={
              <View>
                <ScrollView>
                  {passengersNumbersArr.map((item, index) => (
                    <Pressable
                      key={index}
                      style={[styles.numberDiv, index != passengersNumbersArr?.length - 1 && {
                        borderBottomColor: '#e3e3e3',
                        borderRadius: PixelPerfect(30),
                        borderBottomLeftRadius: PixelPerfect(20),
                        borderBottomWidth: 1,
                      }]}
                      onPress={() => {
                        setShowOptions(false);
                        setPassengersNumbers(item);
                      }}>
                      <Text style={styles.numberText}>{item}</Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            }
          />
        </View>

        <Totals boadCost={netTotal} driverCost={0} vatConst={0} />
      </ScrollView>

      <View style={{...SharedStyles.paddingHorizontal, marginVertical: -10}}>
        {Platform.OS == 'ios' && (
          <ApplePayButton
            type="plain"
            style="black"
            onPress={() => showPaymentSheet(true)}
          />
        )}
        <MainButton
          style={{marginVertical: 5}}
          title={translate.t('confirmAndPay')}
          onPress={() => {
            setPayVisible(true);
          }}
          otherButtonIcon={
            <EvilIcons
              name="arrow-left"
              size={PixelPerfect(28)}
              color={Colors.white}
            />
          }
        />
      </View>

      <Modal
        visible={payVisible}
        animationType={'slide'}
        presentationStyle={'formSheet'}
        onRequestClose={() => setPayVisible(false)}>
        {!webviewURI ? (
          <PayScreen
            onClosePress={() => setPayVisible(false)}
            onPress={(data: any) => {
              (bodyObjAndroid.credit_card = data.cardNum),
                (bodyObjAndroid.expiration_date = data.endDate),
                (bodyObjAndroid.credit_card_name = data.holderName),
                (bodyObjAndroid.csv = data.csv);
              payAndReserveAndroid();
            }}
            loading={loader}
          />
        ) : (
          <PayWebview
            webviewURI={webviewURI}
            orderID={orderID}
            cb={() => setPayVisible(false)}
          />
        )}
      </Modal>
    </SafeView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  textTitle: {
    ...fontStyle.Bold14,
    marginBottom: Platform.OS == 'ios' ? PixelPerfect(8) : 5,
    marginTop: Platform.OS == 'ios' ? PixelPerfect(25) : 15,
    textAlign: 'left',
  },
  textTimeTitle: {
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Medium,
    color: '#9B9B9B',
    marginVertical: Platform.OS == 'ios' ? PixelPerfect(4) : 0,
  },
  textTime: {
    ...fontStyle.Medium14,
    marginLeft: 5,
  },
  textEdit: {
    ...fontStyle.Medium14,
    color: Colors.grayMain,
    textDecorationLine: 'underline',
    flex: 1,
    textAlign: 'right',
  },
  separator: {
    width: phoneWidth,
    borderBottomColor: '#F6F6F6',
    borderBottomWidth: 5,
    zIndex: 1,
    marginTop: 15,
  },
  numberText: {
    ...fontStyle.Medium14,
    textAlign: 'left',
    paddingLeft: PixelPerfect(27),
    marginVertical: 3,
  },
  numberDiv: {
    marginTop: PixelPerfect(5),
    paddingBottom: PixelPerfect(5),
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    margin: 0
  },
});
