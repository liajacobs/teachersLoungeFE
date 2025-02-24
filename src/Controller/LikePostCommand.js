import { apiUrl, likePostRoute } from "@env";
import { Alert } from "react-native";

import * as SecureStore from "expo-secure-store";
import { checkLikePost } from "./CheckLikedPostCommand";

// Likes a post by given post id and user who liked it
const likePost = async (post, user) => {
  const alreadyLiked = await checkLikePost(post, user);
  if (alreadyLiked) {
    //Alert.alert("Error", "You have already liked this post!");
    return false; 
  }
  
  // Build like post url
  const likePostUrl = apiUrl + likePostRoute;
  console.log(likePostUrl)

  // Set request options
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + (await SecureStore.getItemAsync("token")),
    },
    body: JSON.stringify({ userEmail: user, postId: post.id }),
  };

  try {
    const response = await fetch(likePostUrl, reqOptions);
    console.log("RESPONSE STATUS ", response.status);

    if (response.status !== 200) {
      //Alert.alert("Error", "Something went wrong while liking the post.");
      return false;
    }

   // Alert.alert("Success", "Successfully liked the post!");
    return true;
  } catch (error) {
    console.error("Error liking post: ", error);
    //Alert.alert("Error", "Failed to like post.");
    return false;
  }
};

export { likePost };
