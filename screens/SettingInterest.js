import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
const API_URI = 'http://192.168.0.134:8080';


const createFormData = (photo, body = {}) => {
    const data = new FormData();
  
    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
  
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
  
    return data;
};

const SettingInterest = ({navigation, route}) => {

    const [selectedInterests, setSelectedInterests] = useState([]);
    const {phone, pass, name, birthday, photo, photo1, gender, obgender} = route.params;

    const handleGoBack = () => {
        navigation.goBack();
    }

    const selectInterest = (interest) => {
        const index = selectedInterests.indexOf(interest);
        if (index === -1) {
            setSelectedInterests([...selectedInterests, interest]);
        } else {
            const newInterests = [...selectedInterests];
            newInterests.splice(index, 1);
            setSelectedInterests(newInterests);
        }
    };

    const isInterestSelected = (interest) => {
        return selectedInterests.includes(interest);
    };

    const handleFinish = () => {
        console.log({phone, pass, name, birthday, photo, photo1, gender, obgender, interests: selectedInterests});
        axios
            .post(`${API_URI}/signup`, {phone, pass, name, birthday, photo, photo1, gender, obgender, interests: selectedInterests})
            .then((res) => console.log('Sign up successful'))
            .catch((err) => console.log(err));
    }


  return (
    <SafeAreaView style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity style={{width: 24, height: 24} } onPress={() => handleGoBack()}>
                <Icon name='arrow-left' style={{color: '#8B7ED7'}} size={24}  />
            </TouchableOpacity>
            <Text style={{ color: '#B2B2B2', width: 256, height: 21, textAlign: "center", marginLeft: 66-24-22, marginRight: 66-22}}>step 6 of 6</Text>
        </View>
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>Your interests?</Text>
            <View style={styles.listInterest}>
                <TouchableOpacity
                    style={[
                        styles.itemInterest,
                        isInterestSelected("Travel") && styles.selectedInterest,
                    ]}
                    onPress={() => selectInterest("Travel")}
                >
                    <Text>Travel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.itemInterest,
                        isInterestSelected("Sing") && styles.selectedInterest,
                    ]}
                    onPress={() => selectInterest("Sing")}
                >
                    <Text>Sing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.itemInterest,
                        isInterestSelected("Art") && styles.selectedInterest,
                    ]}
                    onPress={() => selectInterest("Art")}
                >
                    <Text>Art</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listInterest}>
                <TouchableOpacity
                    style={[
                        styles.itemInterest,
                        isInterestSelected("Cook") && styles.selectedInterest,
                    ]}
                    onPress={() => selectInterest("Cook")}
                >
                    <Text>Cook</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.itemInterest,
                        isInterestSelected("Eat") && styles.selectedInterest,
                    ]}
                    onPress={() => selectInterest("Eat")}
                >
                    <Text>Eat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.itemInterest,
                        isInterestSelected("Music") && styles.selectedInterest,
                    ]}
                    onPress={() => selectInterest("Music")}
                >
                    <Text>Music</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
            <TouchableOpacity style={styles.btn} onPress={() => handleFinish()}>
                <Text style={{ color: "#FFFFFF" }}>Finish</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
    backgroundColor: "#FFFFFF",
    padding: 74,
  },
  title: {
    fontSize: 30,
    color: "#000000",
    fontWeight: "bold",
    marginRight: 87,
    paddingBottom: 15,
  },
  listInterest: {
    flexDirection: "row-reverse",
  },
  itemInterest: {
    height: 46,
    width: 116,
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 100,
    padding: 5,
    margin: 5,
    borderColor: '#E8E8E8',
  },
  selectedInterest: {
    borderColor: "#8B7ED7",
    borderWidth: 3,
  },
  btn: {
    height: 46,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#503EBF",
    marginTop: 60,
  },
});

export default SettingInterest;