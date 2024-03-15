import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { FC } from 'react';
import { Colors, Fonts, PixelPerfect } from '../../styles/stylesConstants';
import { RightArrowIcon } from '../../assets/svg/icons';
import { SharedStyles } from '../../styles/sharedStyles';
import { useNavigation } from '@react-navigation/native';
import { fontStyle } from '../../styles/fonts';

interface Props {
  title?: string | boolean | any;
  sideTitle?: string;
  onResetPress?: () => void;
  onBackButton?: () => void;
  style?: StyleProp<ViewStyle>;
  refreshButton?: boolean;
  hasBack?: boolean;
}

const MainHeader: FC<Props> = ({
  title,
  sideTitle,
  style,
  refreshButton,
  onBackButton,
  onResetPress,
  hasBack = true
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.cont, style]}>
      {hasBack && <TouchableOpacity
        onPress={() => {
          navigation.goBack();
          if(onBackButton != null)
            onBackButton();
        }}
        style={styles.arrowCont}>
        <RightArrowIcon />
      </TouchableOpacity>}

      {title && <Text style={styles.textTitle}>{title}
      {sideTitle && (
        <Text style={styles.sideTitleText}>
        {"\n"}

          {sideTitle}
        </Text>
      )}
      
      </Text>}
     

      {title && (
        <View style={{ height: PixelPerfect(40), width: PixelPerfect(40) }} />
      )}

      {refreshButton && (
        <TouchableOpacity
          style={styles.arrowCont}
          onPress={onResetPress}>
          <RightArrowIcon/>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'row',
    marginTop: PixelPerfect(15),
    alignItems: 'center',
    width: '100%',
  },
  arrowCont: {
    backgroundColor: Colors.lightGray,
    height: PixelPerfect(40),
    width: PixelPerfect(40),
    borderRadius: PixelPerfect(20),
    ...SharedStyles.centred,
  },
  sideTitleText: {
    fontFamily: Fonts.Medium,
    fontSize: PixelPerfect(11),
    color: Colors.grayText,
  },
  textTitle: {
    ...SharedStyles.textMedium16,
    textAlign: 'center',
    flex: 1,
  },
  textRefresh: {
    ...fontStyle.Regular14,
    color: Colors.grayMain,
    marginLeft: 5,
  },
});
