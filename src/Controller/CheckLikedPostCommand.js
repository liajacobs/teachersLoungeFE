import { apiUrl, checkLikedPostRoute } from "@env";
import * as SecureStore from "expo-secure-store";

// Checks if a user has already liked a post
const checkLikePost = async (post, user) => {
  // Build check like post URL
  const checkLikedPostUrl = apiUrl + checkLikedPostRoute;

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
    // Makes th request
    const response = await fetch(checkLikedPostUrl, reqOptions);
    const data = await response.json();

    return response.status === 409; // Return true if already liked (409 Conflict)
  } catch (error) {
    console.error("Error checking like post: ", error);
    return false;
  }
};

export { checkLikePost };
