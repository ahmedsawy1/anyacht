import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';

interface IMainButton {
  style?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
  onPress?: () => void;
  title: string;
  loading?: boolean;
  buttonIcon?: JSX.Element | boolean;
  otherButtonIcon?: JSX.Element | boolean;
  disable?: boolean;
}

const MainButton: FC<IMainButton> = ({
  style,
  styleTitle,
  onPress,
  title,
  buttonIcon,
  otherButtonIcon,
  loading,
  disable,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (!loading) {
          onPress && onPress();
        }
      }}
      activeOpacity={!disable ? 1 : 0.7}
      disabled={disable}
      style={[styles.con, style, disable ? styles.buttonDisabled : styles.buttonNotDisabled]}>
      <View style={styles.iconCont}>{buttonIcon}</View>
      {loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <Text style={[styles.title, styleTitle]}>{title}</Text>
      )}
      <View style={styles.iconCont}>{otherButtonIcon}</View>
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  con: {
    paddingHorizontal: 20,
    backgroundColor: Colors.mainColor,
    borderRadius: PixelPerfect(50),
    ...SharedStyles.centred,
    height: PixelPerfect(48),
    flexDirection: 'row',
  },
  title: {
    fontSize: PixelPerfect(16),
    fontFamily: Fonts.Bold,
    color: Colors.white,
  },
  iconCont: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5
  },
  buttonNotDisabled: {
  }
});
