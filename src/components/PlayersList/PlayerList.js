import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, FlatList} from 'react-native';
import RenderItem from "./RenderItem";

const PlayerList = ()=>{
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


    var getDateCha=function(beginDate,endDate){
        var res={D:0,H:0,M:0,S:0,abs:true,error:false};

        if(typeof(endDate)=="undefined" || null== endDate||""==endDate ){endDate = new Date();}
        if( !(beginDate instanceof (Date)) ||  !(endDate instanceof (Date))){
            res.error = true;
            return res;
        }

        if(beginDate>endDate){
            var tempDate = beginDate;
            beginDate = endDate;
            endDate=tempDate;
            res.abs = false;
        }
        var chaTime =(endDate.getTime()-beginDate.getTime());

        var Day_Param = 1000 * 60 * 60 * 24;
        var Hour_Param = 1000 * 60 * 60;
        res.D =Math.floor(chaTime/(Day_Param));//

        chaTime = chaTime-res.D * Day_Param;
        res.H = Math.floor(chaTime/(Hour_Param));
        chaTime = chaTime-res.H * Hour_Param;
        res.M = Math.floor(chaTime/(1000*60));
        res.S = (chaTime-res.M * 1000 * 60) / 1000;

        res.toString=function(){
            return  this.D + 'Days' + this.H + 'Hours' + this.M + 'min';
        };
        console.log(res)
        return res;
    }

    function test(){
        v.setFullYear(txt_Y.value);
        v.setMonth(txt_M.value-1);
        v.setDate(txt_D.value);
        v.setHours(txt_H.value);
        v.setMinutes(txt_Min.value);
        v.setSeconds(0);
        var now = new Date();
        var ressult = getDateCha(v,now);
        if(!ressult.error){
            show.innerHTML +=(
                "["+v.toLocaleDateString()+" "+v.toLocaleTimeString()+"] "
                + 'range' +
                "["+now.toLocaleDateString()+" "+now.toLocaleTimeString()+"]======"
                + (ressult.toString())+"<br/>");
        }
    }

    var getDateCha=function(beginDate,endDate){
        var res={D:0,H:0,M:0,S:0,abs:true,error:false};

        if(typeof(endDate)=="undefined" || null== endDate||""==endDate ){endDate = new Date();}
        if( !(beginDate instanceof (Date)) ||  !(endDate instanceof (Date))){
            res.error = true;
            return res;
        }

        if(beginDate>endDate){
            var tempDate = beginDate;
            beginDate = endDate;
            endDate=tempDate;
            res.abs = false;
        }
        var chaTime =(endDate.getTime()-beginDate.getTime());

        var Day_Param = 1000 * 60 * 60 * 24;
        var Hour_Param = 1000 * 60 * 60;
        res.D =Math.floor(chaTime/(Day_Param));//

        chaTime = chaTime-res.D * Day_Param;
        res.H = Math.floor(chaTime/(Hour_Param));
        chaTime = chaTime-res.H * Hour_Param;
        res.M = Math.floor(chaTime/(1000*60));
        res.S = (chaTime-res.M * 1000 * 60) / 1000;

        res.toString=function(){
            return  this.D + 'Days' + this.H + 'Hours' + this.M + 'min';
        };
        console.log(res)
        return res;
    }


    return (
                <View style={styles.container}>
                    {Object.entries(list).length > 0 ? (
                        <>
                            <FlatList
                                data={list}
                                renderItem={RenderItem}
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
export  default PlayerList
