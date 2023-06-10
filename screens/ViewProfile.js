import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

const PROFILES = {
    id: 1,
    name: 'Thần Báo',
    age: 20,
    status: 'Hoạt động gần đây',
    distance: 1,
    gender: 'Nữ',
    img: [
        {
            id: 1,
            url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/297be08c-1ddb-4b84-be0c-01f60d984bdc/dflvygw-248d6628-a2bb-4978-84b4-c0a2db3e674b.jpg/v1/fill/w_730,h_1095,q_70,strp/beautiful_anime_kawaii_cute_classmate_girl_by_sianworld_dflvygw-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTUzNiIsInBhdGgiOiJcL2ZcLzI5N2JlMDhjLTFkZGItNGI4NC1iZTBjLTAxZjYwZDk4NGJkY1wvZGZsdnlndy0yNDhkNjYyOC1hMmJiLTQ5NzgtODRiNC1jMGEyZGIzZTY3NGIuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.hPOU0KOYKq6h5z0uTRwxiGCna0dRTnnmw0M7JJgi1X4',
        },
        {
            id: 2,
            url: 'https://s3.bukalapak.com/img/8106122415/large/IMG_20181230_WA0156_scaled.jpg.webp',
        },
        {
            id: 3,
            url: 'https://w0.peakpx.com/wallpaper/432/513/HD-wallpaper-anime-girl-cool-nice-refrishin.jpg',
        },
    ],
    hobbies: [
        {
            id: 1,
            name: 'Du lịch',
        },
        {
            id: 2,
            name: 'Nghe nhạc',
        },
        {
            id: 3,
            name: 'Ăn uống',
        },
        {
            id: 4,
            name: 'Đọc sách',
        },
    ],
    introduction: 'Ly cà phê của em hơi đắng. Có vẻ thiếu vị ngọt từ anh!!!',
    socialContact: {
        facebook: 'annoy1010',
        instagram: 'Annoy',
    },
    approachObject: 'Cần tìm người yêu',
};

const ViewProfile = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <ScrollView horizontal pagingEnabled>
                        {PROFILES.img.map((image) => (
                            <TouchableOpacity
                                key={image.id}
                                onPress={() => setSelectedImageIndex(image.id - 1)}
                                activeOpacity={0.8}
                            >
                                <Image
                                    source={{ uri: image.url }}
                                    style={[
                                        styles.image,
                                        {
                                            height: '100%',
                                            width: 450,
                                        },
                                        selectedImageIndex === image.id - 1 &&
                                            {
                                                // borderWidth: 2,
                                                // borderColor: 'purple',
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
                            bottom: 5,
                            width: 40,
                            height: 40,
                            borderRadius: 50,
                            backgroundColor: '#FFFFFF',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 3,
                            borderColor: '#EF8484',
                        }}
                    >
                        <Icon name="arrow-up" size={25} color="#EF8484" />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerName}>
                    <Text style={styles.name}> {PROFILES.name} </Text>
                    <Text style={styles.age}> {PROFILES.age} </Text>
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
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 2,
        backgroundColor: '#FFFFFF',
        padding: 10,
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
        paddingVertical: 30,
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
    },
    profileOptions: {
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
