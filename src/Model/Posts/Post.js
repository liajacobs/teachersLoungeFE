import React from "react";
import Comment from "./Comment";

class Post {
  constructor(id, user, postContent, likes, comments, fileUrl, communityName, commentsCount) {
    this.id = id;
    this.user = user;
    this.postContent = postContent;
    this.likes = likes;
    this.comments = comments;
    this.fileUrl = fileUrl;
    this.communityName = communityName;
    this.commentsCount = commentsCount;
  }
}

export default Post;