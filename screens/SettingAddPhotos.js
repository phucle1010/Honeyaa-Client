import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { launchImageLibrary } from 'react-native-image-picker';

const SettingAddPhotos = ({navigation, route}) => {
    const {phone, pass, name, birthday} = route.params;

    const [photo, setPhoto] = React.useState(null);
    const [photo1, setPhoto1] = React.useState(null);

    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
            if (response) {
                setPhoto(response.assets(0).uri);
            }
            console.log(response.assets(0).uri);
        });
    };

    const handleChoosePhoto1 = () => {
        launchImageLibrary({ noData: true }, (response) => {
            if (response) {
                setPhoto1(response.assets[0].uri);
            }
            console.log(response.assets[0].uri);
        });
    };

    const handleContinue = async () => {
        if(photo===null || photo1 === null){
            Alert.alert('You must have two picture for you to sign in');
        }else{
            navigation.navigate('SettingGender', {phone, pass, name, birthday, photo1, photo});
        }
    }

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', marginTop: 74, paddingBottom: 51}}>
                <TouchableOpacity style={{width: 24, height: 24}} onPress={() => navigation.goBack()}>
                    <Icon name='arrow-left' style={{color: '#8B7ED7'}} size={24}  />
                </TouchableOpacity>
                <Text style={{ color: '#B2B2B2', width: 256, height: 21, textAlign: "center", marginLeft: 66-24-22, marginRight: 66-22}}>step 3 of 6</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>Add your photos</Text>
                <Text style={styles.text}>Add at least 2 photos to get more attentions</Text>
                <View style={styles.containerImages}>
                    {<TouchableOpacity style={styles.btnAddImage} onPress={handleChoosePhoto}>
                        {photo? <Image source={{uri: photo}} style={{width: '100%', height: '100%'}} /> 
                        : <Icon style={styles.icon} name='plus' />}
                    </TouchableOpacity>}
                    <TouchableOpacity style={styles.btnAddImage} onPress={handleChoosePhoto1}>
                        {photo1? <Image source={{uri: photo1}} style={{width: '100%', height: '100%'}} /> 
                        : <Icon style={styles.icon} name='plus' />}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{marginBottom: 100}}>
                <TouchableOpacity style={{
                    height: 46,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#503EBF', marginTop: 56}}>
                    <Text style={{color: '#FFFFFF'}} onPress={handleContinue}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 22,
        backgroundColor: '#FFFFFF'
    },
    title: {
        fontSize: 30,
        color: '#000000',
        fontWeight: 'bold'
    },
    body: {
        flex: 1,
    },
    btnText: {
        fontSize: 18,
    },
    text:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: 16,
        lineHeight: 24,
        display: 'flex',
        alignItems: 'center',
        color: '#B2B2B2',
        marginRight: 48,
        paddingTop: 10,
    },
    containerImages: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnAddImage: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#B2B2B2',
        borderRadius: 25,
        width: 160,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    icon: {
        fontSize: 50,
        color: '#797979',
        justifyContent: 'center',
        alignItems: 'center',
    }

})
export default SettingAddPhotos