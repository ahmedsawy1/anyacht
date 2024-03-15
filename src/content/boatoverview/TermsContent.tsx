import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SharedStyles} from '../../styles/sharedStyles';
import {useTranslation} from 'react-i18next';
import {Fonts, PixelPerfect} from '../../styles/stylesConstants';

const TermsContent = ({title, subtitle}) => {
  const {t} = useTranslation();

  return (
    <View style={{...SharedStyles.paddingHorizontal}}>
      <Text style={styles.textTitle}>{title}</Text>
      <Text style={styles.textSubtitle}>{subtitle}</Text>
    </View>
  );
};

export default TermsContent;

const styles = StyleSheet.create({
  textTitle: {
    ...SharedStyles.textBold18,
    color: '#222222',
    marginVertical: 1,
    ...SharedStyles.textAlign,
  },
  textSubtitle: {
    color: '#9B9B9B',
    fontFamily: Fonts.Medium,
    fontSize: PixelPerfect(14),
    ...SharedStyles.textAlign,
    marginTop: PixelPerfect(2),
  },
});
