import { Alert } from 'react-native';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService, { ZegoMenuBarButtonName } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

const OnSendnMakeCall = (navigation, route) => {
    const params = route.params;
    const currentUser = useSelector((state) => state.user);
    const isFocusedScreen = useIsFocused();

    useEffect(() => {
        if (!isFocusedScreen) {
            ZegoUIKitPrebuiltCallService.uninit();
        } else {
        }
    }, [isFocusedScreen]);
};

export default OnSendnMakeCall;
