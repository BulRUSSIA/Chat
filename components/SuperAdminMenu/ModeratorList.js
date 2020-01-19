import React from "react";
import {Dimensions, FlatList, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import fetch_REQUEST_MODERATOR_LIST from "../../actions/fetch_users_type_list";

const screenHeight = Math.round(Dimensions.get('window').width);

export default class ModeratorList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            usr_moderator_list:[],

        }

    }

    componentDidMount =async ()=>
    {

        const usr_moderator_list = await fetch_REQUEST_MODERATOR_LIST(2);

        this.setState({

            usr_moderator_list:usr_moderator_list,

        });

    };




    renderSeparator = () => (
        <View
            style={{
                backgroundColor: 'rgba(1,1,1,0.43)',
                height: 1

            }}
        />
    );



    render() {



        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',width: '100%', height: '100%'}}>

                <ImageBackground source={require('../Image/whatsap.png')


                }

                                 style={{width: '100%', height: '100%'}}
                >
                    <View style={{marginLeft:screenHeight/2.5,flex:2}} >
                        <Text style={{fontWeight:'bold'}}>Администраторы</Text>
                    </View>

                    <FlatList  style={{marginTop:'4%'}}


                              ItemSeparatorComponent={this.renderSeparator}
                              data={this.state.usr_moderator_list}
                              extraData={this.state}


                              renderItem={(({item}) =>

                                      <TouchableOpacity onPress={()=>this.props.screenProps.Go_Profile(item.id,item.nic)}>

                                          <View style={{
                                              flex: 1, flexDirection: 'row',
                                          }}>


                                              <Text style={{
                                                  fontSize: 20,
                                                  flex: 1,
                                                  fontWeight:'bold',
                                                  color: item.color,



                                                  padding: 1,
                                                  borderRadius: 4,


                                              }}>

                                                  {item.nic}

                                              </Text>


                                          </View>
                                      </TouchableOpacity>
                              )
                              }


                              keyExtractor={(item, index) => index.toString()}

                    />
                </ImageBackground>
            </View>
        );
    }
}