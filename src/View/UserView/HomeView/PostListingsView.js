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
  getApprovedPosts,
  deletePost,
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
  const [selected, setSelected] = useState("0");
  const loadPosts = async () => {
    const data = await getApprovedPosts();
    const sortedPosts = data.sort((a, b) => b.id - a.id);
    setPosts(sortedPosts);
  };

  return (
    <SafeArea>
      <View style={App_StyleSheet.list}>
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
            maxToRenderPerBatch={30}
          />
        )}
      </View>
    </SafeArea>
  );
}
export default PostListingsView;
