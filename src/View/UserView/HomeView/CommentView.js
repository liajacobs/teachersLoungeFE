import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Alert } from "react-native";

function CommentView({ comment }) {
  const likeImg = require("../../../../assets/like.png");  // Add your like image

  return (
    <View style={styles.comment}>
      {/* Comment Content */}
      <View style={styles.text}>
        <Text style={styles.userName}>{comment.userName}</Text>
        <Text style={styles.content}>{comment.content}</Text>
      </View>

      {/* Comment Footer (Like and Username) */}
      <View style={styles.footer}>
        <View style={styles.footerSection}>
          <Text>{comment.likes ? comment.likes : 0}</Text>
        </View>

        <Text style={styles.commentUserName}>{comment.userName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  comment: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 15,
  },
  text: {
    padding: 20,
  },
  userName: {
    color: "#411c00", // Dark brown, similar to post component
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    color: "black",
    fontSize: 15,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 9,
    backgroundColor: "#E7ECFE",  // Light background color for the footer
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  footerSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
  },
  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
  },
  commentUserName: {
    marginLeft: "auto",
    fontWeight: "bold",
    marginHorizontal: 5,
  },
});

export default CommentView;
