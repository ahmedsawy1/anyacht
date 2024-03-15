import {StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {SharedStyles} from '../../styles/sharedStyles';
import {t} from 'i18next';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import MainInput from '../../components/inputs/MainInput';
import {EyeIcon, LockIcon} from '../../assets/svg/icons';
import MainButton from '../../components/buttons/MainButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import { useAppDispatch } from '../../store/hook';
import { forgetPasswordResetAction } from '../../store/actions/authActions';

const ResetPassword = () => {
  const navigation = useNavigation();
  const {params} = useRoute();
  const [loader, setLoader] = useState(false);
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const success = () => {
    setLoader(true);
    dispatch(
      forgetPasswordResetAction({
        body: {
          mobile: params?.mobile,
          otp: params?.otp,
          password: password
        },
        cb(data) {
          setLoader(false);
          navigation.navigate('LoginScreen');
        },
        cbErr() {
          setLoader(false);
        },
      }),
    );
  };

  
  return (
    <SafeView style={styles.cont}>
      <MainHeader />
      <Text style={styles.title}>{t('resetPass')}</Text>
      <Text style={styles.subTitle}>{t('addPass')}</Text>

      <MainInput
        style={styles.input}
        rightContent={<LockIcon />}
        leftContent={<EyeIcon />}
        isPassword
        options={{
          placeholder: t('password'),
          value: password,
          onChangeText(text) {
            setPassword(text);
          },
        }}
      />

      <MainButton
        title={t('reset')}
        loading={loader}
        style={styles.button}
        onPress={success}
      />
    </SafeView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  cont: {
    ...SharedStyles.paddingHorizontal,
  },
  title: {
    fontSize: PixelPerfect(20),
    fontFamily: Fonts.Bold,
    color: Colors.blackText,
    ...SharedStyles.textSpaceIOS,
    ...SharedStyles.textAlign,
    marginTop: PixelPerfect(50),
  },
  subTitle: {
    fontSize: PixelPerfect(16),
    fontFamily: Fonts.Regular,
    color: Colors.blackText,
    ...SharedStyles.textAlign,
    marginBottom: PixelPerfect(30),
  },
  input: {
    marginBottom: PixelPerfect(20),
    backgroundColor: Colors.lightGray,
  },
  button: {
    marginBottom: PixelPerfect(20),
  },
});
