import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const img = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chats = [1];
const full_name = 'Nguyễn Quỳnh Hương Giang Vũ';
const chat_content = 'Hi, chào bạn. Rất vui vì được làm quen với bạn';

const MatchChat = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.searchContainer}>
                    <TouchableOpacity style={{ paddingLeft: 15 }}>
                        <Icon name="search-outline" size={25} color="#b2b2b2" />
                    </TouchableOpacity>
                    <TextInput style={styles.searchInput} placeholder="Search here" />
                </View>
                <View
                    style={{
                        marginTop: 30,
                        height: 90,
                    }}
                >
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {img.map((item, index) => (
                            <View
                                key={index}
                                style={{
                                    ...styles.avatar,
                                    marginLeft: (Dimensions.get('window').width - 346) / 2,
                                }}
                            >
                                <Image
                                    source={require('../assets/img/boy-anime.jpg')}
                                    style={{
                                        width: '90%',
                                        height: '90%',
                                        borderRadius: 50,
                                    }}
                                />
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <Text
                    style={{
                        marginLeft: (Dimensions.get('window').width - 346) / 2,
                        paddingBottom: 10,
                        color: '#FF6868',
                        fontFamily: 'Overpass',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        fontSize: 18,
                    }}
                >
                    Messages
                </Text>
                <View
                    style={{
                        paddingBottom: 80,
                        paddingHorizontal: (Dimensions.get('window').width - 346) / 2,
                    }}
                >
                    {chats.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.objectInChatList}
                            onPress={() => navigation.navigate('Chat')}
                        >
                            <View
                                style={{
                                    ...styles.avatar,
                                }}
                            >
                                <Image
                                    source={require('../assets/img/boy-anime.jpg')}
                                    style={{
                                        width: '90%',
                                        height: '90%',
                                        borderRadius: 50,
                                    }}
                                />
                            </View>
                            <View style={styles.chatContentItem}>
                                <Text style={styles.fullName}>
                                    {full_name && full_name.length > 18
                                        ? full_name.substring(0, 18) + '...'
                                        : full_name}
                                </Text>
                                <Text style={styles.content}>
                                    {chat_content && chat_content.length > 35
                                        ? chat_content.substring(0, 32) + '...'
                                        : chat_content}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    searchContainer: {
        width: 346,
        height: 45,
        marginTop: 30,
        marginLeft: (Dimensions.get('window').width - 346) / 2,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        borderRadius: 50,
        elevation: 10,
        shadowColor: '#7c7c7c',
        overflow: 'hidden',
    },
    searchInput: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 18,
        fontStyle: 'italic',
        fontSize: 16,
        color: '#b2b2b2',
    },
    avatar: {
        width: 75,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#b2b2b2',
        borderWidth: 1,
        borderRadius: 50,
        overflow: 'hidden',
    },
    objectInChatList: {
        marginVertical: 15,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#C8C8C8',
    },
    chatContentItem: {
        marginLeft: 15,
        flexDirection: 'column',
    },
    fullName: {
        marginBottom: 15,
        fontFamily: 'Overpass',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#575757',
        // backgroundColor: 'red',
    },
    content: {
        fontFamily: 'Overpass',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: 16,
        color: '#575757',
        // backgroundColor: 'green',
    },
});

export default MatchChat;
