/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Routes from './src/Routes'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {store,persistor} from './src/redux/store'
import "react-native-gesture-handler"

const App = () => {
  return (
    
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} > 
         <Routes/>
    </PersistGate>
    </Provider>  );
};



export default App;
