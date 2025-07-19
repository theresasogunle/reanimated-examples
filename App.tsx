import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { App } from './src';

const AppContainer = () => {
  const [hasLoaded] = useFonts({
    'SF-Pro-Rounded-Bold': require('./assets/fonts/SF-Pro-Rounded-Bold.otf'),
  });
  if (!hasLoaded) return null;
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default gestureHandlerRootHOC(AppContainer);
