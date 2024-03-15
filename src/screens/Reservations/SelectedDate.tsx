import {StyleSheet} from 'react-native';
import React from 'react';
import SelectDays from '../../content/reservations/SelectDays';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {SharedStyles} from '../../styles/sharedStyles';
import {useAppDispatch} from '../../store/hook';
import {resetDates} from '../../store/reducers/selectDate';
import {useRoute} from '@react-navigation/native';

const SelectedDate = () => {
  const dispatch = useAppDispatch();
  const {params} = useRoute();

  dispatch(resetDates());
  console.log(params?.singleBoatData?.id);

  return (
    <SafeView style={styles.cont}>
      <MainHeader />
      <SelectDays boatID={params?.singleBoatData?.id} />
    </SafeView>
  );
};

export default SelectedDate;

const styles = StyleSheet.create({
  cont: {
    alignItems: 'center',
    ...SharedStyles.paddingHorizontal,
  },
});
