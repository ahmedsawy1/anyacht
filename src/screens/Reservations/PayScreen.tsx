import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import SafeView from '../../components/views/SafeView';
import LogoHeader from '../../components/headers/LogoHeader';
import MainInput from '../../components/inputs/MainInput';
import {fontStyle} from '../../styles/fonts';
import {PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';
import MainButton from '../../components/buttons/MainButton';

const PayScreen: FC<{
  onPress: (data: any) => void;
  onClosePress: () => void;
  loading: boolean;
}> = ({onPress, loading, onClosePress}) => {
  const [state, setState] = useState({
    cardNum: __DEV__ ? '5123 4567 8901 2346' : '',
    endDate: __DEV__ ? '01/31' : '',
    holderName: __DEV__ ? 'Faisal Test Card' : '',
    csv: __DEV__ ? '100' : '',
  });

  const onChangeCardNum = (number: string) => {
    if (number.length <= 19) {
      setState(s => ({
        ...s,
        cardNum: number
          .replace(/\s?/g, '')
          .replace(/(\d{4})/g, '$1 ')
          .trim(),
      }));
    }
  };

  const onChangeCardEndDate = (text: string) => {
    if (text.indexOf('.') >= 0 || text.length > 5) {
      return;
    }
    if (text.length === 2 && state.endDate.length === 1) {
      // This is where the user has typed 2 numbers so far
      // We can manually add a slash onto the end
      // We check to make sure the current value was only 1 character
      // long so that if they are backspacing, we don't add on the slash again
      text += '/';
    }
    setState(s => ({...s, endDate: text}));
  };

  const onChangeCSV = (text: string) => {
    if (text.length <= 3) {
      setState(s => ({...s, csv: text}));
    }
  };

  return (
    <SafeView>
      <LogoHeader hasClose onClosePress={onClosePress} />
      <View style={styles.inputsCont}>
        <Text style={styles.inputTitle}>رقم البطاقة</Text>
        <MainInput
          options={{
            value: state.cardNum,
            onChangeText: t => onChangeCardNum(t),
            placeholder: '',
            keyboardType: 'numeric',
          }}
        />

        <Text style={styles.inputTitle}>تاريخ الانتهاء</Text>
        <MainInput
          options={{
            value: state.endDate,
            onChangeText: t => onChangeCardEndDate(t),
            placeholder: 'شهر / سنة',
            keyboardType: 'numeric',
          }}
        />

        <Text style={styles.inputTitle}>اسم حامل البطاقة</Text>
        <MainInput
          options={{
            value: state.holderName,
            onChangeText: t => setState(s => ({...s, holderName: t})),

            placeholder: 'ادخل الاسم المدون علي وجه البطاقة',
          }}
        />

        <Text style={styles.inputTitle}>رمز التحقق</Text>
        <MainInput
          options={{
            value: state.csv,
            onChangeText: t => onChangeCSV(t),
            keyboardType: 'numeric',
            placeholder: 'CSV',
          }}
        />
      </View>

      <View style={styles.buttonCont}>
        <MainButton
          title="دفع"
          onPress={() => onPress(state)}
          loading={loading}
        />
      </View>
    </SafeView>
  );
};

export default PayScreen;

const styles = StyleSheet.create({
  inputTitle: {
    ...fontStyle.Bold16,
    marginBottom: PixelPerfect(8),
    marginTop: PixelPerfect(18),
    textAlign: 'left',
  },
  buttonCont: {
    ...SharedStyles.paddingHorizontal,
    paddingBottom: PixelPerfect(20),
  },
  inputsCont: {
    ...SharedStyles.paddingHorizontal,
    marginTop: PixelPerfect(10),
    flex: 1,
  },
});

// {
//   "from": "2023-04-15 19:51:00",
//   "to": "2023-04-15 20:51:00",
//   "no_passengers": 1,
//   "payment_method": "card",
//   "credit_card": "5123 4567 8901 2346",
//   "expiration_date": "01/31",
//   "credit_card_name": "Faisal Test Card",
//   "cvv": "100"
// }

// {
//     "from": "2023-02-25 12:00:00",
//     "to": "2023-02-25 13:30:00",
//     "no_passengers": 1,
//     "payment_method": "card",
//     "credit_card": "5123 4567 8901 2346",
//     "expiration_date": "01/31",
//     "credit_card_name": "Faisal Test Card",
//     "csv": "100"
// }
