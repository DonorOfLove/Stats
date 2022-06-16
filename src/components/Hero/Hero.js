import React, { Component, useContext, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView,Dimensions} from "react-native";
import Context from "../../../context";

const Hero = ({ route }) => {
  const heroId = route.params.heroId;
  const context = useContext(Context);
  const hero = context.heroes[heroId];
  console.log( Dimensions.get('window').width,);
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: `https://cdn.cloudflare.steamstatic.com/${hero.img}` }} style={styles.avatar} />
      <View style={styles.atrPlace}>
        <Image source={require('../../assets/Attributes/Strength.png')} style={styles.atr}/>
        <Image source={require('../../assets/Attributes/Agility.png')} style={styles.atr}/>
        <Image source={require('../../assets/Attributes/Intelligence.png')} style={styles.atr}/>
      </View>

      <Text style={styles.stats}>{hero.localized_name}</Text>
      <Text style={styles.stats}>{hero.attack_type}</Text>
      <Text style={styles.stats}>{hero.roles.map((role) => {
        return (<Text style={styles.stats}>{role} </Text>);
      })}</Text>
      <Text style={styles.stats}>Move Speed: {hero.move_speed}</Text>
      <Text style={styles.stats}>Base Dmg: {hero.base_attack_min + hero["base_" + hero.primary_attr]}-
        {hero.base_attack_max + hero["base_" + hero.primary_attr]}</Text>
      <Text style={styles.stats}>Base Armor: {hero.base_armor}</Text>
      <Text style={styles.stats}>Attack Range: {hero.attack_range}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:{
    padding:10,
    flex:1,
    flexGrow:1

  },
  avatar: {
    width:Dimensions.get('window').width,
    height: Dimensions.get('window').height/3,
    borderRadius:20
  },
  stats: {
    color: "#fff",
    fontSize: 15,
  },
  atr:{
    width:'30%',
    height:'100%'
  },
  atrPlace:{
    flexDirection:'row',
    height:'30%'
  }
});

export default Hero;
