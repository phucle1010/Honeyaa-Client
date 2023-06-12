import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { launchImageLibrary } from 'react-native-image-picker';

const SettingAddPhoto = ({ navigation, route }) => {
    const { phone, pass, name, birthday } = route.params;

    const [photo, setPhoto] = React.useState(null);
    const [photo1, setPhoto1] = React.useState(null);
    const [image, setImage] = useState();
    const [image1, setImage1] = useState();
    const options = {
        mediaType: 'photo',
        includeBase64: true,
      };

    const handleChoosePhoto = () => {
        launchImageLibrary(options, (response) => {
            if (response) {
                if (!response.didCancel) {
                    //setImage(response.assets[0].uri);
                    // setImage(`data:${response.assets[0].type};base64,${response.base64}`);
                    // setPhoto(response.base64);
                    // console.log(response.base64);
                    const type = response.assets[0].type;
                    const base64 = response.assets[0].base64;
                    if (type && base64) {
                        setImage(`data:${type};base64,${base64}`);
                        setPhoto(base64);
                    } else {
                        console.log('Error: Invalid image data');
                        console.log(response);
                    }
                }
            }
        });
    };

    const handleChoosePhoto1 = () => {
        launchImageLibrary(options, (response) => {
            if (response) {
                if (!response.didCancel) {
                    // //setImage1(response.assets[0].uri);
                    // setImage1(`data:${response.assets[0].type};base64,${response.base64}`);
                    // setPhoto1(response.base64);
                    // console.log(response.base64);
                    const type = response.assets[0].type;
                    const base64 = response.assets[0].base64;
                    if (type && base64) {
                        setImage1(`data:${type};base64,${base64}`);
                        setPhoto1(base64);
                    } else {
                        console.log('Error: Invalid image data');
                        console.log(response);
                    }
                }
            }
        });
    };

    const handleContinue = async () => {
        if (photo === null || photo1 === null) {
            Alert.alert('You must have two picture for you to sign in');
        } else {
            console.log(photo, photo1);
            navigation.navigate('SettingGender', { phone, pass, name, birthday, photo1, photo });
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 51 }}>
                <TouchableOpacity style={{ width: 24, height: 24 }} onPress={() => navigation.goBack()}>
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
                    Step 3 of 6
                </Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>Add your photos</Text>
                <Text style={styles.text}>Add at least 2 photos to get more attentions</Text>
                <View style={styles.containerImages}>
                    {
                        <TouchableOpacity style={styles.btnAddImage} onPress={handleChoosePhoto}>
                            {image ? (
                                <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
                            ) : (
                                <Icon style={styles.icon} name="plus" />
                            )}
                        </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.btnAddImage} onPress={handleChoosePhoto1}>
                        {image1 ? (
                            <Image source={{ uri: image1 }} style={{ width: '100%', height: '100%' }} />
                        ) : (
                            <Icon style={styles.icon} name="plus" />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginBottom: 100 }}>
                <TouchableOpacity
                    style={{
                        height: 46,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#503EBF',
                        marginTop: 56,
                    }}
                >
                    <Text style={{ color: '#FFFFFF', fontSize: 18 }} onPress={handleContinue}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 22,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 30,
        color: '#000000',
        fontWeight: 'bold',
    },
    body: {
        flex: 1,
    },
    btnText: {
        fontSize: 18,
    },
    text: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: 16,
        lineHeight: 24,
        display: 'flex',
        alignItems: 'center',
        color: '#B2B2B2',
        // marginRight: 48,
        paddingTop: 10,
    },
    containerImages: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnAddImage: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#FF6868',
        borderRadius: 25,
        width: 160,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    icon: {
        fontSize: 50,
        color: '#FF6868',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SettingAddPhoto;
