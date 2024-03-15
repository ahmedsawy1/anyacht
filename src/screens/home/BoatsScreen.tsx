import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../../components/views/SafeView';
import {SharedStyles} from '../../styles/sharedStyles';

import BoatCard from '../../components/cards/BoatCard';
import MainHeader from '../../components/headers/MainHeader';
import {useAppDispatch, useAppSelector} from '../../store/hook';
import {useRoute} from '@react-navigation/native';
import {getBoatsByCatg, getBoatsCity} from '../../store/actions/homeActions';
import NoData from '../../components/views/NoData';
import LoaderView from '../../components/views/LoaderView';

const BoatsScreen = () => {
  const dispatch = useAppDispatch();
  const {boatsData, searchLoader} = useAppSelector(s => s.homeSlice);
  const {params} = useRoute();
  const {data} = boatsData;
  const [currentPage, setCurrentPage] = useState(2);
  const [boatsDataState, setBoatsDataState] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const cb = data => {
    setBoatsDataState([...boatsDataState, ...data?.data]);
  };

  const refreshCb = data => {
    setRefreshing(false);
    setBoatsDataState(data?.data);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (params.type == 'getBoatsCity') {
      dispatch(
        getBoatsCity({
          page: currentPage,
          cb: refreshCb(data),
        }),
      );
    }
    if (params.type == 'getBoatsByCatg') {
      dispatch(
        getBoatsByCatg({
          page: currentPage,
          cb: refreshCb(data),
        }),
      );
    }
  }, []);

  const loadMoreData = () => {
    if (currentPage <= boatsData?.last_page) {
      setCurrentPage(p => p + 1);
      if (params.type == 'getBoatsCity') {
        dispatch(
          getBoatsCity({
            page: currentPage,
            cb: cb(data),
          }),
        );
      }
      if (params.type == 'getBoatsByCatg') {
        dispatch(
          getBoatsByCatg({
            page: currentPage,
            cb: cb(data),
          }),
        );
      }
    }
  };

  return (
    <SafeView>
      <View style={{...SharedStyles.paddingHorizontal}}>
        <MainHeader title={params.title} />
      </View>



      {!searchLoader ? (
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item, index}) => (
            <BoatCard
              style={{marginTop: 10}}
              {...item}
              place={item?.city?.text}
              rate={item?.avg_rating}
              hasSeparator={index != data?.length - 1 }
              lastItem={false}
              imageUrl={item?.image_link}
              personsNum={item?.number_of_riders}
            />
          )}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.3}
          ListFooterComponent={() => (searchLoader ? <ActivityIndicator /> : null)}
        />
      ) : (
        <LoaderView />

      )}
      {!searchLoader && data?.length == 0 ? (
          <NoData msg='لاتوجد قوارب متاحة'/>
        ) : ''}
    </SafeView>
  );
};

export default BoatsScreen;