import React from 'react'
import Router from 'react-native-easy-router'

import Login from  './components/Login'
import Chatting from './components/Chatting'
import Rooms from "./components/Rooms";
import Registration from "./components/Registration";
import Profile from "./components/Profile";
import View_stuff from "./components/View_stuff";
import Private from "./components/Private";
import Private_List from "./components/Private_List";
export default class chat extends React.Component {

    constructor(props){
        super(props);



    }

    render()
    {
        return (
            <Router
                routes={{Login, Chatting, Rooms, Registration,Profile,View_stuff,Private,Private_List}}
                initialRoute="Login"
                router={router => (this.router = router)}
                disableHardwareBack={false}
            />


        );


    }


}

