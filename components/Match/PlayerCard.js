import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView} from "react-native";
import _ from "lodash";

const playerCard = ({ player,items,itemIds }) => {

  const [hero, setHero] = React.useState({});

  React.useEffect(() => {
    fetch("https://api.opendota.com/api/constants/heroes")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHero(data[player.hero_id]);
      });

  }, []);

  return (
    <View style={styles.main}>
      {!_.isEmpty(hero) ? (
        <Image source={{ uri: `https://cdn.cloudflare.steamstatic.com/${hero.icon}` }}
               style={styles.image} />
      ) : (
        <Image source={{ uri: "https://http.cat/102" }}
               style={styles.image} />
      )}
      <Text style={styles.info}>{player.level} {player.personaname || "Anon"}</Text>

      <Text style={styles.KDA}> {player.kills}/{player.deaths}/{player.assists}  </Text>

      <View style={styles.items}>
      {!_.isEmpty(items)&&player.item_0!==0 ? (
          <Image source={{ uri: `https://cdn.cloudflare.steamstatic.com/${items[itemIds[player.item_0]]['img']}`}}
                 style={styles.image} />)
        : (
          null
        )}
        {!_.isEmpty(items)&&player.item_1!==0 ? (
            <Image source={{ uri: `https://cdn.cloudflare.steamstatic.com/${items[itemIds[player.item_1]]['img']}`}}
                   style={styles.image} />)
          : (
            null
          )}
        {!_.isEmpty(items)&&player.item_2!==0 ? (
            <Image source={{ uri: `https://cdn.cloudflare.steamstatic.com/${items[itemIds[player.item_2]]['img']}`}}
                   style={styles.image} />)
          : (
            null
          )}
        {!_.isEmpty(items)&&player.item_3!==0 ? (
            <Image source={{ uri: `https://cdn.cloudflare.steamstatic.com/${items[itemIds[player.item_3]]['img']}`}}
                   style={styles.image} />)
          : (
            null
          )}
        {!_.isEmpty(items)&&player.item_4!==0 ? (
            <Image source={{ uri: `https://cdn.cloudflare.steamstatic.com/${items[itemIds[player.item_4]]['img']}`}}
                   style={styles.image} />)
          : (
            null
          )}
        {!_.isEmpty(items)&&player.item_5!==0 ? (
            <Image source={{ uri: `https://cdn.cloudflare.steamstatic.com/${items[itemIds[player.item_5]]['img']}`}}
                   style={styles.image} />)
          : (
            null
          )}
      </View>
      <Text style={styles.net}>{player.net_worth}</Text>
      <Text style={styles.lh}>{player.last_hits}</Text>
      <Text style={styles.dn}>{player.denies}</Text>
      <Text style={styles.gpm}>{player.gold_per_min}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    padding:10,
  },
  image:{
    width:30,
    height:30,
    marginRight:5,
  },
  KDA:{
    color:'#fff',
    fontSize:20,
    width:125
  },
  info:{
    color:'#fff',
    fontSize:15,
    width:175
  },
  items:{
    flexDirection:'row',
    alignSelf:'flex-end',
    width:250,
  },
  net:{
    color:'#fadd4f',
    width:100,
    fontSize:15,
  },
  lh:{
    color:'#fff',
    width:30,
    fontSize:15,
  },
  dn:{
    color:'#fff',
    width:30,
    fontSize:15,
  },
  gpm:{
    color:'#fff',

    fontSize:15,
  }

});

export default playerCard;
