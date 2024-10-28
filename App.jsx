import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import Navigator from './routes/switchNavigator';
import {store, persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
  );
}
