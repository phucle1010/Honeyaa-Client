import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import OctIcon from 'react-native-vector-icons/Octicons';
const { width, height } = Dimensions.get('window');

const SentItem = (props) => {
    const { name, uri, onPress, isResponsed } = props;

    return (
        <View style={styles.container}>
            <Image
                style={{ width: '100%', height: '100%', borderRadius: 25 }}
                resizeMode={'cover'}
                source={{ uri: uri }}
            />
            <View style={styles.content}>
                <View>
                    <Text style={[styles.text, { fontWeight: 'bold' }]}>
                        {name.length > 14 ? name.substring(0, 11) + ' ...' : name}
                    </Text>
                </View>

                {isResponsed !== 1 && (
                    <TouchableOpacity onPress={onPress} style={styles.iconStarContainer}>
                        <OctIcon name="x" style={styles.iconStar} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default SentItem;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        width: (width - 66) / 2,
        height: (width - 66) / 2,
        borderRadius: 25,
        margin: 11,
        overflow: 'hidden',
    },
    content: {
        bottom: 42,
        zIndex: 1,
        paddingHorizontal: 9,
        // paddingVertical: 6,
        height: 42,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(103, 103, 103, 0.6)',
    },
    iconStarContainer: {
        width: 30,
        height: 30,
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
        fontSize: 18,
    },
});
