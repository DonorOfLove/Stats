import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import PlayerCard from "./PlayerCard";

export default function App() {

  const [matches, setMatches] = useState({});
  const [direTeam, setDireTeam] = useState([]);
  const [radiantTeam, setRadiantTeam] = useState([]);

  const [itemIds, setItemIds] = React.useState({});
  const [items, setItems] = useState({});

  function teamSort(players) {
    let radiant = [];
    let dire = [];
    for (let player of players) {
      if (player.isRadiant) {
        radiant.push(player);
      } else {
        dire.push(player);
      }
    }
    setRadiantTeam(radiant);
    setDireTeam(dire);
  }

  useEffect(() => {
    fetch("https://api.opendota.com/api/matches/6594429669")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMatches(data);
        teamSort(data.players);
      });
    fetch("https://api.opendota.com/api/constants/item_ids")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setItemIds(data);
      });
    fetch("https://api.opendota.com/api/constants/items")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setItems(data);
      });
  }, []);

  return (
    <ScrollView style={styles.root}>
      {Object.entries(matches).length > 0 ? (
          <View>
            <Text style={styles.text}>match id: {matches.match_id}</Text>
            <Text style={styles.text}>{`${Math.floor(matches.duration / 60)}:${matches.duration % 60}`}</Text>
            <Text style={styles.text}>
              <Text style={styles.radiant}>{matches.radiant_score}</Text>-<Text
              style={styles.dire}>{matches.dire_score}</Text>
            </Text>
            <Text style={styles.text}>{matches.radiant_win ? "Radiant" : "Dire"} Win</Text>
            <Text style={styles.radiant}>Radiant Team:</Text>

            <ScrollView horizontal={true} contentContainerStyle={{
              flexDirection: "column",
            }}>
              {/*<View style={styles.table}>*/}
              {/*  <Text style={{ width: "30%", color: "#fff" }}>NAME</Text>*/}
              {/*  <Text style={{ width: "25%", color: "#fff" }}>K/D/A</Text>*/}
              {/*  <Text style={{ width: "30%", color: "#fff" }}>ITEMS</Text>*/}
              {/*</View>*/}
              {radiantTeam.map((player, index) => {
                return (
                  <PlayerCard player={player} key={player.id} items={items} itemIds={itemIds} />
                );
              })}
            </ScrollView>
            <Text style={styles.dire}>Dire Team:</Text>
            <ScrollView horizontal={true} contentContainerStyle={{
              flexDirection: "column",
            }}>
              {/*<View style={styles.table}>*/}
              {/*  <Text style={{ width: "30%", color: "#fff" }}>NAME</Text>*/}
              {/*  <Text style={{ width: "25%", color: "#fff" }}>K/D/A</Text>*/}
              {/*  <Text style={{ width: "30%", color: "#fff" }}>ITEMS</Text>*/}
              {/*</View>*/}
              {direTeam.map((player, index) => {
              return (
                <PlayerCard player={player} key={player.id} items={items} itemIds={itemIds} />
              );
            })}
            </ScrollView>
          </View>)
        : <Image
          source={{ uri: "https://www.google.com/search?q=cat+loading&client=opera-gx&tbm=isch&source=iu&ictx=1&vet=1&fir=kCf8-mUN82f7tM%252Csorzrv2AVsrrbM%252C_%253BgKVgsqzUoRHs0M%252Ce1GKW12_HBOxpM%252C_%253Bc0si6LcJh3Rg3M%252CkGUhCQsia4LQzM%252C_%253BROVxQkjOVfMpmM%252Cis0i1qFXwHrINM%252C_%253B7JU-dOyqNaAK6M%252Csorzrv2AVsrrbM%252C_%253Bs0p4deNm_erUsM%252CMqZ23scndMf2mM%252C_%253BpOVzCpejiVzIEM%252CrbNF25HUaqQSGM%252C_%253Bxa2IxPTCGD2glM%252CwB-fOR2BTwgMrM%252C_%253BaHVev3ZUVGAV_M%252CczljSH9C0Oa-1M%252C_%253BNqlv9ZWxbh6j8M%252CgerAgPg9yYdx0M%252C_%253BS9mu2B-KquhRYM%252Cuz0SOJe6erlFBM%252C_%253B4IgPrekgQClHLM%252Csorzrv2AVsrrbM%252C_%253BPo2FHICnu2qBXM%252CGhqndHZN5UgvaM%252C_%253BRoT1YjzgcP7--M%252CczljSH9C0Oa-1M%252C_%253B8OUB1cItRSl3NM%252C4_mxGIV9xYQTGM%252C_&usg=AI4_-kRzENVyJsS142JSB25DHaiontQLLw&sa=X&ved=2ahUKEwivnui81Yn4AhWJM-wKHbZLCNQQ9QF6BAgREAE&biw=1366&bih=665&dpr=1#imgrc=gKVgsqzUoRHs0M" }} />}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    flexGrow: 1,
    backgroundColor: "#180b25",
  },
  table: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },

  dire: {
    color: "#8b1717",
    fontSize: 25,
  },
  radiant: {
    color: "#49ac4a",
    fontSize: 25,
  },
  text: {
    color: "#fff",
    fontSize: 25,
  },
});
