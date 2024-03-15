import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Fonts, PixelPerfect} from '../../styles/stylesConstants';
import SafeView from '../../components/views/SafeView';
import {SharedStyles} from '../../styles/sharedStyles';
import MainHeader from '../../components/headers/MainHeader';
import {useTranslation} from 'react-i18next';

const AboutApp = () => {
  const {t} = useTranslation();

  return (
    <SafeView style={{...SharedStyles.paddingHorizontal}}>
      <ScrollView>
        <MainHeader title={t('aboutApp')} />

        <Image
          source={require('../../assets/images/main/about.png')}
          style={styles.image}
        />

        <Text style={styles.textStyle}>
          تطبيق Anyacht هو تطبيق يتيح لك حجز قاربك والتمتع بعطلات سعيدة ورائعة
          في كل انحاء المملكة العربية، يمكنك اختيار الوقت الذي تريذه وتصفح
          القوارب المختلفة والحصول علي العروض المميزة{'\n'}يوفر التطبيق سهولة في
          الاستخدام والحجز وتصفح القوارب المختلفة
        </Text>
      </ScrollView>
    </SafeView>
  );
};

export default AboutApp;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: PixelPerfect(15),
    fontFamily: Fonts.Medium,
    color: '#818181',
    textAlign: 'left',
    lineHeight: PixelPerfect(20),
  },
  image: {
    height: PixelPerfect(171),
    width: '100%',
    borderRadius: PixelPerfect(20),
    marginVertical: 25,
  },
});
