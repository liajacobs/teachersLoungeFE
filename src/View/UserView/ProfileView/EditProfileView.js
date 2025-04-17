import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Avatar, Title } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import SafeArea from "../../SafeArea";
import ProfileNavigator from "./ProfileNavigator";
import OpenEditableInfoCommand from "../../../Controller/OpenEditableInfoCommand";
import App_StyleSheet from "../../../Styles/App_StyleSheet";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import { selectPic } from "../../../Controller/DocumentPicker";

function EditProfileView({ navigation }) {
  var route = useRoute();

  const [image, setImage] = useState({ uri: route.params.User.image } || require('../../../../assets/default-profile.png'));

  const openEdit = new OpenEditableInfoCommand(route.params.User);

  /*const pickImage = async () => {
    // No permissions request is necessary for launching the image library, might be different for Android
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Result cancelled: ", result.canceled);

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      console.log('Image URI:', imageUri);
      const fileName = imageUri.split('/').pop();
      console.log('File Name:', fileName);
      const newPath = `${FileSystem.documentDirectory}${fileName}`;
      console.log('New Path:', newPath);
  
      try {
        await FileSystem.moveAsync({
          from: imageUri,
          to: newPath,
        });
        setImage({ uri: newPath });

        // Log current route params user image
        console.log('Current route params user image:', route.params.User.image);

        // Profile pic can appear elsewhere
        route.params.User.image = { uri: newPath };
        console.log('New route params user image:', route.params.User.image);

      } catch (error) {
        console.error('Error saving image:', error);
      }
    }
  };*/

  return (
    <SafeArea>
      <View style={[styles.section, { height: 120 }]}>
        <Avatar.Image
          source={image}
          size={90}
          style={[
            App_StyleSheet.profile_avatarImage,
            { overflow: "hidden" } // Ensures the image is clipped properly
          ]}
        />
        <TouchableOpacity
          style={{
            bottom: 20,
            position: "absolute",
          }}
          onPress={async () => { // Why the edit button does nothing
            // Output message to console that the edit profile pic button was clicked
            console.log("Edit Profile Picture button clicked");

            // Open the photos app picker
            let file = await selectPic(true);

            // Update the image state and route params
            if (file.url) {
              setImage({ uri: file.url });
              route.params.User.image = { uri: file.url };
              console.log('New route params user image:', route.params.User.image);
              navigation.navigate("Profile", { updatedImage: { uri: file.url } }); // Pass updated image URL back to ProfileView
            }

            // Output the file
            console.log("EditProfileView - file name is: " + file.name);
          }}
        >
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.userInfoStyle}>{"\tName"}</Text>
        </View>
        <View
          style={{
            flex: 1.6,
            justifyContent: "center",
            height: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              (ProfileNavigator.lastClick = "Edit Name"),
                openEdit.OpenEditableInfo({ navigation });
            }}
          >
            <Text style={styles.editableInfoStyle}>
              {route.params.User.userName}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.userInfoStyle}>{"\tUsername"}</Text>
        </View>
        <View
          style={{
            flex: 1.6,
            justifyContent: "center",
            height: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              (ProfileNavigator.lastClick = "Edit Username"),
                openEdit.OpenEditableInfo({ navigation });
            }}
          >
            <Text style={styles.editableInfoStyle}>
              {route.params.User.userUserName}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <View
          style={{
            flex: 1.6,
            justifyContent: "center",
            height: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              (ProfileNavigator.lastClick = "Edit School"),
                openEdit.OpenEditableInfo({ navigation });
            }}
          >
          </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  userInfoStyle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fef3d7"
  },
  editableInfoStyle: {
    fontSize: 15,
    textAlign: "left",
  },
  section: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});

export default EditProfileView;
