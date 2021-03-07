import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import mainStyle from '../modules/style/mainStyle';

const {
    HeaderActionBar,
    HeaderActionBarTitle,
    addMoreButton,
    addMoreButtonText
} = mainStyle;

export default HeaderAction = ({ title, btnTitle, action, setModalVisible, headerTitle }) => {
    return (
        <View style={HeaderActionBar}>
            <Text style={HeaderActionBarTitle}>{title}</Text>
            <TouchableOpacity style={addMoreButton} onPress={action == "close" ? () => setModalVisible(false, headerTitle) : () => setModalVisible(true, headerTitle)}>
                <Text style={addMoreButtonText}>{btnTitle}</Text>
            </TouchableOpacity>
        </View>
    )
}