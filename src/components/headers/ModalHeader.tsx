import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import IconButton from '../buttons/IconButton';
import {Colors} from '../../styles/stylesConstants';
import {CloseIcon} from '../../assets/svg/icons';

const ModalHeader: FC<{onClosePress: () => void}> = ({onClosePress, style}) => {
  const {t} = useTranslation();
  return (
    <View style={[styles.cont, style]}>
      <IconButton
        onPress={onClosePress}
        style={{backgroundColor: Colors.lightGray}}>
        <CloseIcon fill="#9B9B9B" />
      </IconButton>
    </View>
  );
};

export default ModalHeader;

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
