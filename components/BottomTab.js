import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    ZegoUIKitPrebuiltCallInCallScreen,
    ZegoUIKitPrebuiltCallWaitingScreen,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

import screens from '../navigation';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(-1);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.container,
                tabBarShowLabel: false,
            }}
        >
            {screens.map((screen, index) => {
                let ScreenComponent = null;
                if (screen.isHideNavigationTab) {
                    ScreenComponent = (
                        <Tab.Screen
                            key={index}
                            name={screen.name}
                            component={screen.component}
                            options={{
                                tabBarStyle: {
                                    display: 'none',
                                },
                                tabBarIcon: () => (
                                    <MaterialCommunityIcons
                                        name={screen.tabIconName}
                                        size={screen.tabIconSize}
                                        color={index === selectedTabIndex ? screen.activeColor : screen.tabIconColor}
                                    />
                                ),
                                tabBarItemStyle: {
                                    display: screen.isHideTabItem === true ? 'none' : 'flex',
                                },
                            }}
                            listeners={{
                                focus: () => {
                                    setSelectedTabIndex(index);
                                },
                            }}
                        />
                    );
                } else {
                    ScreenComponent = (
                        <Tab.Screen
                            key={index}
                            name={screen.name}
                            component={screen.component}
                            options={{
                                tabBarIcon: () => (
                                    <MaterialCommunityIcons
                                        name={screen.tabIconName}
                                        size={screen.tabIconSize}
                                        color={index === selectedTabIndex ? screen.activeColor : screen.tabIconColor}
                                    />
                                ),
                                tabBarItemStyle: {
                                    display: screen.isHideTabItem === true ? 'none' : 'flex',
                                },
                            }}
                            listeners={{
                                focus: () => {
                                    setSelectedTabIndex(index);
                                },
                            }}
                        />
                    );
                }
                return ScreenComponent;
            })}
            <Tab.Screen
                options={{ headerShown: false, tabBarItemStyle: { display: 'none' }, tabBarStyle: { display: 'none' } }}
                name="ZegoUIKitPrebuiltCallWaitingScreen"
                component={ZegoUIKitPrebuiltCallWaitingScreen}
            />
            <Tab.Screen
                options={{ headerShown: false, tabBarItemStyle: { display: 'none' }, tabBarStyle: { display: 'none' } }}
                name="ZegoUIKitPrebuiltCallInCallScreen"
                component={ZegoUIKitPrebuiltCallInCallScreen}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 15,
    },
});

export default BottomTab;
