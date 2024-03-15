import { FlatList, StyleSheet, Platform, RefreshControl, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import SafeView from '../../components/views/SafeView';
import LogoHeader from '../../components/headers/LogoHeader';
import MessageCard from '../../components/cards/MessageCard';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../constants/interfaces';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { getMyChats } from '../../store/actions/chatActions';
import NoData from '../../components/views/NoData';
import LoaderView from '../../components/views/LoaderView';
import { setBadgeCount } from 'react-native-notification-badge';
import MustLoginContent from '../../content/MustLoginContent';
import { resetUnseen } from '../../store/reducers/authReducer';

const MyMessages = () => {
  const navigation: NavigationProps = useNavigation();
  const dispatch = useAppDispatch();
  const { msgLoader } = useAppSelector(s => s.chatSlice);
  const [messages, setMessages] = useState([]);
  const { isSignIn } = useAppSelector(state => state.authSlice);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoadMoreData, setIsLoadMoreData] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getMyChats({
      page: currentPage, cb(data) {
        setMessages(data?.data);
        setLastPage(data?.last_page);
        setRefreshing(false);
      },
    }));
  }, []);


  const loadMoreData = () => {
    if (currentPage <= lastPage && messages.length > 5 && !msgLoader && !isLoadMoreData) {
      setIsLoadMoreData(true);
      setCurrentPage(p => p + 1);
      dispatch(
        getMyChats({
          page: currentPage,
          cb(data) {
            setMessages([...messages, ...data?.data]);
            setLastPage(data?.last_page);
            setTimeout(() => {
              setIsLoadMoreData(false);
            }, 1000);
          },
        }),
      );
    }
  };


  useEffect(() => {
    dispatch(getMyChats({
      page: currentPage, cb(data) {
        setMessages(data?.data);
        setLastPage(data?.last_page);
      },
    }));
    if (Platform.OS == 'ios') {
      setBadgeCount(0);
    }
    dispatch(resetUnseen());
  }, []);

  return (
    <SafeView>
      <LogoHeader />

      {!isSignIn ? (
        <MustLoginContent />
      ) : (
        <>


          {msgLoader && messages?.length == 0 && (
            <LoaderView />
          )}

          <FlatList
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ paddingTop: 25 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item, index }) => (
              <>
                <MessageCard
                  {...item}
                  hasSeparator={index != messages?.length - 1 && true}
                  onPress={() => {
                    const updatedMessages = { ...messages[index], unseen_count: 0 };

                    const newMessages = [
                      ...messages.slice(0, index),
                      updatedMessages,
                      ...messages.slice(index + 1)
                    ];
                    setMessages(newMessages);
                    navigation.navigate('ChatScreen', item)
                  }}
                />
              </>
            )}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => (msgLoader && messages?.length > 0 ? <ActivityIndicator /> : null)}
          />
          {messages?.length == 0 && !msgLoader && <NoData msg="لا توجد رسائل" />}
        </>
      )}
    </SafeView>
  );
};

export default MyMessages;

const styles = StyleSheet.create({});
