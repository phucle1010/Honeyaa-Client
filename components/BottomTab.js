import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
            }}
            tabBarOptions={{
                showLabel: false,
            }}
        >
            {screens.map((screen, index) => (
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
                            display: screen.isHideTab === true ? 'none' : 'flex',
                        },
                    }}
                    listeners={{
                        focus: () => {
                            setSelectedTabIndex(index);
                        },
                    }}
                />
            ))}
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
