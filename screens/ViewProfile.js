import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

const ViewProfile = ({ navigation, route }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const userProfile = route.params?.userProfile;

    const renderImageSelector = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => setSelectedImageIndex(item.id - 1)}
                style={[styles.thumbnailContainer, selectedImageIndex === item.id - 1 && styles.thumbnailSelected]}
            >
                <Image source={{ uri: item.url }} style={styles.thumbnail} />
            </TouchableOpacity>
        );
    };

    const currentYearsOld = (date) => {
        const currentDate = new Date();
        const dob = new Date(Date.parse(date));
        const yearsOld = Number.parseInt(currentDate.getUTCFullYear()) - Number.parseInt(dob.getUTCFullYear());
        const currentMonth = currentDate.getMonth();
        const monthInDOB = dob.getMonth();
        if (currentMonth < monthInDOB) {
            return yearsOld - 1;
        }
        return yearsOld;
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%' }}>
                <View style={styles.imageContainer}>
                    <ScrollView horizontal pagingEnabled>
                        {userProfile?.img.length > 0 &&
                            userProfile?.img.map((profileImage, index) => (
                                <TouchableOpacity
                                    key={index}
                                    // onPress={() => setSelectedImageIndex(image.id - 1)}
                                    activeOpacity={0.8}
                                >
                                    <Image
                                        source={{ uri: profileImage.image }}
                                        style={[
                                            styles.image,
                                            {
                                                height: '100%',
                                                width: 450,
                                            },
                                        ]}
                                    />
                                </TouchableOpacity>
                            ))}
                    </ScrollView>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 10,
                            bottom: '2%',
                            width: 30,
                            height: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#EF8484',
                            borderRadius: 20,
                        }}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Icon name="arrow-down" size={20} color="#ffff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerName}>
                    <Text style={styles.name}> {userProfile.name} </Text>
                    <Text style={styles.age}> {currentYearsOld(userProfile.dob)} </Text>
                </View>
                <View style={styles.containerAbout_me}>
                    <Text style={styles.name}> About me</Text>
                </View>
                <View style={styles.containerBasic}>
                    <Text style={styles.name}> My basics </Text>
                </View>
                <View style={styles.containerInterest}>
                    <Text style={styles.name}> My interests</Text>
                </View>
            </ScrollView>
            <View style={styles.profileOptions}>
                <TouchableOpacity
                    style={{ ...styles.profileOptionItem, borderColor: '#fa5f55', width: 53, height: 53 }}
                >
                    <Icon name="close" size={30} color="#fa5f55" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.profileOptionItem, borderColor: '#40b5ad', width: 48, height: 48 }}
                >
                    <Icon name="heart-outline" size={30} color="#40b5ad" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.profileOptionItem, borderColor: '#00bfff', width: 53, height: 53 }}
                >
                    <SimpleIcon name="star" size={26} color="#00bfff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 2,
        backgroundColor: '#FFFFFF',
    },
    imageContainer: {
        height: 550,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imageSelectorContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    thumbnailContainer: {
        padding: 2,
        margin: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'white',
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    thumbnailSelected: {
        borderColor: 'purple',
    },
    infoContainer: {
        padding: 20,
    },
    containerName: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomColor: '#AAAAAA',
        borderBottomWidth: 0.5,
    },
    name: {
        fontSize: 20,
        fontWeight: 400,
        marginBottom: 5,
        color: '#000000',
        paddingLeft: 20,
    },
    age: {
        fontWeight: '400',
        fontSize: 18,
        color: '#000000',
    },
    containerAbout_me: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 30,
        borderBottomColor: '#AAAAAA',
        borderBottomWidth: 0.5,
    },
    containerBasic: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 30,
        borderBottomColor: '#AAAAAA',
        borderBottomWidth: 0.5,
    },
    containerInterest: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 30,
        borderBottomColor: '#AAAAAA',
        borderBottomWidth: 0.5,
        paddingBottom: 100,
    },
    profileOptions: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    profileOptionItem: {
        marginHorizontal: 10,
        height: 50,
        width: 50,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 3,
    },
});

export default ViewProfile;
