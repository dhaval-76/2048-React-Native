import React from 'react';
import { StyleSheet, View } from 'react-native';

import GameController from "./GameController";

export default function App() {
  return (
    <View style={styles.container}>
      <GameController />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbf8ef",
  }
});

