import { useState, useEffect, useRef } from 'react';
import { View, FlatList, Modal, Image, ScrollView, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, ScrollViewComponent, Alert, Pressable, TouchableWithoutFeedback } from 'react-native'
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import AwesomeExtraIcon from 'react-native-vector-icons/FontAwesome';
import OctIcon from 'react-native-vector-icons/Octicons';
import { Picker } from '@react-native-picker/picker';
import { date } from 'yup';
const { width } = Dimensions.get('window');
const dataZodiac = [
'Aries','Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
]
const dataEducation = [
    'high school', 'college', 'graduate school'
]
const ZodiacModal = (props) => {
    const {onValueChange,selectedValue,showModal, onPress} = props
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}>
            <View style={styles.modalContainer}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={{ position: 'absolute', color: '#FF6868', top: 0, right: 0 }}
                            onPress={onPress}>
                            <Icon name="close-outline" size={30} style={{ color: '#FF6868' }} />
                        </TouchableOpacity>

                        <View style={{ color: '#333', width: '100%' }}>

                            <Text style={{ fontSize: 15, color: '#000000', fontWeight: 'bold' }}>Zodiac:</Text>
                            <Picker
                                dropdownIconColor={'#FF6868'}
                                dropdownIconRippleColor={'#FF6868'}

                                style={{ color: '#333', borderWidth: 1, borderColor: 'red' }}
                                selectedValue={selectedValue}
                                onValueChange={onValueChange
                                }>
                                    {dataZodiac.map(item=> <Picker.Item label={item} value={item} key={item} />)}
                            </Picker>
                        </View>
                        <Pressable
                            onPress={onPress}
                            style={[styles.button, styles.buttonClose]}
                        >
                            <Text style={styles.textStyle}>Comfirm</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
const EducationModal = (props) => {
    const {onValueChange,selectedValue,showModal, onPress} = props
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}>
            <View style={styles.modalContainer}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={{ position: 'absolute', color: '#FF6868', top: 0, right: 0 }}
                            onPress={onPress}>
                            <Icon name="close-outline" size={30} style={{ color: '#FF6868' }} />
                        </TouchableOpacity>

                        <View style={{ color: '#333', width: '100%' }}>

                            <Text style={{ fontSize: 15, color: '#000000', fontWeight: 'bold' }}>Education:</Text>
                            <Picker
                                dropdownIconColor={'#FF6868'}
                                dropdownIconRippleColor={'#FF6868'}

                                style={{ color: '#333', borderWidth: 1, borderColor: 'red' }}
                                selectedValue={selectedValue}
                                onValueChange={onValueChange
                                }>
                                    {dataEducation.map(item=> <Picker.Item label={item} value={item} key={item} />)}
                            </Picker>
                        </View>
                        <Pressable
                            onPress={onPress}
                            style={[styles.button, styles.buttonClose]}
                        >
                            <Text style={styles.textStyle}>Comfirm</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        color: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        width: width - 40,
        color: 'green',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    buttonClose: {
        width: '100%',
        height: 46,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#503EBF', marginTop: 18
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF',
    },
    modalText: {
        marginBottom: 15,
        fontSize: 18,
        color: '#000000',
        textAlign: 'center',
        color: 'blue',
    },
})
export { ZodiacModal,EducationModal }