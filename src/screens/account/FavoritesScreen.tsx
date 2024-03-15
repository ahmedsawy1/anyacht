import {FlatList, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeView from '../../components/views/SafeView';
import BoatCard from '../../components/cards/BoatCard';
import MainHeader from '../../components/headers/MainHeader';
import {useTranslation} from 'react-i18next';
import {PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';
import {axiosAPI} from '../../api/config';
import {fontStyle} from '../../styles/fonts';
import LoaderView from '../../components/views/LoaderView';
import NoData from '../../components/views/NoData';
import { useIsFocused } from '@react-navigation/native';

const FavoritesScreen = () => {
  const {t} = useTranslation();
  const [myFavsData, setMyFavsData] = useState([]);
  const [favPageNum, setFavPageNum] = useState(1);
  const [loader, setLoader] = useState(false);

  const getMyFavs = async () => {
    try {
      const {data} = await axiosAPI.get(`favorites?page=${favPageNum}`);
      setMyFavsData(data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const isFocused = useIsFocused();


  useEffect(() => {
    setLoader(true);
    getMyFavs();
  }, [isFocused]);

  const loadMoreData = () => {
    if (favPageNum < myFavsData?.last_page) {
      setFavPageNum(p => p + 1);
      getMyFavs();
    }
  };

  return (
    <SafeView>
      <MainHeader
        title={t('favorites')}
        style={{...SharedStyles.paddingHorizontal}}
      />

     

      {loader && (
        <LoaderView  />
      )}

      <FlatList
        data={myFavsData?.data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <BoatCard
              style={{marginTop: 10}}
              {...item?.boat}
              place={item?.boat?.city?.text}
              rate={item?.boat?.avg_rating}
              hasSeparator={index != myFavsData?.data.length - 1}
              imageUrl={item?.boat?.image_link}
              personsNum={item?.boat?.number_of_riders}
              price_per_hour={item?.boat?.price_per_hour}
              id={item?.boat_id}
              // canNavigate={false}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.3}
      />
       {myFavsData?.data?.length == 0 ? (
         <NoData msg="لاتوجد قوارب مفضلة" />
      ) : null}
    </SafeView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  noBoatsText: {
    ...fontStyle.Medium16,
    textAlign: 'center',
    marginTop: PixelPerfect(100),
  },
});
