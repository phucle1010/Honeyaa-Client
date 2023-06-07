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
import OctIcon from 'react-native-vector-icons/Octicons';

const full_name = 'Nguyễn Quỳnh Hương Giang Vũ';

const chats = [
    {
        content: 'Hi, cho mình làm quen nhé ^^',
        is_me: false,
    },
    {
        content: 'Hi, rất vui khi được làm quen với bạn !!!',
        is_me: true,
    },
    {
        content: 'Hi, cho mình làm quen nhé ^^',
        is_me: false,
    },
    {
        content: 'Hi, rất vui khi được làm quen với bạn !!!',
        is_me: true,
    },
    {
        content: 'Hi, cho mình làm quen nhé ^^',
        is_me: false,
    },
    {
        content: 'Hi, rất vui khi được làm quen với bạn !!!',
        is_me: true,
    },
    {
        content: 'Hi, cho mình làm quen nhé ^^',
        is_me: false,
    },
    {
        content: 'Hi, rất vui khi được làm quen với bạn !!!',
        is_me: true,
    },
    {
        content: 'Hi, cho mình làm quen nhé ^^',
        is_me: false,
    },
    {
        content: 'Hi, rất vui khi được làm quen với bạn !!!',
        is_me: true,
    },
];

const Chat = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    position: 'absolute',
                    paddingTop: 20,
                    top: 0,
                    left: 0,
                    right: 0,
                    width: Dimensions.get('window').width,
                    height: 130,
                    paddingHorizontal: 24,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    zIndex: 100,
                }}
            >
                <TouchableOpacity onPress={() => navigation.navigate('MatchChat')}>
                    <Icon name="arrow-back-circle-outline" size={25} color="#8B7ED7" />
                </TouchableOpacity>
                <View style={styles.headingInfo}>
                    <View style={styles.objectInChatList} onPress={() => navigation.navigate('Chat')}>
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
                                {full_name && full_name.length > 12 ? full_name.substring(0, 13) + '...' : full_name}
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <OctIcon
                                    name="dot-fill"
                                    size={20}
                                    style={{
                                        marginRight: 5,
                                    }}
                                    color="#32CD32"
                                />
                                <Text style={styles.status}>Online</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.communicationOptions}>
                        <TouchableOpacity
                            style={{
                                alignSelf: 'center',
                                marginRight: 10,
                            }}
                        >
                            <Icon name="call-outline" size={30} color="#848484" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="videocam-outline" size={38} color="#848484" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        ...styles.chatItem,
                        height: 120,
                    }}
                />
                {chats.map((chat, index) => (
                    <View
                        key={index}
                        style={{
                            ...styles.chatItem,
                            alignSelf: chat.is_me ? 'flex-end' : 'flex-start',
                            borderBottomLeftRadius: chat.is_me ? 15 : 0,
                            borderBottomRightRadius: chat.is_me ? 0 : 15,
                            backgroundColor: chat.is_me ? '#503EBF' : '#F0F0F0',
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'Overpass',
                                fontStyle: 'normal',
                                fontWeight: 300,
                                fontSize: 14,
                                color: chat.is_me ? '#ffffff' : '#505050',
                            }}
                        >
                            {chat.content}
                        </Text>
                    </View>
                ))}
                <View
                    style={{
                        ...styles.chatItem,
                        height: 80,
                    }}
                />
            </ScrollView>
            <View style={styles.chatTools}>
                <View style={styles.msgContainer}>
                    <TextInput style={styles.msgInput} placeholder="Search here" />
                    <TouchableOpacity style={{ paddingRight: 10 }}>
                        <Icon name="mic-outline" size={30} color="#b2b2b2" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{
                        marginLeft: 15,
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: '#ffffff',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => navigation.navigate('Matched')}
                >
                    <Image
                        source={require('../assets/img/send-in-chat.png')}
                        style={{
                            width: '60%',
                            height: '60%',
                        }}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        // paddingTop: 30,
    },
    headingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    avatar: {
        width: 60,
        height: 60,
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
    },
    chatContentItem: {
        marginLeft: 15,
        flexDirection: 'column',
    },
    fullName: {
        marginBottom: 10,
        fontFamily: 'Overpass',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#575757',
    },
    status: {
        fontFamily: 'Overpass',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: 16,
        color: '#575757',
    },
    communicationOptions: {
        flexDirection: 'row',
    },
    chatItem: {
        marginBottom: 10,
        maxWidth: '70%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 15,
    },

    chatTools: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: 80,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    msgContainer: {
        width: 290,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        borderRadius: 50,
        elevation: 10,
        shadowColor: '#3b3b3b',
        overflow: 'hidden',
    },
    msgInput: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 18,
        fontStyle: 'italic',
        fontSize: 16,
        color: '#b2b2b2',
    },
});

export default Chat;
