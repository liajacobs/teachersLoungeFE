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
import { getPostLikes } from "../../../Controller/GetPostLikesCommand";
import { checkLikePost } from "../../../Controller/CheckLikedPostCommand";

function PostComponentView({ navigation, post }) {
  const route = useRoute();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(Number(post.likes));

  let likeImg = require("../../../../assets/like.png");
  let likeFilledImg = require("../../../../assets/like_filled.png");
  let commentImg = require("../../../../assets/comment.png");

  useEffect(() => {
    if (post?.id) {
      async function fetchLikeData() {
        try {
          const liked = await checkLikePost(post, route.params.User.userUserName);
          setIsLiked(liked);
        } catch (error) {
          console.error("Error fetching like data:", error);
        }
      }
      fetchLikeData();
    }
  }, [post]);

  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        const unlikeSuccess = await unlikePost(post, route.params.User.userUserName);
        if (unlikeSuccess) {
          setIsLiked(false);
          setLikes((prevLikes) => prevLikes - 1);
          post.likes = Math.max(0, post.likes - 1);
        }
      } else {
        const likeSuccess = await likePost(post, route.params.User.userUserName);
        if (likeSuccess) {
          setIsLiked(true);
          setLikes((prevLikes) => prevLikes + 1);
          post.likes += 1;
        }
      }
    } catch (error) {
      console.error("Error handling like/unlike:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };


  return (
    <TouchableOpacity
      style={styles.post}
      onPress={() => {
        navigation.navigate("View Post", {
          post,
          onUpdatePost: (updatedPost) => {
            setLikes(updatedPost.likes);
            post.likes = updatedPost.likes;
          }
        });
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
            { }
            <Image style={styles.icon} source={isLiked ? likeFilledImg : likeImg} />
          </TouchableOpacity>
          <Text>{likes}</Text>
        </View>

        <View style={styles.footerSection}>
          <Image style={styles.icon} source={commentImg} />
          <Text>{post.commentsCount}</Text>
        </View>

        <Text style={styles.communityName}>{route.params?.Community ? post.user : (post.communityName || post.user)}</Text>
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
