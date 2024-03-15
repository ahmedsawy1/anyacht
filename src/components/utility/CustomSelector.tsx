import {
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, useState} from 'react';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {ArrowDownIcon} from '../../assets/svg/icons';
import {SharedStyles} from '../../styles/sharedStyles';

interface Props {
  selected: string | number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  content: JSX.Element | JSX.Element[];
  show: boolean;
}

const CustomSelector: FC<Props> = ({
  selected,
  onPress,
  style,
  content,
  show,
}) => {
  return (
    <View>
      <Pressable style={[styles.con, style]} onPress={onPress}>
        <Text style={styles.selectedText}>{selected}</Text>
        <View style={styles.arrowCon}>
          <ArrowDownIcon fill={'#9093A3'} />
        </View>
      </Pressable>
      {show && <View style={styles.optionsCont}>{content}</View>}
    </View>
  );
};

export default CustomSelector;

const styles = StyleSheet.create({
  con: {
    height: PixelPerfect(48),
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    borderRadius: PixelPerfect(8),
    overflow: 'hidden',
    alignItems: 'center',
    
  },
  arrowCon: {
    height: '100%',
    width: PixelPerfect(50),
    ...SharedStyles.centred,
  },
  selectedText: {
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Medium,
    color: '#9B9B9B',
    flex: 1,
    marginHorizontal: PixelPerfect(28),
    textAlign: 'left',
  },
  optionsCont: {
    width: '100%',
    backgroundColor: Colors.lightGray,
    borderBottomLeftRadius: PixelPerfect(10),
    borderBottomRightRadius: PixelPerfect(10),
    top: -10,
    zIndex: 1,
  },
});
