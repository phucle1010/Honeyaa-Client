import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import React from 'react';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
const { width } = Dimensions.get('window');
const TopLikeItem = (props) => {
    const { name, uri } = props;
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
                    {/* <Text style={[styles.text, { color: '#FF8E3C' }]}>còn lại 10 giờ</Text> */}
                </View>
            </View>
            <View style={styles.iconStarContainer}>
                <AwesomeIcon name="star" style={styles.iconStar} />
            </View>
        </View>
    );
};

export default TopLikeItem;

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
        // position: 'absolute',
        bottom: 43,
        zIndex: 1,
        paddingHorizontal: 9,
        paddingVertical: 9,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(103, 103, 103, 0.6)',
    },
    iconStarContainer: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 30,
        height: 30,
        borderWidth: 2,
        borderColor: '#63EF82',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconStar: {
        color: '#63EF82',
        fontSize: 15,
        fontWeight: 'bold',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});
