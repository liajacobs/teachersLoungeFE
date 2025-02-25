import { apiUrl, unlikePostRoute } from "@env";
import * as SecureStore from "expo-secure-store";

// Unlikes a post by given post ID and user
const unlikePost = async (post, user) => {
  // Build unlike post URL
  const unlikePostUrl = apiUrl + unlikePostRoute;
  console.log("Unlike Post URL: ", unlikePostUrl);

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
    // Make the request
    const response = await fetch(unlikePostUrl, reqOptions);
    console.log("Unlike Post Response: ", response.status);

    return response.status === 200; // Return true if successfully unliked
  } catch (error) {
    console.error("Error unliking post: ", error);
    return false;
  }
};

export { unlikePost };
