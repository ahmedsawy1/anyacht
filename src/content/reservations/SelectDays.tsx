import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import CustomCalender from '../../components/utility/CustomCalender';
import {monthes} from '../../temp/util/dates';
import {arrOfMonthes} from '../../constants/helpers';
import {PixelPerfect} from '../../styles/stylesConstants';
import {useTranslation} from 'react-i18next';
import SelectTimeModal from '../modal/SelectTimeModal';
import {useFocusEffect} from '@react-navigation/native';

const SelectDays = ({boatID}) => {
  const {t} = useTranslation();
  const [state, setState] = useState({
    selectTimeOpen: false,
  });

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () =>
        setState(old => ({...old, selectTimeOpen: false}));
      return () => unsubscribe();
    }, []),
  );

  return (
    <View style={{flex: 1, alignItems: 'center'}}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: PixelPerfect(80),
          marginTop: -8,
        }}>
        {monthes.map((item, index) => {
          const selectedMonth = arrOfMonthes[monthes[index][0].getMonth()];
          const selectedYear = monthes[index][0].getFullYear();

          return (
            <CustomCalender
              boatID={boatID}
              key={index}
              monthDays={item}
              monthName={`${selectedMonth.ar} ${selectedYear}`}
              cb={() => setState(old => ({...old, selectTimeOpen: true}))}
            />
          );
        })}
      </ScrollView>

        { state.selectTimeOpen && 
          <SelectTimeModal
          selectTimeOpen={state.selectTimeOpen}
          onRequestClose={() =>
            setState(old => ({...old, selectTimeOpen: false}))
          }
        />
        }
    </View>
  );
};

export default SelectDays;

const styles = StyleSheet.create({
  checkboxCont: {
    flexDirection: 'row',
    marginTop: 12,
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: Platform.OS == 'ios' ? PixelPerfect(20) : 2,
  },
});