import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeView from '../../components/views/SafeView';
import {SharedStyles} from '../../styles/sharedStyles';
import SectionButton from '../../components/buttons/SectionButton';
import {useTranslation} from 'react-i18next';
import MainHeader from '../../components/headers/MainHeader';
import {NavigationProps} from '../../constants/interfaces';
import {useNavigation} from '@react-navigation/native';

const EditProfile = () => {
  const {t} = useTranslation();
  const navgiation: NavigationProps = useNavigation();

  return (
    <SafeView style={{...SharedStyles.paddingHorizontal}}>
      <MainHeader title={t('editProfile')} />
      <View style={styles.sectionsCont}>
        <SectionButton
          title={t('editProfileData')}
          onPress={() => navgiation.navigate('EditProfileData')}
        />
        <SectionButton
          title={t('changePassword')}
          onPress={() => navgiation.navigate('ChangePassword')}
        />
      </View>
    </SafeView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  sectionsCont: {
    marginTop: 30,
  },
});
