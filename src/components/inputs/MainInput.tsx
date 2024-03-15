import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, useState} from 'react';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';

interface IInput {
  options?: TextInputProps & {ref?: (ref: any) => void};
  style?: StyleProp<ViewStyle>;
  styleTextInput?: StyleProp<TextStyle>;
  hasCode?: boolean;
  isPassword?: boolean;
  rightContent?: any;
  leftContent?: any;
}

const MainInput: FC<IInput> = ({
  style,
  hasCode,
  rightContent,
  leftContent,
  styleTextInput,
  options,
  isPassword,
}) => {
  const [showPass, setShowPass] = useState(true);

  return (
    <View style={[styles.con, style]}>
      {rightContent && <View style={styles.rightCont}>{rightContent}</View>}
      <TextInput
        returnKeyType="done"
        style={[styles.textInput, styleTextInput, hasCode ? styles.otpInput : null]}
        placeholderTextColor="#9B9B9B"
        secureTextEntry={isPassword ? showPass : false}
        {...options}
      />
      {hasCode && <Text style={styles.phoneText}>+966</Text>}
      {leftContent && (
        <Pressable
          onPress={() => {
            if (isPassword) {
              setShowPass(cb => !cb);
            }
          }}
          style={styles.leftCont}>
          {leftContent}
        </Pressable>
      )}
    </View>
  );
};

export default MainInput;

const styles = StyleSheet.create({
  con: {
    height: PixelPerfect(48),
    borderRadius: PixelPerfect(8),
    width: '100%',
    paddingHorizontal: PixelPerfect(16),
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    ...SharedStyles.centred,
  },
  textInput: {
    flex: 12,
    height: '100%',
    padding: 5,
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Medium,
    textAlign: 'right',
    marginHorizontal: 3,
    color: '#9B9B9B',
  },
  phoneText: {
    fontSize: PixelPerfect(16),
    color: Colors.grayText,
    fontFamily: Fonts.Medium,
    paddingRight: PixelPerfect(5),
    marginHorizontal: PixelPerfect(5),
    top: PixelPerfect(2),
  },
  rightCont: {
    flex: 1,
    height: '100%',
    ...SharedStyles.centred,
  },
  leftCont: {
    flex: 1,
    height: '100%',
    ...SharedStyles.centred,
  },
  otpInput: {
    textAlign: 'left',
    fontSize: PixelPerfect(16),
    top: PixelPerfect(1.8),
    right: -11
  }
});
