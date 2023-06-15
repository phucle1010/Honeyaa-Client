import * as React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { ZegoCallInvitationDialog } from '@zegocloud/zego-uikit-prebuilt-call-rn';

import BottomTab from './components/BottomTab';
import store from './store';

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <ZegoCallInvitationDialog />
                <BottomTab />
                {/* <ZegoUIKitPrebuiltCallFloatingMinimizedView /> */}
            </NavigationContainer>
        </Provider>
    );
};

export default App;
