import {
  I18nManager,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import RNRestart from 'react-native-restart';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import Navigation from './navigation/navigation';
import './localization/i18n.config.ts';
import {switchSignIn} from './store/reducers/authReducer';
import {useAppDispatch} from './store/hook';
import {AsyncKeys, getItem} from './constants/helpers';
import {getUserData} from './store/reducers/authReducer';
import {setBadgeCount} from 'react-native-notification-badge';
import { getUnseenMessages } from './store/actions/authActions';
// import { getUnseenMessages } from './store/actions/requestAction';

export const navigationRef = createNavigationContainerRef();

const AppInitializer = () => {
  const [routeName, setRouteName] = useState('');
  
  // StatusBar.setBarStyle('dark-content');

  const forceRTLFN = () => {
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
      RNRestart.Restart();
    }
  };

  const getUserDataFN = async () => {
    const data = await getItem(AsyncKeys.USER_DATA);
    dispatch(getUserData(data?.user));
  };

  const fetchUnseenMessages = async () => {
      dispatch(getUnseenMessages());
  };

  useEffect(() => {
    forceRTLFN();
    getUserDataFN();
  }, []);

  const dispatch = useAppDispatch();

  const initApp = async (cb?: () => void) => {
    let token = await getItem(AsyncKeys.AUTH_TOKEN);

    if (token) {
      dispatch(switchSignIn(true));
      fetchUnseenMessages();
    }

    if (Platform.OS == 'ios') {
      await setBadgeCount(0);
    }

    cb && cb();
  };

  useEffect(() => {
    initApp();
    setTimeout(() => {
      SplashScreen.hide();
    }, 400);
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        setRouteName(navigationRef.getCurrentRoute().name);
      }}
      onStateChange={async () => {
        const currentRouteName = navigationRef.getCurrentRoute().name;
        setRouteName(currentRouteName);
      }}>
      <Navigation routeName={routeName} />
    </NavigationContainer>
  );
};

export default AppInitializer;
