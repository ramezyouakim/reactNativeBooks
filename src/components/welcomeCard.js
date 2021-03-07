import React from 'react';
import { View, Text, Image } from 'react-native';

// import style
import mainStyle from '../modules/style/mainStyle';

// style classes
const {
    shadowBox,
    welcomeCard,
    profileImage,
    welcomeCardBody,
    welcomeCardHeader,
    welcomeCardProfileType
} = mainStyle;

export default WelcomeCard = ({ username }) => {
    return (
        <View style={[welcomeCard]}>
            <Image
                style={profileImage}
                source={require('../assets/icons/userProfile.png')}
            />
            <View style={welcomeCardBody}>
                <Text style={welcomeCardHeader}>Welcome,{`\n${username}`}</Text>
                <Text style={welcomeCardProfileType}>Author</Text>
            </View>
        </View>
    )
}