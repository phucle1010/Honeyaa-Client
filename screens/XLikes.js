import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import XLikesItem from '../components/XLikesItem';
import API_URL from '../services/apiRoute';
import { useSelector } from 'react-redux';

export default function Xlikes(props) {
    const { navigation } = props;
    const currentUser = useSelector((state) => state.user);
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        axios
            .get(`${API_URL}/api/user/xlike/${currentUser.id}`)
            .then((response) => {
                setDataUser(response.data);
            })
            .catch((error) => {
                console.log('lỗi:', error);
            });
    }, []);

    const handlePostInteract = async (props) => {
        const { item, type } = props;
        setTimeout(() => {
            axios
                .post(`${API_URL}/api/match/interact`, {
                    person_id: currentUser.id,
                    target_id: item.person_id,
                    interact_type: type,
                })
                .then(async (res) => {
                    if (res.data.statusCode === 200) {
                        if (res.data.is_matched) {
                            // navigate tới màn hình matched
                            const newData = dataUser.filter((user) => user.likeId !== item.likeId);
                            setDataUser(newData);
                            await navigation.navigate('Matched', {
                                person_img: currentUser.img[0].image,
                                target_img: item.image,
                            });
                        } else {
                            const newData = dataUser.filter((user) => user.likeId !== item.likeId);
                            setDataUser(newData);
                        }
                    } else {
                        Alert.alert('Fail', res.data.responseData);
                    }
                })
                .catch((err) => Alert.alert('Fail', err.toString()));
        }, 200);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={dataUser}
                renderItem={({ item }) => (
                    <XLikesItem
                        onPressLike={() => handlePostInteract({ item, type: 1 })}
                        onPressX={() => handlePostInteract({ item, type: 2 })}
                        name={item.full_name}
                        uri={item.image}
                    />
                )}
                keyExtractor={(item) => item.target_id}
                numColumns={2}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingLeft: 11,
        paddingBottom: 90,
    },
});
