import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    Image,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { io } from 'socket.io-client';
;
const Chat = ({ navigation, route }) => {
    // lấy id của currentUser trong redux
    const currentUser = 1
    const [messages, setMessages] = useState([])
    const API_URL = 'http://192.168.0.101:8080/api/user';
    const socket = io("http://192.168.0.101:8080", { jsonp: false })
    useEffect(() => {
        axios.get(`${API_URL}/chat/${currentUser}/${route.params.target_id}`)
            .then(response => {
                setMessages(response.data.map(chat => ({
                    _id: chat.chat_id,
                    text: chat.content,
                    createdAt: chat.sent_time,
                    user: {
                        _id: chat.sender_id,
                        avatar: route.params.image,
                    },
                })))
            })
            .catch(error => {
                console.log('lỗi:', error);
            });
    }, [])

    const onSend = useCallback((messages = []) => {
        socket.emit("message", messages);
        axios.post(`${API_URL}/message/post`, {
            chatId: route.params.chat_id, 
            personId: messages[0].user._id, 
            content: messages[0].text, 
            sentTime: moment(messages[0].createdAt).format("YYYY-MM-DD HH:mm:ss")
        })
            .then(response => {
                console.log(response.status)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const handleServerData = (data) => {
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, {
                    _id: data[0]._id,
                    text: data[0].text,
                    createdAt: data[0].createdAt,
                    user: {
                        _id: data[0].user._id,
                        avatar: route.params.image
                    },
                })
            );
        };
        socket.on("server sent data", handleServerData);
        return () => {
            socket.off("server sent data", handleServerData);
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ position: 'absolute', top: 33, left: 22 }}>
                <TouchableOpacity 
                onPress={() => navigation.goBack()} 
                style={styles.btnGoBack}>
                    <Icon name='arrow-back-outline' style={{ color: '#8B7ED7' }} size={15} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 80 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                        resizeMode="cover"
                        source={{ uri: route.params.image }}
                    />
                    <View>
                        <Text style={{ color: '#333', fontSize: 16, fontWeight: 'bold' }}>{route.params.name}</Text>
                        <Text>Online</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ padding: 10 }}>
                        <Icon
                            name="call-outline"
                            size={27}
                            color="#333"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 10 }}>
                        <Icon
                            name="videocam-outline"
                            size={27}
                            color="#333"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ borderWidth: 0.5, borderColor: '#333', marginTop: 10 }} />
            <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={false}
                showUserAvatar={false}
                onSend={messages => onSend(messages)}
                user={{
                    _id: currentUser,
                }}
                textInputStyle={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    borderWidth: 0.5,
                    paddingHorizontal: 15
                }}

            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
        paddingBottom: 10,
    },
    btnGoBack:{ 
        width: 30, 
        height: 30, 
        borderWidth: 0.5, 
        borderRadius: 15, 
        borderColor: '#8B7ED7', 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
});

export default Chat;