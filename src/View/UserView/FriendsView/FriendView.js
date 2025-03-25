import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { useRoute, useIsFocused } from "@react-navigation/native";
import SafeArea from "../../SafeArea";
import PostComponentView from "../HomeView/PostComponentView";
import { getApprovedPostsByUser } from "../../../Controller/PostManager";
import { getUserInfo } from "../../../Controller/FriendsManager";
import App_StyleSheet from "../../../Styles/App_StyleSheet.js";
import { checkIfFriended, friendUser, unfriendUser } from "../../../Controller/FriendsManager";

function FriendView({ navigation }) {
  const route = useRoute();
  const isFocused = useIsFocused();
  const [friend, setFriend] = useState(null);
  const [posts, setPosts] = useState([]);
  const [friended, setFriended] = useState(false);
  const [friendee, setFriendee] = useState(false);
  const [image, setImage] = useState(require('../../../../assets/default-profile.png'));

  const loadFriend = async () => {
    const data = await getUserInfo(route.params.FriendEmail);
    setFriend(data);
    setImage(data.image || require('../../../../assets/default-profile.png'));
  };

  const loadPosts = async () => {
    const data = await getApprovedPostsByUser(route.params.FriendEmail);
    const sortedPosts = data.sort((a, b) => b.id - a.id);
    setPosts(sortedPosts);
  };

  const checkFriended = async () => {
    const data = await checkIfFriended(route.params.User.userUserName, route.params.FriendEmail);
    setFriended(data);
  };

  const checkFriendee = async () => {
    const data = await checkIfFriended(route.params.FriendEmail, route.params.User.userUserName);
    setFriendee(data);
  };

  useEffect(() => {
    if (isFocused) {
      loadFriend();
      loadPosts();
      checkFriended();
      checkFriendee();
    }
  }, [isFocused]);

  let friendStatus = "";
  if (friended && friendee) {
    friendStatus = "Friend";
  } else if (friended) {
    friendStatus = "Pending";
  } else {
    friendStatus = "Not Friend";
  }

  return (
    <SafeArea>
      <View style={App_StyleSheet.content}>
        <View style={styles.profileSection}>
          <Avatar.Image source={image} size={90} />
          <Text style={styles.username}>{friend?.email}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={App_StyleSheet.small_button}
            onPress={() => {
              friended
                ? unfriendUser({ navigation }, route.params.User.userUserName, friend?.email)
                : friendUser({ navigation }, route.params.User.userUserName, friend?.email);
            }}
          >
            <Text style={App_StyleSheet.text}>
              {friended ? "Unfriend User" : "Friend User"}
            </Text>
          </TouchableOpacity>
        </View>

        {posts && (
          <FlatList
            ListEmptyComponent={
              <Text style={App_StyleSheet.list_message}>No posts yet!</Text>
            }
            ListFooterComponent={
              posts[0] && (
                <Text style={App_StyleSheet.list_message}>You've viewed all posts!</Text>
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
    marginLeft: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    color: "white",
    flex: 1,
  },
  infoSection: {
    marginBottom: 15,
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
});

export default FriendView;
