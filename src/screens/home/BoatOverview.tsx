import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import MainSlider from '../../components/views/MainSlider';
import {
  Colors,
  ColorWithOpacity,
  Fonts,
  phoneWidth,
  PixelPerfect,
} from '../../styles/stylesConstants';
import {banners} from '../../temp/data/banners';
import {randerRating} from '../../components/cards/BoatCard';
import {CalenderIcon, TickInCircle} from '../../assets/svg/icons';
import {useTranslation} from 'react-i18next';
import {SharedStyles} from '../../styles/sharedStyles';
import BoatDetailsNumContent from '../../content/BoatDetailsNumContent';
import EquipmentAndAdvantagesContent from '../../content/boatoverview/EquipmentAndAdvantagesContent';
import ServicesContent from '../../content/boatoverview/ServicesContent';
import TermsContent from '../../content/boatoverview/TermsContent';
import LocationContent from '../../content/boatoverview/LocationContent';
import MainButton from '../../components/buttons/MainButton';
import {NavigationProps} from '../../constants/interfaces';
import {useAppDispatch, useAppSelector} from '../../store/hook';
import {getBoatByID} from '../../store/actions/requestAction';
import LoaderView from '../../components/views/LoaderView';
import {showMessage} from 'react-native-flash-message';

const BoatOverview = () => {
  const {params}: any = useRoute();
  const {t} = useTranslation();
  const navigation: NavigationProps = useNavigation();

  const dispatch = useAppDispatch();
  const {singleBoatData, loader}: any = useAppSelector(s => s.requestSlice);
  const {isSignIn} = useAppSelector(state => state.authSlice);

  const BOAT_DATA = singleBoatData?.boat;

  useEffect(() => {
    dispatch(getBoatByID({boatId: params?.id, cb(data) {
      setStateIsFav(data)
    },}));
  }, []);

  const goToDays = () => {
    if (!isSignIn) {
      showMessage({type: 'danger', message: 'يرجى تسجيل الدخول'});
      navigation.navigate('LoginScreen');
    } else {
      navigation.navigate('SelectedDate', {singleBoatData: BOAT_DATA});
    }
  };



  const [stateIsFav, setStateIsFav] = useState(singleBoatData?.fav);
  console.log('=================singleBoatData===================');
  console.log(stateIsFav); 

  return (
    <View>
      <ScrollView>
        <MainSlider
          hasMultiIcons
          bannerData={
            BOAT_DATA?.images?.length > 0 ? BOAT_DATA?.images : banners
          }
          imageResizeMode="cover"
          imageURL={true}
          imageStyle={styles.sliderImageStyle}
          bannerContainerStyle={styles.sliderCont}
          flatListStyle={{width: phoneWidth, marginTop: 0}}
          activeDotColor={Colors.white}
          inActiveDotColor={ColorWithOpacity(Colors.white, 0.5)}
          styleDots={{marginTop: PixelPerfect(-90)}}
          itemName={BOAT_DATA?.images?.length > 0 ? 'image_link' : 'image'}
          isFav={stateIsFav}
          setISFav={setStateIsFav}
          isSignIn={isSignIn}
          title={BOAT_DATA?.title}
          boatID={BOAT_DATA?.id}
        />

        <View style={styles.whiteView}>
          <View style={styles.lineView} />

          <View style={{...SharedStyles.paddingHorizontal}}>
            <Text style={styles.title}>{params?.title}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {randerRating(params?.avg_rating)}
              <Text style={styles.rateText}>{params?.rate}</Text>
              <TickInCircle
                height={PixelPerfect(16)}
                width={PixelPerfect(16)}
                fill="#4BD12A"
              />
              <Text style={styles.rateText}>
                {t('hasBooked', {number: params?.number_of_orders})}
              </Text>
            </View>

            <Text style={styles.price}>
              {BOAT_DATA?.price_per_hour}{' '}
              <Text
                style={{fontSize: PixelPerfect(18), fontFamily: Fonts.Medium}}>
                {t('sarPerDay')}
              </Text>
            </Text>
            <BoatDetailsNumContent {...BOAT_DATA} />

            {/* marginVertical: 12, */}

            <View style={styles.imageNameCont}>
              <Image
                source={{uri: BOAT_DATA?.provider?.avatar_link}}
                style={styles.imageStyle}
              />

              <Pressable
                style={styles.userDetailsCont}
                // onPress={() => navgiation.navigate('EditProfile')}
              >
                <Text style={{...SharedStyles.textBold16}}>
                  {t('owner')}: {BOAT_DATA?.provider?.name}
                </Text>

                {/* <Text style={styles.textSharedSubtitle}>مرسى شاطئ أملج</Text> */}
              </Pressable>
            </View>

            <Text style={[styles.title, {marginTop: 10}]}>
              {t('description')}
            </Text>
            <Text style={styles.textSharedSubtitle}>
              {BOAT_DATA?.description}
            </Text>
          </View>
          <View style={styles.separator} />

          <EquipmentAndAdvantagesContent {...BOAT_DATA} />
          <View style={styles.separator} />

          <ServicesContent />
          <View style={styles.separator} />

          <TermsContent
            title={t('rentalTerms')}
            subtitle={BOAT_DATA?.terms_of_rent}
          />
          <View style={styles.separator} />

          <TermsContent
            title={t('cancellationTerms')}
            subtitle={BOAT_DATA?.terms_of_cancellation}
          />
          <View style={styles.separator} />

          {BOAT_DATA?.lat && BOAT_DATA?.lng && (
            <>
              <LocationContent {...BOAT_DATA} />
            </>
          )}

          {/* <ReviewsContent /> */}
        </View>
      </ScrollView>
      <View style={styles.bottomViewCont}>
        <MainButton
          style={{marginVertical: 10}}
          title={t('browseAvailableDays')}
          buttonIcon={<CalenderIcon />}
          onPress={goToDays}
        />
      </View>
    </View>
  );
};

export default BoatOverview;

const styles = StyleSheet.create({
  sliderCont: {
    width: '100%',
  },
  sliderImageStyle: {
    width: '100%',
    height: PixelPerfect(380),
    borderRadius: 0,
  },
  whiteView: {
    backgroundColor: Colors.white,
    borderTopRightRadius: PixelPerfect(30),
    borderTopLeftRadius: PixelPerfect(30),
    marginBottom: PixelPerfect(55),
  },
  title: {
    ...SharedStyles.textBold18,
    color: '#222222',
    marginVertical: 1,
    ...SharedStyles.textAlign,
  },
  price: {
    fontSize: PixelPerfect(24),
    fontFamily: Fonts.Bold,
    color: Colors.mainColor,
    ...SharedStyles.textAlign,
    marginVertical: PixelPerfect(8),
  },
  rateText: {
    ...SharedStyles.textRegular16,
    marginLeft: PixelPerfect(5),
    marginRight: PixelPerfect(20),
  },
  lineView: {
    width: 30,
    height: 5,
    borderRadius: 2,
    backgroundColor: '#F1F1F1',
    alignSelf: 'center',
    marginTop: 11,
    marginBottom: 8,
  },
  imageNameCont: {
    flexDirection: 'row',
    marginTop: 10,
  },
  userDetailsCont: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 8,
    alignItems: 'flex-start',
  },
  imageStyle: {
    height: PixelPerfect(64),
    width: PixelPerfect(64),
    borderRadius: PixelPerfect(32),
  },
  textSharedSubtitle: {
    color: '#9B9B9B',
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Medium,
    textAlign: 'left',
    marginTop: PixelPerfect(3),
  },
  separator: {
    width: '100%',
    borderBottomColor: '#F6F6F6',
    borderBottomWidth: 5,
    zIndex: 1,
    marginTop: 12,
    marginBottom: 17,
  },
  bottomViewCont: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
    ...SharedStyles.paddingHorizontal,
    backgroundColor: Colors.white,
    paddingBottom: 15,
    paddingTop: 5,
  },
});
