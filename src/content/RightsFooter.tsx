import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Fonts, PixelPerfect} from '../styles/stylesConstants';
import {t} from 'i18next';

const RightsFooter = () => {
  const date = new Date();
  return (
    <View style={styles.cont}>
      <Image
        style={styles.logoImage}
        source={require('../assets/images/logo/gray-logo.png')}
      />
      <Text style={styles.rightsText}>
        {t('allRight', {year: date?.getFullYear()})}
      </Text>
    </View>
  );
};

export default RightsFooter;

const styles = StyleSheet.create({
  logoImage: {
    height: PixelPerfect(45),
    width: PixelPerfect(85),
  },
  rightsText: {
    fontSize: PixelPerfect(12),
    fontFamily: Fonts.Regular,
    color: Colors.grayText,
    marginTop: 8,
  },
  cont: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
