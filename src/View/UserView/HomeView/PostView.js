import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { likePost } from "../../../Controller/LikePostCommand";
import { unlikePost } from "../../../Controller/UnlikePostCommand";
import { checkLikePost } from "../../../Controller/CheckLikedPostCommand";
import { Alert } from "react-native";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

function PostView({ navigation, post, postContent, fileUrl }) {
  const route = useRoute();
  let likeImg = require("../../../../assets/like.png");
  let commentImg = require("../../../../assets/comment.png");

  return (
    <View style={styles.post}>
      <View style={styles.text}>
        <Text style={styles.title}>{"Post Title"}</Text>
        <Text style={styles.content}>{postContent}</Text>
        {fileUrl && (
          <Text style={styles.linkText} onPress={() => Linking.openURL(fileUrl)}>
            {"Open Image File"}
          </Text>
        )}
      </View>
      <View style={styles.footer}>
        <View style={styles.footerSection}>
          <TouchableOpacity
            onPress={async () => {
              try {
                const isLiked = await checkLikePost(post, route.params.User.userUserName);
                if (isLiked) {
                  const unlikeSuccess = await unlikePost(post, route.params.User.userUserName);
                  if (unlikeSuccess) post.likes--;
                } else {
                  const likeSuccess = await likePost(post, route.params.User.userUserName);
                  if (likeSuccess) post.likes++;
                }
              } catch (error) {
                console.error("Error handling like/unlike: ", error);
                Alert.alert("Error", "Something went wrong. Please try again.");
              }
            }}
          >
            <Image style={styles.icon} source={likeImg} />
          </TouchableOpacity>
          <Text>{post.likes ? post.likes : 0}</Text>
        </View>

        <View style={styles.footerSection}>
          <Image style={styles.icon} source={commentImg} />
          <Text>{"#"}</Text>
        </View>

        <Text style={styles.communityName}>{"Community"}</Text>
      </View>
    </View>
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
    padding: 20
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
    paddingRight: 8
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  communityName: {
    marginLeft: "auto",
    fontWeight: "bold",
    marginHorizontal: 5
  },
});

export default PostView;