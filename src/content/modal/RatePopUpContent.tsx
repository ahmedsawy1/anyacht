import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import LargeInput from '../../components/inputs/LargeInput';
import MainButton from '../../components/buttons/MainButton';
import {useTranslation} from 'react-i18next';
import {SharedStyles} from '../../styles/sharedStyles';
import {PixelPerfect} from '../../styles/stylesConstants';
import RatingBar from '../../components/utility/RatingBar';
import {useAppDispatch} from '../../store/hook';
import {reteOrder} from '../../store/actions/requestAction';

const RatePopUpContent: FC<{onSendDone: () => void; orderId: string}> = ({
  onSendDone,
  orderId,
}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    comment: '',
    rate: 5,
  });

  const onSendPress = () => {
    dispatch(reteOrder({orderId: orderId, ...state}));
  };
  return (
    <View>
      <Text style={styles.textAddRate}>{t('addUrRate')}</Text>
      <RatingBar
        canRate
        onRateDone={rate => {
          setState(s => ({...s, rate: rate}));
        }}
      />
      <LargeInput
        options={{
          placeholder: t('addUrRateDescription'),
          value: state.comment,
          onChangeText(text) {
            setState(s => ({...s, comment: text}));
          },
        }}
        style={styles.largeInput}
      />
      <MainButton title={t('send')} onPress={onSendPress} />
    </View>
  );
};

export default RatePopUpContent;

const styles = StyleSheet.create({
  textAddRate: {
    ...SharedStyles.textBold18,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  largeInput: {
    height: PixelPerfect(90),
    borderRadius: PixelPerfect(20),
    marginVertical: 20,
  },
});
