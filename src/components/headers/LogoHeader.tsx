import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';
import {CloseIcon} from '../../assets/svg/icons';
import { SharedStyles } from '../../styles/sharedStyles';

const LogoHeader: FC<{hasClose: boolean; onClosePress: () => void}> = ({
  hasClose = false,
  onClosePress,
}) => {
  return (
    <View style={styles.cont}>
       {hasClose && (
        <TouchableOpacity
          onPress={onClosePress}
          style={styles.arrowCont}>
          <CloseIcon fill={'black'} />
        </TouchableOpacity>
      )}
      <Image
        style={styles.logoImage}
        source={require('../../assets/images/logo/blue-logo.png')}
      />


    
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  cont: {
    alignItems: 'center',
    paddingHorizontal: PixelPerfect(20),
  },
  logoImage: {
    height: PixelPerfect(45),
    width: PixelPerfect(85),
    marginTop: PixelPerfect(15),
  },
  arrowCont: {
    marginTop: PixelPerfect(15),
    alignSelf: 'flex-start',
    backgroundColor: Colors.lightGray,
    height: PixelPerfect(40),
    width: PixelPerfect(40),
    borderRadius: PixelPerfect(20),
    ...SharedStyles.centred,
  },
});
