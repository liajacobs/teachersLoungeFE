import {
  apiUrl,
  approvedPostsRoute,
  pendingPostsRoute,
  deletePostRoute,
  approvePostRoute,
  addCommentRoute,
  getCommentRoute,
  addCommentToPostRoute,
  getCommentsByPostIdRoute,
  getCommentByCommentIDRoute,
} from "@env";
import Post from "../Model/Posts/Post.js";
import Comment from "../Model/Posts/Comment.js";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { constrainedMemory } from "process";

//Fetches all posts that have been approved, used for PostListingsView
async function getApprovedPosts() {
  let posts = [];
  let urlPosts = apiUrl + approvedPostsRoute;
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
          data[count].content,
          data[count].likes,
          "",
          "",
          [],
          data[count].fileurl
        )
      );
      count = count + 1;
    }
  }
  return posts;
}

//Gets posts that are pending approval, used for PostModeratorView
async function getPendingPosts() {
  posts = [];
  let urlPosts = apiUrl + pendingPostsRoute;
  console.log(urlPosts)
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
          data[count].PostID,
          data[count].Email,
          data[count].Content,
          0,
          "",
          "",
          [],
          data[count].FileUrl
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

//Delete a post from DB, called when a user deletes their own post or when a mod doesn't approve a post
async function deletePost(postID, fileID) {
  let urlDelete = apiUrl + deletePostRoute;
  console.log(urlDelete)
  const reqOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
    body: JSON.stringify({ id: postID, fileID: fileID }),
  };
  const response = await fetch(urlDelete, reqOptions);
  const results = await response.json();
  if (response.status == 200) {
    Alert.alert("Success", results.message);
  } else {
    Alert.alert("Error", "Server error, try again");
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
    // Alert.alert("Success", results.message);
    let commentId = await getComment(content, email);
    // Alert.alert("Success", commentId);
    await addCommentToPost(commentId, email, postId);
  } else {
    Alert.alert("Error", results.message);
  }
}

async function addCommentToPost(commentId, email, postId) {
  let urlAddCommentToPost = apiUrl + addCommentToPostRoute;
  console.log(urlAddCommentToPost)
  // Alert.alert("Error", "addCommentToPost: " + urlAddCommentToPost);
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
    body: JSON.stringify({
      email: email,
      commentId: commentId,
      postId: postId,
    }),
  };
  // Alert.alert("Error", "addCommentToPost: " + reqOptions.body);
  const response = await fetch(urlAddCommentToPost, reqOptions);
  const results = await response.json();
  if (response.status == 200) {
    //Alert.alert("Success", "addCommentToPost Success ");
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

async function getCommentsByPostId(postId) {
  let comments = [];
  let urlGetCommentsByPostId = apiUrl + getCommentsByPostIdRoute + `?postId=${postId}`;
  // let urlGetCommentsByPostId = apiUrl + getCommentsByPostIdRoute;
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

  if (response.status == 200) {
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

export {
  getApprovedPosts,
  getPendingPosts,
  approvePost,
  deletePost,
  addComment,
  addCommentToPost,
  getComment,
  getCommentsByPostId,
  getCommentByCommentID
};
