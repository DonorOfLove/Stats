import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Image,ImageBackground, Dimensions  } from "react-native";
import PlayerCard from "./PlayerCard";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const Match= ({navigation}) =>{

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

  function getMinutes() {
    let arr=[]
    const keys=Object.keys(matches.radiant_gold_adv)
    arr.push(+keys[0])
    arr.push(Math.floor(keys.length/4))
    arr.push(Math.floor(keys.length/2))
    arr.push(Math.floor(keys.length/1.8))
    arr.push(keys.length)
    return arr
  }
  useEffect(() => {
    fetch("https://api.opendota.com/api/matches/6595770944")
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
      <ImageBackground source={require('../../assets/shutter.png')}>
      {Object.entries(matches).length > 0 ? (
          <View style={styles.main}>
            <Text style={styles.text}>match id: {matches.match_id}</Text>
            <Text style={styles.text}>
              <Text style={styles.radiant}>{matches.radiant_score}</Text>
              <Text style={{fontSize:15}}> {`${Math.floor(matches.duration / 60)}:${matches.duration % 60}`} </Text>
              <Text style={styles.dire}>{matches.dire_score}</Text>
            </Text>
            <Text style={styles.text}>{matches.radiant_win ? "Radiant" : "Dire"} Win</Text>
            <Text style={styles.radiant}>Radiant Team:</Text>
            <ScrollView horizontal={true} contentContainerStyle={{
              flexDirection: "column",
            }}>
              <View style={styles.table}>
                <Text style={{ width: 175, color: "#fff" }}>NAME</Text>
                <Text style={{ width: 110, color: "#fff" }}>K/D/A</Text>
                <Text style={{ width: 255, color: "#fff" }}>ITEMS</Text>
                <Text style={{ width: 95, color: "#fff" }}>NET</Text>
                <Text style={{ width: 30, color: "#fff" }}>LH /</Text>
                <Text style={{ width: 50, color: "#fff" }}>DN</Text>
                <Text style={{ width: 50, color: "#fff" }}>GPM /</Text>
                <Text style={{ width: 70, color: "#fff" }}>EPM</Text>
                <Text style={{ width: 50, color: "#fff" }}>DMG</Text>
                <Text style={{ width: 70, color: "#fff" }}>HEAL</Text>
              </View>
              {radiantTeam.map((player, index) => {
                return (
                  <PlayerCard player={player} key={player.id} items={items} itemIds={itemIds} navigation={navigation}/>
                );
              })}
            </ScrollView>
            <Text style={styles.dire}>Dire Team:</Text>
            <ScrollView horizontal={true} contentContainerStyle={{
              flexDirection: "column",
            }}>
              <View style={styles.table}>
                <Text style={{ width: 175, color: "#fff" }}>NAME</Text>
                <Text style={{ width: 110, color: "#fff" }}>K/D/A</Text>
                <Text style={{ width: 255, color: "#fff" }}>ITEMS</Text>
                <Text style={{ width: 95, color: "#fff" }}>NET</Text>
                <Text style={{ width: 30, color: "#fff" }}>LH /</Text>
                <Text style={{ width: 50, color: "#fff" }}>DN</Text>
                <Text style={{ width: 50, color: "#fff" }}>GPM /</Text>
                <Text style={{ width: 70, color: "#fff" }}>EPM</Text>
                <Text style={{ width: 50, color: "#fff" }}>DMG</Text>
                <Text style={{ width: 70, color: "#fff" }}>HEAL</Text>
              </View>
              {direTeam.map((player, index) => {
              return (
                <PlayerCard player={player} key={player.id} items={items} itemIds={itemIds} navigation={navigation} />
              );
            })}
            </ScrollView>
            <LineChart
                segments={5}
                data={{
                  labels: getMinutes(),
                  datasets: [
                    {
                      data: Object.values(matches.radiant_gold_adv)
                    }
                  ]
                }}
                width={Dimensions.get("window").width-20} // from react-native
                height={220}
                yAxisInterval={3} // optional, defaults to 1
                chartConfig={{
                  strokeWidth:5,
                  backgroundColor: "#adff0f",
                  backgroundGradientFrom: "#000000",
                  backgroundGradientTo: "#6f4d26",
                  decimalPlaces: 0,
                  barPercentage: 10,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  propsForDots: {
                    r: "1",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                  },

                }}
                bezier
            />
          </View>)
        : <Image
          source={{ uri: "https://www.google.com/search?q=cat+loading&client=opera-gx&tbm=isch&source=iu&ictx=1&vet=1&fir=kCf8-mUN82f7tM%252Csorzrv2AVsrrbM%252C_%253BgKVgsqzUoRHs0M%252Ce1GKW12_HBOxpM%252C_%253Bc0si6LcJh3Rg3M%252CkGUhCQsia4LQzM%252C_%253BROVxQkjOVfMpmM%252Cis0i1qFXwHrINM%252C_%253B7JU-dOyqNaAK6M%252Csorzrv2AVsrrbM%252C_%253Bs0p4deNm_erUsM%252CMqZ23scndMf2mM%252C_%253BpOVzCpejiVzIEM%252CrbNF25HUaqQSGM%252C_%253Bxa2IxPTCGD2glM%252CwB-fOR2BTwgMrM%252C_%253BaHVev3ZUVGAV_M%252CczljSH9C0Oa-1M%252C_%253BNqlv9ZWxbh6j8M%252CgerAgPg9yYdx0M%252C_%253BS9mu2B-KquhRYM%252Cuz0SOJe6erlFBM%252C_%253B4IgPrekgQClHLM%252Csorzrv2AVsrrbM%252C_%253BPo2FHICnu2qBXM%252CGhqndHZN5UgvaM%252C_%253BRoT1YjzgcP7--M%252CczljSH9C0Oa-1M%252C_%253B8OUB1cItRSl3NM%252C4_mxGIV9xYQTGM%252C_&usg=AI4_-kRzENVyJsS142JSB25DHaiontQLLw&sa=X&ved=2ahUKEwivnui81Yn4AhWJM-wKHbZLCNQQ9QF6BAgREAE&biw=1366&bih=665&dpr=1#imgrc=gKVgsqzUoRHs0M" }} />}
      </ImageBackground>

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
  main:{
    textAlign:'center',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  },
  table: {
    flexDirection: "row",
    width: "100%",
    marginLeft:50
  },

  dire: {
    color: "#a51e1e",
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
export default Match
