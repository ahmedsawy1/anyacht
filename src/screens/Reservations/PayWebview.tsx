import {View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import WebView from 'react-native-webview';

export default function PayWebview({webviewURI, orderID, cb}) {
  const navigation: any = useNavigation();

  const jsCode =
    'window.ReactNativeWebView.postMessage(document.documentElement.innerHTML)';

  return (
    <View style={{flex: 1}}>
      <WebView
        source={{uri: webviewURI}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={jsCode}
        onMessage={event => {
          const receivedHTML = event.nativeEvent.data;

          if (receivedHTML.includes(`\"payment_status\":true`)) {
            console.log('CBBBBBBB');
            cb && cb();
            navigation.navigate('BookingSuccess', {id: orderID});
          } else if (
            receivedHTML.includes(`\"payment_status\":false`) ||
            receivedHTML.includes(`payment has failed (Error: 00017)\n\t\t`)
          ) {
            navigation.navigate('FaildPayScreen');
          }
        }}
      />
    </View>
  );
}
