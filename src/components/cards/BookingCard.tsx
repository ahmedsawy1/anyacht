import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';
import {RatingStarIcon, TickInCircle} from '../../assets/svg/icons';
import {useTranslation} from 'react-i18next';

interface Props {
  onCardPress?: () => void;
  showBookingNum?: boolean;
  item: any;
  order: {
    from: any,
    to: any,
    duration: any,
  };
  boat: {
    title: any;
    boat_type: any;
    city: {text: string};
    avg_rating: number;
    image_link: string;
  };
  style?: StyleProp<ViewStyle>;
}

const BookingCard: FC<Props> = props => {
  const {t} = useTranslation();
  const {onCardPress, showBookingNum, style, item} = props;
  const boat = item.boat;
  const randerRating = (num: number) => {
    return [...Array(5)].map((_, i) =>
      i < num ? (
        <RatingStarIcon key={i} size={PixelPerfect(15)} color={'#E9B817'} />
      ) : (
        <RatingStarIcon key={i} size={PixelPerfect(15)} color={'#C8C8C8'} />
      ),
    );
  };

  return (
    <Pressable style={[styles.cont, style]} onPress={onCardPress}>
      <Image source={{uri: boat?.image_link}} style={styles.userImage} />

      <View style={styles.detailsCont}>
        <Text style={styles.textTitle}>{boat?.title}</Text>
        <Text style={styles.textLocationTitle}>{boat?.boat_type?.text}</Text>
        <Text style={styles.textLocationTitle}>{boat?.city?.text}</Text>
        <Text style={[styles.textLocationTitle, styles.dateText]}>
          {item?.to?.slice(0, 11)} {' '} 
          <Text style={[styles.textLocationTitle, styles.timeText]}>
            {item?.from?.slice(11, 16)} - {item?.to?.slice(11, 16)}{' '}
          </Text>
        </Text>

        {/* <View style={styles.titleRateCont}>
          {randerRating(boat?.avg_rating)}
          <Text style={styles.textRateNum}>{boat?.avg_rating?.toFixed(1)}</Text>

          {showBookingNum && (
            <>
              <TickInCircle
                height={PixelPerfect(16)}
                width={PixelPerfect(16)}
                fill="#4BD12A"
              />
              <Text style={styles.textBookingNum}>
                {t('hasBooked', {number: 10})}
              </Text>
            </>
          )}
        </View> */}
      </View>
    </Pressable>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  cont: {
    paddingVertical: 8,
    ...SharedStyles.paddingHorizontal,
    flexDirection: 'row',
    marginBottom: PixelPerfect(4),
  },
  userImage: {
    height: PixelPerfect(100),
    width: PixelPerfect(100),
    borderRadius: PixelPerfect(5),
  },
  detailsCont: {
    flex: 1,
    marginLeft: 15,
    paddingTop: 5,
  },
  textTitle: {
    ...SharedStyles.textBold14,
    marginBottom: PixelPerfect(5),
    textAlign: 'left',
  },
  textRateNum: {
    fontSize: PixelPerfect(12),
    fontFamily: Fonts.Regular,
    color: Colors.blackText,
    marginLeft: 5,
    marginRight: PixelPerfect(20),
  },
  titleRateCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLocationTitle: {
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Medium,
    color: '#9B9B9B',
    marginBottom: 5,
    textAlign: 'left',
  },
  textBookingNum: {
    fontSize: PixelPerfect(13),
    fontFamily: Fonts.Regular,
    color: '#121112',
    marginLeft: 5,
  },
  dateText: {
    width: '100%',
    textAlign: 'right'
  },
  timeText: {
    textAlign: 'left',
    alignSelf: 'flex-start'
  }
});
