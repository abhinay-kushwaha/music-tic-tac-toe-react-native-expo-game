import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MusicCompo from "./MusicCompo";
import TicTokToi from "./TicTokToi";

const MainCompo = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
    backgroundColor: "#e3f0ff",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
  },
  gameContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
});

export default MainCompo;
