import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';

interface Props {
  timeText: string;
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  disable?: boolean;
  booked?: boolean;
  onPress?: () => void;
}

const TimeButton: FC<Props> = ({
  timeText,
  style,
  styleText,
  disable,
  booked,
  onPress,
}) => {
  return (
    <Pressable disabled={booked}
      onPress={() => {
        !disable && onPress();
      }}
      style={[styles.cont, disable && styles.disable, booked && styles.booked, style]}>
      <Text
        style={[
          styles.textTime,
          disable && {textDecorationLine: 'line-through'},
          styleText,
        ]}>
        {timeText}
      </Text>
    </Pressable>
  );
};

export default TimeButton;

const styles = StyleSheet.create({
  cont: {
    paddingVertical: PixelPerfect(15),
    marginBottom: 10,
    borderRadius: PixelPerfect(10),
    paddingHorizontal: PixelPerfect(10),
    borderWidth: 1,
    borderColor: '#DEE1E6',
    alignItems: 'center',
  },
  disable: {
    borderColor: Colors.lightGray,
  },
  textTime: {
    ...SharedStyles.textRegular16,
    textAlign: 'center',
  },
  booked: {
    backgroundColor: Colors.lightGray,
  }
});
