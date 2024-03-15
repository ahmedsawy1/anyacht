import {ActivityIndicator, Modal, View} from 'react-native';
import React, {FC} from 'react';
import {SharedStyles} from '../../styles/sharedStyles';
import {Colors} from '../../styles/stylesConstants';

const LoaderView: FC<{
}> = () => {
  return (
      <View
        style={{
          flex: 1,
          ...SharedStyles.centred,
        }}>
        <ActivityIndicator color={Colors.black} />
      </View>
  );
};

export default LoaderView;
