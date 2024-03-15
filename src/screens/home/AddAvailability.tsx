import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomCalender, {
  totalWidth,
} from '../../components/utility/CustomCalender';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {monthes} from '../../temp/util/dates';
import {arrOfMonthes, getDaysInMonthUTC} from '../../constants/helpers';
import {
  Colors,
  ColorWithOpacity,
  PixelPerfect,
} from '../../styles/stylesConstants';
import MainButton from '../../components/buttons/MainButton';
import {useTranslation} from 'react-i18next';
import {SharedStyles} from '../../styles/sharedStyles';
import {HoursTimesData} from '../../temp/data/dates';
import TimeButton from '../../components/buttons/TimeButton';

const AddAvailability = () => {
  const {t} = useTranslation();

  // 0 --> days
  // 1 --> times
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTimesArr, setSelectedTimesArr] = useState([
    '10:30 AM - 11:30 AM',
  ]);

  const onSelectHour = (mapItem: any) => {
    console.log(selectedTimesArr.includes(mapItem));
    if (selectedTimesArr.includes(mapItem)) {
      const filtered = selectedTimesArr.filter(item => item != mapItem);
      setSelectedTimesArr(filtered);
    } else {
      setSelectedTimesArr([...selectedTimesArr, mapItem]);
      console.log(mapItem);
    }
  };

  return (
    <SafeView>
      <MainHeader style={{width: totalWidth, alignSelf: 'center'}} />
      <View style={styles.selectionTitlesCont}>
        <Text
          onPress={() => setSelectedTab(0)}
          style={[
            styles.textSelectedTab,
            selectedTab == 0 && {color: Colors.blackText},
          ]}>
          {t('availableDays')}
        </Text>
        <Text
          onPress={() => setSelectedTab(1)}
          style={[
            styles.textSelectedTab,
            selectedTab == 1 && {color: Colors.blackText},
          ]}>
          {t('availableTimes')}
        </Text>
      </View>

      {selectedTab == 0 && (
        <View style={{flex: 1, alignItems: 'center'}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: PixelPerfect(80)}}>
            {monthes.map((item, index) => {
              const selectedMonth = arrOfMonthes[monthes[index][0].getMonth()];
              const selectedYear = monthes[index][0].getFullYear();

              return (
                <CustomCalender
                  // boatID={boatID}
                  key={index}
                  monthDays={item}
                  monthName={`${selectedMonth.ar} ${selectedYear}`}
                />
              );
            })}
          </ScrollView>
        </View>
      )}
      {selectedTab == 1 && (
        <View style={{flex: 1, marginTop: PixelPerfect(30)}}>
          <FlatList
            data={HoursTimesData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => {
              const selected = selectedTimesArr.includes(item);

              return (
                <View style={{width: totalWidth, alignSelf: 'center'}}>
                  <TimeButton
                    timeText={item}
                    style={selected && {borderColor: Colors.mainColor}}
                    styleText={selected && {color: Colors.mainColor}}
                    onPress={() => onSelectHour(item)}
                  />
                </View>
              );
            }}
          />
        </View>
      )}

      <MainButton title={t('Saving changes')} style={styles.button} />
    </SafeView>
  );
};

export default AddAvailability;

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    marginTop: 8,
    width: totalWidth,
    alignSelf: 'center',
  },
  selectionTitlesCont: {
    flexDirection: 'row',
    width: totalWidth,
    justifyContent: 'space-between',
    marginTop: PixelPerfect(40),
    alignSelf: 'center',
  },
  textSelectedTab: {
    ...SharedStyles.textBold20,
    color: ColorWithOpacity('#121112', 0.3),
  },
});

// {allMonths.map((item, index) => {
//   console.log(item[0].getMonth() + 1);
// })}
