import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity } from "react-native";

const HeroIconClickable = ({img}) => {

    return (
      <TouchableOpacity>
        <Image source={{ uri:`https://cdn.cloudflare.steamstatic.com/${img}` }}
               style={styles.img} />
      </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
 img:{
   width:30,
   height:30,
   marginRight:5,}
});

export default HeroIconClickable
