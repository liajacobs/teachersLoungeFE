import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import SafeArea from "../../SafeArea";
import { getConversationDetails, updateConversationTitle } from "../../../Controller/DirectMessagesManager";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

function ConversationInfoView({ route, navigation }) {
  const { conversationId } = route.params;
  const [newTitle, setNewTitle] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchConversationDetails = async () => {
      const data = await getConversationDetails(conversationId);
      setMembers(data.members || []);
      setNewTitle(data.title || "");
    };
    fetchConversationDetails();
  }, []);

  const handleUpdateTitle = async () => {
    const success = await updateConversationTitle(conversationId, newTitle);
    if (success) {
      Alert.alert("Success", "Conversation title updated.");
      navigation.goBack();
    } else {
      Alert.alert("Error", "Could not update title.");
    }
  };

  return (
    <SafeArea>
        <View style={App_StyleSheet.content}> 
      <View style={styles.container}>
        <Text style={styles.titleLabel}>Conversation Title</Text>
        <TextInput
          style={styles.input}
          value={newTitle}
          onChangeText={setNewTitle}
          placeholder="Enter a new conversation title"
          placeholderTextColor="#777"
        />
        
        <TouchableOpacity style={styles.saveButton} onPress={handleUpdateTitle}>
          <Text style={styles.saveButtonText}>Update Title</Text>
        </TouchableOpacity>

        <Text style={styles.membersHeader}>Participants:</Text>
        <FlatList
          data={members}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Text style={styles.memberItem}>{item}</Text>
          )}
        />
      </View>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        width: "90%",
        borderRadius: 10,
        alignSelf: 'center', // Centers the container horizontally
        justifyContent: 'center', // Centers content vertically
      },

  titleLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  currentTitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#e7ecfe",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  saveButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  membersHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  memberItem: {
    fontSize: 16,
    paddingVertical: 8,
    paddingLeft: 10,
    color: "#555",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default ConversationInfoView;
