import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import MainButton from '../../components/buttons/MainButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {SharedStyles} from '../../styles/sharedStyles';
import {NavigationProps} from '../../constants/interfaces';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../store/hook';
import { forgetPasswordCheckOtpAction, resendOtpAction } from '../../store/actions/authActions';

const OTPScreen = () => {
  const navigation: NavigationProps = useNavigation();
  const {t} = useTranslation();
  const {params} = useRoute();
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState('');
  const [loader, setLoader] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [intervalID, setIntervalID] = useState(null);
  console.log('=================params===================');
  console.log(params);
  console.log('====================================');


  const update = () => {
    seconds > 0 && setSeconds(seconds => seconds - 1);
  }

  useEffect(() => {
    if (intervalID == null) {
      setIntervalID(setInterval(update, 1000))
    }
    if(seconds == 0){
      clearInterval(intervalID);
      setIntervalID(null);
    }
   
  },[seconds, intervalID]);
 
  const resendOtp = () => {
    setSeconds(90);
      dispatch(
        resendOtpAction({
          body: {
            mobile: params?.mobile,
            email: params?.email,
          },
          cb(data) {
            console.log(data);
          },
          cbErr() {
          },
        }),
      );
  }

  const confirmOTPHandler = (code) => {
    setLoader(true);
    if (params?.resetPassword) {
      dispatch(
        forgetPasswordCheckOtpAction({
          body: {
            mobile: params?.mobile,
            otp: code,
          },
          cb(data) {
            setLoader(false);
            navigation.navigate('ResetPassword', {
              mobile: params?.mobile,
              otp: code,
            })
          },
          cbErr() {
            setLoader(false);
          },
        }),
      );
    }
  };

  return (
    <SafeView style={styles.cont}>
      <MainHeader />
      <Text style={styles.title}>{t('activationCode')}</Text>
      {params?.type == 2 ? (
        <Text style={styles.subTitle}>{t('enterCodeEmail')}</Text>
      ) : (
        <Text style={styles.subTitle}>{t('enterCode')}</Text>
      )}
      <View style={{height: PixelPerfect(55)}}>
        <OTPInputView
          pinCount={4}
          keyboardType="number-pad"
          autoFocusOnLoad
          codeInputFieldStyle={styles.activeSquare}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            console.log(`Code is ${code}, you are good to go!`);
            setOtp(code);
            confirmOTPHandler(code)
          }}
        />
      </View>

      <Text style={[styles.didntGet]}>
          {t('didntGetCode')}
          {seconds == 0 ? (
            <Text style={{color: Colors.mainColor}} onPress={resendOtp}>{t('resend')}</Text>
            ) : (
              <Text style={{color: Colors.mainColor}}> {t('resendAfter')} {seconds}</Text>
            )
          }
      </Text>
     
      <MainButton
        title={t('continue')}
        style={styles.button}
        onPress={confirmOTPHandler}
        loading={loader}
      />
    </SafeView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  activeSquare: {
    fontSize: PixelPerfect(20),
    color: Colors.black,
    backgroundColor: Colors.white,
    borderWidth: 0,
    borderBottomWidth: 1,
    width: PixelPerfect(60),
  },
  underlineStyleHighLighted: {
    borderColor: Colors.mainColor,
  },
  cont: {
    ...SharedStyles.paddingHorizontal,
  },
  title: {
    fontSize: PixelPerfect(20),
    fontFamily: Fonts.Bold,
    color: Colors.blackText,
    ...SharedStyles.textAlign,
    ...SharedStyles.textSpaceIOS,
    marginTop: PixelPerfect(50),
  },
  subTitle: {
    fontSize: PixelPerfect(16),
    fontFamily: Fonts.Regular,
    color: Colors.blackText,
    ...SharedStyles.textAlign,
    marginBottom: 15,
  },
  button: {
    marginBottom: PixelPerfect(20),
  },
  didntGet: {
    color: Colors.blackText,
    textAlign: 'center',
    fontFamily: Fonts.Medium,
    fontSize: PixelPerfect(14),
    marginVertical: PixelPerfect(30),
  },
});
