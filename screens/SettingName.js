import { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SettingName = (props) => {
    const { navigation, route } = props;
    const [err, setErr] = useState('');
    const { phone, pass } = route.params;
    const [name, setName] = useState('');

    const handlePress = () => {
        console.log(name);
        if (!name) {
            setErr('Vui long nhap day du');
        } else {
            navigation.navigate('SettingBirth', { phone, pass, name });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.containVector}>
                <TouchableOpacity style={styles.vector} onPress={() => navigation.goBack()}>
                    <Icon style={styles.arrowleft} name="arrow-left" size={24} />
                </TouchableOpacity>
                <Text style={styles.page}>Step 1 of 7</Text>
            </View>
            <View>
                <Text style={styles.title}>What's your first name?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder=" First Name "
                    placeholderTextColor={'#A6A6A6'}
                    value={name}
                    onChangeText={(e) => setName(e)}
                />
                {err ? <Text style={{ color: 'red', alignSelf: 'center', marginTop: 10 }}>{err}</Text> : null}
                <TouchableOpacity
                    style={[{ backgroundColor: '#503EBF', marginTop: 18 }, styles.btn]}
                    onPress={handlePress}
                >
                    <Text style={[{ color: '#FFFFFF' }, styles.btnText]}>Continue</Text>
                </TouchableOpacity>
            </View>
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
    containVector: {
        position: 'absolute',
        width: '100%',
        height: 24,
        left: 22,
        right: 22,
        top: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    vector: {
        width: 24,
        height: 24,
        position: 'absolute',
        left: 22,
    },
    arrowleft: {
        color: '#8B7ED7',
    },
    page: {
        color: '#B2B2B2',
        width: '100%',
        height: 21,
        textAlign: 'center',
    },
    btn: {
        height: 46,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'blue',
    },
    btnText: {
        fontSize: 18,
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: '#767676',
        minHeight: 46,
        fontSize: 18,
        paddingHorizontal: 10,
        marginTop: 61,
        marginBottom: 60,
    },
});
export default SettingName;
