import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import BoatDetailsNum from '../components/cards/BoatDetailsNum';

interface Props {
  width: number;
  number_of_cabinets: number;
  number_of_riders: number;
  number_of_bathrooms: number;
}

const BoatDetailsNumContent: FC<Props> = ({
  width,
  number_of_cabinets,
  number_of_riders,
  number_of_bathrooms,
}) => {
  return (
    <View style={styles.cont}>
      {width && (
        <BoatDetailsNum
          icon={require('../assets/icons/two-arrow.png')}
          number={width}
        />
      )}
      <BoatDetailsNum
        icon={require('../assets/icons/two-users-gray.png')}
        number={number_of_riders}
      />
      <BoatDetailsNum
        icon={require('../assets/icons/bed.png')}
        number={number_of_cabinets}
      />
      <BoatDetailsNum
        icon={require('../assets/icons/shower.png')}
        number={number_of_bathrooms}
      />
    </View>
  );
};

export default BoatDetailsNumContent;

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
});
