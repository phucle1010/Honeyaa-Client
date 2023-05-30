import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
    View,
    FlatList,
    Modal,
    Image,
    ToastAndroid,
    ScrollView,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Pressable,
    TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import MyBasicItem from '../components/MyBasicItem';
import {
    languageData,
    zodiacData,
    educationData,
    socialNetworkData,
    petData,
    musicData,
    physicalData,
} from '../src/constant/Data';

const { width, height } = Dimensions.get('window');
import Loading from '../components/Loading';

const API_URL = 'http://192.168.1.186:8080';

const ImageFrameItem = ({ ...props }) => {
    const indexOfImage = props.item.index;
    const setPhotos = props.setPhotos;
    const setRemoveId = props.setRemoveId;
    const setRemoveIndex = props.setRemoveIndex;
    const [photoData, setPhotoData] = useState(props.item.item);
    const [choseClicked, setChoseClicked] = useState(false);

    useEffect(() => {
        if (choseClicked) {
            setPhotos((prev) => {
                const newImages = [...prev];
                newImages.splice(indexOfImage, 1, photoData);
                return newImages;
            });
        }
    }, [choseClicked]);

    const handleChoosePhoto = () => {
        if (photoData.image === '') {
            launchImageLibrary({ noData: true }, (response) => {
                if (response) {
                    if (!response.didCancel) {
                        setPhotoData((prev) => {
                            return {
                                ...prev,
                                image: response.assets[0].uri,
                            };
                        });
                        setChoseClicked(true);
                    }
                }
            });
        }
    };

    const handleRemoveImage = () => {
        Alert.alert('Notice', 'Are you sure to remove this photo?', [
            {
                text: 'Yes',
                onPress: () => {
                    if (photoData.id !== null) {
                        setRemoveId(photoData.id);
                    } else {
                        setRemoveIndex(indexOfImage);
                    }
                },
            },
            {
                text: 'No',
            },
        ]);
    };

    return (
        <TouchableOpacity style={styles.imageFrame} onPress={handleChoosePhoto}>
            {photoData.image !== '' ? (
                <React.Fragment>
                    <Image
                        source={{ uri: photoData.image }}
                        style={{ width: '100%', height: '100%', borderRadius: 25 }}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            width: 30,
                            height: 30,
                            borderRadius: 50,
                            backgroundColor: '#fff',
                            elevation: 4,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={handleRemoveImage}
                    >
                        <Icon name="close" color="#FF6868" size={25} />
                    </TouchableOpacity>
                </React.Fragment>
            ) : (
                <Icon name="add-outline" size={79} style={styles.iconAddImage} />
            )}
        </TouchableOpacity>
    );
};

const EditProfileScreen = (props) => {
    const currentUser = useSelector((state) => state.user);
    const [photos, setPhotos] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const [removeIndex, setRemoveIndex] = useState(null);
    const [data, setData] = useState([]);
    const [listInterest, setListInterest] = useState([]);
    const [zodiac, setZodiac] = useState('');
    const [education, setEducation] = useState('');
    const [language, setLanguage] = useState('');
    const [socialNetwork, setSocialNetwork] = useState('');
    const [physicalExercise, setPhysicalExercise] = useState('');
    const [pet, setPet] = useState('');
    const [music, setMusic] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [favoriteItems, setFavoriteItems] = useState([]);
    const favoriteName = favoriteItems.map((i) => i.name);
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [wards, setWards] = useState([]);
    const [showModalAddress, setShowModalAddress] = useState(false);
    const [showModalSex, setShowModalSex] = useState(false);
    const [showModalSexOriented, setShowModalSexOriented] = useState(false);
    const [showModalRelationshipOriented, setShowModalRelationshipOriented] = useState(false);
    const [provinceCode, setProvinceCode] = useState();
    const [districtCode, setDistrictCode] = useState();
    const [wardCode, setWardCode] = useState();
    const [provinceName, setProvinceName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [wardName, setWardName] = useState('');
    const [pickerFocused, setPickerFocused] = useState(false);
    const [address, setAdress] = useState('');
    const [sex, setSex] = useState('');
    const [sexOriented, setSexOriented] = useState('');
    const [about, setAbout] = useState('');
    const [relationshipOriented, setRelationshipOriented] = useState('');
    const [relationshipOrientedId, setRelationshipOrientedId] = useState(null);
    const [listRelationshipOriented, setListRelationshipOriented] = useState([]);
    const bottomSheetModalRef = useRef(null);
    const scrollViewRef = useRef(null);
    const snapPoints = ['35%', '75%', '100%'];

    const getImageListOfUser = async () => {
        await axios
            .get(`${API_URL}/api/user/profile/img/all`, {
                params: {
                    user_id: currentUser.id,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 400) {
                    Alert.alert('Error', err.toString());
                } else {
                    setPhotos(res.data.responseData);
                }
            })
            .catch((err) => Alert.alert('Error', err.toString()));
    };

    useEffect(() => {
        getImageListOfUser();
        getProfileData();
        getMyInterestData();
        setLoaded(true);
    }, []);

    const getProfileData = async () => {
        await axios
            .get(`${API_URL}/api/user/profile/${currentUser.id}`)
            .then((response) => {
                setData(response.data);
                setZodiac(response.data[0]?.zodiac);
                setEducation(response.data[0]?.education);
                setLanguage(response.data[0]?.language);
                setSocialNetwork(response.data[0]?.social_network);
                setPhysicalExercise(response.data[0]?.physical);
                setPet(response.data[0]?.pet);
                setMusic(response.data[0]?.music);
                setAdress(response.data[0]?.address);
                setSex(response.data[0]?.sex);
                setAbout(response.data[0]?.about_me);
                setSexOriented(response.data[0]?.sex_oriented);
                setRelationshipOriented(response.data[0]?.relationship_oriented);
                setRelationshipOrientedId(response.data[0]?.relationship_oriented_id);
            })
            .catch((error) => {
                console.log('lỗi:', error);
            });
    };

    // useEffect(() => {
    //     if (isOpen) {
    //         getProfileData();
    //     }
    // }, [isOpen]);

    const handleGetInterestList = () => {
        axios
            .get(`${API_URL}/api/user/interest`)
            .then((response) => {
                setListInterest(response.data);
            })
            .catch((error) => {
                console.log('lỗi:', error);
            });
    };

    const handleToggleFavorite = (item) => {
        const isFavorite = favoriteItems.map((i) => i.id).includes(item.id);
        if (isFavorite) {
            const updatedFavorites = favoriteItems.filter((favItem) => favItem.id !== item.id);
            setFavoriteItems(updatedFavorites);
        } else if (favoriteItems.length >= 3) {
            Alert.alert('Your choice is maximum');
        } else {
            const updatedFavorites = [...favoriteItems, item];
            setFavoriteItems(updatedFavorites);
        }
    };

    const getMyInterestData = async () => {
        await axios
            .get(`${API_URL}/api/user/myInterest/${currentUser.id}`)
            .then((response) => {
                const updatedFavorites = [];
                response.data.map((i) => updatedFavorites.push(i));
                setFavoriteItems(updatedFavorites);
            })
            .catch((error) => {
                console.log('lỗi:', error.message);
            });
    };

    useEffect(() => {
        if (showModal) {
            getMyInterestData();
        }
    }, [showModal]);

    const handleUpdateMyInterest = async () => {
        const favoriteItemsId = favoriteItems.map((i) => i.id);
        await axios
            .post(`${API_URL}/api/user/myInterest/${data[0].person_id}/${favoriteItemsId}`)
            .then((response) => {
                setShowModal(false);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleUpdateMyBasic = async () => {
        await axios
            .put(`${API_URL}/api/user/myBasic/${data[0].my_basics_id}`, {
                zodiac,
                education,
                language,
                socialNetwork,
                physicalExercise,
                pet,
                music,
            })
            .then((response) => {
                handleDismissModal();
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleUpdateProfile = async () => {
        await axios
            .put(`${API_URL}/api/user/profile/${data[0].person_id}`, {
                about,
                address,
                sex,
                sexOriented,
                relationshipOrientedId,
            })
            .then((response) => {})
            .catch((error) => {
                console.log(error);
            });
    };

    const handleUploadImage = () => {
        const insertPhotos = photos.filter((photo) => photo.id === null && photo.image !== '');

        const postImageItem = async (photo) => {
            await axios
                .post(`${API_URL}/api/user/profile/img/post`, {
                    insertPhoto: photo,
                    person_id: currentUser.id,
                })
                .then((res) => {
                    if (res.data.statusCode === 400) {
                        Alert.alert('Error', res.data.responseData);
                    }
                })
                .catch((err) => Alert.alert('Error', err.toString()));
        };

        const postImage = (insertPhotos) => {
            const lengthOfInsertPhotos = insertPhotos.length;

            if (lengthOfInsertPhotos > 0) {
                for (let i = 0; i < lengthOfInsertPhotos; i++) {
                    postImageItem(insertPhotos[i]);
                }
            }
        };

        postImage(insertPhotos);
    };

    const removeImage = async () => {
        await axios
            .delete(`${API_URL}/api/user/profile/img/delete`, {
                params: {
                    id: removeId,
                    person_id: currentUser.id,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 400) {
                    Alert.alert('Error', res.data.responseData);
                } else {
                    Alert.alert('Success', res.data.responseData);
                    setRemoveId(null);
                    getImageListOfUser();
                }
            })
            .catch((err) => Alert.alert('Error', err.toString()));
    };

    useEffect(() => {
        if (removeId !== null) {
            removeImage();
        }
    }, [removeId]);

    useEffect(() => {
        if (removeIndex !== null) {
            setPhotos((prev) => {
                const newImages = [...prev];
                newImages.splice(removeIndex, 1);
                return newImages;
            });
            Alert.alert('Success', 'Remove photo successfully');
            setRemoveIndex(null);
            getImageListOfUser();
        }
    }, [removeIndex]);

    const handlePresentModal = useCallback((y) => {
        bottomSheetModalRef.current?.present();
        setTimeout(() => {
            bottomSheetModalRef.current?.snapToIndex(2);
            scrollViewRef.current?.scrollTo({ y: y, animated: true });
            setIsOpen(true);
        }, 600);
    }, []);

    function handleDismissModal() {
        bottomSheetModalRef.current.dismiss();
        setTimeout(() => {
            setIsOpen(false);
        }, 100);
    }

    const getProvince = () => {
        axios
            .get('https://provinces.open-api.vn/api/?depth=1')
            .then((response) => {
                setProvince(response.data);
            })
            .catch((error) => {
                console.log('lỗi:', error);
            });
    };

    const getDistrict = () => {
        if (provinceCode) {
            axios
                .get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
                .then((response) => setDistrict(response.data.districts))
                .catch((error) => {
                    console.log('lỗi:', error);
                });
        }
    };
    const getWard = () => {
        if (districtCode) {
            axios
                .get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
                .then((response) => setWards(response.data.wards))
                .catch((error) => {
                    console.log('lỗi:', error);
                });
        }
    };

    useEffect(() => {
        if (provinceCode && districtCode && wardCode) {
            const pvname = province.filter((item) => item.code === provinceCode);
            setProvinceName(pvname[0].name);
            const dtname = district.filter((item) => item.code === districtCode);
            setDistrictName(dtname[0].name);
            const wname = wards.filter((item) => item.code === wardCode);
            setWardName(wname[0].name);
        }
    }, [provinceCode, districtCode, wardCode]);

    useEffect(() => {
        if (provinceName && districtName && wardName) {
            setAdress(wardName + ', ' + districtName + ', ' + provinceName);
        }
    }, [wardName]);

    const handleSubmit = () => {
        if (provinceCode && districtCode && wardCode) {
            setShowModalAddress(false);
            handleUpdateProfile();
        } else {
            Alert.alert('Please complete all information');
        }
    };

    const handleGetRelationshipOriented = () => {
        axios
            .get(`${API_URL}/api/user/relationship_oriented`)
            .then((response) => {
                setListRelationshipOriented(response.data);
                setShowModalRelationshipOriented(true);
            })
            .catch((error) => {
                console.log('lỗi:', error);
            });
    };

    const handleSnapPress = useCallback((index) => {
        bottomSheetModalRef.current?.snapToIndex(index);
    }, []);

    const handleSaveProfile = () => {
        handleUploadImage();
        Alert.alert('Success', 'You saved these changes successfully');
        getImageListOfUser();
        getProfileData();
        getMyInterestData();
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {loaded ? (
                <BottomSheetModalProvider>
                    <View
                        pointerEvents={isOpen ? 'box-only' : 'auto'}
                        onTouchEnd={handleDismissModal}
                        style={[styles.container0, { backgroundColor: isOpen ? 'gray' : 'white' }]}
                    >
                        <View style={[styles.container0, { backgroundColor: isOpen ? 'gray' : 'white' }]}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {photos.length > 0 && (
                                    <FlatList
                                        data={photos}
                                        renderItem={(item) => (
                                            <ImageFrameItem
                                                item={item}
                                                setPhotos={setPhotos}
                                                photos={photos}
                                                setRemoveId={setRemoveId}
                                                setRemoveIndex={setRemoveIndex}
                                            />
                                        )}
                                        // keyExtractor={(item) => item.id}
                                        numColumns={2}
                                        scrollEnabled={false}
                                    />
                                )}
                                <View style={styles.profile}>
                                    <Text style={styles.titleText}>About me</Text>
                                    <View style={{ height: 44 }}>
                                        <TextInput
                                            value={about}
                                            onChangeText={(i) => setAbout(i)}
                                            onBlur={handleUpdateProfile}
                                            style={[styles.textInput, { backgroundColor: isOpen ? 'gray' : '#FFFFFF' }]}
                                            placeholder={'Introduce yourself...'}
                                            placeholderTextColor={'#B2B2B2'}
                                        />
                                    </View>
                                </View>
                                <View style={styles.profile}>
                                    <Text style={styles.titleText}>My basics</Text>
                                    <MyBasicItem
                                        onPress={() => handlePresentModal(0)}
                                        icon={'moon-outline'}
                                        name={'Zodiac'}
                                        value={zodiac ? zodiac : 'Add'}
                                    />
                                    <MyBasicItem
                                        onPress={() => handlePresentModal(200)}
                                        icon={'school-outline'}
                                        name={'Education'}
                                        value={education ? education : 'Add'}
                                    />
                                    <MyBasicItem
                                        onPress={() => handlePresentModal(400)}
                                        icon={'language-outline'}
                                        name={'Language'}
                                        value={language ? language : 'Add'}
                                    />
                                    <MyBasicItem
                                        onPress={() => handlePresentModal(600)}
                                        icon={'logo-facebook'}
                                        name={'Social Network'}
                                        value={socialNetwork ? socialNetwork : 'Add'}
                                    />
                                    <MyBasicItem
                                        onPress={() => handlePresentModal(800)}
                                        icon={'barbell-outline'}
                                        name={'Physical Exercise'}
                                        value={physicalExercise ? physicalExercise : 'Add'}
                                    />
                                    <MyBasicItem
                                        onPress={() => handlePresentModal(910)}
                                        icon={'paw-outline'}
                                        name={'Pet'}
                                        value={pet ? pet : 'Add'}
                                    />
                                    <MyBasicItem
                                        onPress={() => handlePresentModal(910)}
                                        icon={'musical-note-outline'}
                                        name={'Music'}
                                        value={music ? music : 'Add'}
                                    />
                                </View>
                                <View style={styles.profile}>
                                    <Text style={styles.titleText}>My interests</Text>
                                    <View>
                                        <TouchableWithoutFeedback
                                            onPress={() => {
                                                handleGetInterestList();
                                                setShowModal(true);
                                            }}
                                        >
                                            <View style={{ height: 44 }}>
                                                <TextInput
                                                    editable={false}
                                                    value={favoriteName.join(', ')}
                                                    style={[
                                                        styles.textInput,
                                                        { backgroundColor: isOpen ? 'gray' : '#FFFFFF' },
                                                    ]}
                                                    placeholder={'Interest'}
                                                    placeholderTextColor={'#B2B2B2'}
                                                />
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <Text
                                            style={[
                                                styles.text,
                                                { position: 'absolute', top: 12, right: 23, zIndex: 1 },
                                            ]}
                                        >
                                            Add
                                        </Text>
                                        <Icon name="chevron-forward-outline" size={15} style={styles.iconInput} />
                                    </View>
                                </View>
                                <View style={styles.profile}>
                                    <Text style={styles.titleText}>My address</Text>
                                    <TouchableWithoutFeedback onPress={() => setShowModalAddress(true)}>
                                        <View style={{ height: 44 }}>
                                            <TextInput
                                                multiline
                                                numberOfLines={2}
                                                value={address}
                                                style={[
                                                    styles.textInput,
                                                    { height: 60, backgroundColor: isOpen ? 'gray' : '#FFFFFF' },
                                                ]}
                                                editable={false}
                                            />
                                            <Icon
                                                name="chevron-forward-outline"
                                                size={15}
                                                style={[styles.iconInput, { top: 22 }]}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={[styles.profile]}>
                                    <Text style={[styles.titleText]}>Sex</Text>
                                    <TouchableWithoutFeedback onPress={() => setShowModalSex(true)}>
                                        <View style={{ height: 44 }}>
                                            <TextInput
                                                value={sex === 1 ? 'Male' : sex === 0 ? 'Female' : 'Others'}
                                                style={[
                                                    styles.textInput,
                                                    { backgroundColor: isOpen ? 'gray' : '#FFFFFF' },
                                                ]}
                                                editable={false}
                                                onPressOut={() => Alert.alert('hello')}
                                                placeholder={'Gender'}
                                                placeholderTextColor={'#B2B2B2'}
                                            />
                                            <Icon name="chevron-forward-outline" size={15} style={styles.iconInput} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.profile}>
                                    <Text style={styles.titleText}>Sex oriented</Text>
                                    <TouchableWithoutFeedback onPress={() => setShowModalSexOriented(true)}>
                                        <View style={{ height: 44 }}>
                                            <TextInput
                                                value={sexOriented === 1 ? 'Male' : sex === 0 ? 'Female' : 'Others'}
                                                style={[
                                                    styles.textInput,
                                                    { backgroundColor: isOpen ? 'gray' : '#FFFFFF' },
                                                ]}
                                                editable={false}
                                                onPressOut={() => Alert.alert('hello')}
                                                placeholder={'Tendency'}
                                                placeholderTextColor={'#B2B2B2'}
                                            />
                                            <Icon name="chevron-forward-outline" size={15} style={styles.iconInput} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.profile}>
                                    <Text style={styles.titleText}>Relationship oriented</Text>
                                    <TouchableWithoutFeedback onPress={handleGetRelationshipOriented}>
                                        <View style={{ height: 44 }}>
                                            <TextInput
                                                value={relationshipOriented}
                                                style={[
                                                    styles.textInput,
                                                    { backgroundColor: isOpen ? 'gray' : '#FFFFFF' },
                                                ]}
                                                editable={false}
                                                onPressOut={() => Alert.alert('hello')}
                                                placeholder={'Relationship'}
                                                placeholderTextColor={'#B2B2B2'}
                                            />
                                            <Icon name="chevron-forward-outline" size={15} style={styles.iconInput} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <TouchableOpacity onPress={handleSaveProfile} style={styles.btn}>
                                    <Text style={styles.btnText}>Save profile</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                        <BottomSheetModal
                            ref={bottomSheetModalRef}
                            index={1}
                            snapPoints={snapPoints}
                            backgroundStyle={{ borderRadius: 20 }}
                            onDismiss={() => setIsOpen(false)}
                            onPressOut={handleDismissModal}
                        >
                            <BottomSheetScrollView
                                keyboardDismissMode="on-drag"
                                keyboardShouldPersistTaps="never"
                                ref={scrollViewRef}
                            >
                                <View style={styles.contentContainer}>
                                    <View
                                        style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <TouchableOpacity onPress={handleDismissModal}>
                                            <Icon name={'close-outline'} size={30} style={styles.iconBasic} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleUpdateMyBasic}>
                                            <Icon name={'checkmark-outline'} size={30} style={styles.iconBasic} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.title}>Basic information</Text>
                                    <Text style={styles.text0}>add more information so people see the best in you</Text>

                                    <View style={styles.myBasicRow}>
                                        <Icon name={'moon-outline'} size={24} style={styles.iconBasic} />
                                        <Text style={styles.subtitle}>What is your zodiac?</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {zodiacData.map((i) => (
                                            <Pressable
                                                onPress={() => setZodiac(i)}
                                                key={i}
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: i === zodiac ? '#FF6868' : '#000',
                                                    margin: 5,
                                                    borderRadius: 20,
                                                }}
                                            >
                                                <Text style={styles.text0}>{i}</Text>
                                            </Pressable>
                                        ))}
                                    </View>

                                    <View style={{ width: '100%', borderBottomWidth: 0.5, marginVertical: 15 }} />
                                    <View style={styles.myBasicRow}>
                                        <Icon name={'school-outline'} size={24} style={styles.iconBasic} />
                                        <Text style={styles.subtitle}>Your education level?</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {educationData.map((i) => (
                                            <Pressable
                                                onPress={() => setEducation(i)}
                                                key={i}
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: i === education ? '#FF6868' : '#000',
                                                    margin: 5,
                                                    borderRadius: 20,
                                                }}
                                            >
                                                <Text style={styles.text0}>{i}</Text>
                                            </Pressable>
                                        ))}
                                    </View>

                                    <View style={{ width: '100%', borderBottomWidth: 0.5, marginVertical: 15 }} />
                                    <View style={styles.myBasicRow}>
                                        <Icon name={'language-outline'} size={24} style={styles.iconBasic} />
                                        <Text style={styles.subtitle}>Your language?</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {languageData.map((i) => (
                                            <Pressable
                                                onPress={() => setLanguage(i)}
                                                key={i}
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: i === language ? '#FF6868' : '#000',
                                                    margin: 5,
                                                    borderRadius: 20,
                                                }}
                                            >
                                                <Text style={styles.text0}>{i}</Text>
                                            </Pressable>
                                        ))}
                                    </View>

                                    <View style={{ width: '100%', borderBottomWidth: 0.5, marginVertical: 15 }} />
                                    <View style={styles.myBasicRow}>
                                        <Icon name={'logo-facebook'} size={24} style={styles.iconBasic} />
                                        <Text style={styles.subtitle}>Social network?</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {socialNetworkData.map((i) => (
                                            <Pressable
                                                onPress={() => setSocialNetwork(i)}
                                                key={i}
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: i === socialNetwork ? '#FF6868' : '#000',
                                                    margin: 5,
                                                    borderRadius: 20,
                                                }}
                                            >
                                                <Text style={styles.text0}>{i}</Text>
                                            </Pressable>
                                        ))}
                                    </View>

                                    <View style={{ width: '100%', borderBottomWidth: 0.5, marginVertical: 15 }} />
                                    <View style={styles.myBasicRow}>
                                        <Icon name={'barbell-outline'} size={24} style={styles.iconBasic} />
                                        <Text style={styles.subtitle}>Physical Exercise?</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {physicalData.map((i) => (
                                            <Pressable
                                                onPress={() => setPhysicalExercise(i)}
                                                key={i}
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: i === physicalExercise ? '#FF6868' : '#000',
                                                    margin: 5,
                                                    borderRadius: 20,
                                                }}
                                            >
                                                <Text style={styles.text0}>{i}</Text>
                                            </Pressable>
                                        ))}
                                    </View>

                                    <View style={{ width: '100%', borderBottomWidth: 0.5, marginVertical: 15 }} />
                                    <View style={styles.myBasicRow}>
                                        <Icon name={'paw-outline'} size={24} style={styles.iconBasic} />
                                        <Text style={styles.subtitle}>Pet</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {petData.map((i) => (
                                            <Pressable
                                                onPress={() => setPet(i)}
                                                key={i}
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: i === pet ? '#FF6868' : '#000',
                                                    margin: 5,
                                                    borderRadius: 20,
                                                }}
                                            >
                                                <Text style={styles.text0}>{i}</Text>
                                            </Pressable>
                                        ))}
                                    </View>

                                    <View style={{ width: '100%', borderBottomWidth: 0.5, marginVertical: 15 }} />
                                    <View style={styles.myBasicRow}>
                                        <Icon name={'musical-note-outline'} size={24} style={styles.iconBasic} />
                                        <Text style={styles.subtitle}>Music</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {musicData.map((i) => (
                                            <Pressable
                                                onPress={() => setMusic(i)}
                                                key={i}
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: i === music ? '#FF6868' : '#000',
                                                    margin: 5,
                                                    borderRadius: 20,
                                                }}
                                            >
                                                <Text style={styles.text0}>{i}</Text>
                                            </Pressable>
                                        ))}
                                    </View>
                                    <View style={{ marginTop: 100 }} />
                                </View>
                            </BottomSheetScrollView>
                        </BottomSheetModal>
                        <Modal animationType="fade" transparent={true} visible={showModal}>
                            <View style={styles.modalContainer}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <View
                                            style={{
                                                width: '100%',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <TouchableOpacity
                                                style={{ color: '#FF6868' }}
                                                onPress={() => setShowModal(false)}
                                            >
                                                <Icon name="close-outline" size={30} style={{ color: '#FF6868' }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{ color: '#FF6868' }}
                                                onPress={handleUpdateMyInterest}
                                            >
                                                <Icon name="checkmark-outline" size={30} style={{ color: '#FF6868' }} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                color: '#000000',
                                                fontWeight: 'bold',
                                                marginBottom: 20,
                                            }}
                                        >
                                            Interests:
                                        </Text>
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                            {listInterest.map((i) => (
                                                <Pressable
                                                    onPress={() => handleToggleFavorite(i)}
                                                    key={i.id}
                                                    style={{
                                                        borderWidth: 1,
                                                        borderColor: favoriteItems
                                                            .map((item) => item.name)
                                                            .includes(i.name)
                                                            ? '#FF6868'
                                                            : '#000',
                                                        margin: 5,
                                                        borderRadius: 20,
                                                    }}
                                                >
                                                    <Text style={styles.text0}>{i.name}</Text>
                                                </Pressable>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <Modal animationType="fade" transparent={true} visible={showModalAddress}>
                            <View style={styles.modalContainer}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <TouchableOpacity
                                            onPress={() => setShowModalAddress(false)}
                                            style={{
                                                position: 'absolute',
                                                padding: 10,
                                                color: '#FF6868',
                                                top: 0,
                                                right: 0,
                                            }}
                                        >
                                            <Icon name="close-outline" size={30} style={{ color: '#FF6868' }} />
                                        </TouchableOpacity>

                                        <View style={{ color: '#333', width: '100%', marginVertical: 30 }}>
                                            <Text style={{ fontSize: 15, color: '#000000', marginVertical: 2 }}>
                                                Select province:
                                            </Text>
                                            <Picker
                                                dropdownIconColor={'#FF6868'}
                                                dropdownIconRippleColor={'#FF6868'}
                                                prompt="--Select province--"
                                                placeholder="--Select province--"
                                                placeholderStyle={{
                                                    color: 'grey',
                                                }}
                                                style={{ color: '#333', backgroundColor: '#ffff' }}
                                                onFocus={getProvince}
                                                onBlur={() => setPickerFocused(false)}
                                                selectedValue={provinceCode}
                                                onValueChange={(i) => {
                                                    setProvinceCode(i);
                                                    setDistrict([]);
                                                    setWards([]);
                                                    setDistrictCode(null), setWardCode(null);
                                                }}
                                            >
                                                {province.map((item) => (
                                                    <Picker.Item
                                                        style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
                                                        label={province.length > 0 ? item.name : placeholder}
                                                        value={item.code}
                                                        key={item}
                                                        enabled={!pickerFocused}
                                                    />
                                                ))}
                                            </Picker>

                                            <View
                                                style={{
                                                    borderBottomWidth: 0.5,
                                                    marginBottom: 20,
                                                    borderBottomColor: '#767676',
                                                }}
                                            />
                                            <Text style={{ fontSize: 15, color: '#000000', marginVertical: 2 }}>
                                                Select district:
                                            </Text>

                                            <Picker
                                                prompt="--Select district--"
                                                placeholder="--Select district--"
                                                placeholderStyle={{
                                                    color: 'grey',
                                                }}
                                                dropdownIconColor={'#FF6868'}
                                                dropdownIconRippleColor={'#FF6868'}
                                                onFocus={getDistrict}
                                                style={{ color: '#333', backgroundColor: '#ffff' }}
                                                selectedValue={districtCode}
                                                onValueChange={(i) => {
                                                    setDistrictCode(i);
                                                    setWards([]);
                                                    setWardCode(null);
                                                }}
                                            >
                                                {provinceCode
                                                    ? district.map((item) => (
                                                          <Picker.Item
                                                              style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
                                                              label={item.name}
                                                              value={item.code}
                                                              key={item}
                                                          />
                                                      ))
                                                    : null}
                                            </Picker>
                                            <View
                                                style={{
                                                    borderBottomWidth: 0.5,
                                                    marginBottom: 20,
                                                    borderBottomColor: '#767676',
                                                }}
                                            />
                                            <Text style={{ fontSize: 15, color: '#000000', marginVertical: 2 }}>
                                                Select ward:
                                            </Text>
                                            <View style={{ borderBottomWidth: 0.5 }} />
                                            <Picker
                                                prompt="--Select ward--"
                                                placeholder="--Select ward--"
                                                placeholderStyle={{
                                                    color: 'grey',
                                                }}
                                                dropdownIconColor={'#FF6868'}
                                                dropdownIconRippleColor={'#FF6868'}
                                                onFocus={getWard}
                                                style={{ color: '#333', backgroundColor: '#ffff' }}
                                                selectedValue={wardCode}
                                                onValueChange={(i) => setWardCode(i)}
                                            >
                                                {districtCode
                                                    ? wards.map((item) => (
                                                          <Picker.Item
                                                              style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
                                                              label={item.name}
                                                              value={item.code}
                                                              key={item}
                                                          />
                                                      ))
                                                    : null}
                                            </Picker>
                                            <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#767676' }} />
                                        </View>
                                        <Pressable onPress={handleSubmit} style={[styles.button, styles.buttonClose]}>
                                            <Text style={styles.textStyle}>Comfirm</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <Modal animationType="fade" transparent={true} visible={showModalSex}>
                            <View style={styles.modalContainer}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <TouchableOpacity
                                            onPress={() => setShowModalSex(false)}
                                            style={{
                                                position: 'absolute',
                                                padding: 10,
                                                color: '#FF6868',
                                                top: 0,
                                                right: 0,
                                            }}
                                        >
                                            <Icon name="close-outline" size={30} style={{ color: '#FF6868' }} />
                                        </TouchableOpacity>

                                        <View style={{ color: '#333', width: '100%', marginTop: 30 }}>
                                            <Text style={{ fontSize: 18, color: '#000000', marginVertical: 2 }}>
                                                You are:
                                            </Text>
                                            {['Male', 'Female', 'Other'].map((item) => (
                                                <TouchableOpacity
                                                    key={item}
                                                    onPress={() => {
                                                        setSex(item);
                                                    }}
                                                    style={{
                                                        width: '100%',
                                                        borderBottomWidth: 0.5,
                                                        borderBottomColor: '#767676',
                                                        marginVertical: 10,
                                                    }}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.text,
                                                            {
                                                                paddingVertical: 10,
                                                                fontSize: 15,
                                                                color: sex === item ? '#FF6868' : 'gray',
                                                                borderColor: sex === item ? '#FF6868' : 'gray',
                                                            },
                                                        ]}
                                                    >
                                                        {item}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                        <Pressable
                                            onPress={() => {
                                                handleUpdateProfile(), setShowModalSex(false);
                                            }}
                                            style={[styles.button, styles.buttonClose]}
                                        >
                                            <Text style={styles.textStyle}>Comfirm</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <Modal animationType="fade" transparent={true} visible={showModalSexOriented}>
                            <View style={styles.modalContainer}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <TouchableOpacity
                                            onPress={() => setShowModalSexOriented(false)}
                                            style={{
                                                position: 'absolute',
                                                padding: 10,
                                                color: '#FF6868',
                                                top: 0,
                                                right: 0,
                                            }}
                                        >
                                            <Icon name="close-outline" size={30} style={{ color: '#FF6868' }} />
                                        </TouchableOpacity>

                                        <View style={{ color: '#333', width: '100%', marginTop: 30 }}>
                                            <Text style={{ fontSize: 18, color: '#000000', marginVertical: 2 }}>
                                                Sex oriented:
                                            </Text>
                                            {['Male', 'Female', 'Other'].map((item) => (
                                                <TouchableOpacity
                                                    key={item}
                                                    onPress={() => {
                                                        setSexOriented(item);
                                                    }}
                                                    style={{
                                                        width: '100%',
                                                        borderBottomWidth: 0.5,
                                                        borderBottomColor: '#767676',
                                                        marginVertical: 10,
                                                    }}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.text,
                                                            {
                                                                paddingVertical: 10,
                                                                fontSize: 15,
                                                                color: sexOriented === item ? '#FF6868' : 'gray',
                                                                borderColor: sexOriented === item ? '#FF6868' : 'gray',
                                                            },
                                                        ]}
                                                    >
                                                        {item}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                        <Pressable
                                            onPress={() => {
                                                handleUpdateProfile(), setShowModalSexOriented(false);
                                            }}
                                            style={[styles.button, styles.buttonClose]}
                                        >
                                            <Text style={styles.textStyle}>Comfirm</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>

                        <Modal animationType="fade" transparent={true} visible={showModalRelationshipOriented}>
                            <View style={styles.modalContainer}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <TouchableOpacity
                                            onPress={() => setShowModalRelationshipOriented(false)}
                                            style={{
                                                position: 'absolute',
                                                padding: 10,
                                                color: '#FF6868',
                                                top: 0,
                                                right: 0,
                                            }}
                                        >
                                            <Icon name="close-outline" size={30} style={{ color: '#FF6868' }} />
                                        </TouchableOpacity>

                                        <View style={{ color: '#333', width: '100%', marginTop: 30 }}>
                                            <Text style={{ fontSize: 18, color: '#000000', marginVertical: 2 }}>
                                                Relationship oriented:
                                            </Text>
                                            {listRelationshipOriented.map((item) => (
                                                <TouchableOpacity
                                                    key={item.id}
                                                    onPress={() => {
                                                        setRelationshipOriented(item.name);
                                                        setRelationshipOrientedId(item.id);
                                                    }}
                                                    style={{
                                                        width: '100%',
                                                        borderBottomWidth: 0.5,
                                                        borderBottomColor: '#767676',
                                                        marginVertical: 10,
                                                    }}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.text,
                                                            {
                                                                paddingVertical: 10,
                                                                fontSize: 15,
                                                                color:
                                                                    relationshipOriented === item.name
                                                                        ? '#FF6868'
                                                                        : 'gray',
                                                                borderColor:
                                                                    relationshipOriented === item.name
                                                                        ? '#FF6868'
                                                                        : 'gray',
                                                            },
                                                        ]}
                                                    >
                                                        {item.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                        <Pressable
                                            onPress={() => {
                                                handleUpdateProfile(), setShowModalRelationshipOriented(false);
                                            }}
                                            style={[styles.button, styles.buttonClose]}
                                        >
                                            <Text style={styles.textStyle}>Comfirm</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </BottomSheetModalProvider>
            ) : (
                <Loading />
            )}
        </GestureHandlerRootView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 22,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    imageFrame: {
        borderWidth: 1,
        width: (width - 100) / 2,
        height: (width - 100) / 2,
        borderRadius: 25,
        borderStyle: 'dashed',
        margin: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#FF6868',
    },
    iconAddImage: {
        color: '#FF6868',
    },
    titleText: {
        color: '#000000',
        fontSize: 20,
        marginVertical: 18,
    },
    profile: {
        borderTopWidth: 0.5,
        borderColor: '#AAAAAA',
        marginTop: 40,
    },
    textInput: {
        height: 44,
        width: width - 44,
        paddingLeft: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 4,
        marginBottom: 40,
        color: '#000000',
    },
    text: {
        fontSize: 12,
        color: '#575757',
        marginHorizontal: 5,
    },
    iconBasic: {
        color: '#666666',
    },
    btn: {
        height: 44,
        borderRadius: 100,
        backgroundColor: '#503EBF',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 40,
    },
    btnText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    iconInput: {
        position: 'absolute',
        top: 13,
        right: 10,
        zIndex: 1,
        color: '#666666',
    },
    container0: {
        flex: 1,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30,
    },

    contentContainer: {
        flex: 1,
        alignItems: 'flex-start',
        paddingHorizontal: 22,
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    title: {
        fontWeight: '900',
        letterSpacing: 0.5,
        fontSize: 22,
        color: '#000000',
    },
    subtitle: {
        fontSize: 16,
        color: '#575757',
        marginHorizontal: 5,
        padding: 5,
        fontWeight: 'bold',
    },
    description: {
        color: '#56636F',
        fontSize: 13,
        fontWeight: 'normal',
        width: '100%',
    },
    myBasicRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text0: {
        fontSize: 16,
        color: '#575757',
        marginHorizontal: 5,
        padding: 5,
    },
    iconBasic: {
        color: '#666666',
    },
    modalContainer: {
        flex: 1,
        color: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: width,
        height: height,
        color: 'green',
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 22,
    },

    buttonClose: {
        width: '100%',
        height: 46,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#503EBF',
        marginTop: 18,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF',
    },
    modalText: {
        marginBottom: 15,
        fontSize: 18,
        color: '#000000',
        textAlign: 'center',
        color: 'blue',
    },
});

export default EditProfileScreen;
