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
            backBehavior="history"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIconStyle: {},
                tabBarLabelStyle: {
                    display: 'none',
                },
                tabBarInactiveTintColor: '#F3CFC6',
                tabBarActiveTintColor: '#ee4b2b',
            }}
        >
            {screens.map((screen, index) => {
                return (
                    <Tab.Screen
                        key={index}
                        name={screen.name}
                        component={screen.component}
                        options={({ color, size, focused }) => ({
                            tabBarHideOnKeyboard: true,
                            tabBarStyle: {
                                ...styles.container,
                                height: screen.isHideNavigationTab ? 0 : 60,
                                opacity: screen.isHideNavigationTab ? 0 : 1,
                            },
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons
                                    name={screen.tabIconName}
                                    size={screen.tabIconSize}
                                    color={color}
                                />
                            ),
                            tabBarItemStyle: {
                                display: screen.isHideTabItem === true ? 'none' : 'flex',
                                borderRadius: 10,
                            },
                        })}
                    />
                );
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
        overflow: 'hidden',
    },
});

export default BottomTab;
