import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URI = 'http://192.168.1.13:8080';

// const notification = [
//   {
//     user: 'Nguyễn Hoàng Quân',
//     interact: 'Like',
//     time: new Date('2021-06-13 10:30:15'),
//   },
//   {
//     user: 'Nguyễn Nhật Hoàng',
//     interact: 'Sup like',
//     time: new Date('2023-06-13 23:15:15'),
//   }
// ];

const Notification = () => {
  const [notification, setNotification] = useState([]);
  const [token, setToken] = useState();
  const loadNotification = async () => {
    const usertoken = JSON.parse(await AsyncStorage.getItem('user_token'));//.then((token) => setToken(token)));

    axios
      .get(`${API_URI}/api/user/notification`, {headers: {'Authorization': token}})
      .then((res) => setNotification(res.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    loadNotification();
    console.log(notification);
  }, []);
  const handle = (time) => {
    const now = new Date();
    const timeDiff = now.getTime() - time.getTime();
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    let timeString;

    if (days > 0) {
      timeString = `${time.toLocaleDateString()}`;
    } else if (hours > 0) {
      timeString = `${hours} giờ${hours > 1 ? '' : ''} trước`;
    } else {
      timeString = `${minutes} phút${minutes > 1 ? '' : ''} trước`;
    }
    
    return timeString;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      {notification.length > 0 ? notification.map((notif, index) => (
        
        <View style={styles.notification} key={index}>
          <Text style={styles.notificationText}>{notif.user + ' đã ' + notif.interact + ' bạn vào ' + handle(new Date(notif.time))}</Text>
          {/* <Text style={styles.notificationTime}>{notif.time}</Text> */}
        </View>
      )): ''}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    right: 5,
    width: 350,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    color: '#000000'
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  notificationText: {
    fontSize: 16,
  },
  notificationTime: {
    fontSize: 14,
    color: '#999',
  },
});

export default Notification;