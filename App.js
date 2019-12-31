import React from 'react'
import Navigator from 'react-native-easy-router'
import Login from './components/Login/Login'
import Chatting from './components/Chatting/Chatting'
import Rooms from "./components/Rooms/Rooms";
import Registration from "./components/Registration/Registration";
import Profile from "./components/Profile/Profile";
import View_stuff from "./components/View_stuff/View_stuff";
import Private from "./components/Private/Private";
import Private_List from "./components/Private_List/Private_List";
import {Profile_redactor} from "./components/Profile_redactor/Profile_redactor";
import ChatPortal from "./components/ChatPortal/ChatPortal";
import {PHOTO_VIEWER} from "./components/PHOTO_VIEWER";
import NavigationAdmin from "./components/AdminMenu/AdminMenu";

import NavigationSuperAdmin from "./components/SuperAdminMenu/SuperAdminMenu";

import {PhotosAll} from "./components/Profile/PhotosAll";
import {ScreenAvatarList} from "./components/ChatPortal/ScreenAvatarList";
import ScreenWeddings from "./components/ChatPortal/ScreenWeddings";
import Settings from "./components/Settings/Settings";

export default class chat extends React.Component {

    constructor(props) {
        super(props);


    }


    render() {

        return (

            <Navigator
                initialStack={[{screen: 'Login', transitionProps: {animation: 'fade'}}]}
                screens={{
                    Login,
                    Chatting,
                    Rooms,
                    Registration,
                    Profile,
                    View_stuff,
                    Private,
                    Private_List,
                    Profile_redactor,
                    ChatPortal,
                    PHOTO_VIEWER,
                    NavigationAdmin,
                    PhotosAll,
                    ScreenAvatarList,
                    Settings,
                    ScreenWeddings,
                    NavigationSuperAdmin
                }}

                animations='faded'
                duration={150}
                disableHardwareBack={true}

            />


        );


    }


}

