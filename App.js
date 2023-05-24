import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
// import 'react-native-reanimated';

import BottomTab from './components/BottomTab';
import store from './store';

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <BottomTab />
            </NavigationContainer>
        </Provider>
    );
};

export default App;
