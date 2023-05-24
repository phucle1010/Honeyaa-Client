import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
    View,
    FlatList,
    Modal,
    Image,
    ScrollView,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollViewComponent,
    Alert,
    Pressable,
    TouchableWithoutFeedback,
    SafeAreaView,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import AwesomeExtraIcon from 'react-native-vector-icons/FontAwesome';
import OctIcon from 'react-native-vector-icons/Octicons';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import Loading from '../components/Loading';

const { width } = Dimensions.get('window');

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

const InputItem = (props) => {
    const { placeholder, value } = props;
    return (
        <View style={{ height: 44 }}>
            <TextInput
                value={value}
                style={styles.textInput}
                editable={false}
                onPressOut={() => Alert.alert('hello')}
                placeholder={placeholder}
                placeholderTextColor={'#B2B2B2'}
            />
            <Icon name="chevron-forward-outline" size={15} style={styles.iconInput} />
        </View>
    );
};

const myBasicData = [
    {
        name: 'Zodiac',
        icon: 'moon-outline',
    },
    {
        name: 'Education',
        icon: 'school-outline',
    },
    {
        name: 'Language',
        icon: 'language-outline',
    },
    {
        name: 'Social Network',
        icon: 'logo-facebook',
    },
    {
        name: 'Physical Exercise',
        icon: 'barbell-outline',
    },
    {
        name: 'Pet',
        icon: 'paw-outline',
    },
    {
        name: 'Music',
        icon: 'musical-note-outline',
    },
];

const MyBasicItem = (props) => {
    const { icon, name, onPress } = props;

    return (
        <TouchableOpacity onPress={onPress} style={styles.myBasicItemContainer}>
            <View style={styles.myBasicRow}>
                <Icon name={icon} size={24} style={styles.iconBasic} />
                <Text style={styles.text}>{name}</Text>
            </View>
            <View style={styles.myBasicRow}>
                <Text style={styles.text}>Add</Text>
                <Icon name="chevron-forward-outline" size={15} style={styles.iconBasic} />
            </View>
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

    const bottomSheetModalRef = useRef(null);
    const scrollViewRef = useRef(null);
    const snapPoints = ['35%', '75%', '100%'];

    const getImageListOfUser = async () => {
        await axios
            .get(`${API_URL}/api/user/profile/img`, {
                params: {
                    person_id: currentUser.id,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 400) {
                    Alert.alert('Error', err.toString());
                } else {
                    setPhotos(res.data.responseData);
                    setLoaded(true);
                }
            })
            .catch((err) => Alert.alert('Error', err.toString()));
    };

    useEffect(() => {
        getImageListOfUser();
    }, []);

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
                Alert.alert('Successful', 'Upload photo successfully');
                getImageListOfUser();
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

    const handleSaveProfile = () => {
        handleUploadImage();
        /// Xử lý chỉnh sửa các thông tin cá nhân ở bên dưới
    };

    function handlePresentModal() {
        bottomSheetModalRef.current?.present();
        setTimeout(() => {
            setIsOpen(true);
        }, 200);
    }

    function handleDismissModal() {
        bottomSheetModalRef.current.dismiss();
        setTimeout(() => {
            setIsOpen(false);
        }, 100);
    }

    const dataZodiac = [
        'Aries',
        'Taurus',
        'Gemini',
        'Cancer',
        'Leo',
        'Virgo',
        'Libra',
        'Scorpio',
        'Sagittarius',
        'Capricorn',
        'Aquarius',
        'Pisces',
    ];

    const handleButtonPress = () => {
        scrollViewRef.current?.scrollTo({ y: 200, animated: false });
        console.log('ok');
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
                                    keyExtractor={(item) => item.id}
                                    numColumns={2}
                                    scrollEnabled={false}
                                />
                                <View style={styles.profile}>
                                    <Text style={styles.titleText}>About me</Text>
                                    <View style={{ height: 44 }}>
                                        <TextInput
                                            style={[styles.textInput, { backgroundColor: isOpen ? 'gray' : '#FFFFFF' }]}
                                            placeholder={'Introduce yourself...'}
                                            placeholderTextColor={'#B2B2B2'}
                                        />
                                    </View>
                                </View>
                                <View style={styles.profile}>
                                    <Text style={styles.titleText}>My basics</Text>
                                    <FlatList
                                        data={myBasicData}
                                        renderItem={({ item }) => (
                                            <MyBasicItem
                                                onPress={handlePresentModal}
                                                icon={item.icon}
                                                name={item.name}
                                            />
                                        )}
                                        keyExtractor={(item) => item.name}
                                        scrollEnabled={false}
                                    />
                                </View>
                                <View style={styles.profile}>
                                    <Text style={styles.titleText}>My interests</Text>
                                    <View>
                                        <TouchableWithoutFeedback onPress={() => Alert.alert('hello')}>
                                            <View style={{ height: 44 }}>
                                                <TextInput
                                                    editable={false}
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
                                                styles.text0,
                                                { position: 'absolute', top: 5, right: 23, zIndex: 1 },
                                            ]}
                                        >
                                            Add
                                        </Text>
                                        <Icon name="chevron-forward-outline" size={15} style={styles.iconInput} />
                                    </View>
                                </View>
                                <View style={styles.profile}>
                                    <Text style={styles.titleText}>My address</Text>
                                    <TouchableWithoutFeedback onPress={() => Alert.alert('hello')}>
                                        <View style={{ height: 44 }}>
                                            <TextInput
                                                style={[
                                                    styles.textInput,
                                                    { backgroundColor: isOpen ? 'gray' : '#FFFFFF' },
                                                ]}
                                                editable={false}
                                                onPressOut={() => Alert.alert('hello')}
                                                placeholder={'Adress'}
                                                placeholderTextColor={'#B2B2B2'}
                                            />
                                            <Icon name="chevron-forward-outline" size={15} style={styles.iconInput} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.profile}>
                                    <Text style={styles.titleText}>Sex</Text>
                                    <TouchableWithoutFeedback onPress={() => Alert.alert('hello')}>
                                        <View style={{ height: 44 }}>
                                            <TextInput
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
                                    <TouchableWithoutFeedback onPress={() => Alert.alert('hello')}>
                                        <View style={{ height: 44 }}>
                                            <TextInput
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
                                    <TouchableWithoutFeedback onPress={() => Alert.alert('hello')}>
                                        <View style={{ height: 44 }}>
                                            <TextInput
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
                                <TouchableOpacity style={styles.btn} onPress={handleSaveProfile}>
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
                                        <TouchableOpacity onPress={handleButtonPress}>
                                            <Icon name={'close-outline'} size={30} style={styles.iconBasic} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleDismissModal}>
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
                                        {dataZodiac.map((i) => (
                                            <Pressable
                                                key={i}
                                                style={{
                                                    borderWidth: 0.5,
                                                    borderColor: '#000',
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
                                        {dataZodiac.map((i) => (
                                            <Pressable
                                                key={i}
                                                style={{
                                                    borderWidth: 0.5,
                                                    borderColor: '#000',
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
                                        {dataZodiac.map((i) => (
                                            <Pressable
                                                key={i}
                                                style={{
                                                    borderWidth: 0.5,
                                                    borderColor: '#000',
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
                                        {dataZodiac.map((i) => (
                                            <Pressable
                                                key={i}
                                                style={{
                                                    borderWidth: 0.5,
                                                    borderColor: '#000',
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
                                        {dataZodiac.map((i) => (
                                            <Pressable
                                                key={i}
                                                style={{
                                                    borderWidth: 0.5,
                                                    borderColor: '#000',
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
                                        {dataZodiac.map((i) => (
                                            <Pressable
                                                key={i}
                                                style={{
                                                    borderWidth: 0.5,
                                                    borderColor: '#000',
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
                                        {dataZodiac.map((i) => (
                                            <Pressable
                                                key={i}
                                                style={{
                                                    borderWidth: 0.5,
                                                    borderColor: '#000',
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
    myBasicItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 0.5,
        paddingVertical: 9,
        borderColor: '#AAAAAA',
    },
    myBasicRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn: {
        height: 49,
        borderRadius: 100,
        backgroundColor: '#503EBF',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 40,
    },
    btnText: {
        fontSize: 20,
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
});
export default EditProfileScreen;
