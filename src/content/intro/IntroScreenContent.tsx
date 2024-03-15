import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, phoneWidth, PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';

const IntroScreenContnet = ({imagePath, title, subTitle, resizeMode}) => {
  return (
    <View style={styles.cont}>
      <Image
        style={styles.image}
        source={imagePath}
        resizeMode={resizeMode ?? 'contain'}
      />
      <View style={styles.contDetailsButton}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text style={styles.textSubTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default IntroScreenContnet;

const styles = StyleSheet.create({
  cont: {
    width: phoneWidth,
  },
  image: {
    width: '100%',
    height: PixelPerfect(250),
  },
  contDetailsButton: {
    alignContent: 'center',
    ...SharedStyles.paddingHorizontal,
  },
  textTitle: {
    ...SharedStyles.textBold18,
    color: Colors.mainColor,
    textAlign: 'center',
    marginBottom: PixelPerfect(10),
  },
  textSubTitle: {
    ...SharedStyles.textRegular14,
    color: Colors.mainColor,
    textAlign: 'center',
    marginBottom: PixelPerfect(40),
  },
});
