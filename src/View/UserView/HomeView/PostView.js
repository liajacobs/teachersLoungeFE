import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Linking
} from "react-native";
import { getCommentsByPostId, addComment } from "../../../Controller/PostManager";
import CommentView from "./CommentView";
import SafeArea from "../../SafeArea";
import { likePost } from "../../../Controller/LikePostCommand";
import { unlikePost } from "../../../Controller/UnlikePostCommand";
import { checkLikePost } from "../../../Controller/CheckLikedPostCommand";
import { getPostLikes } from "../../../Controller/GetPostLikesCommand";
import { deletePost } from "../../../Controller/PostManager";

function PostView({ route, navigation }) {
  const [post, setPost] = useState(route.params?.post);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(Number(post.likes));
  const [isLiked, setIsLiked] = useState(false);

  let likeImg = require("../../../../assets/like.png");
  let likeFilledImg = require("../../../../assets/like_filled.png");
  let commentImg = require("../../../../assets/comment.png");

  useEffect(() => {
    if (post?.id) {
      getCommentsByPostId(post.id, route.params.User.userUserName).then((commentsData) => setComments(commentsData));

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
  }, []);

  const handleLikeToggle = async () => {
    try {
      let updatedLikes = Number(likes);

      if (isLiked) {
        const unlikeSuccess = await unlikePost(post, route.params.User.userUserName);
        if (unlikeSuccess) {
          setIsLiked(false);
          updatedLikes -= 1;
        }
      } else {
        const likeSuccess = await likePost(post, route.params.User.userUserName);
        if (likeSuccess) {
          setIsLiked(true);
          updatedLikes += 1;
        }
      }

      setLikes(updatedLikes);
      setPost((prevPost) => ({ ...prevPost, likes: updatedLikes }));

      if (route.params?.onUpdatePost) {
        route.params.onUpdatePost({ ...post, likes: updatedLikes });
      }

    } catch (error) {
      console.error("Error handling like/unlike:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };


  const handleAddComment = async () => {
    if (newComment.trim()) {
      await addComment(newComment, route.params.User.userUserName, null, post.id);
      setNewComment("");
      getCommentsByPostId(post.id).then((commentsData) => setComments(commentsData));
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(post.id, post.fileUrl);
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <SafeArea>
      <ScrollView style={styles.container}>
        {post.user === route.params.User.userUserName && (
          <TouchableOpacity onPress={handleDeletePost} style={styles.deletePostButton}>
            <Text>{"Delete Post"}</Text>
          </TouchableOpacity>
        )}
        <View style={styles.post}>
          <View style={styles.text}>
            <Text style={styles.title}>{"Post Title"}</Text>
            <Text style={styles.content}>{post.postContent}</Text>
            {post.fileUrl && (
              <Text style={styles.linkText} onPress={() => Linking.openURL(post.fileUrl)}>
                {"Open Image File"}
              </Text>
            )}
          </View>
          <View style={styles.footer}>
            <View style={styles.footerSection}>
              <TouchableOpacity onPress={handleLikeToggle}>
                <Image style={styles.icon} source={isLiked ? likeFilledImg : likeImg} />
              </TouchableOpacity>
              <Text>{likes}</Text>
            </View>

            <View style={styles.footerSection}>
              <Image style={styles.icon} source={commentImg} />
              <Text>{comments.length}</Text>
            </View>

            <Text style={styles.communityName}>{post.user}</Text>
          </View>
        </View>
        <View style={styles.newComment}>
          <TextInput
            style={styles.newCommentText}
            placeholder="Add a new comment..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <Button title="+" onPress={handleAddComment} />
        </View>
        <View>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentView key={comment.id} comment={comment} />
            ))
          ) : (
            <Text>No comments yet.</Text>
          )}
        </View>
      </ScrollView>
    </SafeArea>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    color: "black",
    fontSize: 18,
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
  newComment: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    width: "90%",
    alignSelf: "center",
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  newCommentText: {
    padding: 15,
  },
  deletePostButton: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  }
});

export default PostView;
