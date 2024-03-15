import React, {FC} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {SharedStyles} from '../../styles/sharedStyles';
import {Colors} from '../../styles/stylesConstants';

interface ISafeView {
  style?: StyleProp<ViewStyle>;
  children?: any;
  hasPaddingHorizontal?: boolean;
}

const SafeView: FC<ISafeView> = ({style, children, hasPaddingHorizontal}) => {
  const styles = useStyles();

  return (
    <View
      style={[
        styles.cont,
        hasPaddingHorizontal && {...SharedStyles.paddingHorizontal},
        style,
      ]}>
      <SafeAreaView style={[styles.cont]}>{children}</SafeAreaView>
    </View>
  );
};

const useStyles = () =>
  StyleSheet.create({
    cont: {
      flex: 1,
      backgroundColor: Colors.white,
    },
  });

export default SafeView;
