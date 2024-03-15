import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {
  Colors,
  ColorWithOpacity,
  Fonts,
  PixelPerfect,
} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';
import MapView, {Marker} from 'react-native-maps';

interface Props {
  message: string;
  imageURI?: string;
  messageType: string;
  selectedLocation: any;
  sentTime: string;
  isMyMessage: boolean | number;
  style: StyleProp<ViewStyle>;
}

const initialLocation = {
  latitude: 30.981310612445217,
  longitude: 31.15707196074615,
};

const MessageChatCard: FC<Props> = ({
  message,
  messageType,
  style,
  isMyMessage,
  sentTime,
  imageURI,
  selectedLocation = initialLocation,
}) => {
  const styles = useStyles(isMyMessage);

  return (
    <View style={[styles.cont, style]}>
      {messageType == 'text' && (
        <Text style={styles.textMessage}>{message}</Text>
      )}
      {messageType == 'image' && (
        <Image source={{uri: imageURI}} style={styles.messageImage} />
      )}
      {messageType == 'map' && (
        <MapView
          style={{height: PixelPerfect(130), width: PixelPerfect(200)}}
          initialRegion={selectedLocation}>
          <Marker coordinate={selectedLocation} />
        </MapView>
      )}
      <Text style={styles.textTimeSent}>{sentTime}</Text>
    </View>
  );
};

export default MessageChatCard;

const useStyles = (isMyMessage: boolean | number) => {
  const sharedRadius = PixelPerfect(7);

  return StyleSheet.create({
    cont: {
      padding: 10,
      backgroundColor: isMyMessage
        ? ColorWithOpacity(Colors.mainColor, 0.2)
        : ColorWithOpacity(Colors.mainColor, 0.1),
      maxWidth: '70%',
      marginTop: 10,
      borderBottomLeftRadius: sharedRadius,
      borderBottomRightRadius: sharedRadius,
      borderTopLeftRadius: isMyMessage ? sharedRadius : 0,
      borderTopRightRadius: isMyMessage ? 0 : sharedRadius,
    },
    textMessage: {
      ...SharedStyles.textRegular14,
      lineHeight: PixelPerfect(18),
      textAlign: 'left',
    },
    textTimeSent: {
      fontSize: PixelPerfect(11),
      fontFamily: Fonts.Regular,
      color: ColorWithOpacity(Colors.blackText, 0.5),
      textAlign: 'left',
      marginTop: 5,
    },
    messageImage: {
      width: PixelPerfect(200),
      height: PixelPerfect(130),
    },
  });
};
