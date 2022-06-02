import React, { Component,useState,useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';

export default function Profile({route}) {
    const account_id = route.params.id;
    const [profile, setProfile] = useState({});
    const [wl, setWl] = useState({});
    const [recentMathes, setRecentMathces] = useState([]);
    const [playedHeroes, setPlayedHeroes] = useState([]);

    useEffect(() => {
        console.log(route.params.id)
        fetch(`https://api.opendota.com/api/players/${account_id}`)
    .then((response) => {
            return response.json();
        })
            .then((data) => {
                setProfile(data);
            });
        fetch( `https://api.opendota.com/api/players/${account_id}/wl`)
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
                setRecentMathces(data);
            });
        fetch(`https://api.opendota.com/api/players/${account_id}/heroes`)
    .then((response) => {
            0;
            return response.json();
        })
            .then((data) => {
                let arr = [];
                for (let i = 0; i < 10; i++) {
                    arr.push(data[i]);
                }
                setPlayedHeroes(arr);
            });
    }, []);

    return (
        <View style={styles.container}>
            {Object.entries(profile).length > 0 && Object.entries(wl).length > 0 ? (
                <>
                    <Text>{profile.profile.personaname}</Text>
                    <Image
                        source={{ uri: profile.profile.avatar }}
                        style={{ width: 100, height: 100 }}
                    />
                    <Text>
                        {' '}
                        <Text style={{ color: 'green' }}>{wl.win}</Text>-
                        <Text style={{ color: 'red' }}>{wl.lose}</Text>
                    </Text>
                    <View>
                        {recentMathes.map((match) => {
                            return (
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>{match.hero_id}</Text>
                                    <Text style={{ marginLeft: 10 }}>
                                        {match.kills}/{match.deaths}/{match.assists}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                    <View>
                        <Text>
                            {playedHeroes.map((hero) => {
                                return (
                                    <>
                                        <Text>
                                            games: {hero.games} -win:
                                            {((hero.win / hero.games) * 100).toFixed(1)}%
                                        </Text>
                                        ;
                                    </>
                                );
                            })}
                        </Text>
                    </View>
                </>
            ) : (
                <Image source={{uri: 'https://c.tenor.com/RVvnVPK-6dcAAAAM/reload-cat.gif',}} style={{ width: 150, height: 150 }}/>
            )}
        </View>
    );
}

const styles = StyleSheet.create({});
