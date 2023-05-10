import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import BottomTab from './components/BottomTab';
import store from './store';

const App = () => {
    // const userState = useSelector((state) => state.user);
    // const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     fetch('http://192.168.1.186:8000/api/user', {
    //         method: 'GET',
    //     })
    //         .then((res) => res.json())
    //         .then((data) => setUsers(data.responseData))
    //         .catch((err) => console.log('Lỗi: ', err));
    // }, []);

    // console.log(userState);

    return (
        <Provider store={store}>
            <NavigationContainer>
                <BottomTab />
            </NavigationContainer>
        </Provider>
    );
};

export default App;
