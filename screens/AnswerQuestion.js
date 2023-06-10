import React from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
//import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const AnswerQuestion = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: 'red',
                }}
            >
                <Image source={require('../assets/img/HoneyaaLogo.png')} style={styles.logo} />
                <TouchableOpacity
                    style={[
                        styles.btnClose,
                        {
                            position: 'absolute',
                            top: 20,
                            left: 20,
                            width: 35,
                            height: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            borderRadius: 50,
                            borderWidth: 2,
                            borderColor: '#FF6868',
                        },
                    ]}
                >
                    <Icon name="close" size={25} color="#FF6868" />
                </TouchableOpacity>
            </View>
            <View style={styles.wrapContent}>
                <Text style={styles.txtContent}>Tiêu đề</Text>
            </View>
            <View style={styles.wrapQuestion}>
                <Text style={styles.txtQuestion}>Question</Text>
            </View>
            <TouchableOpacity>
                <View style={styles.wrapAnswer}>
                    <Text style={styles.txtAnswer}>Question</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.wrapAnswer}>
                    <Text style={styles.txtAnswer}>Question</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.wrapAnswer}>
                    <Text style={styles.txtAnswer}>Question</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.wrapAnswer}>
                    <Text style={styles.txtAnswer}>Question</Text>
                </View>
            </TouchableOpacity>
            <View style={[{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }]}>
                <TouchableOpacity style={styles.btnSkip}>
                    <Text style={styles.txtSkip}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnContinue}>
                    <Text style={styles.txtContinue}>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        //justifyContent: 'center',
        height: '100%',
        backgroundColor: '#fff',
        flex: 1,
    },
    logo: {
        marginTop: -35,
        height: 160,
        width: 160,
        // display: 'flex',
    },
    wrapContent: {
        position: 'absolute',
        width: 187,
        height: 33,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#A68DEE',
        borderRadius: 20,
        marginTop: 80,
    },
    txtContent: {
        fontFamily: 'Poppins',
        fontSize: 20,
        fontWeight: 400,
        color: '#FFFFFF',
    },
    txt: {
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: 400,
        color: '#000000',
        marginLeft: 30,
        width: '100%',
    },
    wrapItem: {
        width: 150,
        height: 150,
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 15,
    },
    wrapImage: {
        width: 140,
        height: 130,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#B2B2B2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnClose: {
        position: 'absolute',
    },
    wrapQuestion: {
        width: 346,
        height: 116,
        marginTop: 40,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtQuestion: {
        fontFamily: 'Overpass',
        fontWeight: 400,
        fontSize: 30,
        color: '#FF7575',
    },
    wrapAnswer: {
        width: 346,
        height: 47,
        backgroundColor: '#FFFF',
        borderRadius: 25,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    txtAnswer: {
        fontFamily: 'Overpass',
        fontWeight: 400,
        fontSize: 22,
        color: '#FF7575',
    },
    btnSkip: {
        width: 117,
        height: 46,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#FC775A',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginLeft: 20,
    },
    txtSkip: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 18,
        color: '#FC775A',
    },
    btnContinue: {
        width: 140,
        height: 46,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#729BDA',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginRight: 20,
    },
    txtContinue: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 18,
        color: '#729BDA',
    },
    image: {
        width: 130,
        height: 100,
    },
    txtItem: {
        fontFamily: 'Poppins',
        fontWeight: 300,
        fontSize: 14,
        color: '#000000',
    },
});

export default AnswerQuestion;
