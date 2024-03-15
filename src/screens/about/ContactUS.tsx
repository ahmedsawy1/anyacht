import {Button, ScrollView, Share, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {SharedStyles} from '../../styles/sharedStyles';
import {useTranslation} from 'react-i18next';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';
import MainInput from '../../components/inputs/MainInput';
import {
  EmailIcon,
  LockIcon,
  PhoneIcon,
  SudiFlag,
  UserIcon,
} from '../../assets/svg/icons';
import MainButton from '../../components/buttons/MainButton';
import LargeInput from '../../components/inputs/LargeInput';

const ContactUS = () => {
  const {t} = useTranslation();

  return (
    <SafeView style={{...SharedStyles.paddingHorizontal}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainHeader title={t('contactUs')} style={{marginBottom: 30}} />

        <Text style={styles.title}>{t('supportTeamIsReady')}</Text>
        <Text style={styles.subTitle}>{t('sendUs')}</Text>

        <MainInput
          style={styles.input}
          rightContent={<UserIcon />}
          options={{placeholder: t('fullName')}}
        />

        <MainInput
          style={styles.input}
          styleTextInput={{textAlign: 'left'}}
          rightContent={<PhoneIcon />}
          leftContent={<SudiFlag />}
          hasCode
          options={{keyboardType: 'number-pad', placeholder: '5xxxxxxxx'}}
        />

        <MainInput
          style={styles.input}
          rightContent={<EmailIcon />}
          options={{placeholder: t('email')}}
        />

        <LargeInput
          style={[styles.input, styles.largeInput]}
          options={{placeholder: t('messageContent'), multiline: true}}
          rightContent={<LockIcon />}
        />

        <MainButton title={t('send')} />
      </ScrollView>
    </SafeView>
  );
};

export default ContactUS;

const styles = StyleSheet.create({
  title: {
    ...SharedStyles.textBold20,
    ...SharedStyles.textAlign,
  },
  subTitle: {
    ...SharedStyles.textRegular16,
    ...SharedStyles.textAlign,
    marginBottom: PixelPerfect(30),
  },
  input: {
    marginBottom: PixelPerfect(20),
    backgroundColor: Colors.lightGray,
  },
  largeInput: {
    height: PixelPerfect(100),
    borderRadius: PixelPerfect(24),
    // flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 0,
  },
});
