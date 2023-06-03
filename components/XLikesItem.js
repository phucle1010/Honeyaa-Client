import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import AwesomeExtraIcon from 'react-native-vector-icons/FontAwesome';
import OctIcon from 'react-native-vector-icons/Octicons';
const { width, height } = Dimensions.get('window');

const XlikesItem = (props) => {
    const { name, uri } = props;
    return (
        <View style={styles.container}>
            <Image
                style={{ width: '100%', height: '100%', borderRadius: 25 }}
                resizeMode={'cover'}
                source={{ uri: uri }}
            />
            <View style={styles.content}>
                <View style={styles.iconStarContainer}>
                    <OctIcon name="x" style={styles.iconStar} />
                </View>
                <View style={[styles.iconStarContainer, { borderColor: '#47DEE8' }]}>
                    <OctIcon name="heart" style={[styles.iconStar, { color: '#47DEE8' }]} />
                </View>
            </View>
        </View>
    );
};

export default XlikesItem;

const styles = StyleSheet.create({
    container: {
        width: (width - 66) / 2,
        height: (width - 66) / 2,
        borderRadius: 25,
        marginHorizontal: 11,
        marginVertical: 17,
    },
    content: {
        width: (width - 66) / 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: -18,
    },
    iconStarContainer: {
        width: 36,
        height: 36,
        borderWidth: 2,
        borderColor: '#FD6161',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    iconStar: {
        color: '#FD6161',
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 12,
    },
});
