import React, {Component, useState, useEffect, useRef} from "react";
import {Text, View, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity,Dimensions} from "react-native";
import LoadingCat from "./LoadingCat";
import HeroIconClickable from "./auxiliary/HeroIconClickable";
import Context from "../../context";
import CrossPlatformIcon from 'react-native-cross-platform-icons';

export default function Profile({route}) {
    const context = React.useContext(Context);
    const account_id = route.params.id;
    const [profile, setProfile] = useState({});
    const [wl, setWl] = useState({});
    const [recentMathes, setRecentMathces] = useState([]);
    const [playedHeroes, setPlayedHeroes] = useState([]);
    const [peers,setPeers]=useState([])
    const winRateSortFlag = useRef(true)
    const gamesSortFlag = useRef(true)

    function winRateSort() {
        let copy = JSON.parse(JSON.stringify(playedHeroes))
        if (winRateSortFlag.current) {
            setPlayedHeroes(copy.sort((a, b) => getWinRate(b) < getWinRate(a) ? 1 : -1))
        } else {
            setPlayedHeroes(copy.sort((a, b) => getWinRate(b) > getWinRate(a) ? 1 : -1))
        }
        winRateSortFlag.current = !winRateSortFlag.current
    }

    function gamesSort() {
        let copy = JSON.parse(JSON.stringify(playedHeroes))
        if (gamesSortFlag.current) {
            setPlayedHeroes(copy.sort((a, b) => b.games > a.games ? 1 : -1))
        } else {
            setPlayedHeroes(copy.sort((a, b) => b.games < a.games ? 1 : -1))
        }
        gamesSortFlag.current = !gamesSortFlag.current
    }

    function getWinRate(hero) {
        return ((hero.win / hero.games) * 100).toFixed(1)
    }

    const lobbys = {
        0: {
            "name": "Normal",
        },
        1: {
            "name": "Practice",
        },
        2: {
            "name": "Tournament",
        },
        3: {
            "name": "Tutorial",
        },
        4: {
            "name": "Coop Bots",
        },
        5: {
            "name": "Group Ranked",
        },
        6: {

            "name": "Solo Ranked",
        },
        7: {
            "name": "Ranked",
        },
        8: {
            "name": "1v1",
        },
        9: {
            "name": "Battle Cup",
        },
    };

    useEffect(() => {
        fetch(`https://api.opendota.com/api/players/${account_id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setProfile(data);
            });
        fetch(`https://api.opendota.com/api/players/${account_id}/wl`)
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
                return response.json();
            })
            .then((data) => {
                let arr = [];
                for (let i = 0; i < 10; i++) {
                    arr.push(data[i]);
                }
                setPlayedHeroes(arr);
            });
        fetch(`https://api.opendota.com/api/players/${account_id}/peers`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setPeers(data);
            });
    }, []);

    return (
        <ScrollView style={styles.container}>
            {Object.entries(profile).length > 0 && Object.entries(wl).length > 0 ? (
                <>
                    <View style={styles.summary}>
                        <View style={{width:"27%"}}>
                            <Image source={{uri: profile.profile.avatarfull}} style={{width: 100, height: 100,borderRadius:10}}/>
                        </View>
                        <View style={{width:"50%"}}>
                            <Text style={styles.nick}>{profile.profile.personaname}</Text>
                            <Text>
                                <Text style={{color: "green", fontSize: 20}}>{wl.win}</Text><Text
                                style={{color: "#fff", fontSize: 20}}> - </Text>
                                <Text style={{color: "red", fontSize: 20}}>{wl.lose}</Text>
                            </Text>
                            <Text style={{color: '#fff'}}> {((wl.win / (wl.win + wl.lose)) * 100).toFixed(1)}%</Text>
                        </View>
                        <View>
                            <View style={{width:"25%"}}>
                                <Image style={{width: 100, height: 100}} source={{uri: `https://www.opendota.com/assets/images/dota2/rank_icons/rank_star_${JSON.stringify(profile.rank_tier)[1]}.png`}}/>
                                <Image style={{width: 100, height: 100,marginTop:-95}} source={{uri: `https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_${JSON.stringify(profile.rank_tier)[0]}.png`}}/>
                           </View>
                            <Text style={{color:'#fff',fontSize:15,textAlign:"center",marginTop:-15}}>{profile.mmr_estimate.estimate}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{color: "#fff", fontSize: 20}}>Recent Matches:</Text>
                        <View style={{flexDirection: "row", marginTop: 15, marginBottom: 10,  backgroundColor:'rgb(23,22,22)',}}>
                            <Text style={{color: "#fff", width: "25%", marginLeft: "9%"}}>W/L:</Text>
                            <Text style={{color: "#fff", width: "25%"}}>Duration:</Text><Text
                            style={{color: "#fff", width: "25%"}}>K/D/A:</Text>
                            <Text style={{color: "#fff", width: "25%"}}>Team:</Text>
                        </View>
                        {recentMathes.map((match) => {
                            return (
                                <View style={{flexDirection: "row", alignItems: 'center'}}>
                                    <HeroIconClickable img={context.heroes[match.hero_id].img}/>
                                    <View style={{flexDirection: "column", width: "25%"}}>
                                        {match.player_slot <= 4 ? (
                                            match.radiant_win ? (
                                                <Text style={{color: "green", fontSize: 15}}>Win</Text>) : (
                                                <Text style={{color: "red", fontSize: 15,}}>Lose</Text>)) : (null)}
                                        {match.player_slot > 4 ? (
                                            match.radiant_win ? (
                                                <Text style={{color: "red", fontSize: 15}}>Lose</Text>) : (
                                                <Text style={{color: "green", fontSize: 15}}>Win</Text>)) : (null)}
                                        <Text style={styles.blue}>{lobbys[match.lobby_type].name}</Text>
                                    </View>
                                    <Text style={{
                                        color: "#fff",
                                        width: "25%",
                                        fontSize: 15,
                                    }}> {`${Math.floor(match.duration / 60)}:${match.duration % 60}`}</Text>
                                    <Text style={{marginLeft: 10, fontSize: 15, color: "#fff", width:"25%"}}>
                                        <Text style={styles.kills}>{match.kills}</Text>/
                                        <Text style={styles.deaths}>{match.deaths}</Text>/{match.assists}</Text>
                                    {match.player_slot < 4 ? (
                                        <Text style={styles.white}>Radiant</Text>) : (
                                        <Text style={styles.white}>Dire</Text>)}
                                </View>
                            );
                        })}
                    </View>
                    <View>
                        <Text style={{color: '#fff', marginTop: 15, fontSize: 20}}> Most played heroes:</Text>
                        <View style={styles.table}>
                            <Text style={styles.white}>Hero:</Text>
                            <TouchableOpacity onPress={() => gamesSort()}>
                                <Text style={{color: '#4389a4', marginLeft: 100, fontSize: 15}}>
                                    <CrossPlatformIcon name={!gamesSortFlag.current ? ('arrow-up') : ('arrow-down')}
                                                       size={15} color="#4389a4" outline/>Matches:</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => winRateSort()}>
                                <Text style={{color: '#4389a4', fontSize: 15}}>
                                    <CrossPlatformIcon name={winRateSortFlag.current ? ('arrow-up') : ('arrow-down')}
                                                       size={15} color="#4389a4" outline/>
                                    Win rate:</Text>
                            </TouchableOpacity>
                        </View>
                        {playedHeroes.map((hero) => {
                            return (
                                <View style={styles.card}>
                                    <TouchableOpacity style={{flexDirection: 'row', width: "30%", paddingBottom: 5}}>
                                        <HeroIconClickable img={context.heroes[hero.hero_id].img}/>
                                        <Text style={styles.white}>{context.heroes[hero.hero_id].localized_name}</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.white}> {hero.games}</Text>
                                    <Text style={styles.white}>{getWinRate(hero)}%</Text>
                                </View>
                            );
                        })}
                        <Text style={styles.white}>played with players:</Text>
                        
                    </View>
                </>
            ) : (
                <LoadingCat/>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    white: {
        color: "#fff",
        fontSize: 15
    },
    blue: {
        color: "#4389a4",
        fontSize: 15
    },
    container: {
        padding: 10,

    },
    summary: {
        flexDirection: "row",
        marginBottom: 20,

    },
    nick: {
        color: "#fff",
        fontSize: 25,

    },
    card: {
        width: '100%',
        justifyContent: 'space-between',
        color: '#fff',
        flexDirection: 'row',
    },
    table: {
        width: '100%',
        justifyContent: 'space-between',
        color: '#fff',
        flexDirection: 'row',
        marginVertical: 15,
        backgroundColor:'rgb(23,22,22)',

    },
    kills:{
        marginLeft: 10,
        fontSize: 15,
        color: "#6dcc3f",

    },
    deaths:{
        marginLeft: 10,
        fontSize: 15,
        color: "#be1c2b",
    },
});
