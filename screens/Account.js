import React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AwesomeExtraIcon from 'react-native-vector-icons/FontAwesome';

const Account = ({ navigation, route }) => {
  const myAccount = {
    id: 1,
    name: 'Than Báo',
    age: 20,
    status: 'Hoạt động gầnn đây',
    distance: 1,
    gender: 'Nữ',
    img: [
      {
        id: 1,
        url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/299c36a8-6b55-41b8-89ba-a2a33c7a18a6/df06ey6-c0a0faa5-cd5c-488e-a29a-72b3768979af.jpg/v1/fill/w_623,h_1282,q_70,strp/hd_wallpaper_cute_anime_girl_pink_kawaii_by_callmehlexie_df06ey6-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTY0NCIsInBhdGgiOiJcL2ZcLzI5OWMzNmE4LTZiNTUtNDFiOC04OWJhLWEyYTMzYzdhMThhNlwvZGYwNmV5Ni1jMGEwZmFhNS1jZDVjLTQ4OGUtYTI5YS03MmIzNzY4OTc5YWYuanBnIiwid2lkdGgiOiI8PTgwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.XYQFdLwg6tv24B-YgZtCePSEWZW9jCjJimF5tMBDUMQ',
      },
    ],
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require('../assets/img/HoneyaaLogo.png')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.txt}>My Account </Text>
      {/* <View>
        <AwesomeExtraIcon name="check-circle" size={20} color="#0d98ba" />
      </View> */}
      <View style={styles.wrapImg}>
        <Image
          source={{
            uri: myAccount.img[0].url,
          }}
          style={styles.img}
        />
      </View>
      <View style={styles.DetailInfo}>
        <Text style={styles.txtName}> {myAccount.name}</Text>
        <Text style={styles.txtAge}> {myAccount.age}</Text>
        <View style={styles.icon}>
          <AwesomeExtraIcon name="check-circle" size={20} color="#2F88FF" />
        </View>
        <TouchableOpacity onPress = {()=>navigation.navigate('ProfileScreen')} style={styles.icon}>
          <AwesomeExtraIcon name="pencil" size={20} color="#3DA686" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
      onPressIn={() => navigation.navigate('SettingProfile')}>
        <View style={styles.btnSettings}>
          <Text style={styles.txtSettings}>Settings</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.btnLogOut}>
          <Text style={styles.txtLogOut}>Log Out</Text>
        </View>
      </TouchableOpacity>
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
    height: 201,
    width: 156,
  },
  txt: {
    //height: '50%',
    width: '100%',
    fontFamily: 'Poppins',
    fontWeight: 400,
    color: '#666666',
    fontSize: 18,
    marginLeft: 30,
  },

  wrapImg: {
    width: 170,
    height: 170,
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#EF9797',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  DetailInfo: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  txtName: {
    fontFamily: 'Overpass',
    fontWeight: 400,
    fontSize: 28,
    color: '#575757',
  },
  txtAge: {
    fontFamily: 'Overpass',
    fontWeight: 400,
    fontSize: 24,
    color: '#575757',
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 6,
  },
  icon: {
    marginLeft: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  btnSettings: {
    marginTop: 30,
    height: 45,
    width: 346,
    marginHorizontal: 22,
    borderRadius: 25,
    backgroundColor: '#EF9797',
    alignContent: 'center',
    justifyContent: 'center',
  },
  txtSettings: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: 400,
    alignSelf: 'center',
    color: '#FFFFFF',
  },
  btnLogOut: {
    marginTop: 30,
    height: 45,
    width: 346,
    marginHorizontal: 22,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    alignContent: 'center',
    justifyContent: 'center',
  },
  txtLogOut: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: 400,
    alignSelf: 'center',
    color: '#848484',
  },
});

export default Account;
