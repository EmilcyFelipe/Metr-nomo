import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Animated} from 'react-native';

export default function App() {
  const [ bpmValue, setBpmValue ] = useState(80);
  const deg = useRef(new Animated.Value(0)).current;
  const [speed, setSpeed ] = useState(1000)

  let degInterpolated = deg.interpolate(
    {
      inputRange:[0,180],
      outputRange:['0deg', '180deg']
    }
  )
  useEffect(()=>{
    Animated.loop( 
      Animated.sequence([
        Animated.timing(deg,{
          toValue:180,
          duration: speed,
          useNativeDriver: false
        }),
        Animated.timing(deg,{
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
          <Animated.View style={[styles.markAxios,{transform:[{rotate: degInterpolated}]}]}>
            <View style={styles.mark}></View>
          </Animated.View>
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
    width: '80vw',
    maxWidth: 800,
    height: 100,
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
    bottom: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: '#fff',
    zIndex:100,
  },
  mark:{
    width: 20,
    height: 20,
    borderRadius: 20/2,
    backgroundColor: '#255255',
  }
});
