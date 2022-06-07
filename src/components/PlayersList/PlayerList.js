import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
// import RenderItem from "./RenderItem";

const PlayerList = ({navigation})=>{
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch('https://api.opendota.com/api/search?q=DonorOfLove')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setList(data);
            });

    }, []);



    const styles = StyleSheet.create({
            card: {flexDirection: 'row', marginTop: 10},
            name: {
                marginLeft: 5,
                color:'#fff'
            },
        }
    )
    return (
        <View style={styles.container}>
                    {Object.entries(list).length > 0 ? (
                        <>

                            <FlatList
                                key={Math.random()}
                                data={list}
                                renderItem={({item})=>  <TouchableOpacity onPress={()=>navigation.push('Profile',{
                                    id:item.account_id})}>
                                    {/*{console.log(navigation)}*/}
                                    <View style={styles.card}>
                                        <Image source={{ uri: item.avatarfull }} style={{ width: 50, height: 50 }}/>
                                        <View>
                                            <Text style={styles.name}>{item.personaname}d</Text>
                                            <Text style={styles.name}>last game: {new Date(item.last_match_time).getDate()||'?'}
                                                .{new Date(item.last_match_time).getMonth()||'?'}
                                                .{new Date(item.last_match_time).getFullYear()||"?"}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>}
                                keyExtractor={(item) => item.account_id}
                                extraData={navigation}


                            />
                        </>
                    ) : (
                        <Image
                            source={{
                                uri: 'https://c.tenor.com/RVvnVPK-6dcAAAAM/reload-cat.gif',
                            }}
                            style={{ width: 50, height: 50 }}
                        />
                    )}
            <Text>Profile</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {flexDirection: 'row', marginTop: 10},
    name: {
        marginLeft: 5,
        color:'#fff'
    },
});
export  default PlayerList
