import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Match from "./Match/Match";
import News from "./News";
import PlayerList from "./PlayersList/PlayerList";
import {createDrawerNavigator} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const DrawerNav = (props)=>{
    return (
        <Drawer.Navigator initialRouteName="Home">

            <Drawer.Screen name="Match" component={Match} />
            <Drawer.Screen name="News" component={News} />
            <Drawer.Screen name="PlayerList" component={PlayerList} />
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({  }
)

export default DrawerNav
