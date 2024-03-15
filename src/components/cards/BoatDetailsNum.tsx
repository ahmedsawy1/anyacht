import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';

const BoatDetailsNum = ({icon, number}) => {
  return (
    <View style={styles.cont}>
      <Image style={styles.image} source={icon} />
      <Text style={styles.text}>{number}</Text>
    </View>
  );
};

export default BoatDetailsNum;

const styles = StyleSheet.create({
  cont: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: PixelPerfect(25),
    borderWidth: 1,
    borderRadius: PixelPerfect(16),
    borderColor: '#DEE1E6',
  },
  image: {
    height: PixelPerfect(26),
    width: PixelPerfect(26),
  },
  text: {
    marginTop: 7,
    ...SharedStyles.textMedium16,
  },
});
