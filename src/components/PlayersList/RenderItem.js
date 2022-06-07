import React, { useEffect } from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const RenderItem = ({item, navigation})=>{
let d=new Date(item.last_match_time)

    return (

         <TouchableOpacity onPress={()=>navigation.push('Profile',{
             id:item.account_id})}>
             {/*{console.log(navigation)}*/}
             <View style={styles.card}>
                 <Image source={{ uri: item.avatarfull }} style={{ width: 50, height: 50 }}/>
                 <View>
                     <Text style={styles.name}>{item.personaname}d</Text>
                     <Text style={styles.name}>last game: {d.getDate()||null}.{d.getMonth()||null}.{d.getFullYear()||null}</Text>
                 </View>
             </View>
         </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {flexDirection: 'row', marginTop: 10},
    name: {
        marginLeft: 5,
        color:'#fff'
    },
    }
)

export default RenderItem
