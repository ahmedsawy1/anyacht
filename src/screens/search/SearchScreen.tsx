import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import HomeHeader from '../../components/headers/HomeHeader';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Colors, PixelPerfect, phoneHeight} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';
import {NavigationProps} from '../../constants/interfaces';
import {useTranslation} from 'react-i18next';
import RightsFooter from '../../content/RightsFooter';
import Catg from '../../components/cards/Catg';
import Destination from '../../components/cards/Destination';
import SearchModalContent from '../../content/modal/SearchModalContent';
import {useAppDispatch, useAppSelector} from '../../store/hook';
import {getBoatTypes, getCities} from '../../store/actions/homeActions';
import dayjs from 'dayjs';
import {fontStyle} from '../../styles/fonts';
import {useNotifications} from '../../util/useNotifications';
import {getBoatsCity} from '../../store/actions/homeActions';

var utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const SearchScreen = () => {
  const navigation: NavigationProps = useNavigation();
  const {t} = useTranslation();
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  let textInputRef = useRef(null);
  const onCloseSearchModal = () => setSearchModalVisible(false);
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => onCloseSearchModal();
      return () => unsubscribe();
    }, []),
  );

  useNotifications();

  useEffect(() => {
    dispatch(getCities());
    dispatch(getBoatTypes());
  }, []);

  const {cities, boatTypes} = useAppSelector(s => s.homeSlice);
  return (
    <>
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <HomeHeader onSearchPress={() => setSearchModalVisible(true)} />

        <ScrollView contentContainerStyle={{paddingBottom: phoneHeight / 6}}>
          <Text style={styles.textTitle}>{t('browseBoats')}</Text>
          <View style={styles.textCatgsCont}>
              <FlatList
                initialNumToRender={10}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{...SharedStyles.paddingHorizontal}}
                horizontal
                data={boatTypes}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => <Catg {...item} />}
              />
          </View>

          <Text style={styles.textTitle}>
            {t('exploreDestinationsKingdom')}
          </Text>

          <ScrollView contentContainerStyle={styles.scrollView}>
            {cities?.map?.length > 0 ? (
              cities?.map((item, index) => (
                <Destination key={index} {...item} />
              ))
            ) : (
              <Text
                style={{
                  ...fontStyle.Medium16,
                  textAlign: 'center',
                  marginVertical: PixelPerfect(40),
                }}>
                عذرا لا توجد وجهات متاحة الأن
              </Text>
            )}
          </ScrollView>

          <RightsFooter />
        </ScrollView>
      </View>
      <Modal
        onShow={() => textInputRef.current.focus()}
        animationType="slide"
        visible={searchModalVisible}
        onRequestClose={onCloseSearchModal}>
        <SearchModalContent
          onCancelPress={onCloseSearchModal}
          inputRef={textInputRef}
          onSelectSuggest={(item: any) =>
            {
              setSearchModalVisible(false);
              setTimeout(() => {
                dispatch(getBoatsCity({cityId: item.id}));
                navigation.navigate('BoatsScreen', {title: item?.text, type:"getBoatsCity"}); 
              }, 200);
            }
          }
        />
      </Modal>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  textCatgsCont: {
    marginBottom: 20,
    minHeight: 110
  },
  scrollView: {
    ...SharedStyles.paddingHorizontal,
  },
  textTitle: {
    ...SharedStyles.textBold16,
    ...SharedStyles.marginHorizontal,
    marginTop: PixelPerfect(24),
    marginBottom: 12,
    textAlign: 'left',
  },
  beachesCont: {},
});
