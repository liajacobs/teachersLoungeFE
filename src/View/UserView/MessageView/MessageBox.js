import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

function MessageBox({ navigation, message, sender, incoming }) {
  const displayName = incoming ? sender : "You";
  return (
    <View style={{ paddingRight: 10, marginTop: 10 }}>
      <View style={incoming ? styles.incomingContainer : styles.outgoingContainer}>
        <Text style={styles.senderText}>{displayName}</Text>
        <View style={styles.divider} />
        <View style={incoming ? styles.incomingMessages : styles.outgoingMessages}>
          <Text style={{ fontSize: 15 }}>{message}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // outgoingMessages: {
  //   width: 250,
  //   height: 40,
  //   alignItems: "center",
  //   flexDirection: "row",
  //   flex: 2,
  //   alignContent: "flex-start",
  //   alignSelf: "flex-end",
  //   justifyContent: "flex-start",
  //   paddingHorizontal: 20,
  //   paddingEnd: 30,
  //   borderWidth: 3,
  //   borderRadius: 20,
  //   borderColor: "black",
  //   shadowRadius: "aquamarine",
  //   backgroundColor: "deepskyblue",
  //   overflow: "hidden"
  // },
  // incomingMessages: {
  //   width: 250,
  //   height: 40,
  //   alignItems: "center",
  //   flexDirection: "row",
  //   flex: 2,
  //   alignContent: "flex-start",
  //   alignSelf: "flex-start",
  //   justifyContent: "flex-start",
  //   paddingHorizontal: 20,
  //   paddingEnd: 30,
  //   borderWidth: 3,
  //   borderRadius: 20,
  //   borderColor: "black",
  //   shadowRadius: "aquamarine",
  //   backgroundColor: "gold",
  //   overflow: "hidden",
  // },
  incomingContainer: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    width: '60%',
  },
  outgoingContainer: {
    alignSelf: 'flex-end',
    marginRight: 10,
    width: '60%',
  },
  incomingMessages: {
    backgroundColor: "gold",
    padding: 10,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 3,
  },
  outgoingMessages: {
    backgroundColor: "deepskyblue",
    padding: 10,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 3,
  },
  senderText: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 2,
    color: "white",
  },
  divider: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginBottom: 5,
  }
});
export default MessageBox;
