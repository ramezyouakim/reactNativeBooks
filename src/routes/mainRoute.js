import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import HomeScreen from '../screens/homeScreen';
import ProfileScreen from '../screens/profileScreen';
import LoginScreen from '../screens/loginScreen';
import SignupScreen from '../screens/signupScreen';

import MenuButton from '../components/leftHeaderMenu';
import User from '../classes/user';

// Main
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

//logout
function logout() {
  const navigation = useNavigation();
  User.removeInstance()
  navigation.reset({
    routes: [{ name: "Login" }]
  })
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home" >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="My Books" component={ProfileScreen} />
      <Drawer.Screen name="Log out" component={() => <>{logout()}</>} />
    </Drawer.Navigator >
  );
}

// Main App Navigator
function AppNavigator() {
  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={({ }) => ({
          headerLeft: () => <MenuButton />
        })}>
        < Stack.Screen name="home" options={({ }) => ({ title: "Books App" })} component={DrawerNavigator} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ header: () => null }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ header: () => null }} />
      </Stack.Navigator>
    </NavigationContainer >

  );
}

export default AppNavigator;
