import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Avatar, Title } from "react-native-paper";
import { useRoute, useIsFocused } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import SafeArea from "../../SafeArea";
import PostComponentView from "./PostComponentView";
import App_StyleSheet from "../../../Styles/App_StyleSheet";
import {
  getApprovedPosts,
  deletePost,
} from "../../../Controller/PostManager.js";
import { getUserCommunities } from "../../../Controller/CommunitiesManager.js";
import Community from "../../../Model/Community.js";

function CommunitiesView({ navigation }) {
  var route = useRoute();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      loadCommunities();
    }
  }, [isFocused]);

  const [communities, setCommunities] = useState([{ key: "0", value: "" }]);
  const loadCommunities = async () => {
    const data = await getUserCommunities(route.params.User.userUserName);
    setCommunities(
      data.map((c) => {
        return { ["key"]: c.id, ["value"]: c.name };
      })
    );
  };

  return (
    <SafeArea>
      <FlatList
        style={App_StyleSheet.content}
        ListEmptyComponent={
          <Text style={App_StyleSheet.list_message}>
            {"No communities joined"}
          </Text>
        }
        data={communities}
        extraData={communities}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={App_StyleSheet.list_item}
            onPress={() =>
              navigation.navigate("Community", {
                Community: new Community(item.key, item.value),
                isMember: true
              })
            }
          >
            <Text>{item.value}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeArea>
  );
}

export default CommunitiesView;
