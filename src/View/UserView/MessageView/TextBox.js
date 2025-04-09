import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { sendMessage } from "../../../Controller/DirectMessagesManager";

function TextBox({ navigation, details }) {
  const route = useRoute();
  const [message, setMessage] = useState("");

  const sendMessageHandler = async () => {
    try {
      const result = await sendMessage(
        details.conversationId,
        message,
        details.User.userUserName
      );
      if (result) {
        navigation.navigate("Conversation", details);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        mode="outlined"
        outlineColor="#ddd"
        activeOutlineColor="#007aff"
        placeholder="Type a message..."
        multiline
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity
        style={styles.sendButton}
        onPress={async () => {
          if (message.trim().length === 0) return;
          setMessage("");
          await sendMessageHandler();
        }}
      >
        <Text style={styles.sendText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginRight: 8,
    fontSize: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  sendButton: {
    backgroundColor: "#6382E8",
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center", 
    height: 40, 
  },
  sendText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});


export default TextBox;
