import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import SafeView from '../../components/views/SafeView';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';
import {useTranslation} from 'react-i18next';
import SectionButton from '../../components/buttons/SectionButton';
import MainButton from '../../components/buttons/MainButton';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../constants/interfaces';
import {
  AsyncKeys,
  getItem,
  onShareHandler,
  removeItem,
} from '../../constants/helpers';
import {getUserData, switchSignIn} from '../../store/reducers/authReducer';
import {axiosAPI} from '../../api/config';
import DeleteModal from '../../content/modal/DeleteModal';
import {useAppDispatch, useAppSelector} from '../../store/hook';
import MustLoginContent from '../../content/MustLoginContent';
import LogoHeader from '../../components/headers/LogoHeader';

const MyAccount = () => {
  const {t} = useTranslation();
  const navgiation: NavigationProps = useNavigation();
  const dispatch = useAppDispatch();
  const [showDelete, setShowDelete] = useState(false);

  const logoutHandler = async () => {
    navgiation.navigate('LoginScreen');
    setTimeout(() => {
      dispatch(switchSignIn(false));
      removeItem(AsyncKeys.AUTH_TOKEN);
      removeItem(AsyncKeys.USER_DATA);
    }, 1000);
   
  };
  const {userData} = useAppSelector(s => s.authSlice);

  const getUserDataFN = async () => {
    const data = await getItem(AsyncKeys.USER_DATA);
    dispatch(getUserData(data?.user));
  };

  useEffect(() => {
    getUserDataFN();
  }, []);

  const toggleShowDeleteAlert = () => setShowDelete(cb => !cb);
  const {isSignIn} = useAppSelector(state => state.authSlice);

  const onDeleteAccount = async () => {
    toggleShowDeleteAlert();
    try {
      const {data} = await axiosAPI.get('auth/delete-me');
      // console.log('==================data==================');
      // console.log(data);
      // console.log('====================================');

      logoutHandler();
    } catch (error) {
      console.log('=================err .. onDeleteAccount===================');
      console.log(error);
    }
  };

  return (
    <SafeView style={{...SharedStyles.paddingHorizontal}}>
      {!isSignIn ? (
        <>
          <LogoHeader />

          <MustLoginContent />
        </>
      ) : (
        <>
          <View style={styles.imageNameCont}>
            <Image source={{uri: userData?.avatar_link}} style={styles.image} />

            <Pressable
              style={styles.userDetailsCont}
              onPress={() => navgiation.navigate('EditProfile')}>
              <Text style={{...SharedStyles.textBold16}}>
                {t('hello')} {userData?.name}
              </Text>
              <Text style={styles.textEdit}>{t('editProfile')}</Text>
            </Pressable>
          </View>
          <View style={styles.sectionsCont}>
            <SectionButton
              title={t('favorites')}
              onPress={() => navgiation.navigate('FavoritesScreen')}
            />

            <SectionButton
              title={t('aboutApp')}
              onPress={() => navgiation.navigate('AboutApp')}
            />
            <SectionButton
              title={t('termsOfUse')}
              onPress={() => navgiation.navigate('TermsOfUse')}
            />
            <SectionButton
              title={t('contactUs')}
              onPress={() => navgiation.navigate('ContactUS')}
            />
            {/* <SectionButton title={t('language')} /> */}
            <SectionButton title={t('shareApp')} onPress={onShareHandler} />
            <SectionButton title={t('rateApp')} />
            <SectionButton
              styleTitle={{color: 'red'}}
              iconColor="red"
              title={'حذف الحساب'}
              onPress={toggleShowDeleteAlert}
              hasBorder={false}
            />
          </View>

          <DeleteModal
            showProp={showDelete}
            toggleModal={toggleShowDeleteAlert}
            handleDelete={onDeleteAccount}
          />

          <View style={styles.buttonCont}>
            <MainButton
              onPress={logoutHandler}
              title={t('logout')}
              style={{backgroundColor: Colors.lightGray}}
              styleTitle={{color: '#9B9B9B'}}
              buttonIcon={
                <Image
                  source={require('../../assets/icons/logout.png')}
                  style={{height: PixelPerfect(24), width: PixelPerfect(24)}}
                />
              }
            />
          </View>
        </>
      )}
    </SafeView>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  imageNameCont: {
    flexDirection: 'row',
    marginTop: 15,
  },
  image: {
    height: PixelPerfect(68),
    width: PixelPerfect(68),
    borderRadius: PixelPerfect(34),
  },
  userDetailsCont: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 8,
    alignItems: 'flex-start',
  },
  textEdit: {
    color: '#9B9B9B',
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Medium,
    marginTop: PixelPerfect(5),
  },
  sectionsCont: {
    marginTop: 30,
  },
  buttonCont: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignSelf: 'center',
  },
});
