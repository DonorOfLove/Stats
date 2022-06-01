import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import _ from "lodash"

const playerCard = ({ player }) => {

  const [hero,setHero]=React.useState({})
  const [items,setItems]=useState({})

  React.useEffect(()=> {
    fetch('https://api.opendota.com/api/constants/heroes')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHero(data[player.hero_id])
      })
    fetch('https://api.opendota.com/api/constants/item_ids')
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        setItems(data)
      })},[])

    return (
      <View style={styles.main}>
        {!_.isEmpty(hero)?(
          <Image source={{uri:`https://cdn.cloudflare.steamstatic.com/${hero.icon}`}}
                 style={{width:50, height:50}}/>
        ):(
          <Image source={{uri:  "https://http.cat/102"}}
                 style={{width:50, height:50}}/>
        )}
        <Text>{player.level} {player.personaname||"Anon"}</Text>
        <Text> {player.kills}/{player.deaths}/{player.assists}</Text>
        <Image source={{uri:`https://cdn.cloudflare.steamstatic.com/${items[player.item_0].img}`}}
        style={{width:50,height:50}}/>
      </View>
    );
}

const styles = StyleSheet.create({
main:{
  display:'flex',
  flexDirection:'row'
}
});

export default playerCard
