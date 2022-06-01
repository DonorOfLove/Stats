import 'react-native-gesture-handler'
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View,} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./components/Home";
import News from "./components/News";
import Match from "./components/Match/Match"

const Drawer = createDrawerNavigator();

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Match" component={Match} />
        <Drawer.Screen name="News" component={News} />
      </Drawer.Navigator>
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({

});

export default App;
