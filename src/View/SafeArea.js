import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Constants from "expo-constants";

function SafeArea({ children }) {
  return <SafeAreaView style={styles.screen}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#6382E8",
    flex: 1,
  },
});

export default SafeArea;
