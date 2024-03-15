import {ImageBackground, Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../store/hook';
import {getBoatsCity} from '../../store/actions/homeActions';

const Destination = ({image_link, text, id}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  return (
    <Pressable
      style={styles.cont}
      onPress={() => {
        navigation.navigate('BoatsScreen', {title: text, type:"getBoatsCity"});
        dispatch(getBoatsCity({cityId: id}));
      }}>
      <ImageBackground
        style={styles.imageBackground}
        source={{uri: image_link}}>
        <Text style={styles.textTitle}>{text}</Text>
      </ImageBackground>
    </Pressable>
  );
};

export default Destination;

const styles = StyleSheet.create({
  cont: {
    borderRadius: PixelPerfect(10),
    overflow: 'hidden',
    marginBottom: 10,
  },
  imageBackground: {
    height: PixelPerfect(150),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: Colors.lightGray,
    flex: 1,
  },
  textTitle: {
    fontSize: PixelPerfect(15),
    fontFamily: Fonts.ExtraBold,
    color: Colors.white,
    marginBottom: PixelPerfect(10),
  },
});
