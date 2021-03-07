import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

// import style
import mainStyle from '../modules/style/mainStyle';
import mainValues from '../modules/values/mainValues';

// style classes
const {
    shadowBox,
    bookCard,
    bookCardTitle,
    bookCardInfoContainer,
    bookCardInfoItem,
    bookCardDescription,
    bookCardInfoAuthorName,
    bookCardInfoAuthorNameText,
    icon
} = mainStyle;

export default BookCard = ({ title, description, author_name, date, edit, showOptions, headerTitle, bookId }) => {
    return (
        <View style={[shadowBox, bookCard, { paddingLeft: mainValues.paddingMeduim }]}>
            <View style={bookCardInfoContainer}>
                <Text numberOfLines={1} style={bookCardTitle}>{title} </Text>
                {edit ?
                    <TouchableOpacity onPress={() => showOptions(true, headerTitle, bookId)}>
                        <Image
                            source={require('../assets/icons/optians.png')}
                            style={icon}
                        />
                    </TouchableOpacity>
                    :
                    <View style={bookCardInfoAuthorName}>
                        <Text style={bookCardInfoAuthorNameText}>by {author_name}</Text>
                    </View>
                }
            </View>

            <Text style={bookCardInfoItem}>{date}</Text>
            <Text style={bookCardDescription}>{description}</Text>

        </View >
    )
}