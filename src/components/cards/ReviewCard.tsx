import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import {
  Colors,
  Fonts,
  phoneWidth,
  PixelPerfect,
} from '../../styles/stylesConstants';
import {ChevronDown, ChevronUp, RatingStarIcon} from '../../assets/svg/icons';
import {useTranslation} from 'react-i18next';
import {randerRating} from './BoatCard';
import RatingBar from '../utility/RatingBar';

interface Props {
  reviewerName: string;
  reviewDate: string;
  review: string;
  rating: number;
  userImage: string;
}

const ReviewCard: FC<Props> = ({
  rating,
  reviewerName,
  reviewDate,
  review,
  userImage,
}) => {
  const {t} = useTranslation();

  return (
    <View style={[styles.con]}>
      <Image source={{uri: userImage}} style={styles.userImage} />

      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={styles.nameText}>{reviewerName}</Text>
            <Text style={styles.reviewDateText}>{reviewDate}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>{randerRating(rating)}</View>
        </View>

        <Text style={styles.commentText}>{review}</Text>
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  con: {
    width: '100%',
    flexDirection: 'row',
    borderColor: '#F6F6F6',
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginBottom: 10,
  },

  nameText: {
    fontFamily: Fonts.Medium,
    fontSize: PixelPerfect(12),
    color: Colors.black,
  },
  reviewDateText: {
    color: '#9B9B9B',
    fontFamily: Fonts.Medium,
    fontSize: PixelPerfect(10),
    textAlign: 'left',
    marginTop: PixelPerfect(2),
  },
  commentText: {
    textAlign: 'left',
    width: '100%',
    color: Colors.black,
    fontSize: PixelPerfect(11),
    fontFamily: Fonts.Regular,
    marginTop: 10,
  },
  userImage: {
    height: PixelPerfect(50),
    width: PixelPerfect(50),
    borderRadius: PixelPerfect(25),
    marginRight: 11,
  },
});
