import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from "react-native";

const PlayerList = ({navigation}) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("https://api.opendota.com/api/search?q=DonorOfLove")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setList(data);
      });
  }, []);
function showDate(item) {
  let d=new Date(item.last_match_time)
  if(d.getDate()&&d.getMonth()&&d.getFullYear()){
    return `Last game: ${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`
  } else return null
}
  return (
    <View style={styles.container}>
      {Object.entries(list).length > 0 ? (
        <FlatList
          data={list}
          renderItem={({ item }) => <TouchableOpacity onPress={() => navigation.push("Profile", {
            id: item.account_id,
          })}>
            <View style={styles.card}>
              <Image source={{ uri: item.avatarfull }} style={{ width: 50, height: 50 }} />
              <View>
                <Text style={styles.name}>{item.personaname}</Text>
                <Text style={styles.name}>{showDate(item)}</Text>
              </View>
            </View>
          </TouchableOpacity>}
          keyExtractor={(item) => item.account_id} />
      ) : (
        <Image source={{ uri: "https://c.tenor.com/RVvnVPK-6dcAAAAM/reload-cat.gif" }}
               style={{ width: 50, height: 50 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: "row", marginTop: 10 },
  name: {
    marginLeft: 5,
    color: "#fff",
  },
});
export default PlayerList;
