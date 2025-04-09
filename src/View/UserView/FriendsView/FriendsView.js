import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRoute, useIsFocused } from "@react-navigation/native";
import App_StyleSheet from "../../../Styles/App_StyleSheet.js";
import SafeArea from "../../SafeArea";
import { getFriendsList } from "../../../Controller/FriendsManager";

function FriendsView({ navigation }) {
  const route = useRoute();
  const isFocused = useIsFocused();
  const [listOfUsers, setListOfUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const array = await getFriendsList(route.params.User.userUserName);
      setListOfUsers(array);
    };
    fetchUsers();
  }, [isFocused]);

  return (
    <SafeArea>
      <FlatList
        style={App_StyleSheet.content}
        ListEmptyComponent={
          <Text style={App_StyleSheet.list_message}>
            {"No friends added yet"}
          </Text>
        }
        data={listOfUsers}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={App_StyleSheet.list_item}
            onPress={() =>
              navigation.navigate("Friend", {
                FriendEmail: item.email,
              })
            }
          >
            <Text>{item.email}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeArea>
  );
}
export default FriendsView;
