import {StyleSheet} from "react-native";

const styles = StyleSheet.create({


    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#06b3e9',

    },
    modalbackground: {
        flex: 2,



        backgroundColor: 'rgba(0,0,0,0.45)',


    },


    modalbackground_info: {
        flex: 5,
        backgroundColor:'rgba(1,1,1,0)',
        borderRadius:12,




    },

    modalbackground_Profile_gift: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(45,101,127,0.37)',
        height:'80%',
        width:'80%',

    },
    container_pofile: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#06b3e9',


    },

    containerchat: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8F6FF',

    },
    touchableButton: {
        color: '#fff',
        fontSize: 10,
        marginTop: 10,
    },
    newInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 16,
        marginBottom: 40,
        height: 50,
    },
    touchable: {
        backgroundColor: '#06B3E9',
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20

    },
    prices: {
        fontSize: 18,
        paddingBottom:'3%',
        marginTop:'2%'









    },

    Profile_Toolbar_text: {
        fontSize: 18,
        flex: 1,
        color: '#efefef',
        marginLeft: 0,
        padding: 1,
        paddingLeft: 130,
        fontWeight: 'bold',


    },
    Profile_Toolbar_text_stuff: {
        fontSize: 18,
        flex: 1,
        color: '#efefef',
        marginLeft: 0,
        padding: 1,
        paddingLeft: 130,
        fontWeight: 'bold'


    },

    Profile_user_text: {
        fontSize: 13,
        flex: 1,
        color: '#000000',
        marginBottom: 1,
        paddingLeft: 100,
        backgroundColor: '#06b3e9',


    },

    Profile_Toolbar_text_down: {
        fontSize: 20,
        flex: 1,
        fontWeight:'bold',
        color: '#efefef',
        marginLeft: 0,

        paddingLeft: 283,
        paddingBottom: 2


    },
    Profile_redactor_Toolbar_text_down: {
        fontSize: 20,
        flex: 1,
        fontWeight:'bold',
        color: '#efefef',
        marginLeft: 0,

        paddingLeft: 180,
        paddingBottom: 2


    },
    Profile_redactor_Toolbar_text_down_right: {
        fontSize: 19,

        fontWeight:'bold',
        color: '#efefef',
        paddingBottom: 2,



    },

    Profile_List_text: {
        color: '#3b84d7',
        textAlign: 'center',
        marginTop:'5%',
        marginLeft:'5%',

        fontSize: 15,





    },

    Profile_List_text_info: {
        fontSize: 18,

        color: '#ffffff',


        backgroundColor: 'rgba(106,168,180,0.26)',

        textAlign:'center',




    },

    Private_Toolbar: {
        fontSize: 20,

        color: '#efefef',

        marginLeft:40,





    },
    Gift_Description: {
        fontSize: 16,
        fontWeight:'bold',

        color: '#000000',



        textAlign:'center'


    },

    prices2: {
        fontSize: 18,

        color: '#2e29b7',
        marginLeft: 0,
        padding: 1,
        paddingBottom: 20,


    },
    action_profile: {
        fontSize: 20,
        flex: 1,
        color: '#000000',
        marginTop:'5%',
        marginLeft:'5%',

        justifyContent:'center',



    },
    smiles: {
        fontSize: 25,


    },

    prices1: {
        fontSize: 50,
        flex: 1,
        color: 'transparent',
        marginLeft: 0,
        padding: 1


    },

    imageView: {

        width: 30,
        height: 30,
        paddingBottom: 12,
        marginBottom: 5,
        borderRadius: 7,
        marginLeft: 0,
        resizeMode: 'contain',


    },
    imageViewProfile_icon: {

        width: 50,
        height: 50,
        left:3,
        alignSelf:'center',

        borderRadius: 7,
        marginLeft: 0,
        resizeMode: 'contain',



    },
    imageViewPrivateList: {

        width: 25,
        height: 25,
        paddingBottom: 12,
        marginBottom: 5,
        borderRadius: 7,
        marginLeft: 0,
        resizeMode: 'contain',




    },

    imageView3: {

        width: 25,
        height: 25,
        paddingBottom: 12,
        marginBottom: 5,
        borderRadius: 7,
        marginLeft: 0,
        backgroundColor: '#ffffff'


    },


    imageViewAvatars: {

        width: 30,
        height: 30,
        marginLeft:4,
        marginBottom:4,


        resizeMode: 'contain',



    },
    imageViewAvatars_stuff: {

        width: 40,
        height: 40,
        marginTop:20,
        marginBottom:10,
       // backgroundColor:'#E8F6FF',
        alignSelf:'center',




        resizeMode: 'contain',


    },


    imageAvatarProfile: {

        width: 82,
        height: 82,


        marginLeft:10,
        marginBottom:'0.47%',



        borderRadius: 400 / 2,



    },
    imageAvatarProfileEdit: {

        width: 45,
        height: 45,
        marginRight:'2%',
        marginLeft:'2%',
        marginTop:'2%',
        marginBottom:'2%',



        borderRadius: 400 / 2,



    },
    imageAvatar_redactor: {

        width: 17,
        height: 17,


        resizeMode: 'contain',
        position:'absolute',
        marginTop:12,
        marginLeft:4,

        paddingTop:5,




    },
    imageView1: {

        width: 25,
        height: 25,
        paddingBottom: 12,
        marginBottom: 5,
        borderRadius: 7,
        marginLeft: 0


    },

    imageViewProfile: {

        width: 15,
        height: 15,
        paddingBottom: 12,
        marginBottom: 5,
        borderRadius: 7,
        marginLeft: 0


    },
    imageAttach: {

        width: 280,
        height: 340,

        marginTop: 20,
        margin: 1,
        padding: 40,
        resizeMode: 'contain',
        alignContent: 'stretch',
        position: 'relative',
        left: '-57%'


    },

    imageAttachPrivate: {

        width: 150,
        height: 150,


        margin: 1,
        borderRadius:14,
        alignItems:'center',

        flex:2,


        resizeMode: 'contain',




    },

    imageAttachRoom: {

        width: '80%',
        height:200,
        borderWidth:2,
        borderColor:'#1e4457',




        borderRadius:14,
        resizeMode: "contain",



        flex:1,







    },
    imageAttachPrivatePreview: {

        width: 40,
        height: 40,

        marginTop: 20,
        margin: 1,
        alignItems:'center',

        resizeMode: 'contain',
        alignContent: 'stretch',



    },

    instructions: {

        textAlign: 'center',
        alignItems: 'center',
        color: '#ffffff',
        fontSize: 17,
        flex: 1,
        fontWeight:'bold',
        paddingLeft: 90,
        alignSelf: 'center',
        paddingBottom:7,


    },
    symbols: {

        fontSize: 18,
       flex:3,

        paddingLeft:'3%',
        paddingRight:'3%',






    },

    emoji: {






        flex:1,



    },

    private1: {
        fontSize: 18,


        color: '#fefcfe',


    },
    imageViewToolbarArrow: {

        width: 25,
        height: 25,
        marginTop: 11,


        flex: 1,
        paddingLeft: 20,


    },

    private2: {
        fontSize: 18,


        color: '#ffffff',



    },

    persdif: {
        fontSize: 20,
        textAlign: 'right',
        margin: 10,
        color: '#2716e9',
    },
    containerToolbar: {




        flexDirection: 'column',
        height: 50,
        width: "100%",


        backgroundColor:'#3c3e5a',

    },

    containerToolbarProfile: {



        flexDirection: 'column',
        height: 50,
        width: "100%",


        backgroundColor:'#3c3e5a',

    },

    containerToolbarProfile1: {



        flexDirection: 'column',
        height: 25,
        width: "100%",


        backgroundColor:'#3c3e5a',

    },
    containerToolbarRedactor1: {



        flexDirection: 'column',
        height: 25,
        width: "100%",
        marginTop:22,



        backgroundColor:'#3c3e5a',

    },
    containerToolbarProfile_down: {

        flexDirection: 'column',
        height: 25,
        width: "100%",
        marginTop:372,


        backgroundColor: '#06b3e9',
    },
    price: {
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
        color: '#ffffff',
        padding: 10,
    },

    separator: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#042441'
    },
    textBox: {

        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        width: '90%',


    },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        marginLeft: 5,
        paddingRight: 15,
        borderRadius: 5,
        backgroundColor: '#446bdb'
    },
    inputBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 3,
    },
    SubmitButtonStyle: {


        backgroundColor: '#00BCD4',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',

    },
    all_users: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#2a68ff',
        padding: 10,
        fontWeight:'bold'
    },

    nick: {
        fontSize: 20,
        textAlign: 'center',

        backgroundColor:'#7cffb2',
        fontWeight:'bold',

        color: '#121212',

    },

    TextInput_Redactor: {
        marginTop:15,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'gray',
        width: '100%',
        backgroundColor:'rgba(184,205,238,0.47)'
    },




});

export default styles
