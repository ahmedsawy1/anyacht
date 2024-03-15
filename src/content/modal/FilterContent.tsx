import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import SafeView from '../../components/views/SafeView';
import ModalHeader from '../../components/headers/ModalHeader';
import {SharedStyles} from '../../styles/sharedStyles';
import CustomSlider from '../../components/utility/CustomSlider';
import {t} from 'i18next';
import {boatOptions} from '../../temp/data/boats';
import CheckBox from '../../components/utility/CheckBox';
import MainButton from '../../components/buttons/MainButton';
import Counter from '../../components/buttons/Counter';

const FilterContent: FC<{onClosePress: () => void}> = ({onClosePress}) => {
  const [stateSliderVal, setstateSliderVal] = useState({
    pricePerDay: [0, 5000],
    boatWidth: [0, 60],
  });

  const [selected, setSelected] = useState<number[]>([]);
  const addToSelected = (item: {id: number}) => {
    if (selected.includes(item.id)) {
      const filterd = selected.filter(_item => _item != item.id);
      console.log(filterd);

      setSelected(filterd);
    } else {
      setSelected([...selected, item.id]);
    }

    console.log(selected);
  };

  return (
    <SafeView style={{...SharedStyles.paddingHorizontal, paddingTop: 10}}>
      <ModalHeader style={{marginBottom: 25}} onClosePress={onClosePress} />

      <CustomSlider
        initVal={stateSliderVal.pricePerDay}
        onValueChange={(val: any) => {
          setstateSliderVal(old => ({...old, pricePerDay: val}));
        }}
        title={t('pricePerDay')}
        unit={'SAR'}
      />
      <View style={styles.separator} />

      <CustomSlider
        initVal={stateSliderVal.boatWidth}
        onValueChange={(val: any) => {
          setstateSliderVal(old => ({...old, boatWidth: val}));
        }}
        title={t('boatWidth')}
        unit={'FT'}
      />
      <View style={styles.separator} />

      <Counter title={t('personsNum')} />
      <View style={styles.separator} />
      <Counter title={t('numberOfCabins')} />
      <View style={styles.separator} />
      <Counter title={t('numberOfBathrooms')} />
      <View style={styles.separator} />

      <Text style={styles.textAdditions}>{t('Additions')}</Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {boatOptions.map((item, index) => (
          <CheckBox
            onPress={() => addToSelected(item)}
            style={{width: '50%', marginTop: 2, marginBottom: 10}}
            key={index}
            title={item.title}
            checked={selected.includes(item.id)}
          />
        ))}
      </View>

      <View
        style={{
          position: 'absolute',
          width: '100%',
          alignSelf: 'center',
          bottom: 30,
        }}>
        <MainButton
          title={t('displayResults')}
          onPress={() => console.log(stateSliderVal)}
        />
      </View>
    </SafeView>
  );
};

export default FilterContent;

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#DEE1E6',
    marginVertical: 10,
  },
  textAdditions: {
    ...SharedStyles.textMedium16,
    marginBottom: 7,
    marginTop: 15,
  },
});
