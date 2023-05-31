import * as React from 'react';
import { Text, View, useWindowDimensions, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import EditProfileScreen from './EditProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import TopLike from './TopLike';
import Xlikes from './Xlikes';
import Sent from './Sent';
const FirstRoute = () => (
    <View style={styles.frame} >
      <Text>Hello</Text>
    </View>
  );
  const SecondRoute = () => (
    <View style={styles.frame} >
      <Text>Hello</Text>
    </View>
  );

  const renderScene = SceneMap({
    first: Xlikes,
    second: Sent,
    thirst: TopLike,
  });
  const renderTabBar = (props) => (
    <View style={styles.container}>
      <Image
        source={require('../src/assets/images/HoneyaaLogo.png')}
        resizeMode='stretch'
        style={styles.logo}
      />
  
      <View style={{ flexDirection: 'row'}}>
        {props.navigationState.routes.map((route, index) => {
          const isFocused = props.navigationState.index === index;
  
          const onPress = () => {
            props.jumpTo(route.key);
          };
  
          return (
            <TouchableWithoutFeedback
              key={route.key}
              onPress={onPress}
            >
              <View style={[styles.tab, { borderColor: isFocused ? '#FF6868' : '#000000', borderBottomWidth: isFocused ? 1 : 0 }]}>
                <Text style={[styles.headerText, { color: isFocused ? '#FF6868' : '#000000' }]}>{route.title}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
const Favorites = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'X likes' },
      { key: 'second', title: 'Sent' },
      { key: 'thirst', title: 'TOP like' },
    ]);
  
    return (
        <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 22,
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
      },
      logo: {
        width: 100,
        height: 100,
      },
    
      headerText: {
        color: '#666666',
        fontSize: 14,
      },
      tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
      },
      frame: {
        flex: 1,
        backgroundColor: '#FFFFFF',
      }
});

export default Favorites;
