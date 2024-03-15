import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {SharedStyles} from '../../styles/sharedStyles';
import {Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {advantageData} from '../../temp/data/advantageData';
interface Props {
  width: number;
  number_of_cabinets: number;
  number_of_riders: number;
  number_of_bathrooms: number;
}

const EquipmentAndAdvantagesContent: FC<Props> = ({
  width,
  number_of_cabinets,
  number_of_riders,
  number_of_bathrooms,
}) => {
  const {t} = useTranslation();

  const data = advantageData(
    width,
    number_of_riders,
    number_of_cabinets,
    number_of_bathrooms,
  );

  return (
    <View style={{...SharedStyles.paddingHorizontal}}>
      <Text style={styles.title}>{t('equipmentAndAdvantages')}</Text>

      {data?.map((item, index) => (
        <View key={index} style={styles.itemCont}>
          <Image style={styles.image} source={item.icon} />
          <Text style={styles.textAdvantage}>{item.advantage}</Text>
        </View>
      ))}
    </View>
  );
};

export default EquipmentAndAdvantagesContent;

const styles = StyleSheet.create({
  title: {
    ...SharedStyles.textBold18,
    color: '#222222',
    marginVertical: 1,
    ...SharedStyles.textAlign,
  },
  textAdvantage: {
    color: '#222222',
    fontFamily: Fonts.Medium,
    fontSize: PixelPerfect(14),
  },
  image: {
    height: PixelPerfect(24),
    width: PixelPerfect(24),
    marginRight: 10,
  },
  itemCont: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
});
