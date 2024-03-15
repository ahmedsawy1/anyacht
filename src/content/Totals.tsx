import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {SharedStyles} from '../styles/sharedStyles';
import {useTranslation} from 'react-i18next';
import {Colors, PixelPerfect} from '../styles/stylesConstants';

interface Props {
  boadCost: number;
  driverCost: number;
  vatConst: number;
}

const Totals: FC<Props> = ({boadCost, driverCost, vatConst}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.cont}>
      <View style={styles.titlePriceCont}>
        {/* <Text style={styles.title}>{t('sailingCost', {daysNum: 4})}</Text> */}
        <Text style={styles.title}>{'تكلفة الايجار'}</Text>
        <Text style={styles.price}>{boadCost} SAR</Text>
      </View>
      {/* <View style={styles.titlePriceCont}>
        <Text style={styles.title}>{t('driver')}</Text>
        <Text style={styles.price}>{driverCost} SAR</Text>
      </View> */}
      <View style={styles.titlePriceCont}>
        <Text style={styles.title}>{t('vat')}</Text>
        <Text style={styles.price}>{vatConst} SAR</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.titlePriceCont}>
        <Text
          style={[styles.price, {color: Colors.mainColor, textAlign: 'left'}]}>
          {t('totalDue')}
        </Text>
        <Text style={[styles.price, {color: Colors.mainColor}]}>
          {boadCost + vatConst} SAR
        </Text>
      </View>
    </View>
  );
};

export default Totals;

const styles = StyleSheet.create({
  cont: {...SharedStyles.paddingHorizontal, paddingVertical: 20},
  titlePriceCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    ...SharedStyles.textMedium16,
    textAlign: 'left',
    marginBottom: Platform.OS == 'ios' ? PixelPerfect(5) : 0,
  },
  price: {
    flex: 1,
    ...SharedStyles.textBold16,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#F6F6F6',
    marginTop: 10,
    marginBottom: Platform.OS == 'ios' ? 10 : 5,
  },
});
