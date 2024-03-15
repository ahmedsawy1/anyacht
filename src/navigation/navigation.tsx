import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import ForgetPassword from '../screens/auth/ForgetPassword';
import OTPScreen from '../screens/auth/OTPScreen';
import ResetPassword from '../screens/auth/ResetPassword';
import SearchScreen from '../screens/search/SearchScreen';
import MainTabs from './MainTabs';
import AddAvailability from '../screens/home/AddAvailability';
import MyBookings from '../screens/Reservations/MyBookings';
import BookingDetails from '../screens/Reservations/BookingDetails';
import MyMessages from '../screens/inbox/MyMessages';
import ChatScreen from '../screens/inbox/ChatScreen';
import MyAccount from '../screens/account/MyAccount';
import EditProfile from '../screens/account/EditProfile';
import EditProfileData from '../screens/account/EditProfileData';
import ChangePassword from '../screens/account/ChangePassword';
import AboutApp from '../screens/about/AboutApp';
import TermsOfUse from '../screens/about/TermsOfUse';
import ContactUS from '../screens/about/ContactUS';
import IntroScreen from '../screens/intro/IntroScreen';
import FavoritesScreen from '../screens/account/FavoritesScreen';
import BoatOverview from '../screens/home/BoatOverview';
import SelectedDate from '../screens/Reservations/SelectedDate';
import CheckoutScreen from '../screens/checkout/CheckoutScreen';
import BookingConfirmation from '../screens/checkout/BookingConfirmation';
import BookingSuccess from '../screens/checkout/BookingSuccess';
import {useAppSelector} from '../store/hook';
import BoatsScreen from '../screens/home/BoatsScreen';
import {AsyncKeys, getItem} from '../constants/helpers';
import PayScreen from '../screens/Reservations/PayScreen';
import FaildPayScreen from '../screens/Reservations/FaildScreen';

const Stack = createStackNavigator();

export default function Navigation(props: any) {
  const {isSignIn} = useAppSelector(state => state.authSlice);
  const [showIntro, setShowIntro] = useState(true);
  const route = props.routeName;
  // console.log('===================route=================');
  // console.log(route);

  const initApp = async () => {
    const introStatus = await getItem(AsyncKeys.INTRO_SHOWN);
    if (introStatus != null) {
      setShowIntro(false);
    }
  };

  useEffect(() => {
    initApp();
  }, []);

  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {showIntro && !isSignIn && (
          <Stack.Screen name="IntroScreen" component={IntroScreen} />
        )}
        <Stack.Screen name="SearchScreen" options={{animationEnabled: false}} component={SearchScreen} />
        <Stack.Screen
          name="BookingConfirmation"
          component={BookingConfirmation}
        />
        <Stack.Screen name="PayScreen" component={PayScreen} />
        <Stack.Screen name="BoatsScreen" component={BoatsScreen} />
        <Stack.Screen name="BookingSuccess" component={BookingSuccess} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        <Stack.Screen name="AddAvailability" component={AddAvailability} />
        <Stack.Screen name="MyBookings" options={{animationEnabled: false}} component={MyBookings} />
        <Stack.Screen name="BoatOverview" component={BoatOverview} />
        <Stack.Screen name="BookingDetails" component={BookingDetails} />
        <Stack.Screen name="MyMessages" options={{animationEnabled: false}} component={MyMessages} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="MyAccount" options={{animationEnabled: false}} component={MyAccount} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="EditProfileData" component={EditProfileData} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="AboutApp" component={AboutApp} />
        <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
        <Stack.Screen name="ContactUS" component={ContactUS} />
        <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
        <Stack.Screen name="SelectedDate" component={SelectedDate} />
        <Stack.Screen name="FaildPayScreen" component={FaildPayScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
      </Stack.Navigator>

      {route == 'SearchScreen' ||
      route == 'MyMessages' ||
      route == 'MyAccount' ||
      route == 'MyBookings' ||
      route == 'BoatsScreen' ||
      route == 'MoreScreen' ? (
        <MainTabs active={route} />
      ) : null}
    </>
  );
}
