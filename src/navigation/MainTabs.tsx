import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts, PixelPerfect} from '../styles/stylesConstants';
import {SharedStyles} from '../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../constants/interfaces';
import {useTranslation} from 'react-i18next';
import {
  CalenderIcon,
  MessageIcon,
  SearchIcon,
  UserIcon,
} from '../assets/svg/icons';
import { useAppSelector } from '../store/hook';

const MainTabs: FC<{active: string; style?: StyleProp<ViewStyle>}> = ({
  active,
  style,
}) => {
  const {unseenMessages} = useAppSelector(s => s.authSlice);
  const styles = useStyles();
  const navigation: NavigationProps = useNavigation();
  const {t} = useTranslation();
  
  return (
    <View style={[styles.shadowView, style]}>
      <View style={[styles.cont, style]}>
        {/*  */}
        {/* My Boats */}
        <Pressable
          style={[styles.tabCont]}
          onPress={() => navigation.navigate('SearchScreen')}>
          <View style={styles.tabIconCont}>
            <SearchIcon
              height={PixelPerfect(23)}
              width={PixelPerfect(23)}
              fill={active == 'SearchScreen' ? Colors.mainColor : '#B4B4B4'}
            />
          </View>
          <Text
            style={[
              styles.tabTitle,
              active == 'SearchScreen' && {color: Colors.mainColor},
            ]}>
            {t('explore')}
          </Text>
        </Pressable>

        {/*  */}
        {/* Messages Tab */}
        <Pressable
          style={styles.tabCont}
          onPress={() => navigation.navigate('MyMessages')}>
            {unseenMessages > 0 && (
              <Text style={styles.badgeCount}>
                {unseenMessages}
              </Text>
            )}
          <View style={styles.tabIconCont}>
            
            <MessageIcon
              fill={active == 'MyMessages' ? Colors.mainColor : '#B4B4B4'}
            />
          </View>
          <Text
            style={[
              styles.tabTitle,
              active == 'MyMessages' && {color: Colors.mainColor},
            ]}>
            {t('myMessages')}
          </Text>
        </Pressable>

        {/*  */}
        {/* Bookings Tab */}
        <Pressable
          style={styles.tabCont}
          onPress={() => navigation.navigate('MyBookings')}>
          <View style={styles.tabIconCont}>
            <CalenderIcon
              fill={active == 'MyBookings' ? Colors.mainColor : '#B4B4B4'}
            />
          </View>
          <Text
            style={[
              styles.tabTitle,
              active == 'MyBookings' && {color: Colors.mainColor},
            ]}>
            {t('reservations')}
          </Text>
        </Pressable>

        {/*  */}
        {/* Account Tab */}
        <Pressable
          style={[styles.tabCont]}
          onPress={() => navigation.navigate('MyAccount')}>
          <View style={styles.tabIconCont}>
            <UserIcon
              fill={active == 'MyAccount' ? Colors.mainColor : '#B4B4B4'}
            />
          </View>
          <Text
            style={[
              styles.tabTitle,
              active == 'MyAccount' && {color: Colors.mainColor},
            ]}>
            {t('myAccount')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MainTabs;

const useStyles = () =>
  StyleSheet.create({
    shadowView: {
      backgroundColor: Colors.white,
      shadowColor: '#000',
    },
    cont: {
      height: PixelPerfect(89),
      width: '100%',
      flexDirection: 'row',
      backgroundColor: Colors.white,
      paddingTop: PixelPerfect(9),
      borderTopRightRadius: PixelPerfect(30),
      borderTopLeftRadius: PixelPerfect(30),
      overflow: 'hidden',
      borderWidth: 0.5,
      borderColor: Colors.lightGray,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
    tabCont: {
      flex: 1,
      ...SharedStyles.centred,
    },
    tabTitle: {
      fontSize: PixelPerfect(13),
      fontFamily: Fonts.Medium,
      color: '#B4B4B4',
      flex: 1,
    },
    tabIconCont: {
      flex: 1,
      justifyContent: 'center',
    },
    badgeCount: {
      backgroundColor: '#ff0000',
      width: PixelPerfect(17),
      height: PixelPerfect(17),
      borderRadius: 17/2,
      overflow: 'hidden',
      fontWeight: 'bold',
      color: Colors.white,
      textAlign: 'center',
      position: 'absolute',
      zIndex: 1000,
      left:     20,
      top:      0,
    }
  });
