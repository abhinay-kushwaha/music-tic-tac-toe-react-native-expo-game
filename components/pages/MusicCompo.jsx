import React, { useRef, useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, TouchableOpacity, Alert, Animated, Easing, Image, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const MusicCompo = () => {
  const soundRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const startRotate = () => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopRotate = () => {
    rotateAnim.stopAnimation();
    rotateAnim.setValue(0);
  };

  const playMusic = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/music.mp3'),
        { shouldPlay: true, isLooping: true } 
      );
      soundRef.current = sound;
      await sound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      Alert.alert('Error', 'Could not play music: ' + error.message);
      console.log('Audio error:', error);
      setIsPlaying(false);
    }
  };

  const stopMusic = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      setIsPlaying(false);
    } catch (error) {
      console.log('Stop audio error:', error);
    }
  };

  useEffect(() => {
    playMusic();
    return () => {
      stopMusic();
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      startRotate();
    } else {
      stopRotate();
    }
  }, [isPlaying]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/music_icon.jpg')} // Place your icon in assets
        style={[
          styles.musicImg,
          { transform: [{ rotate }] },
          !isPlaying && { opacity: 0.5 },
        ]}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={playMusic}
          disabled={isPlaying}
        >
         <AntDesign name="play" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={stopMusic}
          disabled={!isPlaying}
        >
          <FontAwesome name="stop-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginBottom: 16 },
  musicImg: {
    width: 80,
    height: 80,
    marginBottom: 16,
    borderRadius: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  iconButton: {
    padding: 12,
  },
  icon: {
    width: 36,
    height: 36,
  },
});

export default MusicCompo;