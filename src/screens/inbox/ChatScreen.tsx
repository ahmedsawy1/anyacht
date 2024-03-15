import { FlatList, Platform, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import SafeView from '../../components/views/SafeView';
import { SharedStyles } from '../../styles/sharedStyles';
import MessageInput from '../../components/inputs/MessageInput';
import { useTranslation } from 'react-i18next';
import MessageChatCard from '../../components/cards/MessageChatCard';
import { PixelPerfect } from '../../styles/stylesConstants';
import Dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { getChatByID, sendMessage } from '../../store/actions/chatActions';
import { AsyncKeys, getItem, match } from '../../constants/helpers';
import { useKeyboard } from '../../hooks/useKeyboard';
import MainHeader from '../../components/headers/MainHeader';
import LoaderView from '../../components/views/LoaderView';
import Echo from "laravel-echo";
import { baseDomain, domain } from '../../api/config';
import { addMessage, clearMessages } from '../../store/reducers/chatsReducer';

declare var require: any;
(window as any).Pusher = require('pusher-js');

const ChatScreen = () => {
  const { params }: any = useRoute();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector(s => s.chatSlice);
  const { keyboardHeight, keyboardVisible } = useKeyboard();
  const [userData, setUserData] = useState({});
  const [laravelEcho, setLaravelEcho] = useState({});
  const [loader, setLoader] = useState(true);
  const [online, setOnline] = useState(false);
  const [whispered, setWhispered] = useState(false);
  const [isTyping, setIsTyping] = useState(false);



  const connectToSocket = async (chatId: any, user: any) => {
    let token = (await getItem(AsyncKeys.AUTH_TOKEN)) || '';
    let laravelEcho = new Echo({
      broadcaster: 'pusher',
      key: "websocket",
      wsHost: domain,
      wssPort: 443,
      forceTLS: true,
      encrypted: false,
      disableStats: false,
      cluster: 'mt1',
      authEndpoint: baseDomain + '/broadcasting/auth',
      enabledTransports: ['ws'],
      auth: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    });
    laravelEcho.leave(`session.${chatId}`);
    laravelEcho.join(`session.${chatId}`).here((users: any) => {
      console.log("inside session");
      console.log(users);
      if (users.length > 1) {
        setOnline(true);
      }
    }).joining((joining: any) => {
      console.log("inside joining");
      console.log(joining);
    })
    .leaving((leaving: any) => {
      console.log(leaving);
    }).error((error: any) => {
      console.log("error in socket");
      console.log(error);
    });
    laravelEcho.private(`session.${chatId}`)
      .listen('MessageSent', (data: any) => {
        if(data.message.user_id != user?.id){
          dispatch(addMessage(data.message))
        }
      }).listenForWhisper('typing', () => {
        if(!isTyping){
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
          }, 5000);
        }
      })
      .error((error: any) => {
        console.log("private session error");
        console.log(error);
      });
      setLaravelEcho(laravelEcho);
  };

  const closeConnection = () => {
    laravelEcho.disconnect();
  }

  const setWhisper = () => {
    if(!whispered){
      setWhispered(true);
      laravelEcho.private(`session.${params?.id}`)
      .whisper('typing', {});
      setTimeout(() => {
        setWhispered(false);
      }, 5000);
    }
  }

  const getUserData = async () => {
    const data = await getItem(AsyncKeys.USER_DATA);
    connectToSocket(params?.id, data.user);
    setUserData(data);
  };

  useEffect(() => {
    getUserData();
    dispatch(getChatByID({ chatID: params?.id, cb: () => setLoader(false) }));
    return () => {
      dispatch(clearMessages())
    }
  }, []);

  const [messageState, setMessageState] = useState({
    type: 'text',
    val: '',
  });

  const onSendText = () => {
    if (messageState.val != '') {
      dispatch(
        sendMessage({
          chatID: params?.id,
          body: {
            message: messageState.val,
            message_type: 'txt',
          },
        }),
      );

      dispatch(addMessage({ message: messageState.val, user_id: userData?.user?.id, created_at: "" + new Date() + "" }))
      setMessageState(old => ({ ...old, val: '' }));
    }
  };

  const flatListRef = useRef();
  return (
    <SafeView style={{ ...SharedStyles.paddingHorizontal }}>
      <MainHeader title={params?.provider?.name} sideTitle={isTyping ? t('typing') : online ? t('online') : t('offline')}
       onBackButton={closeConnection}/>

{loader && (
        <LoaderView  />
      )}

      <View style={{ flex: 1, marginBottom: PixelPerfect(50) }}>
        <FlatList
          ref={flatListRef}
          onContentSizeChange={() => flatListRef.current.scrollToEnd()}
          onLayout={() => flatListRef.current.scrollToEnd()}
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={[
            Platform.OS == 'android' && {
              marginTop: PixelPerfect(15),
              marginBottom: PixelPerfect(30),
              paddingBottom: PixelPerfect(20),
            },
            keyboardVisible &&
            Platform.OS == 'ios' && { paddingBottom: keyboardHeight },
          ]}
          renderItem={({ item, index }) => {
            const messageTime = Dayjs(item?.created_at).format('hh:mm A');
            return (
              <MessageChatCard
                message={item.message}
                messageType="text"
                style={[
                  item.user_id != userData?.user?.id && { alignSelf: 'flex-end' },
                  item.user_id == userData?.user?.id && {
                    alignSelf: 'flex-start',
                  },
                  index == messages?.length - 1 && {
                    marginBottom: PixelPerfect(30),
                  },
                ]}
                isMyMessage={item.user_id == userData?.user?.id}
                sentTime={messageTime}
              />
            );
          }}
        />
      </View>

      <View
        style={[
          styles.bottomViewCont,
          keyboardVisible && {
            bottom: match(15, keyboardHeight - PixelPerfect(10)),
          },
        ]}>
        <MessageInput
          options={{
            placeholder: t('message'),
            value: messageState.val,
            onChangeText(inputText) {
              setMessageState(old => ({ ...old, val: inputText }));
              setWhisper();
            }
          }}
          onSendMessage={onSendText}
        />
      </View>
    </SafeView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  bottomViewCont: {
    position: 'absolute',
    bottom: match(15, 30),
    width: '100%',
    alignSelf: 'center',
  },
  mapView: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    marginTop: PixelPerfect(20),
  },
});
