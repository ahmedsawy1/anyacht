import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {SharedStyles} from '../../styles/sharedStyles';
import {
  Colors,
  ColorWithOpacity,
  phoneWidth,
  PixelPerfect,
} from '../../styles/stylesConstants';
import {introScreenSlices} from '../../data/intro-screen';
import IntroScreenContnet from '../../content/intro/IntroScreenContent';
import IconButton from '../../components/buttons/IconButton';
import {ArrowLeftIcon} from '../../assets/svg/icons';
import MainButton from '../../components/buttons/MainButton';
import {useTranslation} from 'react-i18next';
import {NavigationProps} from '../../constants/interfaces';
import {useNavigation} from '@react-navigation/native';
import {AsyncKeys, saveItem} from '../../constants/helpers';

const IntroScreen = () => {
  const {t} = useTranslation();
  const navigation: NavigationProps = useNavigation();
  const flatRef: any = useRef();

  const scrollToIndex = (index: number) =>
    flatRef.current.scrollToIndex({animated: true, index});

  const goToLogin = async () => {
    await saveItem(AsyncKeys.INTRO_SHOWN, true);
    navigation.navigate('LoginScreen');
  };

  const slides = [
    <View style={styles.slideView}>
      <IntroScreenContnet
        imagePath={introScreenSlices[0]?.imagePath}
        title={introScreenSlices[0]?.title}
        subTitle={introScreenSlices[0]?.subTitle}
      />
      <IconButton onPress={() => scrollToIndex(1)}>
        <ArrowLeftIcon
          fill={Colors.mainColor}
          height={PixelPerfect(24)}
          width={PixelPerfect(24)}
        />
      </IconButton>
    </View>,
    <View style={styles.slideView}>
      <IntroScreenContnet
        imagePath={introScreenSlices[1]?.imagePath}
        title={introScreenSlices[1]?.title}
        subTitle={introScreenSlices[1]?.subTitle}
      />
      <View style={styles.contIconsButtons}>
        <IconButton
          onPress={() => scrollToIndex(2)}
          style={styles.backIconButton}>
          <ArrowLeftIcon
            fill={Colors.mainColor}
            height={PixelPerfect(24)}
            width={PixelPerfect(24)}
          />
        </IconButton>
        <IconButton onPress={() => scrollToIndex(0)}>
          <ArrowLeftIcon
            fill={Colors.mainColor}
            height={PixelPerfect(24)}
            width={PixelPerfect(24)}
          />
        </IconButton>
      </View>
    </View>,
    <View style={styles.slideView}>
      <IntroScreenContnet
        imagePath={introScreenSlices[2]?.imagePath}
        title={introScreenSlices[2]?.title}
        subTitle={introScreenSlices[2]?.subTitle}
      />
      <MainButton
        title={t('startNow')}
        style={{backgroundColor: Colors.white, width: '80%'}}
        styleTitle={{color: Colors.mainColor}}
        onPress={goToLogin}
      />
    </View>,
  ];

  return (
    <View style={styles.cont}>
        <Image
          style={styles.logoImage}
          source={require('../../assets/images/logo/blue-logo.png')}
        />
        <FlatList
          ref={flatRef}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          data={slides}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => {
            return item;
          }}
        />

        <View
          style={{
            flex: 2,
            alignItems: 'center',
            ...SharedStyles.paddingHorizontal,
          }}>
          <Text style={styles.textSkip} onPress={goToLogin}>
            {t('skip')}
          </Text>
        </View>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS == 'ios' ? PixelPerfect(60) : PixelPerfect(20),
  },
  logoImage: {
    marginTop: PixelPerfect(35),
    alignSelf: 'center',
    height: PixelPerfect(55),
    width: PixelPerfect(110),
    marginBottom: PixelPerfect(15),
  },
  textSkip: {
    ...SharedStyles.textRegular16,
    marginTop: PixelPerfect(20),
    color: ColorWithOpacity(Colors.mainColor, 0.7),
  },
  contIconsButtons: {
    flexDirection: 'row',
    width: PixelPerfect(110),
    justifyContent: 'space-between',
  },
  backIconButton: {
    transform: [{rotateY: '180deg'}],
  },
  slideView: {
    width: phoneWidth,
    ...SharedStyles.centred,
    flex: 1,
    marginTop: PixelPerfect(70),
  },
});
