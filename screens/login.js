import React,{useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,

} from 'react-native';

const login = () => {
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.imgbackground}
          source={require('../sources/images/dating-App.png')}
        />
        <Text style={styles.txthead}>Welcome to Honeyaa</Text>
      </View>
      <View>
        <TextInput style={styles.phone} placeholder="Phone" />
      </View>
      <View style={styles.passcontainer}>
        <TextInput style={styles.password} placeholder="Password" />
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require('../sources/icons/eye.png')}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 22,
        }}>
       
        <Text style={styles.txtRemember}>Remember me</Text>
        <Text style={styles.txtForgotPass}>Forgot password?</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.btnlogin}>
          <Text style={styles.txtbtn}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signUpContainer}>
        <Text style={styles.txt1}>You don’t have any account?</Text>
        <TouchableOpacity>
          <Text style={styles.txt2}>Create new here</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.txtline}> ──────── OR ────────</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.btnloginFb}>
          <Text style={styles.txtbtn}>Login with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnloginGg}>
          <Text style={styles.txtbtn}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  txthead: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#000000',
    textAlign: 'center',
    marginHorizontal: 33,
  },
  imgbackground: {
    width: 327,
    height: 300,
    marginHorizontal: 33,
  },
  phone: {
    width: 346,
    height: 46,
    borderRadius: 10,
    marginHorizontal: 19,
    padding: 10,
    borderWidth: 1,
    borderColor: '#767676',
    marginBottom: 20,
    marginTop: 20,
  },
  passcontainer: {
    flexDirection: 'row',
    width: 346,
    height: 46,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#767676',
    alignItems: 'center',
  },
  password: {
    flex: 1,
    paddingHorizontal: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  btnlogin: {
    backgroundColor: '#503EBF',
    width: 326,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 30,
  },
  checkbox: {
    alignSelf: 'center',
  },
  txtRemember: {
    fontFamily: 'Overpass',
    fontSize: 14,
    fontWeight: 300,
    color: '#000000',
  },
  txtForgotPass: {
    fontFamily: 'Overpass',
    fontSize: 14,
    fontWeight: 300,
    marginLeft: 70,
    color: '#B74545',
  },
  btnloginGg: {
    backgroundColor: '#FC9E9E',
    width: 350,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 30,
  },
  btnloginFb: {
    backgroundColor: '#2190F7',
    width: 350,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 30,
  },
  txtbtn: {
    fontSize: 18,
    fontWeight: 500,
    fontFamily: 'Poppins',
    color: '#fff',
  },
  txt1: {
    marginTop: 15,
    fontFamily: 'Overpass',
    fontSize: 13,
    color: '#8C8C8C',
  },
  txt2: {
    marginTop: 15,
    fontFamily: 'Overpass',
    fontSize: 13,
    color: '#503EBF',
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
  },
  txtline: {
    marginTop: 15,
    color: '#959595',
  },
});

export default login;
