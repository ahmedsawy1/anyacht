import React from 'react';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import AppInitializer from './src/AppInitializer';
import {store} from './src/store/store';
import {Fonts} from './src/styles/stylesConstants';
import codePush from 'react-native-code-push';

function App() {
  return (
    <>
      <Provider store={store}>
        <AppInitializer />
      </Provider>
      <FlashMessage
        position="top"
        floating
        hideOnPress={true}
        style={{paddingTop: 15}}
        titleStyle={{
          fontFamily: Fonts.Medium,
          paddingTop: 10,
          textAlign: 'left',
        }}
        textStyle={{
          fontFamily: Fonts.Medium,
          textAlign: 'left',
        }}
      />
    </>
  );
}

export default codePush(App);
