import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { SharedStyles } from '../../styles/sharedStyles';
import { Colors, Fonts, PixelPerfect } from '../../styles/stylesConstants';
import Dayjs from 'dayjs';

interface Props {
  created_at: string;
  last_message: string;
  unseen_count: number;
  hasSeparator: boolean;
  onPress: () => void;
  provider?: {
    avatar_link: string;
    name: string;
  };
}

const MessageCard: FC<Props> = ({
  hasSeparator = true,
  onPress,
  provider,
  last_message,
  unseen_count,
  created_at,
}) => {
  const date = Dayjs(created_at);

  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.cont}>
        <Image source={{ uri: provider?.avatar_link }} style={styles.userImage} />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.textUserName}>{provider?.name}</Text>
            <Text style={styles.messageDate}>{date.format('DD/MM/YYYY')}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textMessage} numberOfLines={1}>
              {last_message == null ? '-' : last_message?.message}
            </Text>
            {unseen_count != 0 && (
              <Text style={styles.unreadBadege}>
                {unseen_count}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
      {hasSeparator && (
        <View style={{ ...SharedStyles.paddingHorizontal }}>
          <View style={styles.separator} />
        </View>
      )}
    </>
  );
};

export default MessageCard;

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#DEE1E6',
    marginBottom: PixelPerfect(15),
  },
  cont: {
    backgroundColor: '#FEFEFE',
    ...SharedStyles.paddingHorizontal,
    flexDirection: 'row',
    paddingBottom: PixelPerfect(15),
  },
  userImage: {
    height: PixelPerfect(45),
    width: PixelPerfect(45),
    borderRadius: PixelPerfect(45) / 2,
    marginRight: 10,
  },
  textUserName: {
    ...SharedStyles.textBold14,
    flex: 1,
    textAlign: 'left',
    marginBottom: Platform.OS == 'ios' ? 8 : 0,
  },
  messageDate: {
    fontSize: PixelPerfect(10),
    fontFamily: Fonts.Medium,
    color: '#9B9B9B',
  },
  textMessage: {
    flex: 3,
    fontSize: PixelPerfect(12),
    fontFamily: Fonts.Regular,
    color: Colors.blackText,
    textAlign: 'left',
  },
  unreadBadege: {
    backgroundColor: '#ff0000',
    width: PixelPerfect(16),
    height: PixelPerfect(15),
    borderRadius: 15/2,
    overflow: 'hidden',
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  }
});
