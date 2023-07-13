import { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

const InteractNotice = ({ ...props }) => {
    const mainScreen = props.mainScreen;
    const topInit = mainScreen === 'Home' ? 80 : 20;
    const top = useRef(new Animated.Value(topInit)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(top, {
                duration: 600,
                toValue: topInit + 40,
                useNativeDriver: false,
            }),
        ]).start();

        Animated.sequence([
            Animated.timing(opacity, {
                duration: 1000,
                toValue: 0,
                useNativeDriver: false,
            }),
        ]).start();

        setTimeout(() => {
            props.setInteractMessageConfig({
                message: '',
                color: '',
            });
        }, 1200);

        return clearTimeout();
    }, []);

    return (
        <Animated.View
            style={[
                styles.interactNoticeContainer,
                {
                    top,
                    opacity,
                    backgroundColor: props.interactMessageConfig.color,
                },
            ]}
        >
            <Text style={styles.interactNoticeText}>{props.interactMessageConfig.message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    interactNoticeContainer: {
        position: 'absolute',
        left: '35%',
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    interactNoticeText: {
        color: '#fff',
        fontSize: 20,
    },
});

export default InteractNotice;
