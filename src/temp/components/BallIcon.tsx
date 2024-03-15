import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';

const BallIcon = () => {
  return <View style={styles.ball} />;
};

export default BallIcon;

const styles = StyleSheet.create({
  ball: {
    height: PixelPerfect(16),
    width: PixelPerfect(16),
    backgroundColor: Colors.mainColor,
    borderRadius: PixelPerfect(8),
  },
});
