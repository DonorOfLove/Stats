import React, { Component,useContext,useState } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import Context from "../../../context";

const Hero = ({route}) => {
  const heroId=route.params.heroId
  const context=useContext(Context)
  const hero=context.heroes[heroId]
    return (
      <View>
   <Image source={{uri:`https://cdn.cloudflare.steamstatic.com/${hero.img}`}} style={styles.img}/>
        <Text style={styles.stats}>{hero.localized_name}</Text>
        <Text style={styles.stats}>{hero.attack_type}</Text>
        <Text style={styles.stats}>{hero.roles.map((role)=>{
          return(<Text style={styles.stats}>{role} </Text>)})}</Text>
        <Text style={styles.stats}>Move Speed: {hero.move_speed}</Text>
        <Text style={styles.stats}>Base Dmg: {hero.base_attack_min+hero['base_'+hero.primary_attr]}-
          {hero.base_attack_max+hero['base_'+hero.primary_attr]}</Text>
        <Text style={styles.stats}>Base Armor: {hero.base_armor}</Text>
        <Text style={styles.stats}>Attack Range: {hero.attack_range}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
img:{
  width:'100%',
  height:'65%'
},
  stats:{
  color:'#fff',
    fontSize:15
  }
});

export default Hero
