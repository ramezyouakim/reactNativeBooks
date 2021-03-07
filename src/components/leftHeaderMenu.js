import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import mainStyle from '../modules/style/mainStyle';

export default MenuButton = ({ nav }) => {
    const navigation = useNavigation();
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                <Image
                    source={require('../assets/icons/menu.png')}
                    style={mainStyle.icon}
                />
            </TouchableOpacity>
        </View>
    )
};