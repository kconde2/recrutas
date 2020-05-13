import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from 'react-native-paper';

function SplashScreen() {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12
  }
});

export default SplashScreen;
