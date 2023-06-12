/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import AwesomeExtraIcon from 'react-native-vector-icons/FontAwesome';
import OctIcon from 'react-native-vector-icons/Octicons';

const NUMBER_IMAGES_OF_EACH_PROFILE = 5;

const PROFILE = {
  id: 1,
  name: 'Thần Báo',
  age: 20,
  status: 'Hoạt động gần đây',
  distance: 1,
  gender: 'Nữ',
  img: [
    {
      id: 1,
      url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/299c36a8-6b55-41b8-89ba-a2a33c7a18a6/df06ey6-c0a0faa5-cd5c-488e-a29a-72b3768979af.jpg/v1/fill/w_623,h_1282,q_70,strp/hd_wallpaper_cute_anime_girl_pink_kawaii_by_callmehlexie_df06ey6-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTY0NCIsInBhdGgiOiJcL2ZcLzI5OWMzNmE4LTZiNTUtNDFiOC04OWJhLWEyYTMzYzdhMThhNlwvZGYwNmV5Ni1jMGEwZmFhNS1jZDVjLTQ4OGUtYTI5YS03MmIzNzY4OTc5YWYuanBnIiwid2lkdGgiOiI8PTgwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.XYQFdLwg6tv24B-YgZtCePSEWZW9jCjJimF5tMBDUMQ',
    },
    {
      id: 2,
      url: 'https://w0.peakpx.com/wallpaper/330/348/HD-wallpaper-blue-eye-cute-alone-anime-girl.jpg',
    },
    {
      id: 3,
      url: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/08/anh-anime-vui-ve-nu-cong-so-dang-yeu.jpg',
    },
    {
      id: 4,
      url: 'https://w0.peakpx.com/wallpaper/368/441/HD-wallpaper-cute-anime-girl-anime-cat-girl-anime-girl-cartoon-cat-girl-cute-anime.jpg',
    },
    {
      id: 5,
      url: 'https://phunugioi.com/wp-content/uploads/2020/03/hinh-anh-anime-girl-de-thuong.jpg',
    },
  ],
  hobbies: [
    {
      id: 1,
      name: 'Du lịch',
    },
    {
      id: 1,
      name: 'Nghe nhạc',
    },
    {
      id: 1,
      name: 'Ăn uống',
    },
    {
      id: 1,
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

const Tendency = ({navigation, route}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={[
          styles.btnClose,
          {alignItems: 'center', width: '100%', marginBottom: 30},
        ]}>
        <Image source={require('../assets/img/closecircle1.png')} />
      </TouchableOpacity>
      <View style={styles.profile}>
        <View style={styles.slider}>
          <TouchableOpacity
            style={styles.sliderItem}
            onPress={() => setSelectedImageIndex(0)}
          />
          <TouchableOpacity
            style={styles.sliderItem}
            onPress={() => setSelectedImageIndex(1)}
          />
          <TouchableOpacity
            style={styles.sliderItem}
            onPress={() => setSelectedImageIndex(2)}
          />
          <TouchableOpacity
            style={styles.sliderItem}
            onPress={() => setSelectedImageIndex(3)}
          />
          <TouchableOpacity
            style={styles.sliderItem}
            onPress={() => setSelectedImageIndex(4)}
          />
        </View>
        {
          <Image
            source={{
              uri: PROFILE.img[selectedImageIndex].url,
            }}
            style={styles.profileImage}
          />
        }
        <View style={styles.profileInfo}>
          <View style={styles.profileDesc}>
            <Text
              style={{
                ...styles.profileDetailItem,
                fontWeight: '700',
                letterSpacing: 1,
              }}>
              {PROFILE.name}
            </Text>
            <Text style={{...styles.profileDetailItem, fontSize: 26}}>
              {PROFILE.age}
            </Text>
            <AwesomeExtraIcon name="check-circle" size={34} color="#0d98ba" />
          </View>
          <View style={styles.profileDesc}>
            <Text
              style={{
                ...styles.profileDetailItem,
                fontSize: 16,
                color: '#fff',
              }}>
              {PROFILE.status}
            </Text>
            <OctIcon
              name="dot-fill"
              style={{
                ...styles.profileDetailItem,
                fontSize: 18,
                color: '#7cfc00',
              }}
            />
          </View>
          <View style={styles.profileDesc}>
            <Text
              style={{
                ...styles.profileDetailItem,
                fontSize: 16,
                color: '#fff',
              }}>{`Cách xa ${PROFILE.distance}km`}</Text>
            <Icon
              name="location-sharp"
              style={{
                ...styles.profileDetailItem,
                fontSize: 18,
                color: '#ff7f50',
                marginLeft: 0,
              }}
            />
          </View>
        </View>
        <View style={styles.profileOptions}>
          <TouchableOpacity>
            <View style={{...styles.profileOptionItem, borderColor: '#ffbf00'}}>
              <AwesomeIcon name="redo" size={24} color="#E7BA64" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{...styles.profileOptionItem, borderColor: '#fa5f55'}}>
              <AwesomeExtraIcon name="close" size={30} color="#fa5f55" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{...styles.profileOptionItem, borderColor: '#00bfff'}}>
              <AwesomeExtraIcon name="star" size={24} color="#00bfff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{...styles.profileOptionItem, borderColor: '#40b5ad'}}>
              <AwesomeExtraIcon name="heart" size={24} color="#40b5ad" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    // backgroundColor: '#fff',
    backgroundColor: '#FF6868',
    justifyContent: 'center',
    // alignItems:'center'
  },
  btnClose: {
    width: 30,
    height: 30,
    color: '#fff',
  },

  options: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  optionIcon: {
    marginLeft: 15,
  },
  profile: {
    marginHorizontal: 20,
    marginTop: 10,
    height: '75%',
    borderRadius: 10,
  },
  slider: {
    position: 'absolute',
    bottom: '97%',
    zIndex: 100,
    height: 8,
    flexDirection: 'row',
  },
  sliderItem: {
    height: '100%',
    width: '18%',
    marginHorizontal: '1%',
    backgroundColor: 'rgba(255,255,255, .6)',
    borderRadius: 10,
  },
  profileImage: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  profileInfo: {
    position: 'absolute',
    bottom: 75,
    left: 10,
    right: 10,
  },
  profileDesc: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  profileDetailItem: {
    marginRight: 10,
    fontSize: 30,
    color: '#fff',
  },
  profileOptions: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileOptionItem: {
    height: 50,
    width: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default Tendency;
