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
import PostView from "./PostView";
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
    const data = await getApprovedPosts(selected);
    setPosts(data);
  };

  return (
    <SafeArea>
      <View style={App_StyleSheet.post_listing_view}>
        {posts && (
          <FlatList
            style={App_StyleSheet.listings}
            ListEmptyComponent={
              <Text style={App_StyleSheet.postlist_msg_state}>
                {"No posts yet!"}
              </Text>
            }
            ListFooterComponent={
              posts[0] && (
                <Text style={App_StyleSheet.postlist_msg_state}>
                  {"You've viewed all posts!"}
                </Text>
              )
            }
            data={posts}
            extraData={posts}
            renderItem={({ item }) => (
              <View style={App_StyleSheet.post_listing_view}>
                <PostView
                  navigation={navigation}
                  post={item}
                  userName={item.user}
                  postContent={item.postContent}
                  image={item.image}
                  nickName={item.nickName}
                  commentName={route.params.User.userUserName}
                  fileUrl={item.fileUrl}
                />
              </View>
            )}
          />
        )}
      </View>
    </SafeArea>
  );
}
export default PostListingsView;
