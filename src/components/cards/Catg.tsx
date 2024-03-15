import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../store/hook';
import {getBoatsByCatg} from '../../store/actions/homeActions';
import ImageBlurLoading from 'react-native-image-blur-loading';

const Catg: FC<{image_link: any; text: string; id: any}> = ({image_link, text, id}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  return (
    <Pressable
      style={styles.cont}
      onPress={() => {
        navigation.navigate('BoatsScreen', {title: text, type:"getBoatsByCatg"});
        dispatch(getBoatsByCatg({catgId: id}));
      }}>
      <ImageBlurLoading source={{uri: image_link}} style={styles.image} resizeMode={'cover'} fastImage={true}/>
      <Text style={styles.textTitle}>{text}</Text>
    </Pressable>

  );
};

export default Catg;

const styles = StyleSheet.create({
  image: {
    height: PixelPerfect(110),
    width: PixelPerfect(125),
    borderRadius: PixelPerfect(10),
    backgroundColor: Colors.lightGray,
  },
  cont: {
    marginRight: PixelPerfect(10),
    ...SharedStyles.centred,
  },
  textTitle: {
    ...SharedStyles.textMedium14,
    marginTop: 5,
    height: PixelPerfect(19),
  },
});
