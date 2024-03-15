import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SharedStyles} from '../../styles/sharedStyles';
import {useTranslation} from 'react-i18next';
import {Fonts, PixelPerfect} from '../../styles/stylesConstants';
import MapView, {Circle} from 'react-native-maps';

const LocationContent = ({lat, lng, address}) => {
  const {t} = useTranslation();
  const initialLocation = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.0005,
    longitudeDelta: 0.0005,
  };

  if (lat && lng) {
    return (
      <View style={{...SharedStyles.paddingHorizontal, marginBottom: PixelPerfect(20)}}>
        <Text style={styles.textTitle}>{t('approximateLocation')}</Text>
        <Text style={styles.textSubtitle}>{t('locationWillBeSent')}</Text>

        <View style={styles.mapCont}>
          <MapView style={styles.mapView} initialRegion={initialLocation} mapType="standard" provider="google" zoomEnabled={true} maxZoomLevel={13}>
            <Circle center={initialLocation} radius={700} fillColor={'#0277FA85'} strokeColor={'#9B9B9B'}/>
          </MapView>
        </View>
        <Text style={styles.textSubtitle}>{address}</Text>
      </View>
    );
  } else {
    return null;
  }
};

export default LocationContent;

const styles = StyleSheet.create({
  textTitle: {
    ...SharedStyles.textBold18,
    color: '#222222',
    marginVertical: 1,
    ...SharedStyles.textAlign,
  },
  textSubtitle: {
    color: '#9B9B9B',
    fontFamily: Fonts.Medium,
    fontSize: PixelPerfect(14),
    marginTop: 4,
    ...SharedStyles.textAlign,
  },
  mapView: {
    height: PixelPerfect(150),
    width: '100%',
    overflow: 'hidden',
  },
  mapCont: {
    overflow: 'hidden',
    borderRadius: PixelPerfect(10),
    marginTop: 10,
  },
  separator: {
    width: '100%',
    borderBottomColor: '#F6F6F6',
    borderBottomWidth: 5,
    zIndex: 1,
    marginTop: 12,
    marginBottom: 17,
  },
});
