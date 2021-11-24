import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions} from 'react-native';

export default function App() {
  const [ bpmValue, setBpmValue ] = useState(80);
  const distance = useRef(new Animated.Value(0)).current;
  const [speed, setSpeed ] = useState(1000)

  var width = Dimensions.get('window').width;

  let degInterpolated = distance.interpolate(
    {
      inputRange:[0,100],
      outputRange:['0%', '100%']
    }
  )
  useEffect(()=>{
    Animated.loop( 
      Animated.sequence([
        Animated.timing(distance,{
          toValue:width*0.8-20,
          duration: speed,
          useNativeDriver: false
        }),
        Animated.timing(distance,{
          toValue:0,
          duration: speed,
          useNativeDriver: false
        })
      ])
      ).start()
  },[])
 
  return (
    <View style={styles.container}>
      <View style={styles.display}>
          <Text style={styles.valueText}>{bpmValue}</Text>
          <Text style={[styles.valueText, {fontSize: 20}]}>Bpm</Text>
          <View style={[styles.markAxios]}>
            <Animated.View style={[styles.mark,{transform:[{translateX: distance}]}]}></Animated.View>
          </View>
      </View>
      <View style={styles.actionsWrapper}></View>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B',
    alignItems: 'center',
    
  },
  display:{
    width: '80%',
    maxWidth: 800,
    height: 220,
    marginTop:50,
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    borderColor: '#737373',
    borderWidth: 10,
    alignItems: 'center',
  },
  valueText:{
    fontSize:70,
    fontWeight: 'bold',
    color: '#737373'
  },
  actionsWrapper:{
    backgroundColor: '#fff',
    width: '100%' 
  },
  markAxios:{
    width: '100%',
    height: 20,
    bottom: -10,
    left: -10,
    position: 'absolute',
  },
  mark:{
    width: 30,
    height: 30,
    borderRadius: 30/2,
    backgroundColor: '#232E97',
    borderColor: '#737373',
    borderWidth: 1,
    shadowColor: 'white',
    elevation: 5
  }
});
