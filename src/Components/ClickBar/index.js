import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';



export default function ClickBar({bips, setBips}){
   
    function decreaseClick(){
        if(bips!==1){
            setBips(bips-1);

        }
    }

    function addClick(){
        setBips(bips+1);
    }
    return(
        <View style={styles.container}>
            <View style={styles.rowActions}>
                <View style={styles.arrowWrapper}>
                    <AntDesign name="caretdown" size={12} color="#737373" />
                </View>
                <TouchableOpacity onPress={decreaseClick}>
                    <View style={styles.boxAction}><Text style={styles.textBoxAction}>-</Text></View>
                </TouchableOpacity>
                <View style={styles.clicksWrapper}>

                    {bips===1?<Text>  </Text>:(<Text style={styles.textClicks}>{(bips-1)<10?'0'+(bips-1):(bips-1)}</Text>)}
                    <Text style={styles.textClicks}>{bips<10?'0'+bips:bips}</Text>
                    <Text style={styles.textClicks}>{(bips+1)<10?'0'+(bips+1):(bips+1)}</Text>
                </View>
                <TouchableOpacity onPress={addClick}>
                    <View style={styles.boxAction}><Text style={styles.textBoxAction}>+</Text></View>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomBar}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop: 60,
        width: '100%',
    },
    rowActions:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    arrowWrapper: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        top: -10
        },
    boxAction:{
        width: 30,
        height: 30,
        borderWidth: 2,
        borderColor: '#737373',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBoxAction:{
        color: '#737373',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
    },
    clicksWrapper:{
        width: '50%',
        justifyContent: 'space-between',
        flexDirection: 'row',  
    },
    textClicks:{
        fontSize: 25,
        color: '#737373'
    },
    bottomBar:{
        width: '100%',
        height: 10,
        backgroundColor: '#161616'
    }
    

});