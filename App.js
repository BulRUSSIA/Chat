import React from 'react'
import Router from 'react-native-easy-router'

import Login from  './components/Login/Login'
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
export default class chat extends React.Component {

    constructor(props){
        super(props);



    }

    render()
    {
        return (

            <Router
                routes={{Login, Chatting, Rooms, Registration,Profile,View_stuff,Private,Private_List,Profile_redactor,ChatPortal,PHOTO_VIEWER,NavigationAdmin}}
                initialRoute="Login"
                router={router => (this.router = router)}
                disableHardwareBack={false}
            />


        );


    }


}

