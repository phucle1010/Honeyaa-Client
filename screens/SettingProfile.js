import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import AwesomeExtraIcon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';

const SettingProfile = () => {
  const [sliderAgeValue, setSliderAgeValue] = useState(18);
  const [sliderDistanceValue, setSliderDistanceValue] = useState(1);
  const [active, setActive] = useState(false);
  const toggleActive = value => {
    //onValueChange of the switch this function will be called
    setActive(value);
    //state changes according to switch
    //which will result in re-render the text
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity>
            <Image
              source={require('../assets/img/arrowcircleleft2.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Image
            source={require('../assets/img/HoneyaaLogo.png')}
            style={styles.logo}
          />
        </View>
        {/* <TouchableOpacity>
          
        </TouchableOpacity> */}

        <Text style={styles.txtHeader}>Setting Profile</Text>
      </View>
      <View style={styles.wrapItem}>
        <View style={{flexDirection: 'row', marginBottom: 8}}>
          <Text style={styles.txtWrap}>Age:</Text>
          <Text style={styles.txtWrap}>{sliderAgeValue}</Text>
        </View>

        <Slider
          maximumValue={100}
          minimumValue={0}
          minimumTrackTintColor="#307ecc"
          maximumTrackTintColor="#000000"
          step={1}
          value={sliderAgeValue}
          onValueChange={sliderAgeValue => setSliderAgeValue(sliderAgeValue)}
        />
      </View>
      <View style={styles.wrapItem}>
        <View style={{flexDirection: 'row', marginBottom: 8}}>
          <Text style={styles.txtWrap}>Distance:</Text>
          <Text style={styles.txtWrap}>{sliderDistanceValue}</Text>
          <Text style={styles.txtWrap}>km</Text>
        </View>

        <Slider
          maximumValue={100}
          minimumValue={0}
          minimumTrackTintColor="#307ecc"
          maximumTrackTintColor="#000000"
          step={1}
          value={sliderDistanceValue}
          onValueChange={sliderDistanceValue =>
            setSliderDistanceValue(sliderDistanceValue)
          }
        />
      </View>
      <View style={styles.wrapItem}>
        <View
          style={{flexDirection: 'row', marginBottom: 8, alignItems: 'center'}}>
          <Text style={[styles.txtWrap, {marginTop: 20}]}>Active Status</Text>
          <Text style={[styles.txtWrap, {marginTop: 20, marginLeft: 60}]}>
            ON
          </Text>
          <Switch
            style={{marginTop: 30, marginLeft: 20}}
            onValueChange={toggleActive}
            value={active}
          />
          <Text style={[styles.txtWrap, {marginTop: 20}]}>OFF</Text>
        </View>
      </View>
      <View style={[styles.wrapItem, {height: 106}]}>
        <Text style={[styles.txtWrap, {marginTop: 10}]}>Password</Text>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.txtbtn}>Change</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.btn, {backgroundColor: '#EF9797'}]}>
        <Text style={styles.txtbtn}>Look Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    //justifyContent: 'center',
    // height: '100%',
    backgroundColor: '#fff',
    flex: 1,
  },
  logo: {
    marginTop: -35,
    height: 200,
    width: 156,
  },

  txtHeader: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    color: '#575757',
    fontSize: 20,
    position: 'absolute',
    paddingTop: 120,
    alignSelf: 'center',
  },
  wrapItem: {
    width: 346,
    height: 85,
    borderRadius: 20,
    elevation: 2,
    marginBottom: 32,
    //alignItems:'center'
  },
  txtWrap: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 16,
    color: '#626262',
    paddingLeft: 15,
    paddingTop: 9,
  },
  btn: {
    marginTop: 10,
    height: 40,
    width: 330,
    marginHorizontal: 5,
    borderRadius: 25,
    backgroundColor: '#503EBF',
    alignContent: 'center',
    justifyContent: 'center',
  },
  txtbtn: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: 400,
    alignSelf: 'center',
    color: '#FFFFFF',
  },
  icon: {
    marginLeft: -80,
    marginTop: 20,
    width: 24,
    height: 24,
  },
  //   wrapImg: {
  //     width: 170,
  //     height: 170,
  //     alignItems: 'center',
  //     borderRadius: 100,
  //     borderWidth: 3,
  //     borderColor: '#EF9797',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     marginTop: 30,
  //   },
  //   img: {
  //     width: 150,
  //     height: 150,
  //     borderRadius: 100,
  //   },
  //   DetailInfo: {
  //     flexDirection: 'row',
  //     alignContent: 'center',
  //     justifyContent: 'center',
  //     marginTop: 5,
  //   },
  //   txtName: {
  //     fontFamily: 'Overpass',
  //     fontWeight: 400,
  //     fontSize: 28,
  //     color: '#575757',
  //   },
  //   txtAge: {
  //     fontFamily: 'Overpass',
  //     fontWeight: 400,
  //     fontSize: 24,
  //     color: '#575757',
  //     marginLeft: 5,
  //     marginRight: 5,
  //     paddingTop: 6,
  //   },
  //   icon: {
  //     marginLeft: 10,
  //     alignContent: 'center',
  //     justifyContent: 'center',
  //   },
  //   btnSettings: {
  //     marginTop: 30,
  //     height: 45,
  //     width: 346,
  //     marginHorizontal: 22,
  //     borderRadius: 25,
  //     backgroundColor: '#EF9797',
  //     alignContent: 'center',
  //     justifyContent: 'center',
  //   },
  //   txtSettings: {
  //     fontFamily: 'Poppins',
  //     fontSize: 18,
  //     fontWeight: 400,
  //     alignSelf: 'center',
  //     color: '#FFFFFF',
  //   },
  //   btnLogOut: {
  //     marginTop: 30,
  //     height: 45,
  //     width: 346,
  //     marginHorizontal: 22,
  //     borderRadius: 25,
  //     backgroundColor: '#F0F0F0',
  //     alignContent: 'center',
  //     justifyContent: 'center',
  //   },
  //   txtLogOut: {
  //     fontFamily: 'Poppins',
  //     fontSize: 18,
  //     fontWeight: 400,
  //     alignSelf: 'center',
  //     color: '#848484',
  //   },
});

export default SettingProfile;
