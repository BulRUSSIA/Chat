import {StyleSheet} from "react-native";
 const styles = StyleSheet.create({


    container1: {

        backgroundColor: '#E8F6FF',
        width: '100%',


    },
    rooms: {
        fontSize: 14,
        flex: 1,
        color: 'rgba(214,163,66,0.98)',
        marginTop: 2,
        fontWeight: 'bold'


    },

    time: {
        fontSize: 10,
        flex: 1,
        color: 'rgba(255,255,255,0.98)',
        marginRight: 2,
        marginTop: 2


    },
    time_msg: {
        fontSize: 14,
        flex: 1,
        color: 'rgba(255,255,255,0.98)',

        marginTop: 25,
        textAlign: 'left',
        //  paddingTop: 5,


    },

    prices: {
        fontSize: 25,

        flex: 1,


        color: '#05077a',
        marginLeft: 1,
        padding: 9


    },
    imageView: {

        width: 25,
        height: 25,
        paddingBottom: 1,
        marginBottom: 12,
        marginTop: 25,
        borderRadius: 7,


    },
    imageViewmsg: {

        width: 20,
        height: 20,
        paddingBottom: 1,
        marginBottom: 12,
        marginTop: 30,
        marginRight: 20,


    },
    imageViewmsg1: {

        width: 20,
        height: 20,
        paddingBottom: 1,
        marginBottom: 8,
        marginTop: 10,

        marginRight: 20,


    },

    instructions: {

        textAlign: 'left',

        color: '#e5e5e5',
        fontSize: 30,
        flex: 1,
        paddingLeft: 120,
        alignSelf: 'center',
        fontWeight: 'bold',


    },

    instructions1: {


        color: '#e5e5e5',
        fontSize: 25,

        paddingLeft: 262,
        marginTop: 10,

        paddingBottom: 30,
        marginBottom: 20,
        fontWeight: 'bold'


    },

    containerToolbar: {

        flexDirection: 'column',
        height: 50,
        width: "100%",


        backgroundColor: '#25566e',
    },

    containerToolbardown: {


        marginTop: 5,
        flexDirection: 'column',
        height: 30,
        width: "100%",


        backgroundColor: '#25566e',
    },


});


export default styles