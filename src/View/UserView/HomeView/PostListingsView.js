import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from "react-native";
import { useRoute, useIsFocused } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import PostComponentView from "./PostComponentView";
import SafeArea from "../../SafeArea";
import {
  getApprovedPosts
} from "../../../Controller/PostManager.js";
import Post from "../../../Model/Posts/Post.js";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

function PostListingsView({ navigation }) {
  const route = useRoute();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      loadPosts();
    }
  }, [isFocused]);

  const [posts, setPosts] = useState([]);
  const loadPosts = async () => {
    const data = await getApprovedPosts(route.params.User.userUserName);
    const sortedPosts = data.sort((a, b) => b.id - a.id); // change later to not sort by id
    setPosts(sortedPosts);
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
            initialNumToRender={20}
            maxToRenderPerBatch={20}
          />
        )}
      </View>
    </SafeArea>
  );
}
export default PostListingsView;
