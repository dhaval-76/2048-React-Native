import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Alert,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import {
  generateRandom,
  getEmptyBoard,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  isOver,
} from "./gameBoard";
import Cell from "./Cell";
import { useSwipe } from "./useSwipe";

const width = Dimensions.get("window").width;

const GameController = () => {
  const [board, setBoard] = useState(generateRandom(getEmptyBoard()));
  const [score, setScore] = useState(0);
  const [lastAction, setLastAction] = useState(null);

  const [onTouchStart, onTouchEnd] = useSwipe(
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown
  );

  const checkEndGame = () => {
    if (isOver(board)) {
      Alert.alert(
        "Game Over!",
        null,
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Play Again",
            onPress: () => reset(),
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {},
        }
      );
    }
  };

  function onSwipeLeft() {
    const newBoard = moveLeft(board);
    setBoard(generateRandom(newBoard[0]));
    setScore((prevScore) => prevScore + newBoard[1]);
    checkEndGame();
    setLastAction("long-arrow-left");
  }

  function onSwipeRight() {
    const newBoard = moveRight(board);
    setBoard(generateRandom(newBoard[0]));
    setScore((prevScore) => prevScore + newBoard[1]);
    checkEndGame();
    setLastAction("long-arrow-right");
  }

  function onSwipeUp() {
    const newBoard = moveUp(board);
    setBoard(generateRandom(newBoard[0]));
    setScore((prevScore) => prevScore + newBoard[1]);
    checkEndGame();
    setLastAction("long-arrow-up");
  }

  function onSwipeDown() {
    const newBoard = moveDown(board);
    setBoard(generateRandom(newBoard[0]));
    setScore((prevScore) => prevScore + newBoard[1]);
    checkEndGame();
    setLastAction("long-arrow-down");
  }

  const reset = () => {
    setBoard(generateRandom(getEmptyBoard()));
    setScore(0);
    setLastAction(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.AppBar}>2048</Text>
      <View style={styles.header}>
        <View style={[styles.headerElement, { paddingBottom: 5 }]}>
          <Text style={{ color: "#f4efe8" }}>LAST ACTION</Text>
          {lastAction ? (
            <FontAwesome name={lastAction} size={31} color="#f4efe8" />
          ) : (
            <View style={{ height: 32 }}></View>
          )}
        </View>
        <View style={styles.headerRight}>
          <View style={styles.headerElement}>
            <Text style={{ color: "#f4efe8" }}>SCORE</Text>
            <Text style={{ fontSize: 26, color: "#f4efe8" }}>
              {score.toString()}
            </Text>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.headerElement,
              {
                marginRight: 0,
                backgroundColor: pressed ? "#776555" : "#bbada0",
              },
            ]}
            onPress={reset}
          >
            <MaterialCommunityIcons name="restart" size={34} color="#f4efe8" />
          </Pressable>
        </View>
      </View>
      <View
        onStartShouldSetResponder={onTouchStart}
        onResponderRelease={onTouchEnd}
        style={styles.body}
      >
        <View style={styles.boardStyle}>
          {board.map((row, rowIndex) => (
            <View key={`cell-${rowIndex}`} style={styles.rowStyle}>
              {row.map((value, cellIndex) => (
                <Cell key={`cell-${cellIndex}`} value={value} />
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbf8ef",
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
  AppBar: {
    marginTop: 10,
    paddingHorizontal: 37,
    paddingVertical: 30,
    fontSize: 50,
    textAlign: "center",
    color: "#776e65",
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerElement: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#bbada0",
    marginRight: 12,
  },
  headerRight: {
    flexDirection: "row",
  },
  body: {
    flex: 1,
    borderBottomWidth: 4,
    borderBottomColor: "#d6cdc4",
  },
  boardStyle: {
    width: width - 20,
    padding: 5,
    backgroundColor: "#bbada0",
  },
  rowStyle: {
    flexDirection: "row",
    height: (width - 20) / 4,
  },
});

export default GameController;
