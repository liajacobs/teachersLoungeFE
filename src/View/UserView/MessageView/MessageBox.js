import React from "react";
import { StyleSheet, Text, View } from "react-native";

function MessageBox({ navigation, message, sender, incoming }) {
  const displayName = incoming ? sender : "You";

  return (
    <View
      style={[
        styles.messageRow,
        incoming ? styles.alignStart : styles.alignEnd,
      ]}
    >
      <View style={incoming ? styles.incomingBubble : styles.outgoingBubble}>
        <Text style={styles.sender}>{displayName}</Text>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageRow: {
    marginVertical: 4,
    marginHorizontal: 8,
    maxWidth: "75%",
  },
  alignStart: {
    alignSelf: "flex-start",
  },
  alignEnd: {
    alignSelf: "flex-end",
  },
  incomingBubble: {
    backgroundColor: "#e7ecfe",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  outgoingBubble: {
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  sender: {
    fontSize: 11,
    fontWeight: "600",
    color: "#888",
    marginBottom: 2,
  },
  messageText: {
    fontSize: 15,
    color: "#000",
  },
});

export default MessageBox;
