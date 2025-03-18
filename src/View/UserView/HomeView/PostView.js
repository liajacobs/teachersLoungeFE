import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Linking } from "react-native";
import { useRoute } from "@react-navigation/native";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

function PostView({ navigation }) {
  const route = useRoute();
  const [post, setPost] = useState(route.params?.post);

  useEffect(() => {
    if (route.params?.post) {
      setPost(route.params.post);
    }
  }, [route.params?.post]);

  return (
    <View >
      <View >
        <Text >{post?.postContent}</Text>
        {post?.fileUrl && (
          <Text
            style={styles.linkText}
            onPress={() => Linking.openURL(post.fileUrl)}
          >
            {"Open Image File"}
          </Text>
        )}
        <Text >Posted by: {post?.user}</Text>
        <Text>Likes: {post?.likes}</Text>
        <Text>Comments: {post?.comments?.length || 0}</Text>
      </View>
    </View>
  );
}

export default PostView;
