// import {useDispatch} from 'react-redux';
import {View, Pressable} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {RatingStarIcon} from '../../assets/svg/icons';
import {PixelPerfect} from '../../styles/stylesConstants';

interface IRatingBar {
  canRate?: boolean;
  degree?: any;
  onRateDone?: (rate: number) => void;
}

const RatingBar: FC<IRatingBar> = ({canRate, degree, onRateDone}) => {
  const ratingsArr = [1, 2, 3, 4, 5];
  const [indexState, setIndexState] = useState(degree);

  return (
    <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 5}}>
      {ratingsArr.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => {
            if (canRate) {
              setIndexState(index);
              // dispatch(selectRate(index));
              onRateDone(index + 1);
            }
          }}>
          <RatingStarIcon
            size={PixelPerfect(34)}
            color={index > indexState ? '#D2D2D2' : '#FADC46'}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default RatingBar;
