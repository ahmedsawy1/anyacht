import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {SharedStyles} from '../../styles/sharedStyles';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import MainInput from '../../components/inputs/MainInput';
import {
  EmailIcon,
  IdCardIcon,
  PhoneIcon,
  SudiFlag,
  UserIcon,
} from '../../assets/svg/icons';
import {useTranslation} from 'react-i18next';
import MainButton from '../../components/buttons/MainButton';
import {useAppDispatch, useAppSelector} from '../../store/hook';
import {axiosAPI} from '../../api/config';
import {showMessage} from 'react-native-flash-message';
import {useNavigation} from '@react-navigation/native';
import {getUserData} from '../../store/reducers/authReducer';
import {AsyncKeys, getItem, saveItem} from '../../constants/helpers';

const EditProfileData = () => {
  const {t} = useTranslation();
  const {userData}: any = useAppSelector(s => s.authSlice);
  
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [state, setState] = useState({
    name: userData?.name,
    mobile: userData?.mobile,
    loader: false,
    changeNumber: false,
    email: userData?.email,
  });

  const success = () => {
    navigation.goBack();
    setState(s => ({...s, loader: false}));
    showMessage({type: 'success', message: 'تم تعديل البيانات بنجاح'});
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getItem(AsyncKeys.USER_DATA);
      console.log("fetchData");
      console.log(data);
    }
  
    fetchData()
      .catch(console.error);
  }, [])

  const updateData = async () => {
    const getStorageData = await getItem(AsyncKeys.USER_DATA);

    const sharedObj = {
      name: state.name,
      email: state.email,
      mobile: state.mobile,
    };

    try {
      setState(s => ({...s, loader: true}));
      const {data} = await axiosAPI.post('auth/update', {...sharedObj});
      dispatch(getUserData({...userData, ...sharedObj}));
      await saveItem(AsyncKeys.USER_DATA, {
        ...getStorageData,
        user: {...userData, ...sharedObj},
      });

      if (data?.mobile_changed) {
        navigation.navigate('OTPScreen', {
          mobile: state?.mobile,
          fromUpdate: true,
        });
      } else {
        success();
      }
    } catch (error) {
      console.log('=================update data error===================');
      console.log(error);
      console.log('====================================');
      showMessage({type: 'danger', message: 'خطأ في تعديل البيانات'});
      setState(s => ({...s, loader: false}));
    }
  };

  return (
    <SafeView style={{...SharedStyles.paddingHorizontal}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainHeader title={t('editProfileData')} />

        <View style={{flex: 1, alignItems: 'center'}}>
          <Image
            source={{uri: userData?.avatar_link}}
            style={styles.userImage}
          />

          <View style={{marginTop: 30}} />

          <Text style={styles.inputTitle}>{t('fullName')}</Text>
          <MainInput
            style={styles.input}
            rightContent={<UserIcon />}
            options={{
              placeholder: t('fullName'),
              value: state?.name,
              onChangeText(text) {
                setState(s => ({...s, name: text}));
              },
            }}
          />

          <Text style={styles.inputTitle}>{t('phoneNumber')}</Text>
          <MainInput
            style={styles.input}
            styleTextInput={{textAlign: 'left'}}
            rightContent={<PhoneIcon />}
            leftContent={<SudiFlag />}
            hasCode
            options={{
              keyboardType: 'number-pad',
              placeholder: '5xxxxxxxx',
              value: state?.mobile,
              onChangeText(text) {
                setState(s => ({
                  ...s,
                  mobile: text,
                  changeNumber: true,
                }));
              },
            }}
          />

          <Text style={styles.inputTitle}>{t('email')}</Text>
          <MainInput
            style={styles.input}
            rightContent={<EmailIcon />}
            options={{
              placeholder: t('email'),
              value: state?.email,
              onChangeText(text) {
                setState(s => ({...s, email: text}));
              },
            }}
          />

          <MainButton
            title={t('savingChanges')}
            style={styles.button}
            onPress={updateData}
            loading={state.loader}
          />
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default EditProfileData;

const styles = StyleSheet.create({
  userImage: {
    height: PixelPerfect(106),
    width: PixelPerfect(106),
    borderRadius: PixelPerfect(53),
    marginTop: 30,
    backgroundColor: '#F1F1F1',
  },
  textAddImage: {
    fontFamily: Fonts.Medium,
    fontSize: PixelPerfect(14),
    color: '#9B9B9B',
    marginTop: 10,
  },
  input: {
    marginBottom: PixelPerfect(20),
    backgroundColor: Colors.lightGray,
  },
  inputTitle: {
    ...SharedStyles.textBold14,
    marginBottom: 7,
    paddingHorizontal: PixelPerfect(2),
    width: '100%',
    textAlign: 'left',
  },
  button: {
    marginBottom: 10,
    marginTop: 8,
  },
});
