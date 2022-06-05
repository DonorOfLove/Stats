import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView,TouchableOpacity} from "react-native";
import _ from "lodash";
import HeroIconClickable from "../auxiliary/HeroIconClickable";
import Context from "../../../context"

const playerCard = ({player,items,itemIds, navigation }) => {

const context=React.useContext(Context)
  const [hero, setHero] = React.useState({});

  React.useEffect(() => {
        setHero(context.heroes[player.hero_id]);
  }, []);

  return (
    <View style={styles.main}>
      {!_.isEmpty(hero) ? (
        <HeroIconClickable img={hero.img}/>
      ) : (
          <Image source={{uri:'https://c.tenor.com/RVvnVPK-6dcAAAAM/reload-cat.gif'}} style={{ width: 150, height: 150 }}/>
      )}
      <View style={styles.info}><View style={styles.lvl}>
        <Text style={{color:'#ffffff'}}>{player.level}</Text>
      </View>
        {player.personaname?(
            <TouchableOpacity onPress={()=>navigation.push('Profile',{
    id:player.account_id})}>
              <Text style={{color:'#fff'}}>{player.personaname}</Text></TouchableOpacity>
        ):(
          <Text  style={{color:'#fff'}}>Anon</Text>
        )}
      </View>
      <Text style={styles.KDA}> {player.kills}/{player.deaths}/{player.assists} </Text>
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
      <Text style={styles.epm}>{player.xp_per_min}</Text>
      <Text style={styles.damage}>{player.hero_damage}</Text>
      <Text style={styles.healing}>{player.hero_healing}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    padding:10,
  },
  lvl:{
    backgroundColor:'#ae8e43',
    borderRadius: 15,
    width:25,
    height:25,
    alignItems:'center',
   justifyContent:'center',
    marginRight:5,
  },
  image:{
    width:30,
    height:30,
    marginRight:5,
  },
  KDA:{
    color:'#fff',
    fontSize:16,
    width:120
  },
  info:{
    color:'#fff',
    fontSize:15,
    width:175,
    flexDirection:"row",
    alignItems:'center',
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
    marginLeft:20,
    color:'#fff',
    fontSize:15,
    width:50
  },
  epm:{
    color:'#fff',
    fontSize:15,
    width:70
  },
  damage:{
    color:'#fff',
    fontSize:15,
    width:50
  },
  healing:{
    color:'#fff',
    fontSize:15,
    width:50
  }

});

export default playerCard;
