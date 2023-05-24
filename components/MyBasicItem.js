import React from "react"
import { TouchableOpacity, View, StyleSheet, Text } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';

const MyBasicItem = (props) => {
    const { icon, name, onPress, value } = props
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.myBasicItemContainer}>
            <View style={styles.myBasicRow}>
                <Icon name={icon} size={24} style={styles.iconBasic} />
                <Text style={styles.text}>{name}</Text>
            </View>
            <View style={styles.myBasicRow}>
                <Text style={styles.text}>{value}</Text>
                <Icon name="chevron-forward-outline" size={15} style={styles.iconBasic} />
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    myBasicItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 0.5,
        paddingVertical: 9,
        borderColor: '#AAAAAA'
    },
    myBasicRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconBasic: {
        color: '#666666',

    },
    text: {
        fontSize: 12,
        color: '#575757',
        marginHorizontal: 5
    },
})
export default MyBasicItem
 