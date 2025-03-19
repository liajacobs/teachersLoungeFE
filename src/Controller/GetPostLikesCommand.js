import { apiUrl, getPostLikesRoute } from "@env";

// Fetches the total number of likes for a post
const getPostLikes = async (postId) => {
  try {
    const response = await fetch(apiUrl + getPostLikesRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postID: postId }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch likes count");
    }

    const data = await response.json();
    return data.likeCount;
  } catch (error) {
    console.error("Error fetching post likes:", error);
    return 0;
  }
};

export { getPostLikes };
