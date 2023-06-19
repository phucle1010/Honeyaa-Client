import { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import API_URL from '../services/apiRoute';

const RestoreAccount = (props) => {
    const { navigation, route } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdatePassword = () => {
        if (password != repassword) {
            setRePassword('');
            setMessage('Password does not match, please check again');
            return;
        } else if (password.length === 0 || repassword.length === 0) {
            setMessage('Please complete all information');
            return;
        }
        axios
            .put(`${API_URL}/api/user/${route.params.phone}/pass`, { pass: password })
            .then((response) => {
                setModalVisible(true);
                setPassword('');
                setRePassword('');
                console.log('Update successful');
            })
            .catch((error) => {
                console.log(error);
                setMessage('Password update failed, please try again');
            });
    };

    const handleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };
    const handleShowRePassword = () => {
        setShowRePassword(!showRePassword);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Restore Account</Text>
            <View style={styles.inputRow}>
                <TextInput
                    onChangeText={(text) => {
                        setPassword(text);
                        setMessage('');
                    }}
                    style={styles.textInput}
                    value={password}
                    secureTextEntry={!showNewPassword}
                    placeholder="New Password"
                    placeholderTextColor={'#A6A6A6'}
                />
                <TouchableOpacity onPress={handleShowNewPassword}>
                    {showNewPassword ? (
                        <Icon style={styles.iconEye} name="eye" />
                    ) : (
                        <Icon style={styles.iconEye} name="eye-slash" />
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.inputRow}>
                <TextInput
                    onChangeText={(text) => {
                        setRePassword(text);
                        setMessage('');
                    }}
                    style={styles.textInput}
                    value={repassword}
                    secureTextEntry={!showRePassword}
                    placeholder="Re-Password"
                    placeholderTextColor={'#A6A6A6'}
                />
                <TouchableOpacity onPress={handleShowRePassword}>
                    {showRePassword ? (
                        <Icon style={styles.iconEye} name="eye" />
                    ) : (
                        <Icon style={styles.iconEye} name="eye-slash" />
                    )}
                </TouchableOpacity>
            </View>
            {message ? <Text style={{ color: 'red', alignSelf: 'center', marginTop: 10 }}>{message}</Text> : null}
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                Password has been updated, come back to login to experience it right away
                            </Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => navigation.navigate('Login')}
                            >
                                <Text style={styles.textStyle}>Comfirm</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity
                onPress={handleUpdatePassword}
                style={[{ backgroundColor: '#503EBF', marginTop: 18 }, styles.btn]}
            >
                <Text style={[{ color: '#FFFFFF' }, styles.btnText]}>Complete</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[
                    {
                        marginTop: 30,
                        backgroundColor: '#FFFFFF',
                        shadowColor: 'black',
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.25,
                        shadowRadius: 2,
                        elevation: 7,
                    },
                    styles.btn,
                ]}
            >
                <Text style={[{ color: '#6952F1' }, styles.btnText]}>Back to Login</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
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
    inputRow: {
        flexDirection: 'row',
        marginTop: 24,
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#767676',
        height: 46,
        borderRadius: 10,
        fontSize: 18,
        paddingHorizontal: 10,
        color: '#000000',
    },
    iconEye: {
        fontSize: 23,
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
        color: '#797979',
    },
    btn: {
        height: 46,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#503EBF',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        fontSize: 18,
        color: '#000000',
        textAlign: 'center',
    },
});
export default RestoreAccount;
