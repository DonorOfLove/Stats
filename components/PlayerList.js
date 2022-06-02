import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, FlatList} from 'react-native';

export default function PlayerList() {
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

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image
                source={{ uri: item.avatarfull }}
                style={{ width: 50, height: 50 }}
            />
            <Text style={styles.name}>{item.personaname}</Text>
        </View>
    );
            return (
                <View style={styles.container}>
                    {Object.entries(list).length > 0 ? (
                        <>
                            <FlatList
                                data={list}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.account_id}
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
    card: {flexDirection: 'row', alignItems: 'start', marginTop: 10},
    name: {
        marginLeft: 5,
    },
});
