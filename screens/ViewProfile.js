import React, {useState} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';

const PROFILES = {
        id: 1,
        name: 'Thần Báo',
        age: 20,
        status: 'Hoạt động gần đây',
        distance: 1,
        gender: 'Nữ',
        img: [
            {
                id: 1,
                url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/297be08c-1ddb-4b84-be0c-01f60d984bdc/dflvygw-248d6628-a2bb-4978-84b4-c0a2db3e674b.jpg/v1/fill/w_730,h_1095,q_70,strp/beautiful_anime_kawaii_cute_classmate_girl_by_sianworld_dflvygw-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTUzNiIsInBhdGgiOiJcL2ZcLzI5N2JlMDhjLTFkZGItNGI4NC1iZTBjLTAxZjYwZDk4NGJkY1wvZGZsdnlndy0yNDhkNjYyOC1hMmJiLTQ5NzgtODRiNC1jMGEyZGIzZTY3NGIuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.hPOU0KOYKq6h5z0uTRwxiGCna0dRTnnmw0M7JJgi1X4',
            },
            {
                id: 2,
                url: 'https://s3.bukalapak.com/img/8106122415/large/IMG_20181230_WA0156_scaled.jpg.webp',
            },
            {
                id: 3,
                url: 'https://w0.peakpx.com/wallpaper/432/513/HD-wallpaper-anime-girl-cool-nice-refrishin.jpg',
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
}


const ViewProfile = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    return ( 
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <View style={styles.slider}>
                    {(userProfile.img?userProfile.img:PROFILES[0].img).map((profile, index) => (
                        <TouchableOpacity
                            key={index}
                                style={{
                                    ...styles.sliderItem,
                                    backgroundColor:
                                    index !== selectedImageIndex
                                        ? 'rgba(103, 103, 103, 0.3)'
                                        : 'rgba(255, 255, 255, 0.8)',
                                    width: `${sliderItemWidth}%`,
                                }}
                            onPress={() => setSelectedImageIndex(index)}
                        />
                    ))}
                </View>
                    {
                        <Image
                            source={{
                                uri: PROFILES[0].img[selectedImageIndex].url,
                            }}
                            style={styles.profileImage}
                        />
                    }
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
};

const styles = StyleSheet.create({
    container: {

    }
});