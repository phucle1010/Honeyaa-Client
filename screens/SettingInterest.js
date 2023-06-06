import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const API_URI = 'http://192.168.1.13:8080';

const createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append('photo', {
        name: photo.fileName,
        type: photo.type,
        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
    });

    return data;
};

const SettingInterest = ({ navigation, route }) => {
    const [selectedInterests, setSelectedInterests] = useState([]);
    const { phone, pass, name, birthday, photo, photo1, gender, obgender } = route.params;
    const [interests, setInterests] = useState([]);

    const loadInterests = () => {
        axios
            .get(`${API_URI}/api/user/interest`)
            .then((res) => setInterests(res.data))
            .catch((err) => console(err));
    }

    useEffect(() => loadInterests(), []);

    const toggleInterest = (interestId) => {
        if (selectedInterests.includes(interestId)) {
            setSelectedInterests(selectedInterests.filter(id => id !== interestId));
        } else {
            setSelectedInterests([...selectedInterests, interestId]);
        }
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const selectInterest = (interest) => {
        const index = selectedInterests.indexOf(interest);
        if (index === -1) {
            setSelectedInterests([...selectedInterests, interest]);
        } else {
            const newInterests = [...selectedInterests];
            newInterests.splice(index, 1);
            setSelectedInterests(newInterests);
        }
    };

    const isInterestSelected = (interest) => {
        return selectedInterests.includes(interest);
    };

    const handleFinish = () => {
        console.log({ phone, pass, name, birthday, photo, photo1, gender, obgender, interests: selectedInterests });
        axios
            .post(`${API_URI}/api/user/signup`, {
                phone,
                pass,
                name,
                birthday,
                photo,
                photo1,
                gender,
                obgender,
                interests: selectedInterests,
            })
            .then((res) => console.log('Sign up successful'))
            .catch((err) => console.log(err));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: 24, height: 24 }} onPress={() => handleGoBack()}>
                    <Icon name="arrow-left" style={{ color: '#8B7ED7' }} size={24} />
                </TouchableOpacity>
                <Text
                    style={{
                        color: '#B2B2B2',
                        width: 256,
                        height: 21,
                        textAlign: 'center',
                        marginLeft: 66 - 24 - 22,
                        marginRight: 66 - 22,
                    }}
                >
                    Step 6 of 6
                </Text>
            </View>
            <View style={{ flex: 3, justifyContent: 'center' }}>
                <Text style={styles.title}>Your interests?</Text>
                    <ScrollView>
                        <View style={styles.listInterest}>
                            {interests.length > 0  && interests.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => toggleInterest(item.id)}
                                    style={[styles.itemInterest, selectedInterests.includes(item.id) && styles.selectedInterest]}
                                >
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            ))}         
                        </View>
                    </ScrollView>
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
                <TouchableOpacity style={styles.btn} onPress={() => handleFinish()}>
                    <Text style={{ color: '#FFFFFF' }}>Finish</Text>
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
        padding: 50,
    },
    title: {
        fontSize: 30,
        color: '#000000',
        fontWeight: 'bold',
        marginRight: 87,
        paddingBottom: 15,
    },
    listInterest: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemInterest: {
        height: 46,
        width: 150,
        paddingHorizontal: 30,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        margin: 5,
        borderColor: '#E8E8E8',
    },
    selectedInterest: {
        borderColor: '#8B7ED7',
        borderWidth: 3,
    },
    btn: {
        height: 46,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#503EBF',
        marginTop: 60,
    },
});

export default SettingInterest;
