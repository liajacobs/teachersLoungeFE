import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import SafeArea from "../../SafeArea";
import MessagesNavigator from "./MessagesNavigator";
import OpenMessageCommand from "../../../Controller/OpenMessageCommand";
import App_StyleSheet from "../../../Styles/App_StyleSheet";
import { getUserConversations } from "../../../Controller/DirectMessagesManager";

function MessagesView({ navigation }) {
  const route = useRoute();
  const [conversations, setConversations] = useState([]);

  useFocusEffect(() => {
    loadConversations();
  })

  const loadConversations = async () => {
    const data = await getUserConversations(route.params.User.userUserName);
    setConversations(data);
  };

  return (
    <SafeArea>
      <View style={App_StyleSheet.content}>
        <View >
          {conversations && <FlatList
            data={conversations}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  (MessagesNavigator.lastClick = item),
                    navigation.navigate("Conversation", {conversationId: item.id, username: item.title});
                }}
              >
                <View style={App_StyleSheet.list_item}>
                  <Text>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
          />}
      </View>
      </View>
    </SafeArea>
  );
}
export default MessagesView;
