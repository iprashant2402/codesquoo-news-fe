import * as React from 'react';
import {WebView} from 'react-native-webview';
import {View, StatusBar, ActivityIndicator} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

export default function NewsDetailScreen({navigation, route}) {
    
    const [url, setUrl] = React.useState("");
    const [loading, setLoading] = React.useState(true);

    useFocusEffect(
        React.useCallback(() => {
          const thisRef = this;
          var {url} = route.params;
          setUrl(url);
          return () => {};
        }, []),
      );
  
    return (
     <View style={{flex: 1}}> 
      <WebView source={{uri: url}}
      startInLoadingState={true}
      onLoadEnd={()=>{
          setLoading(false);
      }}
      style={{marginTop: 0}} />
    </View>
  );
}
