import React from 'react';
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import MusicCompo from './MusicCompo';
import TicTokToi from './TicTokToi';

const MainCompo = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}> </Text>
        <MusicCompo />
        <View style={styles.gameContainer}>
          <TicTokToi />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e3f0ff',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#1a237e',
    textAlign: 'center',
  },
  gameContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
});

export default MainCompo;
