import React, { useEffect } from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const RenderItem = ({item})=>{



    // function calcTime(){
    //     let v = new Date()
    //     v.setFullYear(txt_Y.value);
    //     v.setMonth(txt_M.value-1);
    //     v.setDate(txt_D.value);
    //     v.setHours(txt_H.value);
    //     v.setMinutes(txt_Min.value);
    //     v.setSeconds(0);
    //     var now = new Date();
    //     var ressult = getDateCha(v,now);
    //     if(!ressult.error){
    //         show.innerHTML +=(
    //             "["+v.toLocaleDateString()+" "+v.toLocaleTimeString()+"] "
    //             + 'range' +
    //             "["+now.toLocaleDateString()+" "+now.toLocaleTimeString()+"]======"
    //             + (ressult.toString())+"<br/>");
    //     }
    // }
    function parseDate() {
        console.log(item.last_match_time)
    }


    return (
         <TouchableOpacity>

             <View style={styles.card}>
                 <Image source={{ uri: item.avatarfull }} style={{ width: 50, height: 50 }}/>
                 <View>
                     <Text style={styles.name}>{item.personaname}</Text>
                     <Text style={styles.name}>{item.last_match_time}</Text>
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
