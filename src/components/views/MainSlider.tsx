import React, {FC, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Share,
  FlatList,
  StyleProp,
  ViewStyle,
  ImageStyle,
  Platform,
} from 'react-native';
import {
  Colors,
  ColorWithOpacity,
  PixelPerfect,
} from '../../styles/stylesConstants';

import {SharedStyles} from '../../styles/sharedStyles';
import {
  HeartIcon,
  RedHeart,
  ShareIcon,
  RightArrowIcon,
} from '../../assets/svg/icons';
import IconButton from '../buttons/IconButton';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../constants/interfaces';
import {axiosAPI} from '../../api/config';
import {showMessage} from 'react-native-flash-message';
import ImageBlurLoading from 'react-native-image-blur-loading';
import { getBoatByID } from '../../store/actions/requestAction';
import { useAppDispatch } from '../../store/hook';

const phoneHeight = Dimensions.get('window').height;
const phoneWidth = Dimensions.get('window').width;

export interface Props {
  bannerData?: any;
  bannerContainerStyle?: StyleProp<ViewStyle>;
  flatListStyle?: StyleProp<ViewStyle>;
  styleDots?: StyleProp<ViewStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  dotStyle?: StyleProp<ViewStyle>;
  activeDotColor?: string;
  inActiveDotColor?: string;
  activeDotBorderColor?: string;
  inActiveDotBorderColor?: string;
  imageResizeMode?: any;
  imageStyle?: StyleProp<ImageStyle>;
  hasMultiIcons?: boolean;
  isFav: boolean;
  isSignIn: boolean;
  imageURL: any;
  itemName?: string;
  boatID?: string;
  title?: string;
}

export const MainSlider: FC<Props> = React.memo(
  ({
    bannerData,
    bannerContainerStyle,
    flatListStyle,
    dotStyle,
    activeDotColor,
    inActiveDotColor,
    activeDotBorderColor,
    inActiveDotBorderColor,
    imageResizeMode,
    imageStyle,
    styleContainer,
    styleDots,
    hasMultiIcons,
    isFav,
    setISFav,
    isSignIn,
    boatID,
    title,
  }) => {
    const indexRef: any = useRef();
    const [index, setIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigation: NavigationProps = useNavigation();
    const dispatch = useAppDispatch()
    
    const onFavSwitchPress = async () => {
      try {
        if (!isSignIn) {
          showMessage({type: 'danger', message: 'يرجى تسجيل الدخول'});
          navigation.navigate('LoginScreen');
          return;
        }
        await axiosAPI.get(`favorites/${boatID}`);
        dispatch(getBoatByID({boatId: boatID}));
        setISFav(cb => !cb);
        const string = !isFav ? ' الإضافة إلي ' : ' الحذف من ';
        showMessage({type: 'success', message: `تمت${string}المفضلة`});
      } catch (error) {
        console.log(error);
        showMessage({type: 'danger', message: 'فشلت العميلة'});
      }
    };

    const onShare = async () => {
      try {
        let link = "https://anyacht.com/boats/" + boatID;
        const result = await Share.share({
          message:
            'مشاركة ' + title + " عبر تطبيق Anyacht, لإستعراض " + link,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error: any) {
        // Alert.alert(error.message);
      }
    };

    useEffect(() => {
      indexRef?.current?.scrollToIndex({animated: true, index});
    }, [index]);

    const theNext = (index: number) => {
      if (index < bannerData?.length - 1) {
        setIndex(index + 1);
      }
    };

    useEffect(() => {
      const timeOut = setTimeout(() => {
        theNext(index);
        if (index === bannerData?.length - 1) {
          setIndex(0);
        }
      }, 4000);

      return () => {
        if (timeOut) {
          clearTimeout(timeOut);
        }
      };
    });

    const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

    const onChange = (nativeEvent: any) => {
      if (nativeEvent) {
        const slide = Math?.ceil(
          nativeEvent?.contentOffset?.x / nativeEvent?.layoutMeasurement?.width,
        );
        if (slide !== selectedIndex) {
          setSelectedIndex(slide);
        }
      }
    };

    return (
      <View style={[bannerContainerStyle]}>
        {hasMultiIcons && (
          <View style={styles.buttonsCon}>
            <View style={{flex: 1}}>
              <IconButton
                style={[styles.circle]}
                onPress={() => navigation.goBack()}>
                <RightArrowIcon fill={Colors.white} />
              </IconButton>
            </View>

            <IconButton
              onPress={onFavSwitchPress}
              style={[
                styles.circle,
                isFav && {backgroundColor: Colors.white},
              ]}>
              {isFav ? <RedHeart /> : <HeartIcon fill={Colors.white} />}
            </IconButton>

            <IconButton
                style={[styles.circle, {marginLeft: PixelPerfect(5)}]}
                onPress={onShare}>
                <ShareIcon fill={Colors.white} />
              </IconButton>



            {/* <IconButton style={[styles.circle, {marginLeft: 8}]}>
              <CurvedArrow />
            </IconButton> */}
          </View>
        )}

        <FlatList
          onScroll={({nativeEvent}) => {
            onChange(nativeEvent);
          }}
          ref={indexRef}
          style={[
            styles.scrollView,
            flatListStyle,
            {
              flexDirection: 'row',
            },
          ]}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={bannerData}
          keyExtractor={(_, index) => index.toString()}
          viewabilityConfig={viewConfigRef.current}
          renderItem={({item}: any) => {
            return (
              <View
                style={[
                  {
                    width: phoneWidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  styleContainer,
                ]}>
                <ImageBlurLoading
                  fastImage={true}
                  style={[styles.image, imageStyle]}
                  resizeMode={imageResizeMode ? imageResizeMode : 'stretch'}
                  source={{uri: item.image_link}}
                />
              </View>
            );
          }}
        />
        <View
          style={[
            styles.dotIcons,
            {
              flexDirection: 'row',
              marginTop: PixelPerfect(-15),
            },
            styleDots,
          ]}>
          {bannerData?.map((e: any, index: number) => (
            <View
              key={index}
              style={[
                {
                  backgroundColor:
                    selectedIndex === index ? activeDotColor : inActiveDotColor,
                  borderColor:
                    selectedIndex === index
                      ? activeDotBorderColor
                      : inActiveDotBorderColor,
                  height: PixelPerfect(6),
                  width: PixelPerfect(6),
                  borderRadius: PixelPerfect(3),
                  marginHorizontal: 5,
                },
                dotStyle,
              ]}
            />
          ))}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  scrollView: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  image: {
    height: phoneHeight / 4,
    width: phoneWidth * 0.8,
    borderRadius: 15,
  },
  dotIcons: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 15,
  },
  buttonsCon: {
    position: 'absolute',
    top: Platform.OS === 'android' ? PixelPerfect(30) : PixelPerfect(60),
    zIndex: 1,
    width: phoneWidth,
    flexDirection: 'row',
    ...SharedStyles.paddingHorizontal,
  },
  heartButton: {
    ...SharedStyles.centred,
    ...SharedStyles.shadow,
    height: 28,
    width: 28,
    borderRadius: 14,
    marginTop: 5,
  },
  circle: {
    height: PixelPerfect(40),
    width: PixelPerfect(40),
    borderRadius: PixelPerfect(20),
    backgroundColor: ColorWithOpacity(Colors.black, 0.5),
    ...SharedStyles.centred,
  },
});

export default MainSlider;
