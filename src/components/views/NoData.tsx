import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {SharedStyles} from '../../styles/sharedStyles';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';

const NoData: FC<{msg: string}> = ({msg}) => {
  return (
    <View style={{flex: 1, ...SharedStyles.centred}}>
      <Text
        style={{
          fontSize: PixelPerfect(16),
          fontFamily: Fonts.Bold,
          color: Colors.black,
          position: 'relative',
          top: PixelPerfect(-200),
          ...SharedStyles.centred,
        }}>
        {msg}
      </Text>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({});
