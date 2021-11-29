import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  Easing,
} from "react-native";
import ClickBar from "./src/Components/ClickBar";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";

let soundTime=null;

export default function App() {
  const [bpmValue, setBpmValue] = useState(80);
  const distance = useRef(new Animated.Value(0)).current;
  const [colorMark, setColorMark] = useState("#232E97");
  const [sound, setSound] = useState();
  const callSound = useRef(new Animated.Value(0)).current;
  const [playActive, setPlayActive] = useState(false);
  
  var width = Dimensions.get("window").width;
  
  async function playBpmBeat() {
    const { sound } = await Audio.Sound.createAsync(
      require("./utils/sounds/tap.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }



  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound,bpmValue]);


 

  const animation = Animated.loop(
    Animated.sequence([
      Animated.timing(distance, {
        toValue: width * 0.8 - 25,
        duration: (60 * 1000) / bpmValue,
        useNativeDriver: false,
        easing: Easing.linear,
      }),
      Animated.timing(distance, {
        toValue: 0,
        duration: (60 * 1000) / bpmValue,
        useNativeDriver: false,
        easing: Easing.linear,
      })
    ])
  );

  
  useEffect(() => {
    let timer = (60*1000)/bpmValue;
    if (playActive) {
      clearInterval(soundTime);
      animation.start();
      soundTime = setInterval(playBpmBeat,timer);
    } else {
      animation.reset();
      clearInterval(soundTime);
    }
  }, [playActive, bpmValue]);

  return (
    <View style={styles.container}>
      {/*-------Display Section */}
      <View style={styles.display}>
        <Text style={styles.valueText}>{bpmValue}</Text>
        <Text style={[styles.valueText, { fontSize: 20 }]}>Bpm</Text>
        <View style={[styles.markAxios]}>
          <Animated.View
            style={[
              styles.mark,
              {
                transform: [{ translateX: distance }],
                backgroundColor: colorMark,
              },
            ]}
          ></Animated.View>
        </View>
      </View>
      {/*-------Actions Section */}
      <View style={styleActions.container}>
        <View style={styleActions.beatWrapper}>
          <ClickBar />
        </View>
        <View style={styleActions.row}>
          <TouchableOpacity onPress={() => setBpmValue(bpmValue - 5)}>
            <View style={styleActions.button}>
              <Text style={styleActions.textButton}>-5</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setBpmValue(bpmValue + 5)}>
            <View style={styleActions.button}>
              <Text style={styleActions.textButton}>+5</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styleActions.play}
          onPress={() => setPlayActive(!playActive)}
        >{playActive?(<AntDesign style={{ color: "#737373" }} name="pausecircleo" size={80} color="black" />):(<AntDesign
          style={{ color: "#737373" }}
          name="playcircleo"
          size={80}
          color="black"
        />)}
          
        </TouchableOpacity>

        <View style={styleActions.row}>
          <TouchableOpacity onPress={() => setBpmValue(bpmValue - 1)}>
            <View style={styleActions.button}>
              <Text style={styleActions.textButton}>-1</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setBpmValue(bpmValue + 1)}>
            <View style={styleActions.button}>
              <Text style={styleActions.textButton}>+1</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1B1B",
    alignItems: "center",
  },
  display: {
    width: "80%",
    maxWidth: 800,
    height: 220,
    marginTop: 50,
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    borderColor: "#737373",
    borderWidth: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  valueText: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#737373",
    textShadowColor: "#000",
    textShadowRadius: 1,
    textShadowOffset: { width: 2, height: 2 },
  },
  actionsWrapper: {
    backgroundColor: "#fff",
    width: "100%",
  },
  markAxios: {
    width: "100%",
    height: 20,
    bottom: -10,
    left: -10,
    position: "absolute",
  },
  mark: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: "#232E97",
    borderColor: "#737373",
    borderWidth: 1,
    shadowColor: "white",
    elevation: 5,
  },
});

const styleActions = StyleSheet.create({
  container: {
    width: "80%",
  },
  beatWrapper: {
    marginBottom: 20,
  },
  row: {
    marginTop: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: 90,
    height: 90,
    borderColor: "#737373",
    borderWidth: 5,
    borderRadius: 90 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 25,
    color: "#737373",
  },
  play: {
    position: "absolute",
    alignSelf: "center",
    bottom: 70,
  },
});
