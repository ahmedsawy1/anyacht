import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import SafeView from '../../components/views/SafeView';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
  Colors,
  Fonts,
  phoneHeight,
  PixelPerfect,
} from '../../styles/stylesConstants';
import MainInput from '../../components/inputs/MainInput';
import { SharedStyles } from '../../styles/sharedStyles';
import MainButton from '../../components/buttons/MainButton';
import { EmailIcon, EyeIcon, LockIcon, PhoneIcon, SudiFlag, UserIcon } from '../../assets/svg/icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store/hook';
import { loginAction, preLoginAction, checkOtpAction, resendOtpAction } from '../../store/actions/authActions';
import { regexSaudiNumber } from '../../constants/helpers';
import { showMessage } from 'react-native-flash-message';
import { switchSignIn } from '../../store/reducers/authReducer';
import { useKeyboard } from '../../hooks/useKeyboard';
import BottomSheet, { BottomSheetBackdrop, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { keyboardHeight, keyboardVisible } = useKeyboard();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [otpNeeded, setOtpNeeded] = useState(false);
  const [askForPassword, setAskForPassword] = useState(false);
  const [askForName, setAskForName] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [intervalID, setIntervalID] = useState(null)
  const update = () => {
    seconds > 0 && setSeconds(seconds => seconds - 1)
}
  useEffect(() => {
    if (intervalID == null && otpNeeded) {
      setIntervalID(setInterval(update, 1000))
    }
    if(seconds == 0){
      clearInterval(intervalID);
      setIntervalID(null);
    }
   
  },[otpNeeded, seconds, intervalID])

  const [loader, setLoader] = useState(false);
  const [body, setBody] = useState({
    mobile: '',
    password: '',
    type: 1,
    email: '',
    name: '',
    otp: ''
  });

  const loginHandler = () => {
    if (regexSaudiNumber.test(body.mobile) || body.type == 2) {
      setLoader(true);
      if(askForPassword){
        dispatch(
          loginAction({
            body: body,
            cb() {
              setLoader(false);
              dispatch(switchSignIn(true));
              navigation.navigate('SearchScreen');
            },
            cbErr() {
              console.log("error in login");
              setLoader(false);
            },
          }),
        );
      } else {
        dispatch(
          preLoginAction({
            body: body,
            cb(data) {
              setLoader(false);
              if (data.user_exists) {
                setAskForPassword(true);
              } else {
                setOtpNeeded(true);
                bottomSheetRef.current?.expand();
              }
            },
            cbErr() {
              setLoader(false);
            },
          }),
        );
      }
     
    } else {
      setLoader(false);
      showMessage({ type: 'danger', message: 'صيغة الهاتف غير صحيحة' });
    }
  };

  const updateLoginType = (type: any) => {
    setAskForPassword(false);
    setAskForName(false);
    if (type == 1) {
      setBody(s => ({ ...s, type: type, email: '' }));
    } else {
      setBody(s => ({ ...s, type: type, mobile: '' }));
    }
  };

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['2%', '60%'], []);


  const confirmOTPHandler = (code : any) => {
    setLoader(true);
    dispatch(
      checkOtpAction({
        body: {
          mobile: body.mobile,
          email: body.email,
          otp: code,
        },
        cb(data) {
          console.log(data);
          setLoader(false);
          // setOtpNeeded(false);
          bottomSheetRef.current.close();
          if(intervalID != null){
            clearInterval(intervalID);
          }
          setAskForPassword(true);
          setAskForName(true);
        },
        cbErr() {
          setLoader(false);
        },
      }),
    );
  };

  const resendOtp = () => {
    setSeconds(90);
      dispatch(
        resendOtpAction({
          body: {
            mobile: body.mobile,
            email: body.email,
          },
          cb(data) {
            console.log(data);
          },
          cbErr() {
          },
        }),
      );
  }

  return (
    <View style={styles.mainView}>
      <SafeView style={styles.cont}>
        <View style={styles.imageView}>
          <Image
            style={styles.logoImage}
            source={require('../../assets/images/logo/blue-logo.png')}
          />
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: keyboardVisible ? keyboardHeight * 1.5 : 0,
            paddingTop: PixelPerfect(30),
          }}
          showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.loginText}>{t('loginTitle')}</Text>
            <View style={styles.displayInline}>
              <Text style={styles.addText}>{t('addYourData')}</Text>
              {body.type == 1 ? (
                <Text
                onPress={() => updateLoginType(2)}
                  style={[styles.loginOption]}>
                  {t('loginWithEmail')}
                </Text>
              ) : (
                <Text
                  onPress={() => updateLoginType(1)}
                  style={[styles.loginOption]}>
                  {t('loginWithMobile')}
                </Text>
              )}
            </View>

            {body.type == 1 ? (
              <MainInput
                style={styles.input}
                styleTextInput={{ textAlign: 'left', fontSize: PixelPerfect(16), top: PixelPerfect(1.8), right: -11 }}
                rightContent={<PhoneIcon />}
                leftContent={<SudiFlag />}
                hasCode
                options={{
                  keyboardType: 'number-pad',
                  placeholder: '5xxxxxxxx',
                  value: body.mobile,
                  onChangeText(text) {
                    setBody(s => ({ ...s, mobile: text }));
                  },
                }}
              />
            ) : (
              <MainInput
                style={styles.input}
                styleTextInput={{ textAlign: 'left' }}
                rightContent={<EmailIcon />}
                options={{
                  keyboardType: 'email-address',
                  placeholder: '',
                  value: body.email,
                  onChangeText(text) {
                    setBody(s => ({ ...s, email: text }));
                  },
                }}
              />
            )}


            {askForName && (
              <MainInput
                style={styles.input}
                rightContent={<UserIcon />}
                options={{
                  placeholder: t('fullName'),
                  value: body.name,
                  onChangeText(text) {
                    setBody(s => ({ ...s, name: text }));
                  },
                }}
              />
            )}

            {askForPassword && (
              <MainInput
                style={styles.input}
                rightContent={<LockIcon />}
                leftContent={<EyeIcon />}
                isPassword
                options={{
                  placeholder: t('password'),
                  value: body.password,
                  onChangeText(text) {
                    setBody(s => ({ ...s, password: text }));
                  },
                }}
              />
            )}

            {askForPassword && !askForName && (
                <Text
                  onPress={() => navigation.navigate('ForgetPassword')}
                  style={[styles.forgetText, { textDecorationLine: 'underline' }]}>
                  {t('forgetPass')}
              </Text>
            )}


           

            <MainButton
              title={t('enter')}
              style={styles.button}
              onPress={loginHandler}
              loading={loader}
            />

            <Text
              style={[styles.forgetText]}
              onPress={() => navigation.navigate('SearchScreen')}>
              {'الدخول كزائر'}
            </Text>
          </View>

        </ScrollView>

      </SafeView>
      {otpNeeded && (
        <BottomSheetModalProvider>
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            backdropComponent={(backdropProps) => (
              <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
            )}
          >
            <View style={styles.otpModel}>
              <Text style={styles.title}>{t('activationCode')}</Text>
              {body?.type == 2 ? (
                <Text style={styles.subTitle}>{t('enterCodeEmail')}</Text>
              ) : (
                <Text style={styles.subTitle}>{t('enterCode')}</Text>
              )}
              <View style={{ height: PixelPerfect(55) }}>
                <OTPInputView
                  pinCount={4}
                  keyboardType="number-pad"
                  autoFocusOnLoad
                  codeInputFieldStyle={styles.activeSquare}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={code => {
                    setBody(s => ({ ...s, otp: code }));
                    confirmOTPHandler(code);
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
            </View>
          </BottomSheet>
        </BottomSheetModalProvider>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
  },
  cont: {
    ...SharedStyles.paddingHorizontal,
    paddingTop: phoneHeight / 8,
  },
  otpModel: {
    ...SharedStyles.paddingHorizontal,
  },
  loginText: {
    color: Colors.blackText,
    textAlign: 'left',
    fontFamily: Fonts.Bold,
    fontSize: PixelPerfect(25),
    marginTop: PixelPerfect(10),
    ...SharedStyles.textSpaceIOS,
  },
  addText: {
    color: Colors.grayText,
    textAlign: 'left',
    fontFamily: Fonts.Medium,
    fontSize: PixelPerfect(14),
    marginBottom: PixelPerfect(10),
  },
  forgetText: {
    color: Colors.grayText,
    textAlign: 'center',
    fontFamily: Fonts.Medium,
    fontSize: PixelPerfect(14),
    marginBottom: PixelPerfect(20),
    textDecorationColor: 'white',
  },
  loginOption: {
    color: Colors.grayText,
    fontFamily: Fonts.Medium,
    fontSize: PixelPerfect(14),
    marginBottom: PixelPerfect(20),
    alignSelf: 'flex-end'
  },
  input: {
    marginBottom: PixelPerfect(15),
    backgroundColor: Colors.lightGray,
  },
  button: {
    marginBottom: PixelPerfect(20),
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    alignItems: 'center',
    height: PixelPerfect(45),
    width: PixelPerfect(85),
  },
  displayInline: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
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
  title: {
    fontSize: PixelPerfect(20),
    fontFamily: Fonts.Bold,
    color: Colors.blackText,
    ...SharedStyles.textAlign,
    ...SharedStyles.textSpaceIOS,
    marginTop: PixelPerfect(10),
  },
  subTitle: {
    fontSize: PixelPerfect(16),
    fontFamily: Fonts.Regular,
    color: Colors.blackText,
    ...SharedStyles.textAlign,
    marginBottom: 15,
  },
  didntGet: {
    color: Colors.blackText,
    textAlign: 'center',
    fontFamily: Fonts.Medium,
    fontSize: PixelPerfect(14),
    marginVertical: PixelPerfect(30),
  },
});
