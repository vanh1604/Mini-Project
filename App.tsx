import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/Navigation/appNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/Components/Toast/ToastConfig';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <AppNavigator />
          <Toast config={toastConfig} />
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
