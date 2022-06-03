import React, { Component } from 'react';
import { Image } from "react-native";

const LoadingCat = () => {
    return (
      <Image source={{uri: 'https://c.tenor.com/RVvnVPK-6dcAAAAM/reload-cat.gif',}}
             style={{ width:"100%",height:'100%'}}/>
    );
}

export default LoadingCat
