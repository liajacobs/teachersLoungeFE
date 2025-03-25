import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-paper";
import { useRoute, useIsFocused } from "@react-navigation/native";
import SafeArea from "../../SafeArea";
import PostComponentView from "../HomeView/PostComponentView";
import { getApprovedPostsByUser } from "../../../Controller/PostManager";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

// This is the ProfileView component
function ProfileView({ navigation }) {
  const isFocused = useIsFocused();
  const route = useRoute();
  const [image, setImage] = useState({ uri: route.params.User.image } || require('../../../../assets/default-profile.png'));
  const [posts, setPosts] = useState([]);

  let kebabIcon = require("../../../../assets/settings.png");

  // Fetch posts when the screen is focused
  useEffect(() => {
    if (isFocused) {
      loadPosts();
    }
  }, [isFocused]);

  const loadPosts = async () => {
    const data = await getApprovedPostsByUser(route.params.User.userUserName);
    const sortedPosts = data.sort((a, b) => b.id - a.id);
    console.log(sortedPosts)
    setPosts(sortedPosts);
  };

  // Update profile picture if the route params change
  useEffect(() => {
    if (route.params.updatedImage) {
      setImage(route.params.updatedImage);
    }
  }, [route.params.updatedImage]);

  // Set kebab icon to navigate to settings screen
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={App_StyleSheet.header_button}
          onPress={() => navigation.navigate("Settings")}
        >
          <Image source={kebabIcon} style={App_StyleSheet.header_icon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeArea>
      <View style={App_StyleSheet.content}>
        <View style={styles.profileSection}>
          <Avatar.Image source={image} size={90} />
          <Text style={styles.username}>{route.params.User.userUserName}</Text>
        </View>

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
              <PostComponentView navigation={navigation} post={item} />
            )}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
          />
        )}
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
    marginLeft: 10
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    color: "white",
    flex: 1,
  },
});

export default ProfileView;