import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
  StyleSheet
} from "react-native";
import PostComponentView from "./PostComponentView.js";
import {
  getCommunityPosts,
  joinCommunity,
  leaveCommunity
} from "../../../Controller/CommunitiesManager";
import { useRoute, useIsFocused } from "@react-navigation/native";
import SafeArea from "../../SafeArea.js";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

function CommunityView({ navigation }) {
  const route = useRoute();
  const { Community, User, isMember } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: Community?.name,
      headerRight: () => (
        <TouchableOpacity style={App_StyleSheet.header_button}
          onPress={() => {
            if (Community && User) {
              const communityId = Community.id;
              const userEmail = User.userUserName;
              console.log("Community ID:", communityId);
              console.log("User Email:", userEmail);
              if (isMember) {
                leaveCommunity({ navigation }, communityId, userEmail);
              } else {
                joinCommunity({ navigation }, communityId, userEmail);
              }
            } else {
              console.warn("Community or User is undefined");
            }
          }}
        >
          <Text style={App_StyleSheet.header_button_text}>{isMember ? "Leave" : "Join"}</Text>
        </TouchableOpacity>
      ),
    });
  }, [Community, User, navigation]);

  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (isFocused) {
      loadPosts();
    }
  }, [isFocused]);
  const [posts, setPosts] = useState([]);
  const loadPosts = async () => {
    const data = await getCommunityPosts(route.params.Community.id, route.params.User.userUserName);
    setPosts(data);
  };

  return (
    <SafeArea>
      <View style={App_StyleSheet.content}>
        {posts && (
          <FlatList
            ListEmptyComponent={
              <Text style={App_StyleSheet.list_message}>
                {"No posts yet!"}
              </Text>
            }
            ListFooterComponent={
              posts[0] && (
                <Text style={App_StyleSheet.list_message}>
                  {"You've viewed all posts!"}
                </Text>
              )
            }
            data={posts}
            extraData={posts}
            renderItem={({ item }) => (
              <PostComponentView
                navigation={navigation}
                post={item}
              />
            )}
          />
        )}
      </View>
    </SafeArea>
  );
}

export default CommunityView;
