import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Alert,
    Button,
    Text,
    StatusBar,
    findNodeHandle,
    PermissionsAndroid,
    Platform,
} from 'react-native';
import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { useSelector } from 'react-redux';

const granted =
    Platform.OS == 'android'
        ? PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.RECORD_AUDIO)
        : undefined;

const VideoCall = ({ navigation, route }) => {
    const params = route.params;
    const currentUser = useSelector((state) => state.user);
    console.log(currentUser);
    return (
        <View style={styles.container}>
            <ZegoUIKitPrebuiltCall
                appID={652126903}
                appSign="190849d49a227db415d6aa35625639a7bdd867ca738a0e6a458bd8acba1f0c6c"
                userID={currentUser.phone} // userID can be something like a phone number or the user id on your own user system.
                userName={currentUser.full_name}
                callID={'honeyaa-call'} // callID can be any unique string.
                config={{
                    // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
                    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                    onOnlySelfInRoom: () => {
                        navigation.navigate('Chat', {
                            ...params,
                        });
                    },
                    onHangUp: () => {
                        navigation.navigate('Chat', {
                            ...params,
                        });
                    },
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default VideoCall;
