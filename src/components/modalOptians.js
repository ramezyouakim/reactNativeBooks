import React from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import mainStyle from '../modules/style/mainStyle';
import HeaderAction from '../components/headerActionBar';

import { connect } from 'react-redux';

// actions
import { addNewBook, editBook, deleteBook } from '../actions/main';
import mainValues from '../modules/values/mainValues';
import Spinner from 'react-native-loading-spinner-overlay';

const {
    ModalStyleContant,
    BookContainerInput,
    BookContainerLable,
    AuthContainerMainButton,
    AuthContainerMainButtonText,
    AuthContainerSecButton,
    errorMessageStyle,
} = mainStyle;

function addNew(titleValue, descriptionValue, setModalVisible, addNewBook) {

    if (titleValue.length > 1 && descriptionValue.length > 1) {
        addNewBook(titleValue, descriptionValue, setModalVisible)
    }
    else {
        Alert.alert("Somthing Went Wrong", "Please make sure that you enterd all the fileds!")
    }
}

function edit(titleValue, descriptionValue, setModalVisible, editBook, bookId) {
    if (titleValue.length > 1 && descriptionValue.length > 1) {
        editBook(titleValue, descriptionValue, setModalVisible, bookId)
    }
    else {
        Alert.alert("Somthing Went Wrong", "Please make sure that you enterd all the fileds!")
    }
}

ModalOptaions = (props) => {
    const {
        title, modalVisible, setModalVisible, errorTitle, errorMessage, addNewBook, loading, bookId, editBook, deleteBook
    } = props;

    const [titleValue, onTitleChange] = React.useState('');
    const [descriptionValue, onDescriptionChange] = React.useState('');

    if (errorMessage) returnAlert.alert(errorTitle, errorMessage);
    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
        >
            <Spinner visible={loading} />
            <View style={ModalStyleContant}>
                <HeaderAction
                    title={title}
                    btnTitle={"Close"}
                    action={"close"}
                    setModalVisible={setModalVisible}
                />
                <Text style={[BookContainerLable, { marginTop: mainValues.marginBig }]}>Title</Text>
                <TextInput
                    accessibilityLabel={'Title'}
                    style={BookContainerInput}
                    autoCapitalize={'none'}
                    placeholder={'Title'}
                    underlineColorAndroid={'transparent'}
                    onChangeText={text => onTitleChange(text)}
                    value={titleValue}
                />
                <Text style={BookContainerLable}>Description</Text>
                <TextInput
                    style={BookContainerInput}
                    multiline={true}
                    accessibilityLabel={'Description'}
                    placeholder={'Description'}
                    numberOfLines={4}
                    underlineColorAndroid={'transparent'}
                    onChangeText={text => onDescriptionChange(text)}
                    value={descriptionValue}
                />
                <TouchableOpacity style={[AuthContainerMainButton, { marginTop: mainValues.marginBig }]} onPress={title == "Add" ? () => { addNew(titleValue, descriptionValue, setModalVisible, addNewBook); onTitleChange(""); onDescriptionChange("") } : () => { edit(titleValue, descriptionValue, setModalVisible, editBook, bookId); onTitleChange(""); onDescriptionChange("") }}>
                    <Text style={AuthContainerMainButtonText}>{title}</Text>
                </TouchableOpacity>
                {title == "Edit" && <TouchableOpacity style={AuthContainerSecButton} onPress={() => deleteBook(setModalVisible, bookId)}>
                    <Text style={errorMessageStyle}>Delete Book</Text>
                </TouchableOpacity>}
            </View>
        </Modal>
    )
}

const mapStateToProps = ({ bookOps }) => {
    const {
        loading,
        errorTitle,
        errorMessage
    } = bookOps;

    return {
        loading,
        errorTitle,
        errorMessage
    }
}

export default connect(mapStateToProps, {
    addNewBook,
    editBook,
    deleteBook
})(ModalOptaions)