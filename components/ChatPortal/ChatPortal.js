import React, {Component} from 'react';
import {
    Image, ImageBackground, TouchableOpacity
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Body,
    Text,
    Title,
    Button,
    Icon,
    Left,
    Right,
    Thumbnail
} from 'native-base';

export default class ChatPortal extends Component {







    render() {

        const {router} = this.props;
        return (
            <Container>
                <Header style={{backgroundColor: '#25566e'}}>
                    <Left style={{flex: 1}}>
                        <Button transparent
                                onPress={() => router.pop({
                                    room: this.props.room,
                                    nic: this.props.nic,
                                    chat_name: this.props.chat_name,
                                })}>


                            <Icon
                                style={{color: 'white'}}
                                name="ios-arrow-back"/>
                        </Button>

                    </Left>
                    <Body style={{flex: 2}}>
                        <Title>Чат портал</Title>
                    </Body>
                </Header>
                <Content style={{backgroundColor: 'rgb(49,110,93)', flex: 7}}>

                    <Card>
                        <CardItem

                            cardBody

                            style={{marginTop: '1%', backgroundColor: 'rgb(49,110,93)'}}>

                            <ImageBackground source={require('../Image/last_back.webp')}
                                             style={{height: 250, width: null, flex: 1}}>

                                <Body style={{alignItems: 'center', backgroundColor: 'rgba(48,111,167,0.69)'}}>
                                    <Text style={{color: '#010101', fontWeight: 'bold'}}>Баланс чатлов</Text>


                                </Body>


                                <Body style={{alignItems: 'center', backgroundColor: 'rgb(113,166,200)'}}>
                                    <Text style={{color: '#c0f9fb', fontWeight: 'bold', marginTop: '1%'}}>{this.props.balance_card}
                                        rur</Text>
                                </Body>


                                <Container style={{backgroundColor: 'rgba(131,197,160,0.69)', flex: 7}}>
                                    <Body style={{alignItems: 'center', marginTop: 20}}>
                                        <Image
                                            style={{width: 100, height: 100, resizeMode: 'contain'}}
                                            source={require('../Image/dollar.png')}/>

                                    </Body>

                                    <Left style={{alignItems: 'center', marginTop: 40}}>

                                        <Text style={{color: '#30578d', fontWeight: 'bold',}}>Пополнить баланс</Text>
                                    </Left>

                                </Container>
                            </ImageBackground>

                        </CardItem>

                        <CardItem cardBody
                                  style={{marginTop: '1%', backgroundColor: 'rgb(49,110,93)'}}>

                            <ImageBackground source={require('../Image/last_back.webp')}
                                             style={{height: 250, width: null, flex: 1}}>

                                <Body style={{alignItems: 'center', backgroundColor: 'rgba(48,111,167,0.69)'}}>
                                    <Text style={{color: '#010101', fontWeight: 'bold'}}>Виртуальный ЗАГС
                                    </Text>


                                </Body>
                                <Body style={{alignItems: 'center', backgroundColor: 'rgba(46,93,133,0.53)'}}>
                                    <Text style={{color: '#0d0b3f', fontWeight: 'bold'}}>Последнее бракосочетание</Text>
                                </Body>

                                <Container style={{backgroundColor: 'rgba(131,197,160,0.69)', flex: 7}}>

                                    <Left style={{flex: 3, marginRight: '18%'}}>
                                        <Text
                                            style={{
                                                paddingTop: 39,
                                                marginLeft: '3%',
                                                fontWeight: 'bold',
                                                paddingRight: '3%'
                                            }}>Кошка</Text>

                                        <Thumbnail

                                            style={{marginRight: '50%', marginTop: '5%', width: 80, height: 80}}
                                            source={{uri: 'http://185.231.154.198:5000/attachments/photosollt5d3b56ad0a975a5836a1d5ed'}}/>
                                    </Left>


                                    <Right style={{flex: 4, marginLeft: '20%'}}>

                                        <Text style={{

                                            paddingBottom: '6%',

                                            paddingLeft: '10%',

                                            color: '#285d8c',

                                            fontWeight: 'bold'
                                        }}>New Generation</Text>

                                        <Thumbnail
                                            style={{marginLeft: '50%', marginBottom: '68%', width: 80, height: 80}}
                                            source={{uri: 'http://185.231.154.198:5000/attachments/photosollt5c9fd2810a975a0b4c4622c9'}}/>
                                    </Right>
                                    <Body style={{marginBottom: 90}}>
                                        <Image
                                            style={{width: 40, height: 40,}}
                                            source={require('../Image/weddingProfile.png')}/>
                                        <Text
                                            style={{marginBottom: 10,}}
                                        >01.09.19</Text>
                                        <TouchableOpacity>
                                            <Text style={{color: '#30578d', fontWeight: 'bold'}}> Разбить пару</Text>
                                        </TouchableOpacity>
                                    </Body>
                                </Container>

                            </ImageBackground>

                        </CardItem>


                        <CardItem cardBody
                                  style={{marginTop: '1%', backgroundColor: 'rgb(49,110,93)'}}>

                            <ImageBackground source={require('../Image/last_back.webp')}
                                             style={{height: 250, width: null, flex: 1}}>

                                <Body style={{alignItems: 'center', backgroundColor: 'rgba(48,111,167,0.69)'}}>
                                    <Text style={{color: '#010101', fontWeight: 'bold'}}>Сервисы</Text>


                                </Body>

                                <Container style={{backgroundColor: 'rgba(131,197,160,0.69)', flex: 7}}>


                                </Container>
                            </ImageBackground>

                        </CardItem>
                        <CardItem cardBody
                                  style={{marginTop: '1%', backgroundColor: 'rgb(49,110,93)'}}>

                            <ImageBackground source={require('../Image/last_back.webp')}
                                             style={{height: 250, width: null, flex: 1}}>

                                <Body style={{alignItems: 'center', backgroundColor: 'rgba(48,111,167,0.69)'}}>
                                    <Text style={{color: '#010101', fontWeight: 'bold'}}>Авторитеты</Text>


                                </Body>

                                <Container style={{backgroundColor: 'rgba(131,197,160,0.69)', flex: 7}}>


                                </Container>
                            </ImageBackground>

                        </CardItem>
                        <CardItem cardBody
                        >

                            <ImageBackground source={require('../Image/last_back.webp')}
                                             style={{height: 250, width: null, flex: 1}}>

                                <Body style={{alignItems: 'center', backgroundColor: 'rgba(48,111,167,0.69)'}}>
                                    <Text style={{color: '#010101', fontWeight: 'bold'}}>Игрули</Text>


                                </Body>

                                <Container style={{backgroundColor: 'rgba(131,197,160,0.69)', flex: 7}}>


                                </Container>
                            </ImageBackground>

                        </CardItem>

                    </Card>


                </Content>
            </Container>
        );
    }
}