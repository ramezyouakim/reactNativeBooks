import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux'
import mainStyle from '../modules/style/mainStyle';

// actions
import { createAccount } from '../actions/main';

const {
    AuthContainer,
    AuthContainerInput,
    AuthInputContainer,
    shadowBox,
    AuthContainerHeader,
    AuthContainerMainButton,
    AuthContainerMainButtonText,
    AuthContainerSecButton,
    AuthContainerSecButtonText,
    errorMessageStyle
} = mainStyle;

class SignupScreen extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    goToLogin() {
        const {
            navigation
        } = this.props;
        navigation.reset({
            routes: [{ name: "Login" }]
        })
    }


    signUp(username, password, navigation) {
        const {
            createAccount
        } = this.props;
        if (username.length > 1 && password.length > 1) {
            createAccount(username, password, navigation);
        }
        else {
            Alert.alert("Somthing Went Wrong", "Please make sure that you enterd all the fileds!")
        }

    }

    render() {
        const {
            username,
            password
        } = this.state;

        const {
            loading,
            errorTitle,
            errorMessage,
            navigation
        } = this.props;
        return (
            <View style={AuthContainer}>
                <Spinner visible={loading} />
                <Text style={AuthContainerHeader}>Create Account</Text>
                <View>
                    {errorMessage !== null && <Text style={errorMessageStyle}>{errorMessage}</Text>}
                </View>
                <View style={[AuthInputContainer, shadowBox]}>
                    <TextInput
                        accessibilityLabel={'Username'}
                        style={AuthContainerInput}
                        keyboardType={'email-address'}
                        autoCapitalize={'none'}
                        placeholder={'Username'}
                        onChangeText={(value) => this.setState({ username: value })}
                        underlineColorAndroid={'transparent'}
                    />
                    <TextInput
                        accessibilityLabel={'Password'}
                        style={[AuthContainerInput, { borderBottomWidth: 0 }]}
                        autoCapitalize={'none'}
                        placeholder={'Password'}
                        onChangeText={(value) => this.setState({ password: value })}
                        secureTextEntry={true}
                        underlineColorAndroid={'transparent'}
                    />
                </View>
                <TouchableOpacity style={AuthContainerMainButton} onPress={() => this.signUp(username, password, navigation)}>
                    <Text style={AuthContainerMainButtonText}>Create Account</Text>
                </TouchableOpacity>
                <Text style={{ textAlign: 'center' }}>OR</Text>
                <TouchableOpacity style={AuthContainerSecButton} onPress={() => this.goToLogin()}>
                    <Text style={AuthContainerSecButtonText}>Login Insted</Text>
                </TouchableOpacity>
            </View>
        )

    }

}
const mapStateToProps = ({ auth }) => {
    const {
        loading,
        errorTitle,
        errorMessage
    } = auth;

    return {
        loading,
        errorTitle,
        errorMessage
    }
}

export default connect(mapStateToProps, {
    createAccount
})(SignupScreen)