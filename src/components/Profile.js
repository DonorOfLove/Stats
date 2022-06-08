import React, { Component, useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import LoadingCat from "./LoadingCat";
import HeroIconClickable from "./auxiliary/HeroIconClickable";
import Context from "../../context";
import CrossPlatformIcon from "react-native-cross-platform-icons";

export default function Profile({ route, navigation }) {
  const context = React.useContext(Context);
  const account_id = route.params.id;
  const [profile, setProfile] = useState({});
  const [wl, setWl] = useState({});
  const [recentMatches, setRecentMatches] = useState([]);
  const [playedHeroes, setPlayedHeroes] = useState([]);
  const [peers, setPeers] = useState([]);
  const winHeroFlag = useRef(true);
  const gamesHeroFlag = useRef(true);
  const winUserFlag = useRef(true);
  const gamesUserFlag = useRef(true);

  function heroWinRateSort() {
    let copy = JSON.parse(JSON.stringify(playedHeroes));
    if (winHeroFlag.current) {
      setPlayedHeroes(copy.sort((a, b) => getWinRate(b.win, b.games) < getWinRate(a.win, a.games) ? 1 : -1));
    } else {
      setPlayedHeroes(copy.sort((a, b) => getWinRate(b.win, b.games) > getWinRate(b.win, b.games) ? 1 : -1));
    }
    winHeroFlag.current = !winHeroFlag.current;
  }

  function heroGamesSort() {
    let copy = JSON.parse(JSON.stringify(playedHeroes));
    if (gamesHeroFlag.current) {
      setPlayedHeroes(copy.sort((a, b) => b.games > a.games ? 1 : -1));
    } else {
      setPlayedHeroes(copy.sort((a, b) => b.games < a.games ? 1 : -1));
    }
    gamesHeroFlag.current = !gamesHeroFlag.current;
  }

  function userWinRateSort() {
    let copy = JSON.parse(JSON.stringify(peers));
    if (winUserFlag.current) {
      setPeers(copy.sort((a, b) => getWinRate(b.with_win, b.with_games) < getWinRate(a.with_win, a.with_games) ? 1 : -1));
    } else {
      setPeers(copy.sort((a, b) => getWinRate(b.with_win, b.with_games) > getWinRate(b.with_win, b.with_games) ? 1 : -1));
    }
    winUserFlag.current = !winUserFlag.current;
  }

  function userGamesSort() {
    let copy = JSON.parse(JSON.stringify(peers));
    if (gamesUserFlag.current) {
      setPeers(copy.sort((a, b) => b.with_games > a.with_games ? 1 : -1));
    } else {
      setPeers(copy.sort((a, b) => b.with_games < a.with_games ? 1 : -1));
    }
    gamesUserFlag.current = !gamesUserFlag.current;
  }

  function getWinRate(win, games) {
    return ((win / games) * 100).toFixed(1);
  }

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
        setRecentMatches(data);
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
    fetch(`https://api.opendota.com/api/players/${account_id}/peers`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPeers(data);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {Object.entries(profile).length > 0 && Object.entries(wl).length > 0 ? (
        <>
          <View style={styles.summary}>
            <View style={{ width: "27%" }}>
              <Image source={{ uri: profile.profile.avatarfull }}
                     style={{ width: 100, height: 100, borderRadius: 10 }} />
            </View>
            <View style={{ width: "50%" }}>
              <Text style={styles.nick}>{profile.profile.personaname}</Text>
              <Text>
                <Text style={{ color: "green", fontSize: 20 }}>{wl.win}</Text><Text
                style={{ color: "#fff", fontSize: 20 }}> - </Text>
                <Text style={{ color: "red", fontSize: 20 }}>{wl.lose}</Text>
              </Text>
              <Text style={{ color: "#fff" }}> {((wl.win / (wl.win + wl.lose)) * 100).toFixed(1)}%</Text>
            </View>
            <View>
              <View style={{ width: "25%" }}>
                <Image style={{ width: 100, height: 100 }}
                       source={{ uri: `https://www.opendota.com/assets/images/dota2/rank_icons/rank_star_${JSON.stringify(profile.rank_tier)[1]}.png` }} />
                <Image style={{ width: 100, height: 100, marginTop: -95 }}
                       source={{ uri: `https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_${JSON.stringify(profile.rank_tier)[0]}.png` }} />
              </View>
              <Text style={{
                color: "#fff",
                fontSize: 15,
                textAlign: "center",
                marginTop: -15,
              }}>{profile.mmr_estimate.estimate}</Text>
            </View>
          </View>
          <View>
            <Text style={{ color: "#fff", fontSize: 20 }}>Recent Matches:</Text>
            <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 10, backgroundColor: "rgb(23,22,22)" }}>
              <Text style={{ color: "#fff", width: "25%", marginLeft: "9%" }}>W/L:</Text>
              <Text style={{ color: "#fff", width: "25%" }}>Duration:</Text><Text
              style={{ color: "#fff", width: "25%" }}>K/D/A:</Text>
              <Text style={{ color: "#fff", width: "25%" }}>Team:</Text>
            </View>
            {recentMatches.map((match) => {
              return (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <HeroIconClickable img={context.heroes[match.hero_id].img} hero={context.heroes[match.hero_id]} navigation={navigation}/>
                  <View style={{ flexDirection: "column", width: "25%" }}>
                    {match.player_slot <= 4 ? (
                      match.radiant_win ? (
                        <Text style={{ color: "green", fontSize: 15 }}>Win</Text>) : (
                        <Text style={{ color: "red", fontSize: 15 }}>Lose</Text>)) : (null)}
                    {match.player_slot > 4 ? (
                      match.radiant_win ? (
                        <Text style={{ color: "red", fontSize: 15 }}>Lose</Text>) : (
                        <Text style={{ color: "green", fontSize: 15 }}>Win</Text>)) : (null)}
                    <Text style={styles.blue}>{lobbys[match.lobby_type].name}</Text>
                  </View>
                  <Text style={{
                    color: "#fff",
                    width: "25%",
                    fontSize: 15,
                  }}> {`${Math.floor(match.duration / 60)}:${match.duration % 60}`}</Text>
                  <Text style={{ marginLeft: 10, fontSize: 15, color: "#fff", width: "25%" }}>
                    <Text style={styles.kills}>{match.kills}</Text>/
                    <Text style={styles.deaths}>{match.deaths}</Text>/{match.assists}</Text>
                  {match.player_slot < 4 ? (
                    <Text style={styles.white}>Radiant</Text>) : (
                    <Text style={styles.white}>Dire</Text>)}
                </View>
              );
            })}
          </View>
          <View>
            <Text style={{ color: "#fff", marginTop: 15, fontSize: 20 }}> Most played heroes:</Text>
            <View style={styles.table}>
              <Text style={styles.white}>Hero:</Text>
              <TouchableOpacity onPress={() => heroGamesSort()}>
                <Text style={{ color: "#4389a4", marginLeft: 100, fontSize: 15 }}>
                  <CrossPlatformIcon name={!gamesHeroFlag.current ? ("arrow-up") : ("arrow-down")}
                                     size={15} color="#4389a4" outline />Matches:</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => heroWinRateSort()}>
                <Text style={{ color: "#4389a4", fontSize: 15 }}>
                  <CrossPlatformIcon name={winHeroFlag.current ? ("arrow-up") : ("arrow-down")}
                                     size={15} color="#4389a4" outline />
                  Win rate:
                </Text>
              </TouchableOpacity>
            </View>
            {playedHeroes.map((hero) => {
              return (
                <View style={styles.card}>
                  <TouchableOpacity style={styles.avatar}>
                    <HeroIconClickable img={context.heroes[hero.hero_id].img}/>
                    <Text style={styles.white}>{context.heroes[hero.hero_id].localized_name}</Text>
                  </TouchableOpacity>
                  <Text style={styles.white}> {hero.games}</Text>
                  <Text style={styles.white}>{getWinRate(hero.win, hero.games)}%</Text>
                </View>
              );
            })}
          </View>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <Text style={{ color: "#fff", marginTop: 15, fontSize: 20 }}>Played with:</Text>
            <View style={styles.table}>
              <Text style={styles.white}>Player:</Text>
              <TouchableOpacity onPress={() => userGamesSort()}>
                <Text style={{ color: "#4389a4", marginLeft: 100, fontSize: 15 }}>
                  <CrossPlatformIcon name={!gamesUserFlag.current ? ("arrow-up") : ("arrow-down")}
                                     size={15} color="#4389a4" outline/>Matches:</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => userWinRateSort()}>
                <Text style={{ color: "#4389a4", fontSize: 15 }}>
                  <CrossPlatformIcon name={winUserFlag.current ? ("arrow-up") : ("arrow-down")}
                                     size={15} color="#4389a4" outline />
                  Win rate:</Text>
              </TouchableOpacity>
            </View>
            {peers.map((user) => {
              return (
                <View style={styles.card}>
                  <TouchableOpacity style={styles.avatar}>
                    <Image source={{ uri: user.avatar }} style={styles.img} />
                    <Text style={styles.white}>{user.personaname}</Text>
                  </TouchableOpacity>
                  <Text style={styles.white}>{user.with_games}</Text>
                  <Text style={styles.white}>{getWinRate(user.with_win, user.with_games)}%</Text>
                </View>
              );
            })}
          </View>
        </>
      ) : (
        <LoadingCat />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  white: {
    color: "#fff",
    fontSize: 15,
  },
  blue: {
    color: "#4389a4",
    fontSize: 15,
  },
  container: {
    padding: 10,
    marginBottom: 20,
    paddingBottom: 20,
  },
  summary: {
    flexDirection: "row",
    marginBottom: 20,

  },
  nick: {
    color: "#fff",
    fontSize: 25,

  },
  card: {
    width: "100%",
    justifyContent: "space-between",
    color: "#fff",
    flexDirection: "row",
  },
  table: {
    width: "100%",
    justifyContent: "space-between",
    color: "#fff",
    flexDirection: "row",
    marginVertical: 15,
    backgroundColor: "rgb(23,22,22)",
  },
  avatar: {
    flexDirection: "row", width: "30%", paddingBottom: 5,
  },
  kills: {
    marginLeft: 10,
    fontSize: 15,
    color: "#6dcc3f",

  },
  deaths: {
    marginLeft: 10,
    fontSize: 15,
    color: "#be1c2b",
  },
  img: { width: 30, height: 30, marginRight: 5 },
});
