import "react-native-gesture-handler";
import React from "react";
import {ImageBackground, StyleSheet} from "react-native";
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import DrawerNav from "./src/components/DrawerNav";
import Profile from "./src/components/Profile";
import Context from "./context";

const navTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "transparent",
    },
};
const Stack = createStackNavigator();

const App = () => {
    const [heroes, setHeroes] = React.useState([])
    React.useEffect(() => {
        fetch("https://api.opendota.com/api/constants/heroes")

            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setHeroes(data);
            });

    }, []);

    return (
        <Context.Provider value={{heroes}}>
            <ImageBackground source={require("./src/assets/shutter.png")}
                             style={{width: "100%", height: "100%"}}>
                <NavigationContainer theme={navTheme}>
                    <Stack.Navigator initialRouteName={"DrawerNav"}>
                        <Stack.Screen name="DrawerNav" component={DrawerNav}/>
                        <Stack.Screen name="Profile" component={Profile}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </ImageBackground>
        </Context.Provider>
    );
};

const styles = StyleSheet.create({});

export default App;
