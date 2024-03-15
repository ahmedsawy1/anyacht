import { StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import { SharedStyles } from '../../styles/sharedStyles';
import { t } from 'i18next';
import { Colors, Fonts, PixelPerfect } from '../../styles/stylesConstants';
import MainInput from '../../components/inputs/MainInput';
import { PhoneIcon, SudiFlag } from '../../assets/svg/icons';
import MainButton from '../../components/buttons/MainButton';
import {useNavigation} from '@react-navigation/native';
import { useAppDispatch } from '../../store/hook';
import { forgetPasswordAction } from '../../store/actions/authActions';

const ForgetPassword = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [mobile, setMobile] = useState("");
  const [loader, setLoader] = useState(false);

  const resetHandler = () => {
    setLoader(true);

    dispatch(
      forgetPasswordAction({
        body: {
          mobile: mobile,
        },
        cb(data) {
          console.log(data);
          setLoader(false);
          navigation.navigate('OTPScreen', {
            mobile: mobile,
            resetPassword: true,
            type: 1,
          })
        },
        cbErr() {
          setLoader(false);
        },
      }),
    );



  }
  return (
    <SafeView style={styles.cont}>
      <MainHeader />
      <Text style={styles.title}>{t('forgetPass')}</Text>
      <Text style={styles.subTitle}>{t('enterPhone')}</Text>
      <MainInput
        style={styles.input}
        styleTextInput={{ textAlign: 'left' }}
        rightContent={<PhoneIcon />}
        leftContent={<SudiFlag />}
        hasCode
        options={{
          keyboardType: 'number-pad',
          placeholder: '5xxxxxxxx',
          value: mobile,
          onChangeText(text) {
            setMobile(text);
          },
        }}
      />
      <MainButton
        title={t('continue')}
        style={styles.button}
        loading={loader}
        onPress={resetHandler}
      />
    </SafeView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
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
  },
  input: {
    marginTop: PixelPerfect(26),
    marginBottom: PixelPerfect(20),
    backgroundColor: Colors.lightGray,
  },
  button: {
    marginBottom: PixelPerfect(20),
  },
});
