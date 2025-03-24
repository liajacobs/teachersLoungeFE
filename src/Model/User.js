import React from "react";
import Friend from "./Friend";
import Post from "./Posts/Post";
import Comment from "./Posts/Comment";



class User {
  //The user's acutal name
  userName = "";
  //The user's username/email- we tried to refactor the name of this to be clearer but it broke everything
  userUserName = "";
  nickName = "";
  school = "";    
  userRole ="";
  image = "";
  constructor(email,first,last,school,role,image) {
    this.userName = first + " " + last;
    this.userUserName = email;
    this.nickName = first;
    this.school = school;
    this.userRole = role;
    this.post = [];
    this.image = image;
  }

  approveUser(){  
    if(this.userRole=="Guest")
      this.userRole = "Approved";
  }

  /* Changing to match constructor for post
  createPost(content,fileUrl) {
    newPost = new Post(
      this.userName,
      content,
      0,
      this.image,
      this.nickName,
      [],fileUrl
    );
    this.post.unshift(newPost);
  }*/

  createPost(content, fileUrl) {
    newPost = new Post(
      null,
      this.userName,
      content,
      0,
      this.image,
      this.nickName,
      [],
      fileUrl
    );

    // Log content and fileUrl
    console.log("User.createPost Content: " + content);
    console.log("User.createPost fileUrl: " + fileUrl);

    this.post.unshift(newPost);
  }

  changeUserName(newUserName) {
    this.userName = newUserName;
  }
  changeUserUserName(newUserUserName) {
    this.userUserName = newUserUserName;
  }
  changeSchool(newSchool) {
    this.school = newSchool;
  }
}

export default User;
