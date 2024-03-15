import {Pressable, StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';
import React, {FC} from 'react';
import {SharedStyles} from '../../styles/sharedStyles';
import {ArrowLeftIcon} from '../../assets/svg/icons';

interface Props {
  title: string;
  iconColor?: string;
  onPress: () => void;
  hasBorder?: boolean;
  styleTitle?: StyleProp<TextStyle>
}

const SectionButton: FC<Props> = ({title, onPress, hasBorder = true,styleTitle,iconColor}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.cont}>
        <Text style={[styles.title, styleTitle]}>{title}</Text>
        <ArrowLeftIcon fill={ iconColor ?? "#222222"} />
      </View>
      {hasBorder && <View style={styles.separator} />}
    </Pressable>
  );
};

export default SectionButton;

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    ...SharedStyles.textMedium16,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#DEE1E6',
    marginVertical: 15,
  },
});
