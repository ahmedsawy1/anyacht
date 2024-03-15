import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ReviewCard from '../../components/cards/ReviewCard';
import {SharedStyles} from '../../styles/sharedStyles';
import {reviews} from '../../temp/data/review';
import {useTranslation} from 'react-i18next';

const ReviewsContent = () => {
  const {t} = useTranslation();

  return (
    <View style={{...SharedStyles.paddingHorizontal}}>
      <Text style={styles.textTitle}>{t('ratingsNum', {number: 50})}</Text>

      {reviews.map((item, index) => (
        <ReviewCard key={index} {...item} />
      ))}
    </View>
  );
};

export default ReviewsContent;

const styles = StyleSheet.create({
  textTitle: {
    ...SharedStyles.textBold18,
    color: '#222222',
    marginVertical: 1,
    ...SharedStyles.textAlign,
    marginBottom: 10,
  },
});
