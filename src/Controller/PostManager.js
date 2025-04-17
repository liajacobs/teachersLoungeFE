import {
  apiUrl,
  approvedPostsRoute,
  approvedPostsByUserRoute,
  pendingPostsRoute,
  deletePostRoute,
  approvePostRoute,
  addCommentRoute,
  getCommentRoute,
  getCommentsByPostIdRoute,
  getCommentByCommentIDRoute,
  getNumberOfCommentsRoute
} from "@env";
import Post from "../Model/Posts/Post.js";
import Comment from "../Model/Posts/Comment.js";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { constrainedMemory } from "process";

// Fetches all posts that have been approved, used for PostListingsView
async function getApprovedPosts(userEmail) {
  let posts = [];
  let urlPosts = `${apiUrl}${approvedPostsRoute}?userEmail=${userEmail}`;
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
  };

  const response = await fetch(urlPosts, reqOptions);
  const results = await response.json();
  var data = results.data;
  var count = 0;

  if (data) {
    while (data[count] != undefined) {
      posts.unshift(
        new Post(
          data[count].postid,
          data[count].email,
          data[count].title,
          data[count].content,
          data[count].likescount,
          [],
          data[count].fileurl,
          data[count].communityname,
          data[count].commentscount
        )
      );
      count = count + 1;
    }
  }
  return posts;
}

async function getApprovedPostsByUser(username) {
  let posts = [];
  let urlPosts = apiUrl + approvedPostsByUserRoute + `/${username}`;
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
  };

  const response = await fetch(urlPosts, reqOptions);
  const results = await response.json();
  var data = results.data;
  var count = 0;

  if (data) {
    while (data[count] != undefined) {
      posts.unshift(
        new Post(
          data[count].postid,
          data[count].email,
          data[count].title,
          data[count].content,
          data[count].likescount,
          [],
          data[count].fileurl,
          data[count].communityname,
          data[count].commentscount
        )
      );
      count = count + 1;
    }
  }
  return posts;
}

//Switches a post from pending to approved, called from PostModeratorView
async function approvePost(postID) {
  let urlApprove = apiUrl + approvePostRoute;
  console.log(urlApprove)
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": " application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
    body: JSON.stringify({ id: postID }),
  };
  const response = await fetch(urlApprove, reqOptions);
  const results = await response.json();
  if (response.status == 200) {
    Alert.alert("Success", "Post is approved");
  } else {
    Alert.alert("Error", "Server error, try again" + response.status);
  }
}

// Delete a post from DB, called when a user deletes their own post or when a mod doesn't approve a post
async function deletePost(postID) {
  const urlDelete = `${apiUrl}${deletePostRoute}/${postID}`;
  console.log("Delete URL:", urlDelete);

  const reqOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
  };

  try {
    const response = await fetch(urlDelete, reqOptions);
    const text = await response.text();

    console.log("Raw response from backend:", text);

    const results = JSON.parse(text);

    if (response.status === 200) {
      Alert.alert("Success", results.message);
    } else {
      Alert.alert("Error", results.message || "Server error, try again");
    }
  } catch (err) {
    console.error("Error deleting post:", err);
    Alert.alert("Error", "Something went wrong");
  }
}


async function addComment(content, email, time, postId) {
  let urlAddComment = apiUrl + addCommentRoute;
  console.log(urlAddComment)
  // Alert.alert("Error", "addComment: " + urlAddComment);
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
    body: JSON.stringify({ content: content, email: email, time: time, postid: postId }),
  };
  // Alert.alert("Error", "addComment: " + reqOptions.body);
  const response = await fetch(urlAddComment, reqOptions);
  const results = await response.json();
  if (response.status == 200) {

  } else {
    Alert.alert("Error", results.message);
  }
}

async function getComment(content, email) {
  let urlGetComment = apiUrl + getCommentRoute + `?email=${email}&content=${content}`;
  console.log(urlGetComment);
  // Alert.alert("Error", "getComment: " + urlGetComment);
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Alert.alert("Error", "getComment: " + reqOptions.body);
  const response = await fetch(urlGetComment, reqOptions);
  const results = await response.json();
  // Alert.alert("Error", "getComment: " + response.status);
  if (response.status == 200) {
    // Alert.alert("Success",  "getComment commentId: " + results.data[0].CommentID);
  } else {
    Alert.alert("Error", results.message);
  }
  return results.data[0].id;
}

async function getCommentByCommentID(commentId) {
  let urlGetCommentByCommentID = apiUrl + getCommentByCommentIDRoute;
  console.log(urlGetCommentByCommentID)
  // Alert.alert("Error", "getComment: " + urlGetCommentByCommentID + " " + commentId);
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
    body: JSON.stringify({ commentId: commentId }),
  };
  // Alert.alert("Error", "getComment: " + reqOptions.body);
  const response = await fetch(urlGetCommentByCommentID, reqOptions);
  const results = await response.json();
  // Alert.alert("Error", "getComment: " + response.status);
  if (response.status == 200) {
    // Alert.alert("Success",  "getComment commentId: " + results.data[0]);
  } else {
    Alert.alert("Error", results.message);
  }
  return results.data[0];
}

async function getCommentsByPostId(postId, userEmail) {
  let comments = [];
  let urlGetCommentsByPostId = apiUrl + getCommentsByPostIdRoute + `?postId=${postId}` + `&userEmail=${userEmail}`;
  // Alert.alert("Error", "getCommentsByPostId: " + urlGetCommentsByPostId);
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
    // body: JSON.stringify({ postId: postId }),
  };
  const response = await fetch(urlGetCommentsByPostId, reqOptions);
  const results = await response.json();
  var data = results.data;
  var count = 0;

  if (response.status == 201) {
    //Alert.alert("Success", "getCommentsByPostId Success " + results.data[0]);
  } else {
    Alert.alert("Error", "getCommentsByPostId Error: " + results.message);
  }

  if (data) {
    // Alert.alert("Error", "getCommentsByPostId data: " + data);
    while (data[count] != undefined) {
      // Alert.alert("Error", "data[0]: " + data[count]);
      //let temComment = await getCommentByCommentID(data[count].id);
      let temComment = data[count];
      // Alert.alert("Error", "getCommentsByPostId data: " + temComment.Email);
      comments.push(
        new Comment(
          temComment.email,
          null,
          temComment.content,
          '',
          "",
          "",
          [],
          temComment.FileUrl
        )
      );
      count = count + 1;
    }
  }
  return comments;
}

async function getNumberOfComments(postId) {
  let urlGetNumberOfComments = apiUrl + getNumberOfCommentsRoute + `?id=${postId}`;
  console.log(urlGetNumberOfComments);

  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };

  const response = await fetch(urlGetNumberOfComments, reqOptions);
  const results = await response.json();

  if (response.status === 200) {
    return results.count;
  } else {
    Alert.alert("Error", results.message);
    return null;
  }
}

export {
  getApprovedPosts,
  getApprovedPostsByUser,
  //getPendingPosts,
  approvePost,
  deletePost,
  addComment,
  getComment,
  getCommentsByPostId,
  getCommentByCommentID,
  getNumberOfComments
};
