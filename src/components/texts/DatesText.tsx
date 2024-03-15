import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fontStyle} from '../../styles/fonts';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../../store/hook';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';
import {match} from '../../constants/helpers';

const DatesText = () => {
  const {t} = useTranslation();
  const {oneDay, oneTime} = useAppSelector(state => state.dateSlice);

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={styles.oneDateCont}>
        <Text style={styles.textTitle}>{t('bookingDate')}</Text>
        {oneDay != '' && <Text style={styles.textDate}>{oneDay}</Text>}
        {oneTime != 0 && <Text style={styles.textDate}>{oneTime}</Text>}
      </View>
    </View>
  );
};
``;

export default DatesText;

const styles = StyleSheet.create({
  oneDateCont: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: PixelPerfect(15),
  },

  sharedSingleDateCont: {
    alignItems: 'flex-start',
  },
  textDate: {
    ...fontStyle.Bold16,
    color: Colors.mainColor,
    marginBottom: match(2, 4),
  },
  textTitle: {
    ...fontStyle.Medium14,
    marginBottom: match(8, 10),
  },
});
