# Metronomo

This is a solution to a metronomo app that i decided to create

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)


## Overview
 This is a app builded in react-native. I Created since the design on figma until the coding structure and publication in play store.
 It allows the users changed for your own the frequency of bips and get audio and visual effects to help them playing music
 
### The Project

Users should be able to:
- Increase or decrease the frequency in Bpm
- Play and stop
- Get audio and visual effects 

### Screenshot
![screenshot](https://github.com/EmilcyFelipe/Metr-nomo/blob/master/1638490250153.jpg)

### Links


## My process

  So, i started building the design, i get some inspirations from some others app and things that i thought could help. 
  After this i started coding. The biggest problem in this case is to play the sound synchronized with the animation.
  The Element Animated of react-native, just allows call function when the animation stop or finished, in this case i need to call the sound during the animation.
  The solution, but not the better, was to aply the same time, both for sound and the animation. Although aplying the same duration of time, the animation as time goes by
  has some delay and is not sync with the sound. So i think i could explode the loop struture of animation and put the Animate.timing into a setInterval and calls the sound in sequence. 
  It really works, but the animation stoped when calls the sound, isn't fluid. 
  So, i think i could manager the animation struture and modify some variable and watch with useEffect to call the sound, isn't work either, the toValue of Animate.timing change the variables with continues values.
  The solution i found out is to reset the animation when it start to unsynchronized, the way is just when the animation there is in start position, and almost imperceptible to the user.

### Built with
- Expo
- React-Native
- Audio Effects
- Animated
- StyleSheet

### What I learned

I could improve a lot my skills with Animated, Sound component of expo, and the its boundaries

## Author

- Linkedin - [Felipe de Paula](https://www.linkedin.com/in/felipe-c-de-paula-b1b7b9189/)
