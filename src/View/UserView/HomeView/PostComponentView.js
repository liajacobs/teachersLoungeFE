import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { likePost } from "../../../Controller/LikePostCommand";
import { unlikePost } from "../../../Controller/UnlikePostCommand";
import { checkLikePost } from "../../../Controller/CheckLikedPostCommand";
import { getPostLikes } from "../../../Controller/GetPostLikesCommand";

function PostComponentView({ navigation, post }) {
  const route = useRoute();
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  let likeImg = require("../../../../assets/like.png");
  let commentImg = require("../../../../assets/comment.png");

  useEffect(() => {
    async function fetchPostData() {
      try {
        const liked = await checkLikePost(post, route.params.User.userUserName);
        setIsLiked(liked);

        const likeCount = await getPostLikes(post.id);
        setLikes(likeCount);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    }
    fetchPostData();
  }, [post]);

  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        const unlikeSuccess = await unlikePost(post, route.params.User.userUserName);
        if (unlikeSuccess) {
          setIsLiked(false);
        }
      } else {
        const likeSuccess = await likePost(post, route.params.User.userUserName);
        if (likeSuccess) {
          setIsLiked(true);
        }
      }
      const updatedLikes = await getPostLikes(post.id);
      setLikes(updatedLikes);
    } catch (error) {
      console.error("Error handling like/unlike:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <TouchableOpacity
      style={styles.post}
      onPress={() => {
        navigation.navigate("View Post", { post: post });
      }}
    >
      <View style={styles.text}>
        <Text style={styles.title}>{"Post Title"}</Text>
        <Text style={styles.content}>{post.postContent}</Text>
        {post.fileUrl && (
          <Text
            style={styles.linkText}
            onPress={() => Linking.openURL(post.fileUrl)}
          >
            {"Open Image File"}
          </Text>
        )}
      </View>
      <View style={styles.footer}>
        <View style={styles.footerSection}>
          <TouchableOpacity onPress={handleLikeToggle}>
            <Image style={styles.icon} source={likeImg} />
          </TouchableOpacity>
          <Text>{likes}</Text>
        </View>

        <View style={styles.footerSection}>
          <Image style={styles.icon} source={commentImg} />
          <Text>{"#"}</Text>
        </View>

        <Text style={styles.communityName}>{"Community"}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  post: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 15,
  },
  text: {
    padding: 20,
  },
  title: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    color: "black",
    fontSize: 15,
  },
  linkText: {
    color: "blue",
    fontSize: 15,
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 9,
    backgroundColor: "#E7ECFE",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  footerSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  communityName: {
    marginLeft: "auto",
    fontWeight: "bold",
    marginHorizontal: 5,
  },
});

export default PostComponentView;
