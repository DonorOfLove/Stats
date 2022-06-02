import 'react-native-gesture-handler'
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View,} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlayerList from "./components/PlayerList";
import DrawerNav from "./components/DrawerNav";
import Profile from "./components/Profile";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={'DrawerNav'}>
            <Stack.Screen name="DrawerNav" component={DrawerNav} />
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({

});

export default App;
