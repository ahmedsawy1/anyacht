import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import SafeView from '../../components/views/SafeView';
import {SharedStyles} from '../../styles/sharedStyles';
import MainHeader from '../../components/headers/MainHeader';
import {useTranslation} from 'react-i18next';
import {termsTexts} from '../../temp/data/terms';

const TermsOfUse = () => {
  const {t} = useTranslation();

  return (
    <SafeView style={{...SharedStyles.paddingHorizontal}}>
      <ScrollView>
        <MainHeader title={t('termsOfUse')} style={{marginBottom: 30}} />

        {termsTexts.map((item, index) => (
          <Text key={index} style={styles.textStyle}>
            0{index + 1} - {item}
          </Text>
        ))}
      </ScrollView>
    </SafeView>
  );
};

export default TermsOfUse;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: PixelPerfect(15),
    fontFamily: Fonts.Medium,
    color: Colors.medGray,
    textAlign: 'left',
    lineHeight: PixelPerfect(22),
    marginBottom: 3,
  },
  image: {
    height: PixelPerfect(171),
    width: '100%',
    borderRadius: PixelPerfect(20),
    marginVertical: 25,
  },
});
