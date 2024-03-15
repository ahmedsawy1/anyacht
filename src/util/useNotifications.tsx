import messaging from '@react-native-firebase/messaging';
import {AsyncKeys, getItem, saveItem} from '../constants/helpers';
import {useEffect} from 'react';
import {axiosAPI} from '../api/config';
import {useNavigation} from '@react-navigation/native';
import {setBadgeCount} from 'react-native-notification-badge';
import {Platform} from 'react-native';


export const useNotifications = () => {
  const navigation = useNavigation();
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log('Authorization status:', authStatus);
    }
    const knowPre = await messaging().requestPermission({
      sound: true,
      announcement: true,
      // ... other permission settings
    });
  }

  const sendToken = async (push_token: string) => {
    try {
      const {data} = await axiosAPI.post('auth/set-push', {push_token});
      console.log(data);
      console.log('Sent is', push_token);
    } catch (error) {
      console.log('======== error post token ==========');
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      if (token) {
        const currentToken = await getItem(AsyncKeys.NOTIFICATIONS_TOKEN);
        console.log("currentToken is " + currentToken.device_token);
        console.log("new token is " + token);

        
        if(currentToken != null && currentToken.device_token == token){
           return;
        } else {
          await saveItem(AsyncKeys.NOTIFICATIONS_TOKEN, {device_token: token});
          console.log('============= success token up =============');
          console.log(token);
          sendToken(token);
        }
      }
    } catch (error) {
      console.log('======== error get token ==========');
      console.log(error);
      // const data = await getItem(AsyncKeys.NOTIFICATIONS_TOKEN);
      // sendToken(data?.device_token);
    }
  };

  const notficationListener = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        if (Platform.OS == 'ios') {
            setBadgeCount(0);
        }
        console.log('================payload is ====================');
        console.log(remoteMessage.data.data);
        if(remoteMessage.data != null && remoteMessage.data.data != null && remoteMessage.data.data != null){
          var payLoad:any = JSON.parse(remoteMessage.data.data);
          console.log("CHAT IS " + payLoad.conversation_id);
          navigation.navigate('ChatScreen', {id: payLoad.conversation_id});
        }
      }
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:');
          console.log(JSON.stringify(remoteMessage, null, 3));
          console.log(JSON.stringify(remoteMessage?.data?.data, null, 3));
          console.log('================payload====================');
        }
      });
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
    notficationListener();
  }, []);
};
