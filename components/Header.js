import React from 'react'
import { connect } from "react-redux";
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { headerStyle } from '../styles/headerStyles';
import { setCurrentUser } from "../redux/user/actions";

const Header = ({ title, navigation, setCurrentUser }) => {
    return (
        <View style={headerStyle.headerContainer}>
            <View style={[headerStyle.headerContents, { justifyContent: 'center' }]}>
                <TouchableOpacity 
                    onPress={() => {
                        //title==="Capture Images"|| title==="Installation Camera" ?navigation.navigate('DashBoard')navigation.goBack()
                        navigation.goBack()}
                        }
                        
                    style={headerStyle.backContainer}>
                    <Image source={require('../assets/arrowBack.png')} />
                </TouchableOpacity>

                <View style={headerStyle.headerTextContainer}>
                    <Text style={headerStyle.headerText}>{title}</Text>
                </View>

                <TouchableOpacity 
                    onPress={() => { 
                        setCurrentUser(false)
                        navigation.navigate('Login')}
                    }
                    style={headerStyle.loginContainer}>
                    <Image source={require('../assets/logout-32.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default connect(null,{ setCurrentUser })(Header);