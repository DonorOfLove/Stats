import React, { Component, useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Image, ScrollView } from "react-native";
import LoadingCat from "./LoadingCat";
import HeroIconClickable from "./auxiliary/HeroIconClickable";
import Context from "../../context";

export default function Profile({ route }) {
  const context = React.useContext(Context);
  const account_id = route.params.id;
  const [profile, setProfile] = useState({});
  const [wl, setWl] = useState({});
  const [recentMathes, setRecentMathces] = useState([]);
  const [playedHeroes, setPlayedHeroes] = useState([]);
  const lobbys = {
    0: {
      "name": "Normal",
    },
    1: {
      "name": "Practice",
    },
    2: {
      "name": "Tournament",
    },
    3: {
      "name": "Tutorial",
    },
    4: {
      "name": "Coop Bots",
    },
    5: {
      "name": "Group Ranked",
    },
    6: {

      "name": "Solo Ranked",
    },
    7: {
      "name": "Ranked",
    },
    8: {
      "name": "1v1",
    },
    9: {
      "name": "Battle Cup",
    },
  };

  useEffect(() => {
    fetch(`https://api.opendota.com/api/players/${account_id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProfile(data);
      });
    fetch(`https://api.opendota.com/api/players/${account_id}/wl`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setWl(data);
      });

    fetch(`https://api.opendota.com/api/players/${account_id}/recentMatches`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRecentMathces(data);
      });
    fetch(`https://api.opendota.com/api/players/${account_id}/heroes`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let arr = [];
        for (let i = 0; i < 10; i++) {
          arr.push(data[i]);
        }
        setPlayedHeroes(arr);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {Object.entries(profile).length > 0 && Object.entries(wl).length > 0 ? (
        <>
          <View style={styles.summary}>
            <Image
              source={{ uri: profile.profile.avatar }}
              style={{ width: 100, height: 100 }} />
            <View>
              <Text style={styles.nick}>{profile.profile.personaname}</Text>
              <Text>
                <Text style={{ color: "green", fontSize: 20 }}>{wl.win}</Text><Text
                style={{ color: "#fff", fontSize: 20 }}> - </Text>
                <Text style={{ color: "red", fontSize: 20 }}>{wl.lose}</Text>
                <Text style={{color:'#fff'}}> {((wl.win / (wl.win+wl.lose)) * 100).toFixed(1)}%</Text>
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ color: "#fff" }}>Recent Matches:</Text>
            <View style={{ flexDirection: "row" }}><Text
              style={{ color: "#fff", width: "25%", marginLeft: "7%" }}>W/L:</Text>
              <Text style={{ color: "#fff", width: "25%" }}>Duration:</Text><Text
                style={{ color: "#fff", width: "25%" }}>K/D/A:</Text>
              <Text style={{ color: "#fff", width: "25%" }}>Team:</Text></View>
            {recentMathes.map((match) => {
              return (
                <View style={{ flexDirection: "row" }}>
                  <HeroIconClickable img={context.heroes[match.hero_id].img} />
                  <View style={{ flexDirection: "column", width: "25%" }}>
                    {match.player_slot <= 4 ? (
                      match.radiant_win ? (
                        <Text style={{ color: "green" }}>Win</Text>) : (
                        <Text style={{ color: "red" }}>Lose</Text>)) : (null)}
                    {match.player_slot > 4 ? (
                      match.radiant_win ? (
                        <Text style={{ color: "red" }}>Lose</Text>) : (
                        <Text style={{ color: "green" }}>Win</Text>)) : (null)}
                    <Text style={{ color: "#4389a4" }}>{lobbys[match.lobby_type].name}</Text>
                  </View>
                  <Text style={{
                    color: "#fff",
                    width: "25%",
                  }}> {`${Math.floor(match.duration / 60)}:${match.duration % 60}`}</Text>
                  <Text style={{
                    marginLeft: 10,
                    color: "#fff",
                    width: "25%",
                  }}>{match.kills}/{match.deaths}/{match.assists}</Text>
                  {match.player_slot < 4 ? (
                    <Text style={{ color: "#fff", width: "25%" }}>Radiant</Text>) : (
                    <Text style={{ color: "#fff" }}>Dire</Text>)}
                </View>
              );
            })}
          </View>
          <View>
            <Text style={{ color: "#fff" }}>
              Most played heroes:
              {playedHeroes.map((hero) => {
                return (
                  <>
                    <Text>
                      <HeroIconClickable img={context.heroes[hero.hero_id].img} />
                      Games: {hero.games} -win:
                      {((hero.win / hero.games) * 100).toFixed(1)}%
                    </Text>
                  </>
                );
              })}
            </Text>
          </View>
        </>
      ) : (
        <LoadingCat />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  summary: {
    flexDirection: "row",
  },
  nick: {
    color: "#fff",
    fontSize: 25,
  },
});
