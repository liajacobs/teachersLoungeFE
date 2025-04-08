import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import SafeArea from "../../SafeArea";
import MessagesNavigator from "./MessagesNavigator";
import TextBox from "./TextBox";
import MessageBox from "./MessageBox";
import { getConversationDetails, getMessages } from "../../../Controller/DirectMessagesManager";
import { useHeaderHeight } from "@react-navigation/elements";

function ConversationView({ navigation }) {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [convoTitle, setConvoTitle] = useState(route.params.username);
  const image = require("../../../../assets/Account.png");

  useFocusEffect(() => {
    loadData(route.params.conversationId);
  });

  // Populates messages array
  const loadData = async (conversationId) => {
    try {
      const data = await getMessages(conversationId);
      const convoData = await getConversationDetails(conversationId);
      data.reverse();
      setMessages(data);
      setConvoTitle(convoData.title)
    } catch (error) {
      console.log(error);
    }
  };
  const height = useHeaderHeight();
  return (
    <SafeArea
      style={{
        backgroundColor: "#fff",
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Conversation Info", {
            conversationId: route.params.conversationId,
            currentUser: route.params.User.userUserName,
            username: route.params.username,
            title: route.params.title,
          })
        }
      >
        <View style={styles.friendNameHeader}>
          <Image style={styles.profilePic} source={image} />
          <Text style={styles.user}>{convoTitle}</Text>
        </View>
      </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        keyboardVerticalOffset={height}
        enabled
      >
        <View style={{ height: 460 }}>
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <MessageBox
                navigation={navigation}
                sender={item.sender}
                message={item.content}
                incoming={
                  route.params.User.userUserName === item.sender ? false : true
                }
              />
            )}
            inverted={true}
          />
        </View>
        <TextBox navigation={navigation} details={route.params}></TextBox>
      </KeyboardAvoidingView>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  bottom: {
    flex: 3,
  },
  friendNameHeader: {
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    backgroundColor: "aquamarine",
    flexDirection: "row",
  },
  user: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    textAlignVertical: "center",

    color: "black",
    fontSize: 30,
  },
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default ConversationView;
