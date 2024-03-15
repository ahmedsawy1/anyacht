import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeView from '../../components/views/SafeView';
import LogoHeader from '../../components/headers/LogoHeader';
import TopTabs from '../../components/views/TopTabs';
import {SharedStyles} from '../../styles/sharedStyles';
import BookingCard from '../../components/cards/BookingCard';
import {Colors, phoneWidth} from '../../styles/stylesConstants';
import {NavigationProps} from '../../constants/interfaces';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../store/hook';
import {getMyOrders} from '../../store/actions/requestAction';
import LoaderView from '../../components/views/LoaderView';
import NoData from '../../components/views/NoData';
import MustLoginContent from '../../content/MustLoginContent';

const MyBookings = () => {
  const navigation: NavigationProps = useNavigation();
  const [selectedTab, setSelectedTab] = useState('pending');
  const dispatch = useAppDispatch();
  const {loader}: any = useAppSelector(s => s.requestSlice);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersData, setOrdersData] = useState([]);
  const [lastPage, setlastPage] = useState(1);
  const {isSignIn} = useAppSelector(state => state.authSlice);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getMyOrders({
      page: currentPage,
      status: selectedTab,
      cb(data) {
        setOrdersData(data?.data);
        setlastPage(data?.last_page);
        setRefreshing(false); 
      },
    }),);
  }, []);

  useEffect(() => {
    dispatch(
      getMyOrders({
        page: currentPage,
        status: selectedTab,
        cb(data) {
          setOrdersData(data?.data);
          setlastPage(data?.last_page);
        },
      }),
    );
  }, []);

  const loadMoreData = () => {
    if (currentPage <= lastPage) {
      setCurrentPage(p => p + 1);
      dispatch(
        getMyOrders({
          page: currentPage,
          status: selectedTab,
          cb(data) {
            setOrdersData([...ordersData, ...data?.data]);
          },
        }),
      );
    }
  };

  const onTabPress = status => {
    setCurrentPage(1);
    setOrdersData([]);
    setSelectedTab(status);
    dispatch(
      getMyOrders({
        page: 1,
        status,
        cb(data) {
          setOrdersData(data?.data);
          setlastPage(data?.last_page);
        },
      }),
    );
  };

  return (
    <SafeView>
      <LogoHeader />

      {!isSignIn ? (
        <MustLoginContent />
      ) : (
        <>
          {loader && ordersData?.length == 0 && (
            <LoaderView />
          )}
          <View style={{...SharedStyles.paddingHorizontal}}>
            <TopTabs
              tabState={selectedTab}
              onNewPress={() => onTabPress('pending')}
              onPrevPress={() => onTabPress('accepted')}
              onCancelPress={() => onTabPress('rejected')}
            />
          </View>

          <FlatList
            data={ordersData}
            keyExtractor={(_, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item, index}) => {
              return (
                <BookingCard
                  item={item}
                  onCardPress={() =>
                    navigation.navigate('BookingDetails', item)
                  }
                />
              );
            }}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
          />
           {loader && ordersData.length > 0 ? (
              <ActivityIndicator color={Colors.black} />
            ) : ('')}
             {!loader && ordersData?.length == 0 && (
              <NoData msg="لا توجد حجوزات" />
            )}
        </>
        

      )}
    </SafeView>
  );
};

export default MyBookings;

const styles = StyleSheet.create({
  separator: {
    width: phoneWidth,
    borderBottomColor: '#F6F6F6',
    borderBottomWidth: 5,
    zIndex: 1,
  },
});
