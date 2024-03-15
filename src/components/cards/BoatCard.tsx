import {
  Image,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, useState} from 'react';
import {
  Colors,
  ColorWithOpacity,
  Fonts,
  phoneHeight,
  PixelPerfect,
} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';
import {
  RatingStarIcon,
  TickInCircle,
} from '../../assets/svg/icons';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import ImageBlurLoading from 'react-native-image-blur-loading';

export const randerRating = (num: number) => {
  return [...Array(5)].map((_, i) =>
    i < num ? (
      <RatingStarIcon key={i} size={PixelPerfect(15)} color={'#E9B817'} />
    ) : (
      <RatingStarIcon key={i} size={PixelPerfect(15)} color={'#C8C8C8'} />
    ),
  );
};

interface Props {
  imageUrl: string;
  title: string;
  place: string;
  price_per_hour: number;
  rate: string;
  number_of_orders: number;
  personsNum: number;
  style?: StyleProp<ViewStyle>;
  boat_type: {image_link: string};
  hasSeparator?: boolean;
}

const BoatCard: FC<Props> = props => {
  const {
    title,
    price_per_hour,
    rate,
    number_of_orders,
    style,
    place,
    personsNum,
    hasSeparator = true,
    imageUrl,
    canNavigate = true,
  } = props;

  const {t} = useTranslation();

  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('BoatOverview', props)}
      style={[styles.cont, style, hasSeparator ? styles.borderBottom : null]}>

      <ImageBlurLoading
        style={[styles.sliderImageStyle]}
        resizeMode={'cover'}
        fastImage={true}
        source={{uri: imageUrl}}
      />

      

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={styles.iconUsers}
          source={require('../../assets/icons/two-users-gray.png')}
        />
        <Text style={styles.textPlace}>
          {personsNum} - {place}
        </Text>
      </View>

      <Text style={styles.title}>{title}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {randerRating(rate)}
        <Text style={styles.rateText}>{rate}</Text>
        <TickInCircle
          height={PixelPerfect(16)}
          width={PixelPerfect(16)}
          fill="#4BD12A"
        />
        <Text style={styles.rateText}>
          {t('hasBooked', {number: number_of_orders})}
        </Text>
      </View>

      <Text style={styles.price}>
        {price_per_hour}{' '}
        <Text style={{fontSize: PixelPerfect(14), fontFamily: Fonts.Medium}}>
          {t('sarPerDay')}
        </Text>
      </Text>
    </Pressable>
  );
};

export default BoatCard;

const styles = StyleSheet.create({
    cont: {
      ...SharedStyles.marginHorizontal,
    },
    borderBottom: {
      borderBottomWidth: PixelPerfect(0.5),
      borderBottomColor: Colors.lightGray,
    },
    image: {
      height: PixelPerfect(200),
      width: '100%',
      borderRadius: PixelPerfect(10),
    },
    title: {
      fontSize: PixelPerfect(15),
      fontFamily: Fonts.Medium,
      color: '#222222',
      marginVertical:
        Platform.OS == 'android' ? PixelPerfect(2) : PixelPerfect(4),
      ...SharedStyles.textAlign,
    },
    textPlace: {
      fontSize: PixelPerfect(14),
      fontFamily: Fonts.Medium,
      color: '#9B9B9B',
      ...SharedStyles.textAlign,
      marginTop: PixelPerfect(3),
    },
    price: {
      fontSize: PixelPerfect(18),
      fontFamily: Fonts.Bold,
      color: Colors.mainColor,
      ...SharedStyles.textAlign,
      marginVertical: Platform.OS == 'ios' ? PixelPerfect(8) : 0,
    },
    rateText: {
      fontSize: PixelPerfect(13),
      fontFamily: Fonts.Regular,
      color: Colors.blackText,
      marginLeft: PixelPerfect(5),
      marginRight: PixelPerfect(20),
    },
    sliderCon: {
      width: '100%',
      borderRadius: 15,
    },
    sliderImageStyle: {
      width: '100%',
      borderRadius: 15,
      height: phoneHeight / 4,
      marginBottom: PixelPerfect(7),
    },
    iconUsers: {
      height: PixelPerfect(20),
      width: PixelPerfect(20),
      marginRight: 5,
    },
  });
