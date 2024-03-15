import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeView from '../../components/views/SafeView';
import {SharedStyles} from '../../styles/sharedStyles';
import MainHeader from '../../components/headers/MainHeader';
import {useTranslation} from 'react-i18next';
import MainButton from '../../components/buttons/MainButton';
import MainInput from '../../components/inputs/MainInput';
import {EyeIcon, LockIcon} from '../../assets/svg/icons';
import {PixelPerfect} from '../../styles/stylesConstants';

const ChangePassword = () => {
  const {t} = useTranslation();
  return (
    <SafeView style={{...SharedStyles.paddingHorizontal}}>
      <MainHeader title={t('changePassword')} style={{marginBottom: 30}} />

      <MainInput
        style={styles.input}
        rightContent={<LockIcon />}
        leftContent={<EyeIcon />}
        isPassword
        options={{placeholder: t('currentPass')}}
      />

      <View style={styles.separator} />

      <MainInput
        style={styles.input}
        rightContent={<LockIcon />}
        leftContent={<EyeIcon />}
        isPassword
        options={{placeholder: t('newPass')}}
      />

      <MainInput
        style={styles.input}
        rightContent={<LockIcon />}
        leftContent={<EyeIcon />}
        isPassword
        options={{placeholder: t('confirmNewPass')}}
      />

      <MainButton title={t('savingChanges')} style={styles.button} />
    </SafeView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    marginTop: 8,
  },
  input: {
    marginBottom: PixelPerfect(20),
  },
  separator: {
    marginBottom: PixelPerfect(20),
    height: 1,
    width: '40%',
    backgroundColor: '#DEE1E6',
    alignSelf: 'center',
  },
});
