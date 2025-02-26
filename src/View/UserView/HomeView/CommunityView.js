import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from "react-native";
import Community from "../../../Model/Community.js";
import { SelectList } from "react-native-dropdown-select-list";
import PostView from "./PostView.js";
import {
  getCommunityPosts,
  leaveCommunity,
} from "../../../Controller/CommunitiesManager";
import { deletePost } from "../../../Controller/PostManager.js";
import { useRoute, useIsFocused } from "@react-navigation/native";
import SafeArea from "../../SafeArea.js";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

function CommunityView({ navigation }) {
  const route = useRoute();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (isFocused) {
      loadPosts();
    }
  }, [isFocused]);
  const [posts, setPosts] = useState([]);
  const loadPosts = async () => {
    const data = await getCommunityPosts(route.params.Community.id);
    setPosts(data);
  };

  return (
    <SafeArea>
      <View style={{ marginBottom: 550 }}>
        <View>
          <Text style={App_StyleSheet.community_label}>
            {route.params.Community.name}
          </Text>
        </View>
        <TouchableOpacity
          style={App_StyleSheet.large_button}
          onPress={() =>
            navigation.navigate("Create Post", {
              Community: route.params.Community,
            })
          }
        >
          <Text style={App_StyleSheet.text}>{"+  Create Post"}</Text>
        </TouchableOpacity>
        <View
          style={{
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <TouchableOpacity
            style={App_StyleSheet.medium_button}
            onPress={() =>
              leaveCommunity(
                { navigation },
                route.params.Community.id,
                route.params.User.userUserName
              )
            }
          >
            <Text style={App_StyleSheet.text}>{"Leave Community"}</Text>
          </TouchableOpacity>
        </View>
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
                    comments={item.comments}
                    fileUrl={item.fileUrl}
                    reload={loadPosts}
                    choice={"Community"}
                  />
                  {item.user == route.params.User.userUserName && (
                    <TouchableOpacity
                      style={App_StyleSheet.small_button}
                      onPress={async () => {
                        await deletePost(item.id, item.fileUrl);
                        loadPosts();
                      }}
                    >
                      <Text style={App_StyleSheet.text}>{"Delete Post"}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            />
          )}
        </View>
      </View>
    </SafeArea>
  );
}

export default CommunityView;
