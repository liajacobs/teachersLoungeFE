import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from "react-native";
import Community from "../../../Model/Community.js";
import { SelectList } from "react-native-dropdown-select-list";
import PostComponentView from "./PostComponentView.js";
import {
  getCommunityPosts,
  joinCommunity,
} from "../../../Controller/CommunitiesManager";
import { useRoute, useIsFocused } from "@react-navigation/native";
import SafeArea from "../../SafeArea.js";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

function CommunityView({ navigation }) {
  const route = useRoute();
  const { Community, User } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            if (Community && User) {
              const communityId = Community.id;
              const userEmail = User.userUserName;
              console.log("Community ID:", communityId);
              console.log("User Email:", userEmail);
              joinCommunity({ navigation }, communityId, userEmail);
            } else {
              console.warn("Community or User is undefined");
            }
          }}
        >
          <Text>Join</Text>
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
    const data = await getCommunityPosts(route.params.Community.id);
    setPosts(data);
  };

  return (
    <SafeArea>
      <View>
        <Text style={App_StyleSheet.community_label}>
          {route.params.Community.name}
        </Text>
      </View>
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
                userName={item.user}
                postContent={item.postContent}
                image={item.image}
                nickName={item.nickName}
                comments={item.comments}
                fileUrl={item.fileUrl}
                reload={loadPosts}
                choice={"Community"}
              />
            )}
          />
        )}
      </View>
    </SafeArea>
  );
}

export default CommunityView;
