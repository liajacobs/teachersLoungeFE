import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Alert } from "react-native";

function CommentView({ comment }) {
  const likeImg = require("../../../../assets/like.png");

  return (
    <View style={styles.comment}>
      <View style={styles.text}>
        <Text style={styles.content}>{comment.content}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerSection}>
          <Text>{comment.likes ? comment.likes : 0} {"likes"}</Text>
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
  content: {
    color: "black",
    fontSize: 15,
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