import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import { ContextProvider } from './src/store/context';
import WebView from 'react-native-webview';
import { loaderHTML } from './src/components/Loader';
import { useEffect, useState } from 'react';

const App = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 6000);
  }, []);

  return (
    <NavigationContainer>
      <ContextProvider>
        {loader ? (
          <StackNavigation />
        ) : (
          <WebView originWhitelist={['*']} source={{ html: loaderHTML }} />
        )}
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;
