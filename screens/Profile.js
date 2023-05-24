import * as React from 'react';
import {
    Text,
    View,
    useWindowDimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    Image,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import EditProfileScreen from './EditProfile';
import Icon from 'react-native-vector-icons/Ionicons';

const SecondRoute = () => (
    <View style={styles.frame}>
        <Text>Hello</Text>
    </View>
);

const renderScene = SceneMap({
    first: EditProfileScreen,
    second: SecondRoute,
});

const renderTabBar = (props) => (
    <View style={styles.container}>
        <TouchableOpacity style={styles.btnArrowBack} onPress={() => {}}>
            <Icon name="arrow-back-circle-outline" size={24} style={styles.iconArrowBack} />
        </TouchableOpacity>
        <Image source={require('../assets/img/HoneyaaLogo.png')} resizeMode="stretch" style={styles.logo} />

        <View style={{ flexDirection: 'row', backgroundColor: 'blue' }}>
            {props.navigationState.routes.map((route, index) => {
                const isFocused = props.navigationState.index === index;

                const onPress = () => {
                    props.jumpTo(route.key);
                };

                return (
                    <TouchableWithoutFeedback key={route.key} onPress={onPress}>
                        <View
                            style={[
                                styles.tab,
                                {
                                    // borderColor: isFocused ? '#FF6868' : '#000000',
                                    // borderBottomWidth: isFocused ? 1 : 0,
                                    // borderColor: '#B2B2B2',
                                    // borderBottomWidth: 1,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.headerText,
                                    {
                                        paddingBottom: 10,
                                        color: isFocused ? '#FF6868' : '#000000',
                                        borderColor: isFocused ? '#FF6868' : '#000000',
                                        borderBottomWidth: isFocused ? 1 : 0,
                                    },
                                ]}
                            >
                                {route.title}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                );
            })}
        </View>
    </View>
);

export default function ProfileScreen({ navigation }) {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Edit profile' },
        { key: 'second', title: 'Review profile' },
    ]);

    return (
        <TabView
            style={{ backgroundColor: 'red', height: 400 }}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 22,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    btnArrowBack: {
        position: 'absolute',
        top: 23,
        left: 12,
        padding: 10,
    },
    iconArrowBack: {
        color: '#8B7ED7',
    },
    logo: {
        width: 100,
        height: 100,
    },
    headerText: {
        color: '#666666',
        fontSize: 14,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
    },
    frame: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});
