import React, { Component } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

const HeroIconClickable = ({ img, navigation, heroId }) => {
  return (
    <TouchableOpacity onPress={() => navigation.push("Hero", {
      heroId: heroId,
    })}>
      <Image source={{ uri: `https://cdn.cloudflare.steamstatic.com/${img}`}}
             style={styles.img}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
});

export default HeroIconClickable;
