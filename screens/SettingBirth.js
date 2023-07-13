import React, { Component, useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-date-picker';

const SettingBirth = ({ navigation, route }) => {
    const { phone, pass, name } = route.params;
    const [birthday, setBirthDay] = useState(new Date());
    const [openDatePicker, setOpenDatePicker] = useState(false);

    // const handlePress = useCallback(() => {

    // }, [navigation, phone, pass, name, birthday]);

    const handlePress = () => {
        navigation.navigate('SettingAddPhoto', {
            phone,
            pass,
            name,
            birthday: birthday.toISOString().substring(0, 10),
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ width: 24, height: 24 }} onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" style={{ color: '#8B7ED7' }} size={24} />
                    </TouchableOpacity>
                    <Text style={styles.page}>Step 2 of 7</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>When is your birthday?</Text>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ height: 90, flexDirection: 'row' }}>
                    <View style={{ width: 70, flexDirection: 'column' }}>
                        <Text style={styles.date}>Day</Text>
                        <TouchableOpacity
                            onPress={() => setOpenDatePicker(true)}
                            style={{
                                height: 46,
                                width: 70,
                                borderWidth: 1,
                                borderColor: '#B2B2B2',
                                borderStyle: 'solid',
                                marginTop: 16,
                                borderRadius: 10,
                                flexDirection: 'row',
                            }}
                        >
                            <Text style={styles.day}>{birthday.getDate()}</Text>
                            <Icon name="heart" size={15} style={{ color: '#B2B2B2', alignSelf: 'center' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: 70, marginLeft: 47, flexDirection: 'column' }}>
                        <Text style={styles.date}>Month</Text>
                        <TouchableOpacity
                            onPress={() => setOpenDatePicker(true)}
                            style={{
                                height: 46,
                                width: 70,
                                borderWidth: 1,
                                borderColor: '#B2B2B2',
                                borderStyle: 'solid',
                                marginTop: 16,
                                borderRadius: 10,
                                flexDirection: 'row',
                            }}
                        >
                            <Text style={styles.day}>{birthday.getMonth() + 1}</Text>
                            <Icon name="heart" size={15} style={{ color: '#B2B2B2', alignSelf: 'center' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, marginLeft: 47, flexDirection: 'column' }}>
                        <Text style={styles.date}>Year</Text>
                        <TouchableOpacity onPress={() => setOpenDatePicker(true)} style={styles.year}>
                            <Text style={{ color: 'black', width: 90, alignSelf: 'center' }}>
                                {birthday.getFullYear()}
                            </Text>
                            <Icon name="heart" size={15} style={{ color: '#B2B2B2', alignSelf: 'center', right: 10 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <DatePicker
                    modal
                    mode={'date'}
                    open={openDatePicker}
                    date={new Date()}
                    onConfirm={(newDate) => {
                        const localDate = new Date(newDate.setHours(newDate.getHours() + 7));
                        console.log(localDate);
                        setBirthDay(localDate);
                        setOpenDatePicker(false);
                    }}
                    onCancel={() => setOpenDatePicker(false)}
                />
                <TouchableOpacity
                    style={{
                        height: 46,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#503EBF',
                        marginTop: 56,
                    }}
                    onPress={handlePress}
                >
                    <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 22,
        backgroundColor: '#FFFFFF',
        padding: 74,
    },
    page: {
        color: '#B2B2B2',
        width: 256,
        height: 21,
        textAlign: 'center',
        marginLeft: 66 - 24 - 22,
        marginRight: 66 - 22,
    },
    title: {
        fontSize: 30,
        color: '#000000',
        fontWeight: 'bold',
        marginRight: 65,
    },
    date: {
        color: '#A6A6A6',
        alignItems: 'center',
        display: 'flex',
    },
    day: {
        color: 'black',
        width: 50,
        alignSelf: 'center',
        paddingLeft: 10,
    },
    year: {
        height: 46,
        width: 112,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        borderStyle: 'solid',
        marginTop: 16,
        borderRadius: 10,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 5,
    },
});

export default SettingBirth;
