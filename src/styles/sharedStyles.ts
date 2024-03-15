import {I18nManager, Platform, StyleSheet} from 'react-native';
import {Colors, Fonts, PixelPerfect} from './stylesConstants';

export const SharedStyles = StyleSheet.create({
  shadow: {
    shadowColor: '#1B2B5D',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  centred: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  textAlign: {
    textAlign: I18nManager.isRTL ? 'left' : 'left',
  },
  paddingHorizontal: {
    paddingHorizontal: PixelPerfect(20),
  },
  marginHorizontal: {
    marginHorizontal: PixelPerfect(20),
  },
  textBold13: {
    fontSize: PixelPerfect(13),
    fontFamily: Fonts.Bold,
    color: Colors.blackText,
  },
  textRegular14: {
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Regular,
    color: Colors.blackText,
  },
  textBold14: {
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Bold,
    color: Colors.blackText,
  },
  textBold16: {
    fontSize: PixelPerfect(16),
    fontFamily: Fonts.Bold,
    color: Colors.blackText,
  },
  textRegular16: {
    fontSize: PixelPerfect(16),
    fontFamily: Fonts.Regular,
    color: Colors.blackText,
    textAlign: I18nManager.isRTL ? 'left' : 'left',
  },
  textMedium14: {
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Medium,
    color: Colors.blackText,
  },
  textMedium16: {
    fontSize: PixelPerfect(16),
    fontFamily: Fonts.Medium,
    color: Colors.blackText,
    textAlign: I18nManager.isRTL ? 'left' : 'left',
  },
  textBold18: {
    fontSize: PixelPerfect(18),
    fontFamily: Fonts.Bold,
    color: Colors.blackText,
    textAlign: I18nManager.isRTL ? 'left' : 'left',
  },
  textBold20: {
    fontSize: PixelPerfect(20),
    fontFamily: Fonts.Bold,
    color: Colors.blackText,
    textAlign: I18nManager.isRTL ? 'left' : 'left',
  },

  textSpaceIOS: {
    marginBottom: Platform.OS == 'ios' ? PixelPerfect(8) : 0,
  },
  mainMobileInput: {
    textAlign: 'left',
    fontSize: PixelPerfect(16),
    top: PixelPerfect(1.8),
    right: -11
  }
});
