import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Fonts, PixelPerfect} from '../styles/stylesConstants';
import MainButton from '../components/buttons/MainButton';
import {t} from 'i18next';
import {useNavigation} from '@react-navigation/native';
import {SharedStyles} from '../styles/sharedStyles';

const MustLoginContent = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.loginCont}>
      <Text style={styles.successText}>{t('mustBeLoggedIn')}</Text>
      <Text style={styles.youCanText}>{t('toAccessThisPage')}</Text>
      <MainButton
        title={'الذهاب لتسجيل الدخول'}
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </View>
  );
};

export default MustLoginContent;

const styles = StyleSheet.create({
  loginCont: {
    alignItems: 'center',
    paddingTop: PixelPerfect(200),
    ...SharedStyles.paddingHorizontal,
    flex: 1,
  },
  successText: {
    fontSize: PixelPerfect(20),
    fontFamily: Fonts.Bold,
    color: Colors.black,
    marginTop: 30,
  },
  youCanText: {
    fontSize: PixelPerfect(16),
    fontFamily: Fonts.Regular,
    color: Colors.black,
    marginTop: 5,
    textAlign: 'center',
    marginBottom: 30,
  },
});
