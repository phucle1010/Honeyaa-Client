import Account from '../screens/Account';
import Chat from '../screens/Chat';
import Discover from '../screens/Discover';
import Favorites from '../screens/Favorites';
import Home from '../screens/Home';
import ProfileDetail from '../screens/ProfileDetail';
import MatchChat from '../screens/MatchChat';
import Tendency from '../screens/Tendency';
import SettingProfile from '../screens/SettingProfile';
import AnswerQuestion from '../screens/AnswerQuestion';

const screens = [
    {
        name: 'Home',
        component: Home,
        tabIconName: 'home-outline',
        tabIconSize: 30,
        tabIconColor: '#faa0a0',
        activeColor: '#ee4b2b',
        isHideTab: false,
    },
    {
        name: 'Discover',
        component: Discover,
        tabIconName: 'compass-outline',
        tabIconSize: 30,
        tabIconColor: '#faa0a0',
        activeColor: '#ee4b2b',
        isHideTab: false,
    },
    {
        name: 'Favorites',
        component: Favorites,
        tabIconName: 'fire',
        tabIconSize: 30,
        tabIconColor: '#faa0a0',
        activeColor: '#ee4b2b',
        isHideTab: false,
    },
    {
        name: 'MatchChat',
        component: MatchChat,
        tabIconName: 'chat-outline',
        tabIconSize: 30,
        tabIconColor: '#faa0a0',
        activeColor: '#ee4b2b',
        isHideTab: false,
    },
    {
        name: 'Account',
        component: Account,
        tabIconName: 'account-circle-outline',
        tabIconSize: 30,
        tabIconColor: '#faa0a0',
        activeColor: '#ee4b2b',
        isHideTab: false,
    },
    {
        name: 'ProfileDetail',
        component: ProfileDetail,
        tabIconName: 'account-circle-outline',
        tabIconSize: 30,
        tabIconColor: '#faa0a0',
        activeColor: '#ee4b2b',
        isHideTab: true,
    },
   
    {
        name:'SettingProfile',
        component: SettingProfile,
        tabIconName: 'account-circle-outline',
        tabIconSize: 30,
        tabIconColor: '#faa0a0',
        activeColor: '#ee4b2b',
        isHideTab: true,
    },
    {
        name:'AnswerQuestion',
        component: AnswerQuestion,
        tabIconName: 'account-circle-outline',
        tabIconSize: 30,
        tabIconColor: '#faa0a0',
        activeColor: '#ee4b2b',
        isHideTab: true,
    },
];

export default screens;
